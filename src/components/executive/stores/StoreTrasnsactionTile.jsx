import { useParams } from 'react-router-dom'
import { makeStoreTransactionsSelectors } from '../../../store/apiSlices/querySlices/storeTransactionsApiSlice'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

function StoreTrasnsactionTile({ transactionId }) {
	const { id } = useParams()
	const { selectById } = makeStoreTransactionsSelectors(id)
	const transaction = useSelector(state => selectById(state, transactionId))
	if (transaction) {
		return (
			<div className='bg-white border-y border-gray-400 p-2 grid grid-cols-3'>
				<div>
					<h1 className='font-semibold'>
						{dayjs(transaction.date).format('DD/MM/YYYY')}
					</h1>
					<p className='text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap'>
						{transaction.description}
					</p>
				</div>
				<div className='flex items-center justify-end'>
					<h1 className='text-pr-red text-end font-bold'>
						{transaction.entry === 'debit' ? transaction.amount : '-----'}
					</h1>
				</div>
				<div className='flex items-center justify-end'>
					<h1 className='text-pr-green text-end font-bold'>
						{transaction.entry === 'credit' ? transaction.amount : '-----'}
					</h1>
				</div>
			</div>
		)
	} else return null
}

export default StoreTrasnsactionTile
