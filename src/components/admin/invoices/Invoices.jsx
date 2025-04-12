import React from 'react'
import AddInvoice from './AddInvoice'
import { Input } from 'antd'

function Invoices() {
	return (
		<div className='flex flex-col w-full gap-3'>
			<div className='flex gap-3 items-center'>
				<Input
					type='search'
					allowClear
					placeholder='Search for executives'
					size='large'
				/>
				<AddInvoice />
			</div>
		</div>
	)
}

export default Invoices
