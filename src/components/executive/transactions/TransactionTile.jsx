import { useSelector } from 'react-redux'
import { makeExecutiveTransactionsSelectors } from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { RiEditLine } from 'react-icons/ri'
import { FaRegTrashAlt } from 'react-icons/fa'

function TransactionTile({ transactionId }) {
	const executiveId = useSelector(state => state.user.user._id)
	const { selectById } = makeExecutiveTransactionsSelectors(executiveId)
	const transaction = useSelector(state => selectById(state, transactionId))

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
				<div className='p-3 flex text-xl text-primary font-semibold justify-end items-center text-center'>
					{transaction.amount}
				</div>
				<div className='flex gap-3 justify-center items-center'>
					<RiEditLine className='text-xl text-pr-green' />
					<FaRegTrashAlt className='text-xl text-pr-red' />
				</div>
			</div>
		)
	} else return null
}

export default TransactionTile
