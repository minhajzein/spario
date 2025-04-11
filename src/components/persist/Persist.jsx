import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '../loading/Loading'
import usePersist from '../../hooks/usePersist'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUser } from '../../store/slices/userSlice'
import { useRefreshMutation } from '../../store/apiSlices/authApiSlice'
import { toast } from 'react-toastify'

function Persist() {
	const [persist] = usePersist()
	const token = useSelector(state => state.user.token)
	const [truePersist, setTruePersist] = useState(false)
	const effectRan = useRef(false)
	const dispatch = useDispatch()

	const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
		useRefreshMutation()
	useEffect(() => {
		if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
			const verifyRefreshToken = async () => {
				try {
					const { data } = await refresh()
					if (data === undefined) {
						toast.warn('Your login has expired', {
							position: 'top-center',
						})
					} else {
						dispatch(setUser(data?.user))
						dispatch(setToken(data?.token))
						setTruePersist(true)
					}
				} catch (error) {
					console.error(error)
				}
			}
			if (!token && persist) verifyRefreshToken()
		}
		const setEffectRan = () => {
			effectRan.current = true
		}

		return setEffectRan
	}, [])

	let content
	if (!persist) {
		content = <Outlet />
	} else if (isLoading) {
		content = <Loading />
	} else if (isError) {
		content = <Outlet />
	} else if (isSuccess && truePersist) {
		content = <Outlet />
	} else if (token && isUninitialized) {
		content = <Outlet />
	}

	return content
}

export default Persist
