import { Input } from 'antd'
import AddInvoice from '../../admin/invoices/AddInvoice'

function InvoiceHeader() {
	return (
		<div className='flex gap-3 items-center'>
			<Input
				type='search'
				allowClear
				placeholder='Search for invoices'
				size='large'
			/>
			<AddInvoice />
		</div>
	)
}

export default InvoiceHeader
