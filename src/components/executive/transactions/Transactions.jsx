import { useSelector } from 'react-redux'
import { useGetAllTransactionsByExecutiveQuery } from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import Loading from '../../loading/Loading'
import TransactionContent from './TransactionContent'
import TransactionHeader from './TransactionHeader'
import { useState } from 'react'

function Transactions() {
	const executiveId = useSelector(state => state.user.user._id)
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
			/>
			{isLoading || isFetching ? <Loading /> : content}
		</div>
	)
}

export default Transactions
