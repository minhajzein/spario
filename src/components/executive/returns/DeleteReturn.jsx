import { ImSpinner9 } from 'react-icons/im'
import { useDeleteReturnMutation } from '../../../store/apiSlices/returnApiSlice'
import { Popconfirm } from 'antd'
import { FaRegTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

function DeleteReturn({ returnId }) {
	const [removeReturn, { isLoading }] = useDeleteReturnMutation()

	const handleDelete = async () => {
		try {
			const { data } = await removeReturn(returnId)
			if (data?.success) {
				toast.success(data.message)
			} else toast.error(data?.message)
		} catch (error) {
			console.error(error)
		}
	}

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
