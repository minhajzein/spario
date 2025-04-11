import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

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
		<div className='w-[250px] hidden gap-16 md:flex items-center flex-col bg-white p-5'>
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
						{isActive(nav.path) ? (
							<img src={nav.activeIcon} className='object-contain' alt='' />
						) : (
							<img src={nav.icon} className='object-contain' alt='' />
						)}
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
