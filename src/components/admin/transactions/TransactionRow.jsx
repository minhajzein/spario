import { useSelector } from 'react-redux'
import { selectTransactionById } from '../../../store/apiSlices/transactionsApiSlice'
import dayjs from 'dayjs'

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
					{dayjs(transaction.date).format('DD-MM-YYYY')}
				</td>
				<td
					className={`${
						transaction.entry === 'debit' ? 'text-pr-red' : 'text-pr-green'
					} p-3 border-r border-black text-center`}
				>
					{transaction.entry}
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
				<td className='p-3 text-center'></td>
			</tr>
		)
	} else return null
}

export default TransactionRow
