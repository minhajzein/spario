import { Input } from 'antd'
import { useGetAllTransactionsQuery } from '../../../store/apiSlices/transactionsApiSlice'
import Loading from '../../loading/Loading'
import TransactionRow from './TransactionRow'
import TransactionTile from './TransactionTile'

function Transactions() {
	const {
		data: transactions,
		isLoading,
		isSuccess,
	} = useGetAllTransactionsQuery()

	let content

	if (isSuccess) {
		const { ids } = transactions
		const tableContent = ids?.length
			? ids.map(transactionId => (
					<TransactionRow key={transactionId} transactionId={transactionId} />
			  ))
			: null
		const tileContent = ids?.length
			? ids.map(transactionId => (
					<TransactionTile key={transactionId} transactionId={transactionId} />
			  ))
			: null
		content = (
			<div className='flex flex-col w-full gap-3'>
				<div className='w-full flex gap-3'>
					<Input
						type='search'
						allowClear
						size='large'
						placeholder='Search for transactions'
					/>
				</div>
				<div className='max-w-full hidden md:block overflow-auto'>
					<table className='w-full   bg-white rounded'>
						<thead className='border-b-2 border-black'>
							<tr>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Store Name
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Executive
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Date
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Type
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Amount
								</th>

								<th className='p-2 text-gray-500'>Actions</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
				<div className='flex flex-col md:hidden bg-white rounded'>
					{tileContent}
				</div>
			</div>
		)
	}
	return isLoading ? <Loading /> : content
}

export default Transactions
