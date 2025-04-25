import { Input } from 'antd'
import AddInvoice from '../../admin/invoices/AddInvoice'

function Invoices() {
	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='flex gap-3 items-center'>
				<Input
					type='search'
					allowClear
					placeholder='Search for invoices'
					size='large'
				/>
				<AddInvoice />
			</div>
		</div>
	)
}

export default Invoices
