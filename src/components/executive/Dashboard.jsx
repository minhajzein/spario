import { useSelector } from 'react-redux'
import { useGetExecutiveDashboardDataQuery } from '../../store/apiSlices/querySlices/executiveDashboardSlice'
import Loading from '../loading/Loading'

function Dashboard() {
	const executiveId = useSelector(state => state.user.user._id)
	const {
		data: dashboard,
		isLoading,
		isSuccess,
	} = useGetExecutiveDashboardDataQuery(executiveId)

	return isLoading ? (
		<Loading />
	) : (
		isSuccess && (
			<div className='flex flex-col gap-3'>
				<div className='grid md:grid-cols-4 gap-3'>
					<div className='bg-white gap-2 flex rounded-lg p-4 md:flex-col'>
						<div className='bg-[#9897D9] md:md:mt-6 flex rounded-full size-14 md:size-12'>
							<img
								className='size-4 m-auto'
								src='/images/outstanding.png'
								alt=''
							/>
						</div>
						<div className='flex flex-col md:gap-2'>
							<h3 className='text-ellipsis whitespace-nowrap overflow-hidden md:text-xs'>
								Total Outstanding
							</h3>
							<h1 className='font-bold text-2xl md:text-xl text-primary'>
								{dashboard?.totals?.debit}
							</h1>
						</div>
					</div>
					<div className='bg-white gap-2 flex rounded-lg p-4 md:flex-col'>
						<div className='bg-[#00900E]/30 md:md:mt-6 flex rounded-full size-14 md:size-12'>
							<img className='size-4 m-auto' src='/images/paid.png' alt='' />
						</div>
						<div className='flex flex-col md:gap-2'>
							<h3 className='text-ellipsis whitespace-nowrap overflow-hidden md:text-xs'>
								Total Paid
							</h3>
							<h1 className='font-bold text-2xl md:text-xl text-pr-green'>
								{dashboard?.totals?.credit}
							</h1>
						</div>
					</div>
					<div className='bg-white gap-2 flex rounded-lg p-4 md:flex-col'>
						<div className='bg-[#EF6969] md:md:mt-6 flex rounded-full size-14 md:size-12'>
							<img className='size-4 m-auto' src='/images/due.png' alt='' />
						</div>
						<div className='flex flex-col md:gap-2'>
							<h3 className='text-ellipsis whitespace-nowrap overflow-hidden md:text-xs'>
								Total Due
							</h3>

							<h1 className='font-bold text-2xl md:text-xl text-pr-red'>
								{dashboard?.totals?.debit - dashboard?.totals?.credit}
							</h1>
						</div>
					</div>
					<div className='bg-white gap-2 flex rounded-lg p-4 md:flex-col'>
						<div className='bg-[#D2D1FF] md:md:mt-6 flex rounded-full size-14 md:size-12'>
							<img
								className='size-4 m-auto'
								src='/images/active-store.png'
								alt=''
							/>
						</div>
						<div className='flex flex-col md:gap-2'>
							<h3 className='text-ellipsis whitespace-nowrap overflow-hidden md:text-xs'>
								Total Stores
							</h3>

							<h1 className='font-bold text-2xl md:text-xl text-primary'>
								{dashboard?.totalStores}
							</h1>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default Dashboard
