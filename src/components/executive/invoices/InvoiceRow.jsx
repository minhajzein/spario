import dayjs from 'dayjs'
import { makeExecutiveInvoicesSelectors } from '../../../store/apiSlices/querySlices/invoicesByExecutive'
import { useSelector } from 'react-redux'

function InvoiceRow({ invoiceId }) {
	const executiveId = useSelector(state => state.user.user._id)
	const { selectById } = makeExecutiveInvoicesSelectors(executiveId)
	const invoice = useSelector(state => selectById(state, invoiceId))

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
