import { useState } from 'react'
import Loading from '../../loading/Loading'
import { useGetAllStoresByExecutiveQuery } from '../../../store/apiSlices/querySlices/storeByExecutive'
import { useSelector } from 'react-redux'
import StoreHeader from '../../admin/stores/StoreHeader'
import StoreContent from './StoreContent'

function Stores() {
	const executiveId = useSelector(state => state.user.user._id)
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	const {
		data: stores,
		isLoading,
		isSuccess,
	} = useGetAllStoresByExecutiveQuery({
		executiveId,
		search: searchTerm,
		page,
		limit: pageSize,
	})

	let content

	if (isSuccess) {
		const { ids, total } = stores
		content = (
			<div className='flex flex-col w-full gap-3'>
				<StoreHeader searchTerm={searchTerm} setSearchTerm={value => {
					setSearchTerm(value)
					setPage(1)
				}} />
				<StoreContent
					ids={ids}
					executiveId={executiveId}
					total={total}
					page={page}
					pageSize={pageSize}
					setPage={setPage}
					setPageSize={setPageSize}
					queryParams={{
						executiveId,
						search: searchTerm,
						page,
						limit: pageSize,
					}}
				/>
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Stores
