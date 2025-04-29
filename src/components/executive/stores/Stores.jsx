import Loading from '../../loading/Loading'
import { useGetAllStoresByExecutiveQuery } from '../../../store/apiSlices/querySlices/storeByExecutive'
import { useSelector } from 'react-redux'
import StoreHeader from '../../admin/stores/StoreHeader'
import StoreContent from './StoreContent'

function Stores() {
	const executiveId = useSelector(state => state.user.user._id)
	const {
		data: stores,
		isLoading,
		isSuccess,
	} = useGetAllStoresByExecutiveQuery(executiveId)

	let content

	if (isSuccess) {
		const { ids } = stores
		content = (
			<div className='flex flex-col w-full gap-3'>
				<StoreHeader />
				<StoreContent ids={ids} executiveId={executiveId} />
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Stores
