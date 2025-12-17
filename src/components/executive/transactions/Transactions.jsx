import { useDispatch, useSelector } from 'react-redux'
import executiveTransactionsSlice, {
	useGetAllTransactionsByExecutiveQuery,
} from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import Loading from '../../loading/Loading'
import TransactionContent from './TransactionContent'
import TransactionHeader from './TransactionHeader'
import { useState } from 'react'
import handlePrint from '../../../utils/exportTransactions'

function Transactions() {
	const user = useSelector(state => state.user.user)

	const [executiveId, setExecutiveId] = useState(
		user.role === 'executive' ? user._id : null
	)

	const [store, setStore] = useState(null)
	const [date, setDate] = useState(null)
	const [fromDate, setFromDate] = useState('')
	const [toDate, setToDate] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	const {
		data: transactions,
		isSuccess,
		isFetching,
		isLoading,
	} = useGetAllTransactionsByExecutiveQuery({
		executiveId,
		store,
		date,
		fromDate,
		toDate,
		search: searchTerm,
		page,
		limit: pageSize,
	})

	const dispatch = useDispatch()

	const handleExport = async () => {
		try {
			const result = await dispatch(
				executiveTransactionsSlice.endpoints.getAllTransactionsByExecutive.initiate(
					{
						executiveId,
						store,
						date,
						fromDate,
						toDate,
						page: 1,
						limit: 'export', // Or any sufficiently large number
					}
				)
			)

			if (result.data) {
				const transactionList = Object.values(result.data.entities)
				handlePrint(transactionList)
			}
		} catch (err) {
			console.error('Failed to export transactions:', err)
		}
	}

	let content

	if (isSuccess) {
		const { ids } = transactions
		content = (
			<TransactionContent
				params={{
					store,
					executiveId,
					date,
					fromDate,
					toDate,
					search: searchTerm,
					page,
					limit: pageSize,
				}}
				setPage={setPage}
				setPageSize={setPageSize}
				total={transactions?.total}
				ids={ids}
				isAdmin={user.role === 'admin'}
			/>
		)
	}

	return (
		<div className='flex flex-col w-full gap-3'>
			<TransactionHeader
				executiveId={executiveId}
				setStore={value => {
					setStore(value)
					setPage(1)
				}}
				store={store}
				date={date}
				setDate={value => {
					setDate(value)
					setPage(1)
				}}
				fromDate={fromDate}
				setFromDate={value => {
					setFromDate(value)
					setPage(1)
				}}
				toDate={toDate}
				setToDate={value => {
					setToDate(value)
					setPage(1)
				}}
				searchTerm={searchTerm}
				setSearchTerm={value => {
					setSearchTerm(value)
					setPage(1)
				}}
				total={transactions?.total}
				handleExport={handleExport}
			/>
			{isLoading || isFetching ? <Loading /> : content}
		</div>
	)
}

export default Transactions
