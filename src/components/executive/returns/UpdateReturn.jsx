import { RiEditLine } from 'react-icons/ri'
import { useUpdateReturnMutation } from '../../../store/apiSlices/returnApiSlice'
import { useEffect, useState } from 'react'
import { DatePicker, Input, Modal, Select } from 'antd'
import { ImSpinner9 } from 'react-icons/im'
import { useSelector } from 'react-redux'
import { useGetAllStoresQuery } from '../../../store/apiSlices/storesApiSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

const types = ['cash', 'cheque', 'rtgs']

function UpdateReturn({ rtn }) {
	const [editReturn, { isLoading }] = useUpdateReturnMutation()

	const user = useSelector(state => state.user.user)
	const { data: stores, isSuccess } = useGetAllStoresQuery()

	const [filteredStores, setFilteredStores] = useState([])
	const [balance, setBalance] = useState(0)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const handleModal = () => setIsModalOpen(true)
	const handleCancel = () => setIsModalOpen(false)

	const formik = useFormik({
		initialValues: {
			store: rtn.store._id,
			amount: rtn.amount,
			type: rtn.type,
			date: rtn.date,
		},
		enableReinitialize: true,
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
				const { data } = await editReturn({ ...values, id: rtn._id })
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
		if (user.role === 'admin' && isSuccess) {
			setFilteredStores(Object.values(stores?.entities))
		} else if (user.role === 'executive' && isSuccess) {
			setFilteredStores(
				Object.values(stores?.entities).filter(
					store => store.executive._id === user._id
				)
			)
		}
		if (formik.values.store !== '') {
			const selected = stores?.entities?.[formik.values.store]
			if (selected) setBalance(selected.balance)
		}
	}, [formik.values.store, isSuccess])

	return (
		<>
			<button type='button' className='cursor-pointer' onClick={handleModal}>
				<RiEditLine className='text-xl text-pr-green' />
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
								options={filteredStores.map(store => ({
									label: store.storeName,
									value: store._id,
								}))}
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
								'update return'
							)}
						</button>
					</div>
				</form>
			</Modal>
		</>
	)
}

export default UpdateReturn
