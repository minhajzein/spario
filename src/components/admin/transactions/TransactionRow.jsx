import { useSelector } from 'react-redux'
import { selectTransactionById } from '../../../store/apiSlices/transactionsApiSlice'
import dayjs from 'dayjs'
import DeleteTransaction from '../../executive/transactions/DeleteTransaction'
import EditTransaction from '../../executive/transactions/EditTransaction'

function TransactionRow({ transactionId }) {
	const transaction = useSelector(state =>
		selectTransactionById(state, transactionId)
	)

	if (transaction) {
		return (
			<tr className='bg-slate-200 border-b border-black'>
				<td className='p-3 border-r border-black text-center'>
					{transaction.store.storeName}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{transaction.executive.username}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{dayjs(transaction.date).format('DD/MM/YYYY')}
				</td>

				<td className='p-3 border-r capitalize border-black text-center'>
					{transaction.type}
				</td>
				<td
					className={`p-3 border-r border-black text-center ${
						transaction.entry === 'debit' ? 'text-pr-red' : 'text-pr-green'
					}`}
				>
					{transaction.amount}
				</td>
				<td className='p-3 flex gap-3 items-center justify-center text-center'>
					<EditTransaction transaction={transaction} />
					<DeleteTransaction id={transactionId} />
				</td>
			</tr>
		)
	} else return null
}

export default TransactionRow
