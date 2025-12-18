import { useGetExecutiveByIdQuery } from '../../../store/apiSlices/executiveApiSlice'
import { useParams } from 'react-router-dom'
import { useGetAllStoresByExecutiveQuery } from '../../../store/apiSlices/querySlices/storeByExecutive'
import Loading from '../../loading/Loading'
import ExecutiveDashboard from './ExecutiveDashboard'
import { useState } from 'react'
import { useGetAllTransactionsByExecutiveQuery } from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import TransactionContent from '../../executive/transactions/TransactionContent'
import { useGetInvoicesByExecutiveQuery } from '../../../store/apiSlices/querySlices/invoicesByExecutive'
import InvoiceContent from '../../executive/invoices/InvoiceContent'
import StoreContent from '../../executive/stores/StoreContent'

function ExecutiveDetials() {
	const { id } = useParams()
	const { data: executive, isLoading: fetchingExecutive } =
		useGetExecutiveByIdQuery(id)

	const [storePage, setStorePage] = useState(1)
	const [storePageSize, setStorePageSize] = useState(10)
	const [transactionPage, setTransactionPage] = useState(1)
	const [transactionPageSize, setTransactionPageSize] = useState(10)
	const [invoicePage, setInvoicePage] = useState(1)
	const [invoicePageSize, setInvoicePageSize] = useState(10)

	const {
		data: stores,
		isSuccess,
		isLoading,
	} = useGetAllStoresByExecutiveQuery({
		executiveId: id,
		search: '',
		page: storePage,
		limit: storePageSize,
	})

	const {
		data: transactions,
		isSuccess: fetched,
		isLoading: fetchingTransactions,
	} = useGetAllTransactionsByExecutiveQuery({
		executiveId: id,
		store: '',
		date: '',
		fromDate: '',
		toDate: '',
		type: '',
		page: transactionPage,
		limit: transactionPageSize,
	})

	const {
		data: invoices,
		isSuccess: invoicesFetched,
		isLoading: fetchingInvoices,
	} = useGetInvoicesByExecutiveQuery({
		executiveId: id,
		search: '',
		page: invoicePage,
		limit: invoicePageSize,
	})

	const [listType, setListType] = useState('stores')

	const handleStoreListType = () => setListType('stores')
	const handleTransactionListType = () => setListType('transactions')
	const handleInvoiceListType = () => setListType('invoices')

	let storeContent
	let transactionContent
	let invoiceContent

	if (isSuccess) {
		const { ids, total } = stores
		storeContent = (
			<StoreContent
				ids={ids}
				executiveId={id}
				total={total}
				page={storePage}
				pageSize={storePageSize}
				setPage={setStorePage}
				setPageSize={setStorePageSize}
				queryParams={{
					executiveId: id,
					search: '',
					page: storePage,
					limit: storePageSize,
				}}
			/>
		)
	}

	if (fetched) {
		const { ids, total } = transactions
		transactionContent = (
			<TransactionContent
				ids={ids}
				params={{
					executiveId: id,
					store: '',
					date: '',
					fromDate: '',
					toDate: '',
					type: '',
					page: transactionPage,
					limit: transactionPageSize,
				}}
				setPage={setTransactionPage}
				setPageSize={setTransactionPageSize}
				total={total}
				isAdmin={false}
			/>
		)
	}

	if (invoicesFetched) {
		const { ids, total } = invoices
		invoiceContent = (
			<InvoiceContent
				ids={ids}
				executiveId={id}
				total={total}
				page={invoicePage}
				pageSize={invoicePageSize}
				setPage={setInvoicePage}
				setPageSize={setInvoicePageSize}
				queryParams={{
					executiveId: id,
					search: '',
					page: invoicePage,
					limit: invoicePageSize,
				}}
			/>
		)
	}

	return fetchingExecutive ||
		isLoading ||
		fetchingTransactions ||
		fetchingInvoices ? (
		<Loading />
	) : (
		<div className='flex flex-col gap-3'>
			<ExecutiveDashboard
				dashboard={{ ...executive, totalStores: stores?.total || 0 }}
			/>
			<div className='flex-col flex'>
				<div className='grid grid-cols-3 border-b w-full duration-200 bg-white'>
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
						className={`p-2 cursor-pointer truncate ${
							listType === 'transactions' && 'bg-black/70 text-white'
						}`}
					>
						Transactions
					</button>
					<button
						onClick={handleInvoiceListType}
						className={`p-2 cursor-pointer ${
							listType === 'invoices' && 'bg-black/70 text-white'
						}`}
					>
						Invoices
					</button>
				</div>
				{listType === 'stores'
					? storeContent
					: listType === 'transactions'
					? transactionContent
					: invoiceContent}
			</div>
		</div>
	)
}

export default ExecutiveDetials
