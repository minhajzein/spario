import { toast } from 'react-toastify'
import { useDeleteTransactionMutation } from '../../../store/apiSlices/transactionsApiSlice'
import { FaRegTrashAlt } from 'react-icons/fa'
import { ImSpinner9 } from 'react-icons/im'
import { Popconfirm } from 'antd'

function DeleteTransaction({ id }) {
	const [deleteTransact, { isLoading }] = useDeleteTransactionMutation()

	const handleDelete = async () => {
		try {
			const { data } = await deleteTransact(id)
			if (data?.success) {
				toast.success(data.message)
			} else toast.error(data?.message)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Popconfirm
			title='Delete Transaction'
			description='Are you sure to delete this transaction?'
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

export default DeleteTransaction
