import { Input, Modal, Select } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
	useCreateRouteMutation,
	useGetAllRoutesQuery,
} from '../../../store/apiSlices/routeApiSlice'
import { useState } from 'react'
import { useCreateExecutiveMutation } from '../../../store/apiSlices/executiveApiSlice'
import { CiCirclePlus } from 'react-icons/ci'
import { toast } from 'react-toastify'
import { ImSpinner9 } from 'react-icons/im'

function ExecutiveForm({ isOpen, setIsOpen, executive }) {
	const handleCancel = () => setIsOpen(false)
	const [createExecutive, { isLoading }] = useCreateExecutiveMutation()
	const {
		data: routes,
		isLoading: fetchingRoutes,
		isSuccess,
	} = useGetAllRoutesQuery()
	const [createRoute, { isLoading: creatingRoute }] = useCreateRouteMutation()
	const [searchValue, setSearchValue] = useState('')
	const [showAddButton, setShowAddButton] = useState(false)

	const formik = useFormik({
		initialValues: {
			username: executive?.username || '',
			password: executive?.password || '',
			phone: executive?.phone || '',
			route: executive?.route || '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required(),
			password: Yup.string().required(),
			phone: Yup.string()
				.matches(
					/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$/,
					'mobile number is not valid'
				)
				.required(),
			route: Yup.string().required(),
		}),
		onSubmit: async values => {
			try {
				const { data } = await createExecutive(values)
				if (data?.success) {
					toast.success(data?.message)
					handleDiscard()
					handleCancel()
				} else toast.error(data?.message)
			} catch (error) {
				console.error(error)
			}
		},
	})

	function handleDiscard() {
		formik.resetForm()
	}

	const addRoute = async () => {
		try {
			const { data } = await createRoute({ route: searchValue })
			if (data?.success) {
				toast.success(data?.message)
				formik.setFieldValue('route', searchValue)
				setShowAddButton(false)
			} else {
				toast.error(data?.message)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleSearch = value => {
		setSearchValue(value)
		const routeArray = Object.values(routes?.entities)
		const sameRoute = routeArray.find(
			route => route.route.toLowerCase() === value.toLowerCase()
		)
		if (sameRoute) setShowAddButton(false)
		else setShowAddButton(true)
	}

	return (
		<Modal
			open={isOpen}
			title='Add New Executive'
			onCancel={handleCancel}
			footer={[]}
		>
			<form
				onSubmit={formik.handleSubmit}
				className='flex flex-col w-full gap-2'
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
					<div className='flex flex-col'>
						<label htmlFor='username' className='capitalize text-sm'>
							username
						</label>
						<Input
							type='text'
							name='username'
							id='username'
							onChange={formik.handleChange}
							value={formik.values.username}
						/>
						{formik.touched.username && (
							<p className='text-pr-red text-xs'>{formik.errors.username}</p>
						)}
					</div>
					<div className='flex flex-col'>
						<label htmlFor='password' className='capitalize text-sm'>
							password
						</label>
						<Input
							type='text'
							name='password'
							id='password'
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
						{formik.touched.password && (
							<p className='text-pr-red text-xs'>{formik.errors.password}</p>
						)}
					</div>
					<div className='flex flex-col'>
						<label htmlFor='phone' className='capitalize text-sm'>
							Phone number
						</label>
						<Input
							type='text'
							name='phone'
							id='phone'
							onChange={formik.handleChange}
							value={formik.values.phone}
						/>
						{formik.touched.phone && (
							<p className='text-pr-red text-xs'>{formik.errors.phone}</p>
						)}
					</div>
					<div className='flex flex-col'>
						<label htmlFor='route' className='capitalize text-sm'>
							Route
						</label>
						<div className='flex gap-2'>
							<Select
								value={formik.values.route}
								onChange={value => formik.setFieldValue('route', value)}
								placeholder='Select a route'
								className='w-full'
								loading={fetchingRoutes}
								onSearch={handleSearch}
								showSearch
								optionFilterProp='children'
								filterOption={(input, option) =>
									(option?.label ?? '')
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={
									isSuccess
										? Object.values(routes?.entities).map(route => ({
												label: route.route,
												value: route.route,
										  }))
										: []
								}
							/>
							{showAddButton && searchValue !== '' && (
								<button
									disabled={creatingRoute}
									type='button'
									title='Add new route'
									onMouseDown={addRoute}
									className='border border-pr-green cursor-pointer text-pr-green px-2 rounded'
								>
									<CiCirclePlus
										className={`${createRoute && 'animate-spin'}`}
									/>
								</button>
							)}
						</div>

						{formik.touched.route && (
							<p className='text-pr-red text-xs'>{formik.errors.route}</p>
						)}
					</div>
				</div>
				<div className='grid grid-cols-2 gap-2'>
					<button
						type='button'
						disabled={isLoading}
						onClick={handleDiscard}
						className='capitalize bg-pr-red text-white p-2 rounded-lg shadow-lg cursor-pointer shadow-black/50'
					>
						discard
					</button>
					<button
						type='submit'
						disabled={isLoading}
						className='capitalize bg-pr-green text-white p-2 rounded-lg shadow-lg cursor-pointer shadow-black/50'
					>
						{isLoading ? (
							<ImSpinner9 className='m-auto animate-spin' />
						) : (
							'add executive'
						)}
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default ExecutiveForm
