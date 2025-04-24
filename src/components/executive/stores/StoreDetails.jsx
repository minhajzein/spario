import { useParams } from 'react-router-dom'
import { useGetStoreTransactionsQuery } from '../../../store/apiSlices/querySlices/storeTransactionsApiSlice'
import StoreTransactionsRow from './StoreTransactionsRow'
import { makeExecutiveStoreSelectors } from '../../../store/apiSlices/querySlices/storeByExecutive'
import Loading from '../../loading/Loading'
import { useSelector } from 'react-redux'
import StoreTrasnsactionTile from './StoreTrasnsactionTile'
import StoreDashboard from './StoreDashboard'
import storeLedger from '../../../utils/storeLedger'
import dayjs from 'dayjs'

function StoreDetails() {
	const executiveId = useSelector(state => state.user.user._id)
	const { selectById } = makeExecutiveStoreSelectors(executiveId)
	const { id } = useParams()
	const store = useSelector(state => selectById(state, id))
	const { data, isLoading, isSuccess } = useGetStoreTransactionsQuery(id)

	const generatePdf = () => {
		try {
			const tableData = Object.values(data?.entities).map(transaction => {
				const column = {
					date: dayjs(transaction.date).format('DD/MM/YYYY'),
					description: transaction.description,
					debit: transaction.entry === 'debit' ? transaction.amount : '-------',
					credit:
						transaction.entry === 'credit' ? transaction.amount : '-------',
				}
				return column
			})

			const columns = [
				{ Title: 'Date', dataIndex: 'date', key: 'date' },
				{ Title: 'Description', dataIndex: 'description', key: 'description' },
				{ Title: 'Debit', dataIndex: 'debit', key: 'debit' },
				{ Title: 'Credit', dataIndex: 'credit', key: 'credit' },
			]
			storeLedger(
				tableData,
				columns,
				store.storeName,
				store.totalOutstanding,
				store.paidAmount,
				store.balance
			)
		} catch (error) {
			console.error(error)
		}
	}

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

		const tileContent = ids?.length
			? ids.map(transactionId => (
					<StoreTrasnsactionTile
						key={transactionId}
						transactionId={transactionId}
					/>
			  ))
			: null

		content = (
			<div className='w-full flex flex-col gap-3'>
				<StoreDashboard store={store} />
				<button
					onClick={generatePdf}
					className='bg-pr-red rounded-full p-4 text-white'
				>
					Print
				</button>
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
			</div>
		)
	} else {
		content = null
	}
	return isLoading ? <Loading /> : content
}

export default StoreDetails
