import { Pagination } from 'antd'
import InvoiceRow from './InvoiceRow'
import InvoiceTile from './InvoiceTile'

function InvoiceContent({ ids, executiveId, total, page, pageSize, setPage, setPageSize, queryParams }) {
	const tableContent = ids?.length
		? ids.map(invoiceId => (
				<InvoiceRow
					key={invoiceId}
					executiveId={executiveId}
					invoiceId={invoiceId}
					queryParams={queryParams}
				/>
		  ))
		: null
	const tileContent = ids?.length
		? ids.map(invoiceId => (
				<InvoiceTile
					key={invoiceId}
					executiveId={executiveId}
					invoiceId={invoiceId}
					queryParams={queryParams}
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
			<div className='flex w-full flex-col items-center bg-white py-2 rounded-lg'>
				<Pagination
					total={total}
					showTotal={total => (
						<h1 className='truncate'>Total {total} Invoices</h1>
					)}
					showSizeChanger
					pageSize={pageSize}
					current={page}
					onShowSizeChange={(current, size) => {
						setPage(current)
						setPageSize(size)
					}}
					onChange={(page, size) => {
						setPage(page)
						setPageSize(size)
					}}
				/>
			</div>
		</>
	)
}

export default InvoiceContent
