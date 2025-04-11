import { useSelector } from 'react-redux'
import { makeExecutiveTransactionsSelectors } from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import dayjs from 'dayjs'

function TransactionRow({ transactionId }) {
	const executiveId = useSelector(state => state.user.user._id)
	const { selectById } = makeExecutiveTransactionsSelectors(executiveId)
	const transaction = useSelector(state => selectById(state, transactionId))
	if (transaction) {
		return (
			<tr className='bg-slate-200 border-b border-black'>
				<td className='p-3 border-r border-black text-center'>
					{transaction.store.storeName}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{dayjs(transaction.date).format('DD-MM-YYYY')}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{transaction.entry}
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
