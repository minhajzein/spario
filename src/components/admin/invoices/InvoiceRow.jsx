import { useSelector } from 'react-redux'
import { selectInvoiceById, makeInvoiceSelectors } from '../../../store/apiSlices/invoiceApiSlice'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import UpdateInvoice from './UpdateInvoice'
import DeleteInvoice from '../../executive/invoices/DeleteInvoice'

function InvoiceRow({ invoiceId, queryParams }) {
	// Use selector factory with current query params if provided
	const selectors = useMemo(() => {
		if (queryParams) {
			return makeInvoiceSelectors(queryParams)
		}
		return null
	}, [queryParams])
	
	const invoice = useSelector(state => {
		if (selectors) {
			return selectors.selectById(state, invoiceId)
		}
		return selectInvoiceById(state, invoiceId)
	})
	if (invoice) {
		return (
			<tr className='bg-white border-b border-black'>
				<td className='p-3 border-r border-black capitalize'>
					{invoice.store?.storeName}
				</td>
				<td className='p-3 border-r border-black capitalize'>
					{invoice.store?.executive?.username || 'N/A'}
				</td>
				<td className='p-3 border-r border-black'>{invoice.reference}</td>
				<td className='p-3 border-r border-black text-center'>
					{dayjs(invoice.billDate).format('DD/MM/YYYY')}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{dayjs(invoice.dueDate).format('DD/MM/YYYY')}
				</td>
				<td className='p-3 border-r border-black'>{invoice.amount}</td>
				<td className='p-3 flex gap-3 items-center justify-center text-center'>
					<UpdateInvoice invoice={invoice} />
					<DeleteInvoice invoiceId={invoiceId} />
				</td>
			</tr>
		)
	} else return null
}

export default InvoiceRow
