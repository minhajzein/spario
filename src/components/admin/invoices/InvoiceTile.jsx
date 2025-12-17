import { MdOutlineStorefront } from 'react-icons/md'
import { selectInvoiceById, makeInvoiceSelectors } from '../../../store/apiSlices/invoiceApiSlice'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import DeleteInvoice from '../../executive/invoices/DeleteInvoice'
import UpdateInvoice from './UpdateInvoice'

function InvoiceTile({ invoiceId, queryParams }) {
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
			<div className='w-full grid grid-cols-3 border-b border-gray-400 gap-1 bg-white p-2'>
				<div className='flex flex-col justify-between'>
					<h1 className='text-xs capitalize text-gray-500 flex gap-1 items-center'>
						<MdOutlineStorefront />
						store name
					</h1>
					<h1 className='capitalize font-semibold text-ellipsis whitespace-nowrap overflow-hidden'>
						{invoice.store?.storeName}
					</h1>
					<h1 className='text-[10px] text-gray-500'>
						Executive: {invoice.store?.executive?.username || 'N/A'}
					</h1>
					<h1 className='text-[10px]'>
						Bill Date: {dayjs(invoice.billDate).format('DD/MM/YYYY')}
					</h1>
				</div>
				<div className='flex flex-col justify-between'>
					<h1 className='text-xs text-gray-500'>Reference</h1>
					<h1 className='font-semibold'>{invoice.reference}</h1>
					<h1 className='text-[10px] text-pr-red'>
						Due Date: {dayjs(invoice.dueDate).format('DD/MM/YYYY')}
					</h1>
				</div>
				<div className='flex flex-col items-end justify-between'>
					<h1 className='text-sm text-pr-red/70'>total amount:</h1>
					<h1 className='font-semibold text-pr-red'>{invoice.amount}</h1>
					<div className='flex gap-2 items-center'>
						<UpdateInvoice invoice={invoice} />
						<DeleteInvoice invoiceId={invoiceId} />
					</div>
				</div>
			</div>
		)
	} else return null
}

export default InvoiceTile
