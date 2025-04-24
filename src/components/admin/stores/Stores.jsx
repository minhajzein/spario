import { useGetAllStoresQuery } from '../../../store/apiSlices/storesApiSlice'
import Loading from '../../loading/Loading'
import StoreRow from './StoreRow'
import { Input } from 'antd'
import StoreTile from './StoreTile'
import AddStore from './AddStore'

function Stores() {
	const { data: stores, isLoading, isSuccess } = useGetAllStoresQuery()

	let content

	if (isSuccess) {
		const { ids } = stores
		const tableContent = ids?.length
			? ids.map(storeId => <StoreRow key={storeId} storeId={storeId} />)
			: null

		const tileContent = ids?.length
			? ids.map(storeId => <StoreTile key={storeId} storeId={storeId} />)
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
					<AddStore />
				</div>
				<div className='max-w-full hidden md:block overflow-auto'>
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
									Executive
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
				<div className='flex flex-col md:hidden'>{tileContent}</div>
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Stores
