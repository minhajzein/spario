import { Input, Pagination } from 'antd'
import { useState } from 'react'
import { useGetAllInvoicesQuery } from '../../../store/apiSlices/invoiceApiSlice'
import Loading from '../../loading/Loading'
import InvoiceRow from './InvoiceRow'
import AddInvoice from './AddInvoice'
import InvoiceTile from './InvoiceTile'

function Invoices() {
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	const { data: invoices, isSuccess, isLoading } = useGetAllInvoicesQuery({
		search: searchTerm,
		page,
		limit: pageSize,
	})

	let content
	if (isSuccess && invoices) {
		const { ids, total } = invoices
		const tableContent = ids?.length
			? ids.map(invoiceId => (
					<InvoiceRow 
						key={invoiceId} 
						invoiceId={invoiceId}
						queryParams={{ search: searchTerm, page, limit: pageSize }}
					/>
			  ))
			: null

		const tileContent = ids?.length
			? ids.map(invoiceId => (
					<InvoiceTile 
						key={invoiceId} 
						invoiceId={invoiceId}
						queryParams={{ search: searchTerm, page, limit: pageSize }}
					/>
			  ))
			: null

		content = (
			<div className='w-full flex flex-col gap-3'>
				<div className='flex gap-3 items-center'>
					<Input
						type='search'
						value={searchTerm}
						onChange={e => {
							setSearchTerm(e.target.value)
							setPage(1)
						}}
						allowClear
						placeholder='Search for invoices'
						size='large'
					/>
					<div className='md:hidden'>
						<AddInvoice />
					</div>
				</div>
				<div className='w-full hidden md:block overflow-auto'>
					<table className='w-full bg-white rounded'>
						<thead className='border-b-2 border-black'>
							<tr>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Store Name
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Executive
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
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Invoices
