import { useGetInvoicesByExecutiveQuery } from '../../../store/apiSlices/querySlices/invoicesByExecutive'
import { useSelector } from 'react-redux'
import Loading from '../../loading/Loading'
import InvoiceContent from './InvoiceContent'
import InvoiceHeader from './InvoiceHeader'

function Invoices() {
	const executiveId = useSelector(state => state.user.user._id)
	const {
		data: invoices,
		isLoading,
		isSuccess,
	} = useGetInvoicesByExecutiveQuery(executiveId)

	let content

	if (isSuccess) {
		const { ids } = invoices
		content = (
			<div className='w-full flex flex-col gap-3'>
				<InvoiceHeader />
				<InvoiceContent ids={ids} executiveId={executiveId} />
			</div>
		)
	}
	return isLoading ? <Loading /> : content
}

export default Invoices
