import React from 'react'
import { FaRegCircleUser, FaRoute } from 'react-icons/fa6'
import { FiPhoneCall } from 'react-icons/fi'
import { MdOutlineVerified, MdStorefront } from 'react-icons/md'
import { PiWarningCircleBold } from 'react-icons/pi'

function ExecutiveDashboard({ dashboard }) {
	return (
		<div className='flex flex-col gap-3'>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
				<div className='bg-white gap-2 items-center flex rounded-lg p-4 md:flex-col'>
					<div className='md:mt-4 size-12 p-4 flex bg-purple-300/30 rounded-full'>
						<FaRegCircleUser className='text-purple-500 m-auto' />
					</div>
					<div className='flex flex-col md:items-center'>
						<h3 className='text-ellipsis text-[10px] whitespace-nowrap overflow-hidden md:text-xs'>
							Executive Name
						</h3>
						<h1 className='font-semibold capitalize text-sm md:text-xl'>
							{dashboard?.executive?.username}
						</h1>
					</div>
				</div>
				<div className='bg-white gap-2 items-center flex rounded-lg p-4 md:flex-col'>
					<div className='md:mt-4 size-12 p-4 flex bg-pink-300/30 rounded-full'>
						<FiPhoneCall className='text-pink-500 m-auto' />
					</div>
					<div className='flex flex-col  md:items-center'>
						<h3 className='text-ellipsis text-[10px] whitespace-nowrap overflow-hidden md:text-xs'>
							Contact Number
						</h3>
						<h1 className='font-bold text-sm md:text-xl'>
							{dashboard?.executive?.phone}
						</h1>
					</div>
				</div>
				<div className='bg-white gap-2 items-center flex rounded-lg p-4 md:flex-col'>
					<div className='md:mt-4 size-12 p-4 flex bg-amber-300/30 rounded-full'>
						<MdStorefront className='text-amber-500 m-auto' />
					</div>
					<div className='flex flex-col  md:items-center'>
						<h3 className='text-ellipsis text-[10px] whitespace-nowrap overflow-hidden md:text-xs'>
							Total Stores
						</h3>

						<h1 className='font-bold text-sm md:text-xl'>
							{dashboard?.totalStores}
						</h1>
					</div>
				</div>
				<div className='bg-white gap-2 items-center flex rounded-lg p-4 md:flex-col'>
					<div className='md:mt-4 size-12 p-4 flex bg-orange-300/30 rounded-full'>
						<FaRoute className='text-orange-500 m-auto' />
					</div>
					<div className='flex flex-col  md:items-center'>
						<h3 className='text-ellipsis text-[10px] whitespace-nowrap overflow-hidden md:text-xs'>
							Route
						</h3>

						<h1 className='font-bold text-sm md:text-xl '>
							{dashboard?.executive?.route}
						</h1>
					</div>
				</div>
				<div className='bg-white gap-2 items-center flex rounded-lg p-4 md:flex-col'>
					<div className='md:mt-4 size-12 p-4 flex bg-pr-green/30 rounded-full'>
						<MdOutlineVerified className='text-pr-green m-auto' />
					</div>
					<div className='flex flex-col  md:items-center'>
						<h3 className='text-ellipsis text-[10px] whitespace-nowrap overflow-hidden md:text-xs'>
							Total Collected
						</h3>

						<h1 className='font-bold text-sm md:text-xl '>
							{dashboard?.totalCollected}
						</h1>
					</div>
				</div>
				<div className='bg-white gap-2 items-center flex rounded-lg p-4 md:flex-col'>
					<div className='md:mt-4 size-12 p-4 flex bg-pr-red/30 rounded-full'>
						<PiWarningCircleBold className='text-pr-red m-auto' />
					</div>
					<div className='flex flex-col  md:items-center'>
						<h3 className='text-ellipsis text-[10px] whitespace-nowrap overflow-hidden md:text-xs'>
							Total to Collect
						</h3>

						<h1 className='font-bold text-sm md:text-xl '>
							{dashboard?.totalToCollect}
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ExecutiveDashboard
