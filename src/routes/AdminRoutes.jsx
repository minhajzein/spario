import { Outlet, Route, Routes } from 'react-router-dom'
import AdminDashboard from '../components/admin/AdminDashboard'
import PageNotFound from '../components/404/PageNotFound'
import Private from '../components/admin/Private'
import Layout from '../components/layout/Layout'
import Stores from '../components/admin/stores/Stores'
import Executives from '../components/admin/manage-executives/Executives'
import Invoices from '../components/admin/invoices/Invoices'
import Transactions from '../components/admin/transactions/Transactions'
import StoreDetails from '../components/admin/stores/StoreDetails'
import ExecutiveDetials from '../components/admin/manage-executives/ExecutiveDetials'
import Returns from '../components/admin/returns/Returns'

function AdminRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route element={<Private />}>
					<Route element={<Layout />}>
						<Route path='/' element={<AdminDashboard />} />
						<Route path='stores' element={<Stores />} />
						<Route path='stores/:id' element={<StoreDetails />} />
						<Route path='executives' element={<Executives />} />
						<Route path='executives/:id' element={<ExecutiveDetials />} />
						<Route path='invoices' element={<Invoices />} />
						<Route path='transactions' element={<Transactions />} />
						<Route path='returns' element={<Returns />} />
						<Route path='*' element={<PageNotFound />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	)
}

export default AdminRoutes
