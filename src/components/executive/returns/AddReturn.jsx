import { DatePicker, Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import { IoReturnDownBackOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useGetAllStoresByExecutiveQuery } from '../../../store/apiSlices/querySlices/storeByExecutive'
import { useFormik } from 'formik'
import { useCreateReturnMutation } from '../../../store/apiSlices/returnApiSlice'
import { ImSpinner9 } from 'react-icons/im'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

const types = ['cash', 'cheque', 'rtgs']

function AddReturn() {
	const [createReturn, { isLoading }] = useCreateReturnMutation()

	const user = useSelector(state => state.user.user)
	const { data: stores, isSuccess } = useGetAllStoresByExecutiveQuery(user._id)

	const [balance, setBalance] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const handleCancel = () => setIsModalOpen(false)
	const handleModal = () => setIsModalOpen(true)
	const formik = useFormik({
		initialValues: {
			store: '',
			amount: 0,
			executive: user?._id,
			type: '',
			date: dayjs().toString(),
		},
		validationSchema: Yup.object({
			store: Yup.string().required(),
			date: Yup.date().required(),
			type: Yup.string().required(),
			amount: Yup.number()
				.moreThan(0)
				.lessThan(balance + 1)
				.required(),
		}),
		onSubmit: async values => {
			try {
				const { data } = await createReturn(values)
				if (data?.success) {
					toast.success(data?.message)
					formik.resetForm()
					setBalance(0)
					handleCancel()
				} else toast.error(data?.message)
			} catch (error) {
				console.error(error)
			}
		},
	})

	const handleDiscard = () => formik.resetForm()

	const handleDate = value => {
		formik.setFieldValue('date', value ? value.toString() : '')
	}

	useEffect(() => {
		if (formik.values.store !== '') {
			const selected = stores?.entities?.[formik.values.store]
			if (selected) setBalance(selected.balance)
		}
	}, [formik.values.store])
	return (
		<>
			<button
				type='button'
				onClick={handleModal}
				className='flex min-w-max items-center text-xs md:text-sm cursor-pointer gap-1 p-3 text-white bg-pr-red rounded-full shadow-lg shadow-black/50'
			>
				<IoReturnDownBackOutline />
				Add Return
			</button>
			<Modal
				open={isModalOpen}
				onCancel={handleCancel}
				footer={[]}
				title='Add New Return'
			>
				<form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
						<div className='flex flex-col col-span-full'>
							<label htmlFor='store' className='capitalize text-sm'>
								store
							</label>
							<Select
								value={formik.values.store}
								onChange={value => formik.setFieldValue('store', value)}
								placeholder='Select a store'
								className='w-full'
								showSearch
								optionFilterProp='children'
								filterOption={(input, option) =>
									(option?.label ?? '')
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={
									isSuccess
										? Object.values(stores?.entities).map(store => ({
												label: store.storeName,
												value: store._id,
										  }))
										: []
								}
							/>

							{formik.touched.store && (
								<p className='text-pr-red text-xs'>{formik.errors.store}</p>
							)}
						</div>
						<div className='flex flex-col'>
							<label htmlFor='balance' className='capitalize text-sm'>
								Balance
							</label>
							<Input
								type='text'
								disabled
								name='balance'
								id='balance'
								value={balance}
							/>
						</div>
						<div className='flex flex-col'>
							<label htmlFor='amount' className='capitalize text-sm'>
								Amount
							</label>
							<Input
								type='text'
								name='amount'
								id='amount'
								onChange={formik.handleChange}
								value={formik.values.amount}
							/>
							{formik.touched.amount && (
								<p className='text-pr-red text-xs'>{formik.errors.amount}</p>
							)}
						</div>
						<div className='flex flex-col'>
							<label htmlFor='type' className='capitalize text-sm'>
								type
							</label>
							<Select
								value={formik.values.type}
								onChange={value => formik.setFieldValue('type', value)}
								placeholder='Select a type'
								className='w-full'
								showSearch
								optionFilterProp='children'
								filterOption={(input, option) =>
									(option?.label ?? '')
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								options={types.map(type => ({
									label: type,
									value: type,
								}))}
							/>

							{formik.touched.type && (
								<p className='text-pr-red text-xs'>{formik.errors.type}</p>
							)}
						</div>
						<div className='flex flex-col'>
							<label htmlFor='date' className='capitalize text-sm'>
								date
							</label>
							<DatePicker
								type='text'
								name='date'
								id='date'
								allowClear={false}
								onChange={value => handleDate(value)}
								value={dayjs(formik.values.date)}
							/>
							{formik.touched.date && (
								<p className='text-pr-red text-xs'>{formik.errors.date}</p>
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
								'add return'
							)}
						</button>
					</div>
				</form>
			</Modal>
		</>
	)
}

export default AddReturn
