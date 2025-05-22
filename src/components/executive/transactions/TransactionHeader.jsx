import { DatePicker, Select } from 'antd'
import AddTransaction from './AddTransaction'
import { useGetAllStoresByExecutiveQuery } from '../../../store/apiSlices/querySlices/storeByExecutive'
import dayjs from 'dayjs'
import { useState } from 'react'

const daysOptions = [
	'today',
	'yesterday',
	'last 7 days',
	'last 30 days',
	'custom',
]

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

	const [showRangeInput, setShowRangeInput] = useState(false)

	const getStartOfDay = date => {
		const d = new Date(date)
		d.setHours(0, 0, 0, 0)
		return d
	}

	const handleDateChange = value => {
		const today = getStartOfDay(new Date())
		let newDate = null
		let newFromDate = null
		let newToDate = null

		switch (value) {
			case 'today':
				setShowRangeInput(false)
				newDate = today
				break
			case 'yesterday':
				setShowRangeInput(false)
				newDate = new Date(today)
				newDate.setDate(today.getDate() - 1)
				break
			case 'last 7 days':
				setShowRangeInput(false)
				newFromDate = new Date(today)
				newFromDate.setDate(today.getDate() - 6)
				newToDate = today
				break
			case 'last 30 days':
				setShowRangeInput(false)
				newFromDate = new Date(today)
				newFromDate.setDate(today.getDate() - 29)
				newToDate = today
				break
			case 'custom':
				setDate('custom')
				setFromDate(null)
				setToDate(null)
				setShowRangeInput(true)
				break
			default:
				break
		}

		setDate(newDate)
		setFromDate(newFromDate)
		setToDate(newToDate)
	}

	return (
		<div className='flex flex-col gap-2 bg-white rounded-lg p-2 items-end'>
			<div className='w-full grid grid-cols-2 md:grid-cols-4 items-end gap-2 bg-white rounded-lg'>
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
				<Select
					onChange={handleDateChange}
					placeholder='Filter By Days'
					className='w-full capitalize'
					allowClear
					options={daysOptions.map(option => ({
						label: option,
						value: option,
					}))}
				/>
				{showRangeInput && (
					<>
						<DatePicker
							type='text'
							name='fromDate'
							placeholder='Choose Start Date'
							id='fromDate'
							allowClear={false}
							onChange={value => setFromDate(value.toString())}
							value={fromDate ? dayjs(fromDate) : null}
						/>
						<DatePicker
							type='text'
							name='toDate'
							placeholder='Choose End Date'
							id='toDate'
							allowClear={false}
							onChange={value => setToDate(value.toString())}
							value={toDate ? dayjs(toDate) : null}
						/>
					</>
				)}
			</div>
			<div className='md:hidden'>
				<AddTransaction />
			</div>
		</div>
	)
}

export default TransactionHeader
