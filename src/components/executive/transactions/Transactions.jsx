import { useSelector } from 'react-redux'
import { useGetAllTransactionsByExecutiveQuery } from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import Loading from '../../loading/Loading'
import TransactionContent from './TransactionContent'
import TransactionHeader from './TransactionHeader'
import { useEffect, useState } from 'react'
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
		page,
		limit: pageSize,
	})

	const handleExport = () => {
		setPageSize(null)
		setPage(null)
		if (!isLoading && !isFetching) {
		}
		const transactionList = Object.values(transactions.entities)
		handlePrint(transactionList)
		setPageSize(10) // Reset page size after export
		setPage(1) // Reset page after export
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
					page,
					limit: pageSize,
				}}
				setPage={setPage}
				setPageSize={setPageSize}
				total={transactions?.total}
				ids={ids}
			/>
		)
	}

	return (
		<div className='flex flex-col w-full gap-3'>
			<TransactionHeader
				executiveId={executiveId}
				setStore={setStore}
				store={store}
				date={date}
				setDate={setDate}
				fromDate={fromDate}
				setFromDate={setFromDate}
				toDate={toDate}
				setToDate={setToDate}
				total={transactions?.total}
				handleExport={handleExport}
			/>
			{isLoading || isFetching ? <Loading /> : content}
		</div>
	)
}

export default Transactions
