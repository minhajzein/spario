import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
	const user = useSelector(state => state.user.user)
	const navigate = useNavigate()
	const handleNavigate = () => {
		if (user.role === 'admin') {
			navigate('/admin', { replace: true })
		} else {
			navigate('/', { replace: true })
		}
	}
	return (
		<section>
			<div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
				<div className='mx-auto max-w-screen-sm text-center'>
					<h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary '>
						404
					</h1>
					<p className='mb-4 text-3xl text-primary tracking-tight font-bold md:text-4xl'>
						Something's missing.
					</p>
					<p className='mb-4 text-lg font-light text-gray-600'>
						Sorry, we can't find that page. You'll find lots to explore on the
						home page.
					</p>
					<button
						onClick={handleNavigate}
						className='inline-flex cursor-pointer text-white bg-primary hover:bg-blue-600 duration-150 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4'
					>
						Back to Homepage
					</button>
				</div>
			</div>
		</section>
	)
}

export default PageNotFound
