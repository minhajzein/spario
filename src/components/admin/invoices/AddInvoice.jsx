import { DatePicker, Input, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { useCreateInvoiceMutation } from '../../../store/apiSlices/invoiceApiSlice'
import { toast } from 'react-toastify'
import { useGetAllStoresQuery } from '../../../store/apiSlices/storesApiSlice'

function AddInvoice() {
	const [createInvoice, { isLoading }] = useCreateInvoiceMutation()
	const {
		data: stores,
		isLoading: fetchingStores,
		isSuccess,
	} = useGetAllStoresQuery()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const handleCancel = () => setIsModalOpen(false)
	const handleModal = () => setIsModalOpen(true)

	const formik = useFormik({
		initialValues: {
			store: '',
			amount: 0,
			billDate: dayjs().toString(),
			dueDate: dayjs().toString(),
			reference: '',
		},
		validationSchema: Yup.object({
			store: Yup.string().required(),
			reference: Yup.string().required(),
			billDate: Yup.date().required('please add a bill date'),
			dueDate: Yup.date().required('please add a due date'),
			amount: Yup.number().moreThan(0).required(),
		}),
		onSubmit: async values => {
			try {
				const { data } = await createInvoice(values)
				if (data?.success) {
					toast.success(data?.message)
					formik.resetForm()
					handleCancel()
				} else toast.error(data?.message)
			} catch (error) {
				console.error(error)
			}
		},
	})

	const handleDiscard = () => formik.resetForm()

	return (
		<>
			<button
				onClick={handleModal}
				className='flex min-w-max items-center text-xs md:text-sm py-1 cursor-pointer gap-1 px-4 text-white bg-pr-red rounded-lg shadow-lg shadow-black/50'
			>
				<img src='/images/active-transactions.png' alt='' />
				<h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
					Add Invoice
				</h1>
			</button>
			<Modal
				open={isModalOpen}
				onCancel={handleCancel}
				title='Add Invoice'
				footer={null}
			>
				<form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
						<div className='flex flex-col col-span-2'>
							<label htmlFor='store' className='capitalize text-sm'>
								store
							</label>
							<Select
								value={formik.values.store}
								onChange={value => formik.setFieldValue('store', value)}
								placeholder='Select a store'
								className='w-full'
								showSearch
								loading={fetchingStores}
								allowClear
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
							<label htmlFor='reference' className='capitalize text-sm'>
								reference
							</label>
							<Input
								type='text'
								name='reference'
								id='reference'
								onChange={formik.handleChange}
								value={formik.values.reference}
							/>
							{formik.touched.reference && (
								<p className='text-pr-red text-xs'>{formik.errors.reference}</p>
							)}
						</div>

						<div className='flex flex-col'>
							<label htmlFor='billDate' className='capitalize text-sm'>
								bill Date
							</label>
							<DatePicker
								type='text'
								name='billDate'
								id='billDate'
								onChange={value =>
									formik.setFieldValue(
										'billDate',
										value ? value.toString() : ''
									)
								}
								value={dayjs(formik.values.billDate)}
							/>
							{formik.touched.billDate && (
								<p className='text-pr-red text-xs'>{formik.errors.billDate}</p>
							)}
						</div>
						<div className='flex flex-col'>
							<label htmlFor='dueDate' className='capitalize text-sm'>
								due Date
							</label>
							<DatePicker
								type='text'
								name='dueDate'
								id='dueDate'
								onChange={value =>
									formik.setFieldValue('dueDate', value ? value.toString() : '')
								}
								value={dayjs(formik.values.dueDate)}
							/>
							{formik.touched.dueDate && (
								<p className='text-pr-red text-xs'>{formik.errors.dueDate}</p>
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

export default AddInvoice
