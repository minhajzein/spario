import { useSelector } from 'react-redux'
import { makeExecutiveTransactionsSelectors } from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import DeleteTransaction from './DeleteTransaction'
import EditTransaction from './EditTransaction'

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
				<td className='p-3 border-r border-black uppercase text-center'>
					{transaction.type}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{transaction.amount}
				</td>
				<td className='p-3 flex gap-3 items-center justify-center text-center'>
					{transaction.type.startsWith('return') ? (
						<h1 className='text-xs text-gray-500'>Manage from returns</h1>
					) : (
						<>
							<EditTransaction transaction={transaction} />
							<DeleteTransaction id={transactionId} />
						</>
					)}
				</td>
			</tr>
		)
	} else return null
}

export default TransactionRow
