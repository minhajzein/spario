import { makeStoreTransactionsSelectors } from '../../../store/apiSlices/querySlices/storeTransactionsApiSlice'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

function StoreTransactionTile({ transactionId, params }) {
	const { selectById } = makeStoreTransactionsSelectors(params)
	const transaction = useSelector(state => selectById(state, transactionId))

	if (transaction) {
		return (
			<div className='bg-white border-b border-gray-400 grid grid-cols-3'>
				<div className='p-2'>
					<h1 className='font-semibold'>
						{dayjs(transaction?.date).format('DD/MM/YYYY')}
					</h1>
					<p className='text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap'>
						{transaction?.description}
					</p>
				</div>
				<div className='flex p-2 items-center bg-pr-red/10 justify-end'>
					<h1 className='text-pr-red text-xl text-end font-semibold'>
						{transaction?.entry === 'debit' ? transaction?.amount : '-----'}
					</h1>
				</div>
				<div className='flex p-2 bg-pr-green/10 items-center justify-end'>
					<h1 className='text-pr-green text-xl text-end font-semibold'>
						{transaction?.entry === 'credit' ? transaction?.amount : '-----'}
					</h1>
				</div>
			</div>
		)
	} else return null
}

export default StoreTransactionTile
