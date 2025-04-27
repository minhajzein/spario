import { useSelector } from 'react-redux'
import { selectTransactionById } from '../../../store/apiSlices/transactionsApiSlice'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { RiEditLine } from 'react-icons/ri'
import { FaRegTrashAlt } from 'react-icons/fa'
import DeleteTransaction from '../../executive/transactions/DeleteTransaction'
import EditTransaction from '../../executive/transactions/EditTransaction'

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
				} grid grid-cols-3 border-b items-center`}
			>
				<div className='p-2 capitalize flex flex-col'>
					<Link
						to={`/stores/${transaction.store._id}`}
						className='text-blue-500 text-lg capitalize text-ellipsis whitespace-nowrap overflow-hidden duration-300 hover:underline hover:text-blue-700'
					>
						{transaction.store.storeName}
					</Link>
					<h1 className='text-gray-500 text-sm'>
						{dayjs(transaction.date).format('DD/MM/YYYY')}
					</h1>
				</div>
				<div className='p-2 flex flex-col text-primary items-center'>
					<h1 className='text-xl font-semibold'>{transaction.amount}</h1>
					<h1 className='text-gray-500'>{transaction.executive.username}</h1>
				</div>
				<div className='flex gap-3 justify-center items-center'>
					<EditTransaction transaction={transaction} />
					<DeleteTransaction id={transactionId} />
				</div>
			</div>
		)
	} else return null
}

export default TransactionTile
