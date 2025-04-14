import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import AddTransaction from '../executive/transactions/AddTransaction'
import AddInvoice from '../admin/invoices/AddInvoice'

const adminNavItems = [
	{
		title: 'Dashboard',
		icon: '/images/dashboard-icon.png',
		activeIcon: '/images/active-dashboard.png',
		path: '/admin',
	},
	{
		title: 'Stores',
		icon: '/images/store-icon.png',
		activeIcon: '/images/active-store.png',
		path: '/admin/stores',
	},
	{
		title: 'Executives',
		icon: '/images/executives-icon.png',
		activeIcon: '/images/active-executives.png',
		path: '/admin/executives',
	},
	{
		title: 'Transactions',
		icon: '/images/transactions-icon.png',
		activeIcon: '/images/active-transactions.png',
		path: '/admin/transactions',
	},
]

const execNavItems = [
	{
		title: 'Dashboard',
		icon: '/images/dashboard-icon.png',
		activeIcon: '/images/active-dashboard.png',
		path: '/',
	},
	{
		title: 'Stores',
		icon: '/images/store-icon.png',
		activeIcon: '/images/active-store.png',
		path: '/stores',
	},
	{
		title: 'Transactions',
		icon: '/images/transactions-icon.png',
		activeIcon: '/images/active-transactions.png',
		path: '/transactions',
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
			<div className='absolute bottom-full right-2 mb-2'>
				{user.role === 'executive' ? <AddTransaction /> : <AddInvoice />}
			</div>
			<div
				className={`w-full grid ${
					navItems.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
				} p-2 gap-2 bg-white`}
			>
				{navItems.map(nav => (
					<Link
						to={nav.path}
						key={nav.title}
						className='flex flex-col justify-center text-xs items-center'
					>
						<img
							className={`${
								isActive(nav.path) && 'rounded-full bg-primary'
							} h-8 px-4 py-2 object-contain`}
							src={isActive(nav.path) ? nav.activeIcon : nav.icon}
							alt=''
						/>
						{nav.title}
					</Link>
				))}
			</div>
		</div>
	)
}

export default Footer
