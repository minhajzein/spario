import { useSelector } from 'react-redux'
import { makeExecutiveTransactionsSelectors } from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

function TransactionRow({ transactionId }) {
	const executiveId = useSelector(state => state.user.user._id)
	const { selectById } = makeExecutiveTransactionsSelectors(executiveId)
	const transaction = useSelector(state => selectById(state, transactionId))
	if (transaction) {
		return (
			<tr className='bg-white border-b border-black'>
				<td className='p-3 border-r capitalize border-black text-center'>
					<Link
						to={`/stores/${transaction.store._id}`}
						className='text-blue-500  capitalize duration-300 hover:underline hover:text-blue-700'
					>
						{transaction.store.storeName}
					</Link>
				</td>
				<td className='p-3 border-r border-black text-center'>
					{dayjs(transaction.date).format('DD-MM-YYYY')}
				</td>
				<td
					className={`${
						transaction.entry === 'debit' ? 'text-pr-red' : 'text-pr-green'
					} p-3 border-r border-black capitalize text-center`}
				>
					{transaction.entry}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{transaction.description}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{transaction.amount}
				</td>
				<td className='p-3 text-center'></td>
			</tr>
		)
	} else return null
}

export default TransactionRow
