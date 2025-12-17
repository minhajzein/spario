import { useState } from 'react'
import { useGetAllStoresQuery } from '../../../store/apiSlices/storesApiSlice'
import Loading from '../../loading/Loading'
import StoreContent from './StoreContent'
import StoreHeader from './StoreHeader'

function Stores() {
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	const { data: stores, isLoading, isSuccess } = useGetAllStoresQuery({
		search: searchTerm,
		page,
		limit: pageSize,
	})

	let content

	if (isSuccess) {
		const { ids, total } = stores
		content = (
			<div className='flex flex-col gap-3'>
				<StoreHeader searchTerm={searchTerm} setSearchTerm={value => {
					setSearchTerm(value)
					setPage(1)
				}} />
				<StoreContent
					ids={ids}
					total={total}
					page={page}
					pageSize={pageSize}
					setPage={setPage}
					setPageSize={setPageSize}
					queryParams={{ search: searchTerm, page, limit: pageSize }}
				/>
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Stores
