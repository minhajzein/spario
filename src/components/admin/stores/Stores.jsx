import { useGetAllStoresQuery } from '../../../store/apiSlices/storesApiSlice'
import Loading from '../../loading/Loading'
import StoreContent from './StoreContent'
import StoreHeader from './StoreHeader'

function Stores() {
	const { data: stores, isLoading, isSuccess } = useGetAllStoresQuery()

	let content

	if (isSuccess) {
		const { ids } = stores
		content = (
			<div className='flex flex-col gap-3'>
				<StoreHeader />
				<StoreContent ids={ids} />
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Stores
