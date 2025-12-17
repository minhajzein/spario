import dayjs from 'dayjs'
import { makeExecutiveInvoicesSelectors } from '../../../store/apiSlices/querySlices/invoicesByExecutive'
import { useSelector } from 'react-redux'
import DeleteInvoice from './DeleteInvoice'
import EditInvoice from './EditInvoice'
import { useMemo } from 'react'

function InvoiceRow({ invoiceId, executiveId, queryParams }) {
	// Use selector factory with current query params if provided
	const selectors = useMemo(() => {
		if (queryParams) {
			return makeExecutiveInvoicesSelectors(queryParams)
		}
		return makeExecutiveInvoicesSelectors({ executiveId })
	}, [queryParams, executiveId])
	
	const invoice = useSelector(state => selectors.selectById(state, invoiceId))

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
				<td className='p-3 justify-center flex gap-3 items-center'>
					<EditInvoice invoice={invoice} />
					<DeleteInvoice invoiceId={invoiceId} />
				</td>
			</tr>
		)
	} else return null
}

export default InvoiceRow
