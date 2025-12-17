import { Input } from 'antd'
import AddInvoice from '../../admin/invoices/AddInvoice'

function InvoiceHeader({ searchTerm, setSearchTerm }) {
	return (
		<div className='flex gap-3 items-center'>
			<Input
				type='search'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				allowClear
				placeholder='Search for invoices'
				size='large'
			/>
			<AddInvoice />
		</div>
	)
}

export default InvoiceHeader
