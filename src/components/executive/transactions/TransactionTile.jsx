import { useSelector } from 'react-redux'
import { makeExecutiveTransactionsSelectors } from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import DeleteTransaction from './DeleteTransaction'
import EditTransaction from './EditTransaction'

function TransactionTile({ transactionId, params }) {
	const { selectById } = makeExecutiveTransactionsSelectors(params)

	const transaction = useSelector(state => selectById(state, transactionId))

	if (transaction) {
		return (
			<div className={`grid grid-cols-3 border-b items-center w-full`}>
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
				<div className='p-3 flex flex-col items-end text-center'>
					<h1 className='text-xl text-primary font-semibold '>
						{transaction.amount}
					</h1>
					<h1 className='capitalize text-[10px] text-nowrap'>
						{transaction.type}
					</h1>
				</div>
				<div className='flex gap-3 p-3 justify-end items-center'>
					{transaction.type.startsWith('return') ? (
						<h1 className='text-[10px] px-4 capitalize text-gray-500 text-center'>
							Manage from returns
						</h1>
					) : (
						<>
							<EditTransaction transaction={transaction} />
							<DeleteTransaction id={transactionId} />
						</>
					)}
				</div>
			</div>
		)
	} else return null
}

export default TransactionTile
