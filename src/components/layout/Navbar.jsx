import { useLocation, useNavigate } from 'react-router-dom'
import {
	FcConferenceCall,
	FcDataConfiguration,
	FcHome,
	FcQuestions,
} from 'react-icons/fc'
import usePersist from '../../hooks/usePersist'
import { useLogoutMutation } from '../../store/apiSlices/authApiSlice'
import { useSelector } from 'react-redux'
import AddInvoice from '../admin/invoices/AddInvoice'
import AddTransaction from '../executive/transactions/AddTransaction'

function Navbar() {
	const { pathname } = useLocation()
	const user = useSelector(state => state.user.user)
	const navigate = useNavigate()
	const [persist, setPersist] = usePersist()
	const [clear, { isLoading }] = useLogoutMutation()

	const sendLogout = async () => {
		try {
			await clear()
			setPersist(false)
			navigate('/login')
		} catch (error) {
			console.error(error)
		}
	}

	const handleTitle = () => {
		const splittedPathName = pathname.split('/')
		if (pathname.includes('admin')) {
			if (splittedPathName[2]) return splittedPathName[2]
			else return 'dashboard'
		} else {
			if (splittedPathName[1]) return splittedPathName[1]
			else return 'dashboard'
		}
	}

	return (
		<div className='md:bg-white bg-primary z-50 w-full relative shadow-lg shadow-black/50 flex items-center justify-between  p-5'>
			<h1 className='capitalize md:text-xl text-white md:text-black'>
				{handleTitle()}
			</h1>
			<div className='flex gap-5'>
				<div className='md:flex gap-2 hidden items-center'>
					{user?.role === 'admin' ? (
						<h1>Welcome Admin</h1>
					) : (
						<h1>Welcome {user?.username}</h1>
					)}
				</div>
				<div className='md:flex gap-2 hidden items-center'>
					{user?.role === 'admin' ? <AddInvoice /> : <AddTransaction />}
				</div>
				<button
					onClick={sendLogout}
					className='rounded-xl md:border text-pr-red cursor-pointer text-theme-red border-pr-red md:px-5'
				>
					{isLoading ? (
						<Loading3QuartersOutlined className='animate-spin' />
					) : (
						<span>
							<h1 className='hidden md:block'>Logout</h1>
							<img src='/images/logout.png' alt='' />
						</span>
					)}
				</button>
			</div>
		</div>
	)
}

export default Navbar
