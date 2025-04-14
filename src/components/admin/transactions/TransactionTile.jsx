import { useSelector } from 'react-redux'
import { selectTransactionById } from '../../../store/apiSlices/transactionsApiSlice'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

function TransactionTile({ transactionId }) {
	const transaction = useSelector(state =>
		selectTransactionById(state, transactionId)
	)
	if (transaction) {
		return (
			<div
				className={`${
					transaction.entry === 'debit'
						? 'text-pr-red bg-pr-red/5'
						: 'text-pr-green bg-pr-green/5'
				} grid grid-cols-3 border-b`}
			>
				<div className='p-2 capitalize flex flex-col'>
					<Link
						to={`/admin/stores/${transaction.store._id}`}
						className='text-blue-500 text-lg capitalize duration-300 hover:underline hover:text-blue-700'
					>
						{transaction.store.storeName}
					</Link>
					<h1 className='text-xs text-gray-500'>
						{dayjs(transaction.date).format('DD/MM/YYYY')}
					</h1>
				</div>
				<div className={`p-2 capitalize text-start`}>
					<h1 className='text-lg'>{transaction.entry}</h1>
					<h1 className='text-xs text-ellipsis whitespace-nowrap overflow-hidden'>
						{transaction.description}
					</h1>
				</div>
				<div className='p-3 flex flex-col justify-end items-end'>
					<h1 className='text-gray-500'>{transaction.executive.username}</h1>
					<h1 className='text-xl font-semibold'>{transaction.amount}</h1>
				</div>
			</div>
		)
	} else return null
}

export default TransactionTile
