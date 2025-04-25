import { useState } from 'react'
import { GrTransaction } from 'react-icons/gr'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { IoReturnDownBackOutline } from 'react-icons/io5'
import { MdOutlineStorefront } from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'
import { VscGraph } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const adminNavItems = [
	{
		title: 'Dashboard',
		icon: VscGraph,
		path: '/admin',
	},
	{
		title: 'Stores',
		icon: MdOutlineStorefront,
		path: '/admin/stores',
	},
	{
		title: 'Executives',
		icon: HiOutlineUserGroup,
		path: '/admin/executives',
	},
	{
		title: 'Invoices',
		icon: RiBillLine,
		path: '/admin/invoices',
	},
	{
		title: 'Transactions',
		icon: GrTransaction,
		path: '/admin/transactions',
	},
	{
		title: 'Returns',
		icon: IoReturnDownBackOutline,
		path: '/admin/returns',
	},
]

const execNavItems = [
	{
		title: 'Dashboard',
		icon: VscGraph,
		path: '/',
	},
	{
		title: 'Stores',
		icon: MdOutlineStorefront,
		path: '/stores',
	},
	{
		title: 'Invoices',
		icon: RiBillLine,
		path: '/invoices',
	},
	{
		title: 'Transactions',
		icon: GrTransaction,
		path: '/transactions',
	},
	{
		title: 'Returns',
		icon: IoReturnDownBackOutline,
		path: '/returns',
	},
]

function Sidebar() {
	const user = useSelector(state => state.user.user)
	const [navItems] = useState(
		user?.role === 'admin' ? adminNavItems : execNavItems
	)

	const { pathname } = useLocation()

	const isActive = path => {
		return path === pathname || path + '/' === pathname
	}

	return (
		<div className='w-[250px] hidden gap-8 md:flex items-center flex-col bg-white p-5'>
			<h1 className='uppercase text-2xl text-[#2E2CAF] font-bold'>spario</h1>
			<div className='flex flex-col gap-4'>
				{navItems.map(nav => (
					<Link
						key={nav.title}
						to={nav.path}
						className={`${
							isActive(nav.path) && 'bg-primary shadow-lg shadow-black/50'
						} flex gap-1 items-center px-6 py-3 rounded-full cursor-pointer`}
					>
						<nav.icon
							className={`${isActive(nav.path) ? 'text-white' : 'text-black'}`}
						/>

						<h1 className={`${isActive(nav.path) && 'text-white'} capitalize`}>
							{nav.title}
						</h1>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Sidebar
