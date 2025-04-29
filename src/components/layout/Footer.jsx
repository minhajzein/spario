import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import AddTransaction from '../executive/transactions/AddTransaction'
import AddInvoice from '../admin/invoices/AddInvoice'
import { VscGraph } from 'react-icons/vsc'
import { MdOutlineStorefront } from 'react-icons/md'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { RiBillLine } from 'react-icons/ri'
import { GrTransaction } from 'react-icons/gr'
import { IoReturnDownBackOutline } from 'react-icons/io5'

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
function Footer() {
	const user = useSelector(state => state.user.user)
	const [navItems] = useState(
		user?.role === 'admin' ? adminNavItems : execNavItems
	)
	const { pathname } = useLocation()

	const isActive = path => {
		return path === pathname || path + '/' === pathname
	}
	return (
		<div className='sticky border-t border-gray-400 flex flex-col bg-transparent md:hidden gap-2 items-end w-full top-full'>
			<div
				className={`w-full grid ${
					navItems.length === 6 ? 'grid-cols-6' : 'grid-cols-5'
				} p-2 gap-2 bg-white`}
			>
				{navItems.map(nav => (
					<Link
						to={nav.path}
						key={nav.title}
						className='flex flex-col justify-center py-3 text-xs items-center'
					>
						<nav.icon
							className={`${
								isActive(nav.path) ? 'text-primary' : 'text-black'
							} text-2xl`}
						/>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Footer
