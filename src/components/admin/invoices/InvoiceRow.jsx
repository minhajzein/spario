import { useSelector } from 'react-redux'
import { selectInvoiceById } from '../../../store/apiSlices/invoiceApiSlice'
import dayjs from 'dayjs'

function InvoiceRow({ invoiceId }) {
	const invoice = useSelector(state => selectInvoiceById(state, invoiceId))
	if (invoice) {
		return (
			<tr className='bg-white border-b border-black'>
				<td className='p-3 border-r border-black capitalize'>
					{invoice.store.storeName}
				</td>
				<td className='p-3 border-r border-black'>{invoice.reference}</td>
				<td className='p-3 border-r border-black text-center'>
					{dayjs(invoice.billDate).format('DD/MM/YYYY')}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{dayjs(invoice.dueDate).format('DD/MM/YYYY')}
				</td>
				<td className='p-3 border-r border-black'>{invoice.amount}</td>
				<td className='p-3 text-center'></td>
			</tr>
		)
	} else return null
}

export default InvoiceRow
