import { useSelector } from 'react-redux'
import { selectStoreById } from '../../../store/apiSlices/storesApiSlice'

function StoreRow({ storeId }) {
	const store = useSelector(state => selectStoreById(state, storeId))

	if (store) {
		return (
			<tr className='bg-white border-b border-black'>
				<td className='p-3 border-r border-black text-center'>
					{store.storeName}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{store.ownerName}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{store.contactNumber}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{store.executive.username}
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
				<td className='p-3 text-center'></td>
			</tr>
		)
	} else return null
}

export default StoreRow
