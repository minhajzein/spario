import { Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from '../components/executive/Dashboard'
import Layout from '../components/layout/Layout'
import PageNotFound from '../components/404/PageNotFound'
import Private from '../components/executive/Private'
import Stores from '../components/executive/stores/Stores'
import Transactions from '../components/executive/transactions/Transactions'
import StoreDetails from '../components/executive/stores/StoreDetails'
import Invoices from '../components/executive/invoices/Invoices'
import Returns from '../components/executive/returns/Returns'

function ExecutiveRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route element={<Private />}>
					<Route element={<Layout />}>
						<Route path='/' element={<Dashboard />} />
						<Route path='stores' element={<Stores />} />
						<Route path='stores/:id' element={<StoreDetails />} />
						<Route path='transactions' element={<Transactions />} />
						<Route path='invoices' element={<Invoices />} />
						<Route path='returns' element={<Returns />} />
						<Route path='*' element={<PageNotFound />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	)
}

export default ExecutiveRoutes
