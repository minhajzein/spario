import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function Private() {
	const location = useLocation()
	const token = useSelector(state => state.user.token)
	const user = useSelector(state => state.user.user)
	return token !== null && user && user?.role === 'executive' ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	)
}

export default Private
