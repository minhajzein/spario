import { TbEyeSearch } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectStoreById } from '../../../store/apiSlices/storesApiSlice'
import EditStore from './EditStore'
import DeleteStore from '../../executive/stores/DeleteStore'

function StoreTile({ storeId }) {
	const store = useSelector(state => selectStoreById(state, storeId))

	if (store) {
		return (
			<div className='w-full bg-white grid p-2 border-y border-gray-400 grid-cols-4'>
				<div className='flex flex-col col-span-2 capitalize'>
					<h1 className='font-semibold text-xl truncate'>{store.storeName}</h1>
					<Link
						to={`/admin/stores/${storeId}`}
						className='text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden'
					>
						{store.ownerName}
					</Link>
					<h1 className='text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden'>
						{store.contactNumber}
					</h1>
				</div>
				<div className='flex flex-col items-end justify-between'>
					<h1 className=' text-ellipsis text-primary font-semibold whitespace-nowrap overflow-hidden'>
						{store.totalOutstanding}/-
					</h1>
					<h1 className='text-pr-green font-semibold text-ellipsis whitespace-nowrap overflow-hidden'>
						{store.paidAmount}/-
					</h1>
					<h1 className='text-pr-red font-semibold text-ellipsis whitespace-nowrap overflow-hidden'>
						{store.balance}/-
					</h1>
				</div>
				<div className='flex flex-col justify-between items-end'>
					<h1 className='text-gray-500 truncate'>{store.executive.username}</h1>
					<Link
						className='text-xl text-blue-500'
						to={`/admin/stores/${storeId}`}
					>
						<TbEyeSearch />
					</Link>
					<div className='flex items-center gap-3'>
						<EditStore store={store} />
						<DeleteStore storeId={storeId} />
					</div>
				</div>
			</div>
		)
	} else return null
}

export default StoreTile
