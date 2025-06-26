import { makeStoreTransactionsSelectors } from '../../../store/apiSlices/querySlices/storeTransactionsApiSlice'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

function StoreTransactionsRow({ transactionId, params }) {
	const { selectById } = makeStoreTransactionsSelectors(params)
	const transaction = useSelector(state => selectById(state, transactionId))

	return (
		<tr className='bg-white border-b border-black'>
			<td className='p-3 border-r capitalize border-black text-center'>
				{dayjs(transaction?.date).format('DD/MM/YYYY')}
			</td>
			<td className='p-3 border-r capitalize border-black text-center'>
				{transaction?.type}
			</td>
			<td className='p-3 text-pr-red border-r border-black text-end'>
				{transaction?.entry === 'debit' ? transaction?.amount : '-----'}
			</td>
			<td className='p-3 text-pr-green border-r border-black text-end'>
				{transaction?.entry === 'credit' ? transaction?.amount : '-----'}
			</td>
		</tr>
	)
}

export default StoreTransactionsRow
