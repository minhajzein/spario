import { TbLock, TbLockOpen } from 'react-icons/tb'
import { useChangeStatusMutation } from '../../../store/apiSlices/executiveApiSlice'
import { ImSpinner9 } from 'react-icons/im'
import { toast } from 'react-toastify'

function ChangeStatus({ status, executiveId }) {
	const [changeStatus, { isLoading }] = useChangeStatusMutation()
	const handleChangeStatus = async () => {
		try {
			const { data } = await changeStatus({
				id: executiveId,
				status: status === 'active' ? 'inactive' : 'active',
			})
			if (data?.success) {
				toast.success(data?.message)
			} else toast.error(data?.message)
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<button className='cursor-pointer' onClick={handleChangeStatus}>
			{isLoading ? (
				<ImSpinner9 className='animate-spin text-pr-red' />
			) : status === 'active' ? (
				<TbLockOpen className='text-pr-green' />
			) : (
				<TbLock className='text-pr-red' />
			)}
		</button>
	)
}

export default ChangeStatus
