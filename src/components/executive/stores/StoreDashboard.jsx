import { FaRegCircleUser } from 'react-icons/fa6'
import { FiPhoneCall } from 'react-icons/fi'
import { MdOutlineVerified, MdStorefront } from 'react-icons/md'
import { PiWarningCircleBold } from 'react-icons/pi'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import { GiPayMoney } from 'react-icons/gi'
import { IoIosInformationCircle, IoIosPrint } from 'react-icons/io'
import { Popover } from 'antd'
import StoreInfo from './StoreInfo'

function StoreDashboard({ store }) {
	const content = <StoreInfo store={store} />
	return (
		<div className='grid grid-cols-2 gap-2 md:gap-3 rounded-lg'>
			<div className='col-span-full p-2 md:p-3 bg-white justify-between rounded items-center shadow flex'>
				<div className='flex gap-3'>
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
				<div className='flex gap-3 items-center flex-col md:flex-row'>
					<Popover
						title='Store Information'
						trigger='click'
						content={content}
						placement='leftTop'
					>
						<IoIosInformationCircle className='text-[18px] cursor-pointer text-amber-600' />
					</Popover>
					<IoIosPrint className='text-[18px] cursor-pointer text-primary' />
				</div>
			</div>
			<div className='p-2 md:p-5  bg-white gap-1 rounded items-center shadow flex'>
				<div className='p-4 flex bg-cyan-300/30 rounded-full'>
					<GiPayMoney className='text-cyan-500 m-auto' />
				</div>
				<div className='flex flex-col justify-evenly h-full'>
					<h1 className='capitalize text-[10px] md:text-xs text-gray-500  text-ellipsis whitespace-nowrap overflow-hidden'>
						Opening Balance
					</h1>
					<h1 className='md:text-lg text-[16px] text-cyan-500 font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
						{store?.openingBalance}
					</h1>
				</div>
			</div>
			<div className='p-2 md:p-5  bg-white gap-1 rounded items-center shadow flex'>
				<div className='p-4 flex bg-pr-red/30 rounded-full'>
					<PiWarningCircleBold className='text-pr-red m-auto' />
				</div>
				<div className='flex flex-col justify-evenly h-full'>
					<h1 className='capitalize text-[10px] md:text-xs text-gray-500  text-ellipsis whitespace-nowrap overflow-hidden'>
						Balance amount
					</h1>
					<h1 className='md:text-lg text-[16px] text-pr-red  font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
						{store?.balance}
					</h1>
				</div>
			</div>
		</div>
	)
}

export default StoreDashboard
