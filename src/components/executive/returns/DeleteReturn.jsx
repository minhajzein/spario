
import { ImSpinner9 } from 'react-icons/im'
import { useDeleteReturnMutation } from '../../../store/apiSlices/returnApiSlice'
import { Popconfirm } from 'antd'
import { FaRegTrashAlt } from 'react-icons/fa'

function DeleteReturn({ returnId }) {
	const [removeReturn, { isLoading }] = useDeleteReturnMutation()

	return (
		<Popconfirm
			title='Delete Return'
			description='Are you sure to delete this return?'
			onConfirm={handleDelete}
			okText='Delete'
			placement='left'
		>
			<button type='button' disabled={isLoading}>
				{isLoading ? (
					<ImSpinner9 className='animate-spin' />
				) : (
					<FaRegTrashAlt className='text-xl cursor-pointer text-pr-red' />
				)}
			</button>
		</Popconfirm>
	)
}

export default DeleteReturn
