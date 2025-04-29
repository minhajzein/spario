import UpdateReturn from '../../executive/returns/UpdateReturn'
import DeleteReturn from '../../executive/returns/DeleteReturn'
import { selectReturnById } from '../../../store/apiSlices/returnApiSlice'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

function ReturnRow({ returnId }) {
	const rtn = useSelector(state => selectReturnById(state, returnId))

	if (rtn) {
		return (
			<tr className='bg-white border-b border-black'>
				<td className='p-3 border-r capitalize border-black text-center'>
					<Link
						to={`/stores/${rtn.store._id}`}
						className='text-blue-500  capitalize duration-300 hover:underline hover:text-blue-700'
					>
						{rtn.store.storeName}
					</Link>
				</td>
				<td className='p-3 border-r border-black capitalize text-center'>
					{rtn.executive.username}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{dayjs(rtn.date).format('DD/MM/YYYY')}
				</td>
				<td className='p-3 border-r border-black capitalize text-center'>
					{rtn.type}
				</td>
				<td className='p-3 border-r border-black text-center'>{rtn.amount}</td>
				<td className='p-3 flex gap-3 items-center justify-center text-center'>
					<UpdateReturn rtn={rtn} />
					<DeleteReturn returnId={returnId} />
				</td>
			</tr>
		)
	} else return null
}

export default ReturnRow
