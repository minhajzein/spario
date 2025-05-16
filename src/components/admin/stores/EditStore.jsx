import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { useGetAllExecutivesQuery } from '../../../store/apiSlices/executiveApiSlice'
import { useUpdateStoreMutation } from '../../../store/apiSlices/storesApiSlice'
import { Input, Modal, Select } from 'antd'
import RouteInput from '../route-manage/RouteInput'
import { ImSpinner9 } from 'react-icons/im'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { RiEditLine } from 'react-icons/ri'

function EditStore({ store }) {
	const user = useSelector(state => state.user.user)
	const { data: executives, isSuccess } = useGetAllExecutivesQuery()
	const [updateStore, { isLoading }] = useUpdateStoreMutation()
	const [isOpen, setIsOpen] = useState(false)

	const handleCancel = () => setIsOpen(false)
	const handleOpen = () => setIsOpen(true)

	const formik = useFormik({
		initialValues: {
			storeName: store?.storeName || '',
			ownerName: store?.ownerName || '',
			contactNumber: store?.contactNumber || '',
			executive: user.role === 'admin' ? store?.executive || '' : user._id,
			route: store?.route || '',
			openingBalance: store?.openingBalance || 0,
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			storeName: Yup.string().required('please provide store name'),
			ownerName: Yup.string().required('enter owner name'),
			contactNumber: Yup.string()
				.matches(
					/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$/,
					'mobile number is not valid'
				)
				.required('please enter contact number'),
			executive: Yup.string().required('please select an executive'),
			openingBalance: Yup.number()
				.min(0, 'opening balance must be greater than or equal to 0')
				.required('enter opening balance'),
			route: Yup.string().required(),
		}),
		onSubmit: async values => {
			try {
				const { data } = await updateStore({ ...values, id: store._id })
				if (data?.success) {
					toast.success(data.message)
					formik.resetForm()
					handleCancel()
				} else toast.error(data?.message)
			} catch (error) {
				console.error(error)
			}
		},
	})

	const handleDiscard = () => {
		formik.resetForm()
	}

	return (
		<>
			<button type='button' className='cursor-pointer' onClick={handleOpen}>
				<RiEditLine className='text-xl text-pr-green' />
			</button>
			<Modal
				open={isOpen}
				title='Add New Store'
				onCancel={handleCancel}
				footer={[]}
			>
				<form
					onSubmit={formik.handleSubmit}
					className='flex flex-col w-full gap-2'
				>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
						<div className='flex flex-col'>
							<label htmlFor='storeName' className='capitalize text-sm'>
								store name
							</label>
							<Input
								type='text'
								name='storeName'
								id='storeName'
								onChange={formik.handleChange}
								value={formik.values.storeName}
							/>
							{formik.touched.storeName && (
								<p className='text-pr-red text-xs'>{formik.errors.storeName}</p>
							)}
						</div>
						<div className='flex flex-col'>
							<label htmlFor='ownerName' className='capitalize text-sm'>
								owner name
							</label>
							<Input
								type='text'
								name='ownerName'
								id='ownerName'
								onChange={formik.handleChange}
								value={formik.values.ownerName}
							/>
							{formik.touched.ownerName && (
								<p className='text-pr-red text-xs'>{formik.errors.ownerName}</p>
							)}
						</div>
						<div className='flex flex-col'>
							<label htmlFor='contactNumber' className='capitalize text-sm'>
								contact number
							</label>
							<Input
								type='text'
								name='contactNumber'
								id='contactNumber'
								onChange={formik.handleChange}
								value={formik.values.contactNumber}
							/>
							{formik.touched.contactNumber && (
								<p className='text-pr-red text-xs'>
									{formik.errors.contactNumber}
								</p>
							)}
						</div>
						<div className='flex  flex-col'>
							<label htmlFor='openingBalance' className='capitalize text-sm'>
								opening balance
							</label>
							<Input
								type='number'
								name='openingBalance'
								id='openingBalance'
								onChange={formik.handleChange}
								value={formik.values.openingBalance}
							/>
							{formik.touched.openingBalance && (
								<p className='text-pr-red text-xs'>
									{formik.errors.openingBalance}
								</p>
							)}
						</div>
						<RouteInput formik={formik} />

						<div className='flex flex-col'>
							<label htmlFor='executive' className='capitalize text-sm'>
								executive
							</label>
							{user.role === 'admin' ? (
								<Select
									value={formik.values.executive}
									onChange={value => formik.setFieldValue('executive', value)}
									placeholder='Select a route'
									className='w-full'
									showSearch
									optionFilterProp='children'
									filterOption={(input, option) =>
										(option?.label ?? '')
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={
										isSuccess && executives
											? Object.values(executives?.entities).map(executive => ({
													label: executive.username,
													value: executive._id,
											  }))
											: []
									}
								/>
							) : (
								<Input value={user.username} disabled />
							)}

							{formik.touched.executive && (
								<p className='text-pr-red text-xs'>{formik.errors.executive}</p>
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
								'save'
							)}
						</button>
					</div>
				</form>
			</Modal>
		</>
	)
}

export default EditStore
