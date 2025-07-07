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

    doc.save(`${dayjs().format("DD-MM-YYYY")}_transactions.pdf`);
};

export default handlePrint;