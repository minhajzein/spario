import { useSelector } from 'react-redux'
import { makeExecutiveReturnsSelectors } from '../../../store/apiSlices/querySlices/returnsByExecutive'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import DeleteReturn from './DeleteReturn'
import UpdateReturn from './UpdateReturn'

function ReturnRow({ returnId }) {
	const executiveId = useSelector(state => state.user.user._id)
	const { selectById } = makeExecutiveReturnsSelectors(executiveId)
	const rtn = useSelector(state => selectById(state, returnId))

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
