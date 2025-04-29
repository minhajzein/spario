import InvoiceRow from './InvoiceRow'
import InvoiceTile from './InvoiceTile'

function InvoiceContent({ ids, executiveId }) {
	const tableContent = ids?.length
		? ids.map(invoiceId => (
				<InvoiceRow
					key={invoiceId}
					executiveId={executiveId}
					invoiceId={invoiceId}
				/>
		  ))
		: null
	const tileContent = ids?.length
		? ids.map(invoiceId => (
				<InvoiceTile
					key={invoiceId}
					executiveId={executiveId}
					invoiceId={invoiceId}
				/>
		  ))
		: null

	return (
		<>
			<div className='w-full hidden md:block overflow-auto'>
				<table className='w-full bg-white rounded'>
					<thead className='border-b-2 border-black'>
						<tr>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Store Name
							</th>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Reference ID
							</th>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Bill Date
							</th>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Due Date
							</th>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Bill Amount
							</th>
							<th className='p-2 text-gray-500'>Actions</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
			</div>
			<div className='flex flex-col  md:hidden'>{tileContent}</div>
		</>
	)
}

export default InvoiceContent
