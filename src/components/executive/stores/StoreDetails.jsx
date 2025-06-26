import { data, useParams } from 'react-router-dom'
import { useGetStoreTransactionsQuery } from '../../../store/apiSlices/querySlices/storeTransactionsApiSlice'
import StoreTransactionsRow from './StoreTransactionsRow'
import { makeExecutiveStoreSelectors } from '../../../store/apiSlices/querySlices/storeByExecutive'
import Loading from '../../loading/Loading'
import { useSelector } from 'react-redux'
import StoreTrasnsactionTile from './StoreTrasnsactionTile'
import StoreDashboard from './StoreDashboard'
import { useState } from 'react'
import { Pagination } from 'antd'
import handlePrint from '../../../utils/storeLedger'
import StoreDetailsHeader from './StoreDetailsHeader'

function StoreDetails() {
	const executiveId = useSelector(state => state.user.user._id)
	const { selectById } = makeExecutiveStoreSelectors(executiveId)
	const { id } = useParams()
	const store = useSelector(state => selectById(state, id))

	const [date, setDate] = useState(null)
	const [fromDate, setFromDate] = useState('')
	const [toDate, setToDate] = useState('')
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)

	const { data, isLoading, isSuccess } = useGetStoreTransactionsQuery({
		id,
		date,
		fromDate,
		toDate,
		page,
		limit,
	})

	const handleExport = () => {
		setLimit(null)
		const transactions = Object.values(data.entities)
		handlePrint(transactions, store.storeName)
		setLimit(10)
	}

	let content

	if (data && isSuccess) {
		const { ids, total } = data

		const tableContent = ids?.length
			? ids.map(transactionId => (
					<StoreTransactionsRow
						key={transactionId}
						params={{
							id,
							date,
							fromDate,
							toDate,
							page,
							limit,
						}}
						transactionId={transactionId}
					/>
			  ))
			: null

		const tileContent = ids?.length
			? ids.map(transactionId => (
					<StoreTrasnsactionTile
						key={transactionId}
						params={{
							id,
							date,
							fromDate,
							toDate,
							page,
							limit,
						}}
						transactionId={transactionId}
					/>
			  ))
			: null

		content = (
			<div className='flex flex-col w-full gap-3'>
				<StoreDashboard store={store} handleExport={handleExport} />
				<div className='w-full flex flex-col'>
					<StoreDetailsHeader
						setDate={setDate}
						fromDate={fromDate}
						setFromDate={setFromDate}
						toDate={toDate}
						setToDate={setToDate}
						total={total}
					/>
					<div className='max-w-full hidden md:block overflow-auto'>
						<table className='w-full   bg-white rounded'>
							<thead className='border-b-2 border-black'>
								<tr>
									<th className='p-2 border-r border-gray-300 text-gray-500'>
										Date
									</th>
									<th className='p-2 border-r border-gray-300 text-gray-500'>
										Description
									</th>
									<th className='p-2 border-r text-pr-red border-gray-300'>
										Debit
									</th>
									<th className='p-2 text-pr-green'>Credit</th>
								</tr>
							</thead>
							<tbody>{tableContent}</tbody>
						</table>
					</div>
					<div className='flex flex-col md:hidden'>{tileContent}</div>
					<div className='flex w-full flex-col items-center bg-white py-2  rounded-b-lg '>
						<Pagination
							total={total}
							showTotal={total => (
								<h1 className='truncate'>Total {total} Transactions</h1>
							)}
							showSizeChanger
							pageSize={limit}
							onShowSizeChange={(current, size) => {
								setPage(current)
								setLimit(size)
							}}
							defaultCurrent={limit}
							onChange={(page, pageSize) => {
								setPage(page)
								setLimit(pageSize)
							}}
						/>
					</div>
				</div>
			</div>
		)
	} else {
		content = null
	}
	return isLoading ? <Loading /> : content
}

export default StoreDetails
