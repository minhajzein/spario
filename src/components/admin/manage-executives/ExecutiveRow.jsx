import { Link } from 'react-router-dom'
import { selectExecutiveById } from '../../../store/apiSlices/executiveApiSlice'
import { useSelector } from 'react-redux'
import { TbEyeSearch } from 'react-icons/tb'

function ExecutiveRow({ executiveId }) {
	const executive = useSelector(state =>
		selectExecutiveById(state, executiveId)
	)

	if (executive) {
		return (
			<tr className='bg-white border-b border-black'>
				<td className='p-3 capitalize border-r border-black'>
					<Link
						className='text-blue-500  capitalize duration-300 hover:underline hover:text-blue-700'
						to={`/admin/executives/${executiveId}`}
					>
						{executive.username}
					</Link>
				</td>
				<td className='p-3 border-r border-black'>{executive.password}</td>
				<td className='p-3 border-r border-black text-center'>
					{executive.phone}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{executive.route}
				</td>

				<td className='p-3 flex items-center justify-center gap-3'>
					<Link
						className='text-xl text-blue-500 hover:text-blue-700'
						to={`/admin/executives/${executiveId}`}
					>
						<TbEyeSearch />
					</Link>
				</td>
			</tr>
		)
	} else return null
}

export default ExecutiveRow
