import { DatePicker, Input, Select } from 'antd'
import AddTransaction from './AddTransaction'
import { useGetAllStoresByExecutiveQuery } from '../../../store/apiSlices/querySlices/storeByExecutive'
import dayjs from 'dayjs'

function TransactionHeader({
	executiveId,
	store,
	setStore,
	date,
	setDate,
	toDate,
	setToDate,
	fromDate,
	setFromDate,
}) {
	const { data: stores, isSuccess } =
		useGetAllStoresByExecutiveQuery(executiveId)
	console.log(store, date, fromDate, toDate)

	return (
		<div className='w-full grid grid-cols-2 md:grid-cols-6 gap-2 bg-white p-1 rounded-lg'>
			<Select
				value={store}
				onChange={value => setStore(value)}
				placeholder='Filter By Store'
				className='w-full'
				allowClear
				showSearch
				optionFilterProp='children'
				filterOption={(input, option) =>
					(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
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
			<DatePicker
				type='text'
				name='date'
				placeholder='Filter By Date'
				id='date'
				allowClear={false}
				onChange={value => setDate(value.toString())}
				value={dayjs(date?.toString())}
			/>
			<DatePicker
				type='text'
				name='fromDate'
				placeholder='Filter By Date'
				id='fromDate'
				allowClear={false}
				onChange={value => setFromDate(value.toString())}
				value={dayjs(fromDate?.toString())}
			/>
			<DatePicker
				type='text'
				name='toDate'
				placeholder='Filter By Date'
				id='toDate'
				allowClear={false}
				onChange={value => setToDate(value.toString())}
				value={dayjs(toDate?.toString())}
			/>
			<div className='md:hidden'>
				<AddTransaction />
			</div>
		</div>
	)
}

export default TransactionHeader
