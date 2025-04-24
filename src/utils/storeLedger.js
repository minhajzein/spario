import jsPDF from "jspdf"
import { format } from 'date-fns'

const getNestedValue = (obj, path) => {
    if (!obj || !path) return undefined

    const keys = path.split('.')
    let value = obj

    for (const key of keys) {
        if (value && value.hasOwnProperty(key)) {
            value = value[key]
        } else {
            return undefined
        }
    }

    return value
}


const formatDate = timestamp => {
    if (!timestamp) return 'Invalid Date'
    try {
        const date = new Date(timestamp)
        return format(date, 'dd-MM-yyyy')
    } catch (error) {
        console.error('Error formatting date:', error)
        return 'Invalid Date'
    }
}


const generatePDF = (data, columns, storeName, totalDebit, totalCredit, totalBalance) => {
    const title = 'Store Ledger'
    const doc = new jsPDF()
    const modifiedColumns = columns.filter(
        column =>
            column.Header !== 'No' &&
            column.Header !== 'Actions' &&
            column.accessor !== 'actions'
    )
    const pdfData = data.map(row => {
        return modifiedColumns.map(column => {
            const accessor =
                typeof column.accessor === 'string' ? column.accessor : ''
            const value = getNestedValue(row, accessor)

            if (column.Header === 'Channel') {
                return `${row?.channel?.channel}`
            }
            return column.accessor === 'total' ? parseFloat(value) || 0 : value
        })
    })

    // Format date in the PDF
    const formattedData = pdfData.map(row => {
        const formattedRow = [...row]
        // Assuming the date column is the last one in each row
        const dateIndex = formattedRow.length - 1
        formattedRow[dateIndex] = formatDate(formattedRow[dateIndex])
        return formattedRow
    })

    // Calculate total amount
    const totalAmount = formattedData.reduce((total, row) => {
        const rowTotal = parseFloat(
            row[modifiedColumns.findIndex(col => col.accessor === 'amount')]
        )
        return total + (isNaN(rowTotal) ? 0 : rowTotal)
    }, 0)
    let Heading = ''
    if (title === 'Vendor') {
        Heading = `Name: ${currentsupplier?.first_name + ' ' + currentsupplier?.last_name
            }`
    }

    const centerText = (doc, text, y) => {
        const textWidth = doc.getTextWidth(text)
        const pageWidth = doc.internal.pageSize.width
        const x = (pageWidth - textWidth) / 2
        doc.text(text, x, y)
    }

    // Define document metadata
    let heading
    if (title && storeName) {
        heading = `${title} of the store ${storeName}`
    }
    // Set background color
    doc.setFillColor(0, 0, 0) // Light grey background
    doc.rect(0, 0, doc.internal.pageSize.width, 15, 'FD') // Fill a rectangle

    // Add the heading
    doc.setFontSize(18)
    doc.setTextColor(255, 255, 255)
    centerText(doc, heading, 10)

    const pageHeight = doc.internal.pageSize.height
    const marginBottom = 10
    const yPosition = pageHeight - marginBottom

    // Add some details below the heading
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    doc.text(Heading, 14, 28)

    // Add some space before the table
    const tableStartY = 30
    // Add the table
    doc.autoTable({
        head: [modifiedColumns.map(column => column.Header)],
        body: pdfData,
        startY: tableStartY,
    })

    doc.text(
        `Closing Balance:                ${totalDebit}/-      ${totalCredit}/-      ${totalBalance}/- `,
        14,
        yPosition
    )

    // Save the PDF
    doc.save(`${storeName}.pdf`)
}


export default generatePDF