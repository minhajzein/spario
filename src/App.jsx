import { Route, Routes } from 'react-router-dom'
import ExecutiveRoutes from './routes/ExecutiveRoutes'
import AdminRoutes from './routes/AdminRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/auth/Login'
import Public from './components/auth/Public'
import Persist from './components/persist/Persist'

function App() {
	return (
		<>
			<Routes>
				<Route element={<Persist />}>
					<Route element={<Public />}>
						<Route path='/login' element={<Login />} />
					</Route>
					<Route path='/*' element={<ExecutiveRoutes />} />
					<Route path='/admin/*' element={<AdminRoutes />} />
				</Route>
			</Routes>
			<ToastContainer />
		</>
	)
}

export default App
