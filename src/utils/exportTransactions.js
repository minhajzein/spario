import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";

const formatLedgerData = (entries) => {
    return entries.map((item) => ({
        date: dayjs(item.date.$date).format("YYYY-MM-DD"),
        store: item.store.storeName,
        description: item.type,
        amount: item.amount,
    }));
};

const handlePrint = (data) => {
    const doc = new jsPDF();

    const ledgerData = formatLedgerData(data);


    autoTable(doc, {
        head: [["Date", "Store", "Description", "amount"]],
        body: ledgerData.map((row) => [row.date, row.store, row.description, row.amount]),
        theme: "striped",
        headStyles: { fillColor: [100, 100, 255] },
        footStyles: { fillColor: [230, 230, 230], textColor: 0, fontStyle: "bold" },
        margin: { top: 25 },
    });

    doc.save(`transactions.pdf`);
};

export default handlePrint;