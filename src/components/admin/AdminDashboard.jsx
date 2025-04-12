import React from 'react'
import AddInvoice from './invoices/AddInvoice'

function AdminDashboard() {
	return (
		<div className='flex flex-col w-full gap-3'>
			<div className='w-full flex justify-end'>
				<AddInvoice/>
			</div>
		</div>
	)
}

export default AdminDashboard
