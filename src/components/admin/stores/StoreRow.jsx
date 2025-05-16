import { useSelector } from 'react-redux'
import { selectStoreById } from '../../../store/apiSlices/storesApiSlice'
import { Link, useLocation } from 'react-router-dom'
import { TbEyeSearch } from 'react-icons/tb'
import EditStore from './EditStore'
import DeleteStore from '../../executive/stores/DeleteStore'

function StoreRow({ storeId }) {
	const store = useSelector(state => selectStoreById(state, storeId))
	const { pathname } = useLocation()
	const isExecutive = pathname.includes('executive')

	if (store) {
		return (
			<tr className='bg-white border-b border-black'>
				<td className='p-3 border-r border-black text-center'>
					<Link
						to={`/admin/stores/${store._id}`}
						className='text-blue-500  capitalize duration-300 hover:underline hover:text-blue-700'
					>
						{store.storeName}
					</Link>
				</td>
				<td className='p-3 capitalize border-r border-black text-center'>
					{store.ownerName}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{store.contactNumber}
				</td>
				{!isExecutive && (
					<td className='p-3 capitalize border-r border-black text-center'>
						{store.executive.username}
					</td>
				)}
				<td className='p-3 text-primary border-r border-black text-center'>
					{store.totalOutstanding}
				</td>
				<td className='p-3 text-pr-green border-r border-black text-center'>
					{store.paidAmount}
				</td>
				<td className='p-3 text-pr-red border-r border-black text-center'>
					{store.balance}
				</td>
				<td className='p-3 text-center'>
					<Link className='text-xl' to={`/admin/stores/${storeId}`}>
						<TbEyeSearch />
					</Link>
					<EditStore store={store} />
					<DeleteStore storeId={storeId} />
				</td>
			</tr>
		)
	} else return null
}

export default StoreRow
