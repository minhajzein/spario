import { FaRegCircleUser } from 'react-icons/fa6'
import { FiPhoneCall } from 'react-icons/fi'
import { MdOutlineVerified, MdStorefront } from 'react-icons/md'
import { PiWarningCircleBold } from 'react-icons/pi'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import { GiPayMoney } from 'react-icons/gi'

function StoreDashboard({ store }) {
	return (
		<div className='grid grid-cols-3 gap-2 md:gap-3 md:grid-cols-6 rounded-lg'>
			<div className='p-2 md:p-3 gap-3 col-span-full  bg-white rounded items-center shadow flex'>
				<div className='p-4 flex bg-amber-300/30 rounded-full'>
					<MdStorefront className='text-amber-500 m-auto' />
				</div>
				<div className='flex flex-col justify-evenly'>
					<h1 className='capitalize text-[10px] md:text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap'>
						Store Name
					</h1>
					<h1 className='md:text-xl text-xs  capitalize font-semibold  text-ellipsis overflow-hidden'>
						{store?.storeName}
					</h1>
				</div>
			</div>
			<div className='p-2 md:p-5  bg-white gap-1 rounded items-start shadow flex flex-col'>
				<div className='mt-4 p-4 flex bg-purple-300/30 rounded-full'>
					<FaRegCircleUser className='text-purple-500 m-auto' />
				</div>
				<h1 className='capitalize text-[10px] md:text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap'>
					Owner Name
				</h1>
				<h1 className='md:text-lg text-xs  capitalize font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>
					{store?.ownerName}
				</h1>
			</div>
			<div className='p-2 md:p-5  bg-white gap-1 rounded items-start shadow flex flex-col'>
				<div className='mt-4 p-4 flex bg-pink-300/30 rounded-full'>
					<FiPhoneCall className='text-pink-500 m-auto' />
				</div>
				<h1 className='capitalize text-[10px] md:text-xs text-gray-500  text-ellipsis whitespace-nowrap overflow-hidden'>
					Contact number
				</h1>
				<h1 className='md:text-lg text-xs  font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
					{store?.contactNumber}
				</h1>
			</div>
			<div className='p-2 md:p-5  bg-white gap-1 rounded items-start shadow flex flex-col'>
				<div className='mt-4 p-4 flex bg-cyan-300/30 rounded-full'>
					<GiPayMoney className='text-cyan-500 m-auto' />
				</div>
				<h1 className='capitalize text-[10px] md:text-xs text-gray-500  text-ellipsis whitespace-nowrap overflow-hidden'>
					Opening Balance
				</h1>
				<h1 className='md:text-lg text-xs  font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
					{store?.openingBalance}
				</h1>
			</div>
			<div className='p-2 md:p-5  bg-white gap-1 rounded items-start shadow flex flex-col'>
				<div className='mt-4 p-4 flex bg-blue-300/30 rounded-full'>
					<RiMoneyRupeeCircleLine className='text-primary m-auto' />
				</div>
				<h1 className='capitalize text-[10px] md:text-xs text-gray-500  text-ellipsis whitespace-nowrap overflow-hidden'>
					Outstanding
				</h1>
				<h1 className='md:text-lg text-xs  font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
					{store?.totalOutstanding}
				</h1>
			</div>
			<div className='p-2 md:p-5  bg-white gap-1 rounded items-start shadow flex flex-col'>
				<div className='mt-4 p-4 flex bg-pr-green/30 rounded-full'>
					<MdOutlineVerified className='text-pr-green m-auto' />
				</div>
				<h1 className='capitalize text-[10px] md:text-xs text-gray-500  text-ellipsis whitespace-nowrap overflow-hidden'>
					paid Amount
				</h1>
				<h1 className='md:text-lg text-xs  font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
					{store?.paidAmount}
				</h1>
			</div>
			<div className='p-2 md:p-5  bg-white gap-1 rounded items-start shadow flex flex-col'>
				<div className='mt-4 p-4 flex bg-pr-red/30 rounded-full'>
					<PiWarningCircleBold className='text-pr-red m-auto' />
				</div>
				<h1 className='capitalize text-[10px] md:text-xs text-gray-500  text-ellipsis whitespace-nowrap overflow-hidden'>
					Balance amount
				</h1>
				<h1 className='md:text-lg text-xs  font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
					{store?.balance}
				</h1>
			</div>
		</div>
	)
}

export default StoreDashboard
