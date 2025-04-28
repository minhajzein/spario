import { RiEditLine } from 'react-icons/ri'
import { useUpdateReturnMutation } from '../../../store/apiSlices/returnApiSlice'

function UpdateReturn() {
	const [editReturn, { isLoading }] = useUpdateReturnMutation()
	return (
		<>
			<button type='button' className='cursor-pointer' onClick={''}>
				<RiEditLine className='text-xl text-pr-green' />
			</button>
		</>
	)
}

export default UpdateReturn
