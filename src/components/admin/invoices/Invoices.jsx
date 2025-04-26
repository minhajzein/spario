import { Input } from 'antd'
import { useGetAllInvoicesQuery } from '../../../store/apiSlices/invoiceApiSlice'
import Loading from '../../loading/Loading'
import InvoiceRow from './InvoiceRow'
import AddInvoice from './AddInvoice'

function Invoices() {
	const { data: invoices, isSuccess, isLoading } = useGetAllInvoicesQuery()

	let content
	if (isSuccess) {
		const { ids } = invoices
		const tableContent = ids?.length
			? ids.map(invoiceId => (
					<InvoiceRow key={invoiceId} invoiceId={invoiceId} />
			  ))
			: null
		content = (
			<div className='w-full flex flex-col gap-3'>
				<div className='flex gap-3 items-center'>
					<Input
						type='search'
						allowClear
						placeholder='Search for invoices'
						size='large'
					/>
					<div className='md:hidden'>
						<AddInvoice />
					</div>
				</div>
				<div className='w-full overflow-auto'>
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
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Invoices
