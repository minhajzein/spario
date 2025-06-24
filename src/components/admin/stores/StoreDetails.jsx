import StoreTransactionRow from './StoreTransactionRow'
import Loading from '../../loading/Loading'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectStoreById } from '../../../store/apiSlices/storesApiSlice'
import { useGetStoreTransactionsQuery } from '../../../store/apiSlices/querySlices/storeTransactionsApiSlice'
import StoreDashboard from './StoreDashboard'
import StoreTransactionTile from './StoreTransactionTile'

function StoreDetails() {
	const { id } = useParams()
	const store = useSelector(state => selectStoreById(state, id))
	const { data, isLoading, isSuccess } = useGetStoreTransactionsQuery(id)

	let content

	if (data && isSuccess) {
		const { ids } = data
		const tableContent = ids?.length
			? ids.map(transactionId => (
					<StoreTransactionRow
						key={transactionId}
						transactionId={transactionId}
					/>
			  ))
			: null
		const tileContent = ids?.length
			? ids.map(transactionId => (
					<StoreTransactionTile
						key={transactionId}
						transactionId={transactionId}
					/>
			  ))
			: null
		content = (
			<div className='w-full flex flex-col gap-3'>
				<StoreDashboard store={store} />
				<div className='max-w-full hidden md:block overflow-auto'>
					<table className='w-full text-[18px]  bg-white rounded'>
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
				<div className='md:hidden flex flex-col bg-white rounded w-full'>
					{tileContent}
				</div>
			</div>
		)
	} else {
		content = null
	}
	return isLoading ? <Loading /> : content
}

export default StoreDetails
