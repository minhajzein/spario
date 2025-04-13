import { useParams } from 'react-router-dom'
import { useGetStoreTransactionsQuery } from '../../../store/apiSlices/querySlices/storeTransactionsApiSlice'
import StoreTransactionsRow from './StoreTransactionsRow'
import { makeExecutiveStoreSelectors } from '../../../store/apiSlices/querySlices/storeByExecutive'
import Loading from '../../loading/Loading'
import { useSelector } from 'react-redux'

function StoreDetails() {
	const executiveId = useSelector(state => state.user.user._id)
	const { selectById } = makeExecutiveStoreSelectors(executiveId)
	const { id } = useParams()
	const store = useSelector(state => selectById(state, id))
	const { data, isLoading, isSuccess } = useGetStoreTransactionsQuery(id)

	let content

	if (data && isSuccess) {
		const { ids } = data
		const tableContent = ids?.length
			? ids.map(transactionId => (
					<StoreTransactionsRow
						key={transactionId}
						transactionId={transactionId}
					/>
			  ))
			: null
		content = (
			<div className='w-full flex flex-col gap-3'>
				<div className='flex items-center p-3 bg-white rounded-lg'>
					<h1 className='capitalize border-r p-2'>
						Store Name: {store?.storeName}
					</h1>
					<h1 className='capitalize border-r p-2'>
						Owner Name: {store?.ownerName}
					</h1>
					<h1 className='capitalize p-2'>
						Contact Number: {store?.contactNumber}
					</h1>
				</div>
				<div className='max-w-full overflow-auto'>
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
						<tbody>
							{tableContent}
							<tr>
								<td className='border-l'></td>
								<td className='border-y text-end font-bold p-3'>Total:</td>
								<td className='p-3 border text-primary text-end font-bold'>
									{store?.totalOutstanding}
								</td>
								<td className='p-3 border text-pr-green text-end font-bold'>
									{store?.paidAmount}
								</td>
							</tr>
							<tr className='border'>
								<td></td>
								<td></td>
								<td className='border-y text-end font-bold p-3'>
									Total Balance:
								</td>
								<td className='p-3 border text-pr-red text-end font-bold'>
									{store?.balance}/-
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	} else {
		content = null
	}
	return isLoading ? <Loading /> : content
}

export default StoreDetails
