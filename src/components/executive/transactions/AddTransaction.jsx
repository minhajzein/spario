import { DatePicker, Input, Modal, Select } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { ImSpinner9 } from 'react-icons/im'
import { useSelector } from 'react-redux'
import { useGetAllStoresByExecutiveQuery } from '../../../store/apiSlices/querySlices/storeByExecutive'
import { useCreateTransactionMutation } from '../../../store/apiSlices/transactionsApiSlice'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

const types = ['cash', 'cheque', 'rtgs']

function AddTransaction() {
	const [createTransaction, { isLoading }] = useCreateTransactionMutation()

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
			entry: 'credit',
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
				const { data } = await createTransaction(values)
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
				className='flex cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden duration-150 text-xs text-white p-3 rounded-full bg-pr-red gap-1 items-center'
			>
				+Add Transaction
			</button>
			<Modal
				open={isModalOpen}
				onCancel={handleCancel}
				footer={[]}
				title='Add New Transaction'
			>
				<form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
						<div className='flex flex-col'>
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
								'add transaction'
							)}
						</button>
					</div>
				</form>
			</Modal>
		</>
	)
}

export default AddTransaction
