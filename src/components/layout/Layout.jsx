import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
function Layout() {
	return (
		<div className='h-dvh flex'>
			<Sidebar />
			<div className='flex flex-col flex-grow min-h-dvh relative overflow-hidden'>
				<Navbar />
				<div className='overflow-y-auto p-2 md:p-5 overflow-x-hidden'>
					<Outlet />
				</div>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
