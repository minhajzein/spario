import { useFormik } from 'formik'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import * as Yup from 'yup'
import usePersist from '../../hooks/usePersist'
import { useLoginMutation } from '../../store/apiSlices/authApiSlice'
import { toast } from 'react-toastify'
import { setToken, setUser } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ImSpinner9 } from 'react-icons/im'

function Login() {
	const [login, { isLoading, isError, error }] = useLoginMutation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isShow, setIsShow] = useState(false)

	const [persist, setPersist] = usePersist()
	const handleToggle = () => setPersist(prev => !prev)

	const formik = useFormik({
		initialValues: { username: '', password: '' },
		validationSchema: Yup.object({
			username: Yup.string().required(),
			password: Yup.string().required(),
		}),
		onSubmit: async values => {
			try {
				const { data } = await login(values)

				if (isError) toast.error(error.data.message)
				
				if (data?.success) {
					dispatch(setUser(data.user))
					dispatch(setToken(data.token))
					toast.success(data.message)
					if (data?.user?.role === 'admin') {
						navigate('/admin')
					} else if (data?.user?.role === 'executive') {
						navigate('/')
					}
				} else toast.error(data?.message)
			} catch (error) {
				console.error(error)
			}
		},
	})

	return (
		<div className='w-full min-h-dvh flex'>
			<div className='md:m-auto flex flex-col gap-4 w-full md:max-w-xl p-5 bg-primary md:rounded-lg'>
				<div className='flex flex-col'>
					<h3 className='text-xl text-white/80 font-medium leading-5 tracking-tighter'>
						Login
					</h3>
					<p className='mt-1.5 text-sm text-white/30'>
						Welcome back! Enter your details and continue.
					</p>
				</div>
				<form
					onSubmit={formik.handleSubmit}
					className='w-full flex flex-col gap-4'
				>
					<div className='w-full'>
						<label
							htmlFor='username'
							className='flex flex-col capitalize text-sm text-white/70'
						>
							username
						</label>
						<input
							type='text'
							name='username'
							value={formik.values.username}
							onChange={formik.handleChange}
							id='username'
							className='border-white/50 bg-white border w-full rounded p-1 outline-none'
						/>
						<p className='text-xs text-red-500 capitalize'>
							{formik.errors.username}
						</p>
					</div>
					<div className='w-full'>
						<label
							htmlFor='password'
							className='flex flex-col capitalize text-sm text-white/70'
						>
							password
						</label>
						<div className='w-full relative'>
							<input
								type={isShow ? 'text' : 'password'}
								name='password'
								value={formik.values.password}
								onChange={formik.handleChange}
								id='password'
								className='border-white/50 bg-white border w-full rounded p-1 outline-none'
							/>
							{isShow ? (
								<FaRegEyeSlash
									className='cursor-pointer text-gray-500 absolute right-2 top-1/2 -translate-y-1/2'
									onClick={() => setIsShow(false)}
								/>
							) : (
								<FaRegEye
									className='cursor-pointer text-gray-500 absolute right-2 top-1/2 -translate-y-1/2'
									onClick={() => setIsShow(true)}
								/>
							)}
						</div>

						<p className='text-xs text-red-500 capitalize'>
							{formik.errors.password}
						</p>
					</div>
					<label className='flex items-center cursor-pointer gap-2'>
						<input
							type='checkbox'
							name='remember'
							className='outline-none cursor-pointer focus:outline focus:outline-sky-300'
							checked={persist}
							onChange={handleToggle}
						/>
						<span className='text-xs text-gray-300 capitalize'>
							Trust this device
						</span>
					</label>
					<button
						className='bg-pr-green justify-center flex cursor-pointer p-2 rounded shadow-lg shadow-blue-400/50 capitalize font-semibold text-white'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? (
							<ImSpinner9 className='m-auto animate-spin' />
						) : (
							'login'
						)}
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
