import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";

const formatLedgerData = (entries) => {
    return entries.map((item) => ({
        date: dayjs(item.date).format("YYYY-MM-DD"),
        debit: item.entry === "debit" ? item.amount : "",
        credit: item.entry === "credit" ? item.amount : "",
        type: item.type,
    }));
};

const getSummary = (entries) => {
    const summary = {};

    entries.forEach(({ type, amount }) => {
        let normalizedType = type;

        if (type.toLowerCase().startsWith("cheque")) {
            normalizedType = "cheque";
        }

        if (type.toLowerCase().startsWith("return")) {
            normalizedType = "return";
        }

        if (type.toLowerCase().startsWith("invoice")) {
            normalizedType = "invoice";
        }

        summary[normalizedType] = (summary[normalizedType] || 0) + amount;
    });

    return summary;
};

const getTotalDebitCredit = (entries) => {
    let totalDebit = 0;
    let totalCredit = 0;

    entries.forEach((item) => {
        if (item.entry === "debit") totalDebit += item.amount;
        if (item.entry === "credit") totalCredit += item.amount;
    });

    return { totalDebit, totalCredit };
};

const handlePrint = (data, storeName) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`${storeName} - Store Ledger`, 14, 15);
    doc.setFont("helvetica", "normal");

    const ledgerData = formatLedgerData(data);
    const { totalDebit, totalCredit } = getTotalDebitCredit(data);

    autoTable(doc, {
        head: [["Date", "Description", "Debit", "Credit"]],
        body: ledgerData.map((row) => [row.date, row.type, row.debit, row.credit]),
        foot: [["Total", '', `Rs. ${totalDebit}`, `Rs. ${totalCredit}`]],
        theme: "striped",
        headStyles: { fillColor: [100, 100, 255] },
        footStyles: { fillColor: [230, 230, 230], textColor: 0, fontStyle: "bold" },
        margin: { top: 25 },
    });

    const summary = getSummary(data);
    const summaryY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Summary", 14, summaryY);
    doc.setFont("helvetica", "normal");

    let y = summaryY + 10;

    Object.entries(summary).forEach(([type, total]) => {
        const label = `Total in ${type.toUpperCase()}`.padEnd(25);
        const line = `${label}: Rs ${total}`;

        if (type.toLowerCase() === "cash") {
            doc.setFont("helvetica", "bold");
            doc.setTextColor(220, 20, 60); // red
            doc.text(line, 14, y);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "normal");
        } else {
            doc.text(line, 14, y);
        }

        y += 8;
    });

    doc.save(`${storeName}_ledger.pdf`);
};

export default handlePrint;