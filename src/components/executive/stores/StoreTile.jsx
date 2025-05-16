import { useSelector } from 'react-redux'
import { makeExecutiveStoreSelectors } from '../../../store/apiSlices/querySlices/storeByExecutive'
import { Link } from 'react-router-dom'
import { TbEyeSearch } from 'react-icons/tb'
import { RiEditLine } from 'react-icons/ri'
import DeleteStore from './DeleteStore'
import EditStore from '../../admin/stores/EditStore'

function StoreTile({ storeId, executiveId }) {
	const { selectById } = makeExecutiveStoreSelectors(executiveId)

	const store = useSelector(state => selectById(state, storeId))

	if (store) {
		return (
			<div className='w-full bg-white grid p-2 border-y border-gray-400 grid-cols-4'>
				<div className='flex flex-col col-span-2 capitalize'>
					<h1 className='font-semibold text-xl text-ellipsis whitespace-nowrap overflow-hidden'>
						{store.storeName}
					</h1>
					<h1 className='text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden'>
						{store.ownerName}
					</h1>
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
					<Link className='text-xl text-blue-500' to={`/stores/${storeId}`}>
						<TbEyeSearch />
					</Link>
					<EditStore store={store} />
					<DeleteStore storeId={storeId} />
				</div>
			</div>
		)
	} else return null
}

export default StoreTile
