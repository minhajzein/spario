import { useGetExecutiveByIdQuery } from '../../../store/apiSlices/executiveApiSlice'
import { useParams } from 'react-router-dom'
import { useGetAllStoresByExecutiveQuery } from '../../../store/apiSlices/querySlices/storeByExecutive'
import { Input } from 'antd'
import StoreRow from '../stores/StoreRow'
import Loading from '../../loading/Loading'
import ExecutiveDashboard from './ExecutiveDashboard'

function ExecutiveDetials() {
	const { id } = useParams()
	const { data: executive, isLoading: fetchingExecutive } =
		useGetExecutiveByIdQuery(id)
	const {
		data: stores,
		isSuccess,
		isLoading,
	} = useGetAllStoresByExecutiveQuery(id)

	let content

	if (isSuccess) {
		const { ids } = stores
		const tableContent = ids?.length
			? ids.map(storeId => <StoreRow key={storeId} storeId={storeId} />)
			: null
		content = (
			<div className='flex flex-col w-full gap-3'>
				<div className='w-full flex gap-3'>
					<Input
						type='search'
						allowClear
						size='large'
						placeholder='Search for stores'
					/>
				</div>
				<div className='max-w-full overflow-auto'>
					<table className='w-full   bg-white rounded'>
						<thead className='border-b-2 border-black'>
							<tr>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Name
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Owner
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Contact
								</th>

								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Debit
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Credit
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Balance
								</th>
								<th className='p-2 text-gray-500'>Actions</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
			</div>
		)
	}

	return fetchingExecutive || isLoading ? (
		<Loading />
	) : (
		<div className='flex flex-col gap-3'>
			<ExecutiveDashboard
				dashboard={{ ...executive, totalStores: stores && stores.ids.length }}
			/>
			{content}
		</div>
	)
}

export default ExecutiveDetials
