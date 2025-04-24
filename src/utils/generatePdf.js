import { jsPDF } from 'jspdf'

// imports....................................................................................

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



const generatePDF = (data, columns, title) => {
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

    const centerText = (doc, text, y) => {
        const textWidth = doc.getTextWidth(text)
        const pageWidth = doc.internal.pageSize.width
        const x = (pageWidth - textWidth) / 2
        doc.text(text, x, y)
    }

    // Define document metadata
    let heading = ''
    if (title) {
        heading = `${title}`
    }

    // Set background color
    doc.setFillColor(0, 0, 0) // Light grey background
    doc.rect(0, 0, doc.internal.pageSize.width, 15, 'FD') // Fill a rectangle

    // Add the heading
    doc.setFontSize(18)
    doc.setTextColor(255, 255, 255)
    centerText(doc, heading, 10)

    // Add some details below the heading
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    // Add some space before the table
    const tableStartY = 30
    // Add the table
    doc.autoTable({
        head: [modifiedColumns.map(column => column.Header)],
        body: pdfData,
        startY: tableStartY,
    })

    // Save the PDF
    doc.save(`${title}.pdf`)
}

export default generatePDF