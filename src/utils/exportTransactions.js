import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";

const formatLedgerData = (entries) => {
    return entries.map((item) => ({
        date: dayjs(item.date).format("DD-MM-YYYY"),
        store: item.store.storeName,
        description: item.type,
        amount: item.amount,
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
const handlePrint = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`${dayjs().format("DD/MM/YYYY")} - Store Transactions`, 14, 15);
    doc.setFont("helvetica", "normal");

    const ledgerData = formatLedgerData(data);


    autoTable(doc, {
        head: [["Date", "Store", "Description", "amount"]],
        body: ledgerData.map((row) => [row.date, row.store, row.description, row.amount]),
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

    doc.save(`${dayjs().format("DD-MM-YYYY")}_transactions.pdf`);
};

export default handlePrint;