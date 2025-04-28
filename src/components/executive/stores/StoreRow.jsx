import { useSelector } from 'react-redux'
import { makeExecutiveStoreSelectors } from '../../../store/apiSlices/querySlices/storeByExecutive'
import { Link } from 'react-router-dom'
import { TbEyeSearch } from 'react-icons/tb'
import DeleteStore from './DeleteStore'

function StoreRow({ storeId }) {
	const executiveId = useSelector(state => state.user.user._id)
	const { selectById } = makeExecutiveStoreSelectors(executiveId)

	const store = useSelector(state => selectById(state, storeId))

	if (store) {
		return (
			<tr className='bg-white border-b border-black'>
				<td className='p-3 border-r border-black text-center'>
					<Link
						to={`/stores/${store._id}`}
						className='text-blue-500  capitalize duration-300 hover:underline hover:text-blue-700'
					>
						{store.storeName}
					</Link>
				</td>
				<td className='p-3 border-r capitalize border-black text-center'>
					{store.ownerName}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{store.contactNumber}
				</td>
				<td className='p-3 text-primary border-r border-black text-center'>
					{store.totalOutstanding}
				</td>
				<td className='p-3 text-pr-green border-r border-black text-center'>
					{store.paidAmount}
				</td>
				<td className='p-3 text-pr-red border-r border-black text-center'>
					{store.balance}
				</td>
				<td className='p-3 flex gap-2'>
					<Link className='text-xl' to={`/stores/${storeId}`}>
						<TbEyeSearch />
					</Link>
					<DeleteStore storeId={storeId} />
				</td>
			</tr>
		)
	} else return null
}

export default StoreRow
