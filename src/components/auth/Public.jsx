import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function Public() {
	const location = useLocation()
	const token = useSelector(state => state.user.token)
	const user = useSelector(state => state.user.user)

	return token !== null && user && user?.role === 'executive' ? (
		<Navigate to='/' state={{ from: location }} replace />
	) : token !== null && user && user?.role === 'admin' ? (
		<Navigate to='/admin' state={{ from: location }} replace />
	) : (
		<Outlet />
	)
}

export default Public
