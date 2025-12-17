import { useState } from 'react'
import { useGetInvoicesByExecutiveQuery } from '../../../store/apiSlices/querySlices/invoicesByExecutive'
import { useSelector } from 'react-redux'
import Loading from '../../loading/Loading'
import InvoiceContent from './InvoiceContent'
import InvoiceHeader from './InvoiceHeader'

function Invoices() {
	const executiveId = useSelector(state => state.user.user._id)
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	const {
		data: invoices,
		isLoading,
		isSuccess,
	} = useGetInvoicesByExecutiveQuery({
		executiveId,
		search: searchTerm,
		page,
		limit: pageSize,
	})

	let content

	if (isSuccess) {
		const { ids, total } = invoices
		content = (
			<div className='w-full flex flex-col gap-3'>
				<InvoiceHeader
					searchTerm={searchTerm}
					setSearchTerm={value => {
						setSearchTerm(value)
						setPage(1)
					}}
				/>
				<InvoiceContent
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

export default Invoices
