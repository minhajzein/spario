import { Input } from 'antd'
import AddInvoice from '../../admin/invoices/AddInvoice'
import { useGetInvoicesByExecutiveQuery } from '../../../store/apiSlices/querySlices/invoicesByExecutive'
import { useSelector } from 'react-redux'
import Loading from '../../loading/Loading'
import InvoiceRow from './InvoiceRow'

function Invoices() {
	const executiveId = useSelector(state => state.user.user._id)
	const { data: invoices, isLoading } =
		useGetInvoicesByExecutiveQuery(executiveId)
	console.log(invoices)

	let content

	if (invoices) {
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
					<AddInvoice />
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
