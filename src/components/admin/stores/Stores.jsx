import { useState } from 'react'
import { useGetAllStoresQuery } from '../../../store/apiSlices/storesApiSlice'
import Loading from '../../loading/Loading'
import StoreRow from './StoreRow'
import StoreForm from './StoreForm'
import { Input } from 'antd'

function Stores() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data: stores, isLoading, isSuccess } = useGetAllStoresQuery()

	const handleModal = () => setIsModalOpen(true)

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
					<button
						onClick={handleModal}
						className='flex min-w-max items-center text-xs md:text-sm cursor-pointer gap-1 p-3 text-white bg-pr-red rounded-full shadow-lg shadow-black/50'
					>
						<img src='/images/active-store.png' alt='' />
						<h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
							Add Store
						</h1>
					</button>
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

				<StoreForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Stores
