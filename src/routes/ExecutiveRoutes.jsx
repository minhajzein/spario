import { Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from '../components/executive/Dashboard'
import Layout from '../components/layout/Layout'
import PageNotFound from '../components/404/PageNotFound'
import Private from '../components/executive/Private'
import Stores from '../components/executive/stores/Stores'
import Transactions from '../components/executive/transactions/Transactions'

function ExecutiveRoutes() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route element={<Private />}>
					<Route element={<Layout />}>
						<Route path='/' element={<Dashboard />} />
						<Route path='stores' element={<Stores />} />
						<Route path='transactions' element={<Transactions/> } />
						<Route path='*' element={<PageNotFound />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	)
}

export default ExecutiveRoutes
