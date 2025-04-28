import { Popconfirm } from 'antd'
import { FaRegTrashAlt } from 'react-icons/fa'
import { ImSpinner9 } from 'react-icons/im'
import { useDeleteStoreMutation } from '../../../store/apiSlices/storesApiSlice'
import { toast } from 'react-toastify'

function DeleteStore({ storeId }) {
	const [deleteStore, { isLoading }] = useDeleteStoreMutation()

	const handleDelete = async () => {
		try {
			const { data } = await deleteStore(storeId)
			if (data?.success) {
				toast.success(data.message)
			} else toast.error(data?.message)
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<Popconfirm
			title='Delete Store'
			description='Are you sure to delete this store?'
			onConfirm={handleDelete}
			okText='Delete'
			placement='left'
		>
			<button type='button' disabled={isLoading}>
				{isLoading ? (
					<ImSpinner9 className='animate-spin' />
				) : (
					<FaRegTrashAlt className='cursor-pointer text-xl text-pr-red' />
				)}
			</button>
		</Popconfirm>
	)
}

export default DeleteStore
