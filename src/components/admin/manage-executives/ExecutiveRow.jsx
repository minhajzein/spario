import { selectExecutiveById } from '../../../store/apiSlices/executiveApiSlice'
import { useSelector } from 'react-redux'

function ExecutiveRow({ executiveId }) {
	const executive = useSelector(state =>
		selectExecutiveById(state, executiveId)
	)

	if (executive) {
		return (
			<tr className='bg-white border-b border-black'>
				<td className='p-3 border-r border-black'>{executive.username}</td>
				<td className='p-3 border-r border-black'>{executive.password}</td>
				<td className='p-3 border-r border-black text-center'>
					{executive.phone}
				</td>
				<td className='p-3 border-r border-black text-center'>
					{executive.route}
				</td>

				<td className='p-3 text-center'></td>
			</tr>
		)
	} else return null
}

export default ExecutiveRow
