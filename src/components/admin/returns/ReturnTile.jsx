import { useSelector } from 'react-redux'
import { selectReturnById } from '../../../store/apiSlices/returnApiSlice'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import UpdateReturn from '../../executive/returns/UpdateReturn'
import DeleteReturn from '../../executive/returns/DeleteReturn'

function ReturnTile({ returnId }) {
	const rtn = useSelector(state => selectReturnById(state, returnId))

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
				<div className='flex flex-col gap-3 p-3 justify-center items-end'>
					<h1>{rtn.executive.username}</h1>
					<div className='flex gap-3 items-center'>
						<UpdateReturn rtn={rtn} />
						<DeleteReturn returnId={returnId} />
					</div>
				</div>
			</div>
		)
	} else return null
}

export default ReturnTile
