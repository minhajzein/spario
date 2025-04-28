import { useSelector } from 'react-redux'
import { makeExecutiveReturnsSelectors } from '../../../store/apiSlices/querySlices/returnsByExecutive'
import { Link } from 'react-router-dom'
import { FaRegTrashAlt } from 'react-icons/fa'
import dayjs from 'dayjs'
import UpdateReturn from './UpdateReturn'

function ReturnTile({ returnId }) {
	const executiveId = useSelector(state => state.user.user._id)
	const { selectById } = makeExecutiveReturnsSelectors(executiveId)
	const rtn = useSelector(state => selectById(state, returnId))

	if (rtn) {
		return (
			<div className={`grid grid-cols-3 border-b items-center`}>
				<div className='p-2 capitalize flex flex-col'>
					<Link
						to={`/stores/${rtn.store._id}`}
						className='text-blue-500 text-lg capitalize text-ellipsis whitespace-nowrap overflow-hidden duration-300 hover:underline hover:text-blue-700'
					>
						{rtn.store.storeName}
					</Link>
					<h1 className='text-gray-500 text-sm'>
						{dayjs(rtn.date).format('DD/MM/YYYY')}
					</h1>
				</div>
				<div className='p-3 flex flex-col items-end text-center'>
					<h1 className='text-xl text-primary font-semibold '>{rtn.amount}</h1>
					<h1 className='capitalize text-sm'>{rtn.type}</h1>
				</div>
				<div className='flex gap-3 p-3 justify-end items-center'>
					<UpdateReturn />
					<FaRegTrashAlt />
				</div>
			</div>
		)
	} else return null
}

export default ReturnTile
