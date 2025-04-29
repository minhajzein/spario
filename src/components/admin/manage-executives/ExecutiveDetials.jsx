import { useGetExecutiveByIdQuery } from '../../../store/apiSlices/executiveApiSlice'
import { useParams } from 'react-router-dom'
import { useGetAllStoresByExecutiveQuery } from '../../../store/apiSlices/querySlices/storeByExecutive'
import Loading from '../../loading/Loading'
import ExecutiveDashboard from './ExecutiveDashboard'
import StoreContent from '../stores/StoreContent'
import { useState } from 'react'
import { useGetAllTransactionsByExecutiveQuery } from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import TransactionContent from '../../executive/transactions/TransactionContent'

function ExecutiveDetials() {
	const { id } = useParams()
	const { data: executive, isLoading: fetchingExecutive } =
		useGetExecutiveByIdQuery(id)

	const {
		data: stores,
		isSuccess,
		isLoading,
	} = useGetAllStoresByExecutiveQuery(id)

	const {
		data: transactions,
		isSuccess: fetched,
		isLoading: fetchingTransactions,
	} = useGetAllTransactionsByExecutiveQuery(id)

	const [listType, setListType] = useState('stores')

	const handleStoreListType = () => setListType('stores')
	const handleTransactionListType = () => setListType('transactions')

	let storeContent
	let transactionContent

	if (isSuccess) {
		const { ids } = stores
		storeContent = <StoreContent ids={ids} />
	}
	if (fetched) {
		const { ids } = transactions
		transactionContent = <TransactionContent ids={ids} executiveId={id} />
	}
	return fetchingExecutive || isLoading || fetchingTransactions ? (
		<Loading />
	) : (
		<div className='flex flex-col gap-3'>
			<ExecutiveDashboard
				dashboard={{ ...executive, totalStores: stores && stores.ids.length }}
			/>
			<div className='flex-col flex'>
				<div className='grid grid-cols-2 border-b w-full duration-200 bg-white'>
					<button
						onClick={handleStoreListType}
						className={`p-2 cursor-pointer ${
							listType === 'stores' && 'bg-black/70 text-white'
						}`}
					>
						Stores
					</button>
					<button
						onClick={handleTransactionListType}
						className={`p-2 cursor-pointer ${
							listType === 'transactions' && 'bg-black/70 text-white'
						}`}
					>
						Transactions
					</button>
				</div>
				{listType === 'stores' ? storeContent : transactionContent}
			</div>
		</div>
	)
}

export default ExecutiveDetials
