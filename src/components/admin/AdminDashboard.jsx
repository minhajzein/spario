import React from 'react'
import { useGetAdminDashboardDataQuery } from '../../store/apiSlices/querySlices/adminDashboardApiSlice'
import Loading from '../loading/Loading'

function AdminDashboard() {
	const {
		data: dashboard,
		isSuccess,
		isLoading,
	} = useGetAdminDashboardDataQuery()

	return isLoading ? (
		<Loading />
	) : (
		isSuccess && (
			<div className='flex flex-col w-full gap-3'>
				<div className='grid md:grid-cols-5 gap-3'>
					<div className='bg-white gap-2 flex rounded-lg p-4 md:flex-col'>
						<div className='bg-[#9897D9] mt-6 flex rounded-full size-12'>
							<img
								className='size-4 m-auto'
								src='/images/outstanding.png'
								alt=''
							/>
						</div>
						<h3 className='text-ellipsis whitespace-nowrap overflow-hidden text-xs'>
							Total Outstanding
						</h3>
						<h1 className='font-bold text-xl text-primary'>
							{dashboard?.totals?.debit}
						</h1>
					</div>
					<div className='bg-white gap-2 flex rounded-lg p-4 md:flex-col'>
						<div className='bg-[#00900E]/30 mt-6 flex rounded-full size-12'>
							<img className='size-4 m-auto' src='/images/paid.png' alt='' />
						</div>
						<h3 className='text-ellipsis whitespace-nowrap overflow-hidden text-xs'>
							Total Paid
						</h3>
						<h1 className='font-bold text-xl text-pr-green'>
							{dashboard?.totals?.credit}
						</h1>
					</div>
					<div className='bg-white gap-2 flex rounded-lg p-4 md:flex-col'>
						<div className='bg-[#EF6969] mt-6 flex rounded-full size-12'>
							<img className='size-4 m-auto' src='/images/paid.png' alt='' />
						</div>
						<h3 className='text-ellipsis whitespace-nowrap overflow-hidden text-xs'>
							Total Due
						</h3>
						<h1 className='font-bold text-xl text-pr-red'>
							{dashboard?.totals?.debit - dashboard?.totals?.credit}
						</h1>
					</div>
					<div className='bg-white gap-2 flex rounded-lg p-4 md:flex-col'>
						<div className='bg-[#D2D1FF] mt-6 flex rounded-full size-12'>
							<img
								className='size-4 m-auto'
								src='/images/active-store.png'
								alt=''
							/>
						</div>
						<h3 className='text-ellipsis whitespace-nowrap overflow-hidden text-xs'>
							Total Stores
						</h3>
						<h1 className='font-bold text-xl text-primary'>
							{dashboard?.totalStores}
						</h1>
					</div>
					<div className='bg-white gap-2 flex rounded-lg p-4 md:flex-col'>
						<div className='bg-[#E1B3F1] mt-6 flex rounded-full size-12'>
							<img
								className='size-4 m-auto'
								src='/images/active-store.png'
								alt=''
							/>
						</div>
						<h3 className='text-ellipsis whitespace-nowrap overflow-hidden text-xs'>
							Total Executives
						</h3>
						<h1 className='font-bold text-xl text-primary'>
							{dashboard?.totalExecutives}
						</h1>
					</div>
				</div>
			</div>
		)
	)
}

export default AdminDashboard
