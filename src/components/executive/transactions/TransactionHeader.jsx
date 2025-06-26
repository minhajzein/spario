import { DatePicker, Input, Select } from 'antd'
import AddTransaction from './AddTransaction'
import { useGetAllStoresByExecutiveQuery } from '../../../store/apiSlices/querySlices/storeByExecutive'
import dayjs from 'dayjs'
import { useState } from 'react'
import { BsDownload } from 'react-icons/bs'

const daysOptions = [
	'Today',
	'Yesterday',
	'Last 7 Days',
	'Last 30 Days',
	'Custom',
]

function TransactionHeader({
	executiveId,
	store,
	setStore,
	setDate,
	toDate,
	setToDate,
	fromDate,
	setFromDate,
	total,
	handleExport,
}) {
	const { data: stores, isSuccess } =
		useGetAllStoresByExecutiveQuery(executiveId)

	const [showRangeInput, setShowRangeInput] = useState(false)

	const getStartOfDay = date => {
		const d = new Date(date)
		d.setHours(0, 0, 0, 0)
		return d
	}

	const getEndOfDay = date => {
		const d = new Date(date)
		d.setHours(23, 59, 59, 999)
		return d
	}

	const handleDateChange = value => {
		const todayStart = getStartOfDay(new Date())
		const todayEnd = getEndOfDay(new Date())

		let newDate = null
		let newFromDate = null
		let newToDate = null

		switch (value) {
			case 'Today':
				setShowRangeInput(false)
				newDate = todayStart
				break
			case 'Yesterday':
				setShowRangeInput(false)
				newDate = new Date(todayStart)
				newDate.setDate(todayStart.getDate() - 1)
				break
			case 'Last 7 Days':
				setShowRangeInput(false)
				newFromDate = new Date(todayStart)
				newFromDate.setDate(todayStart.getDate() - 6)
				newToDate = todayEnd // Important!
				break
			case 'Last 30 Days':
				setShowRangeInput(false)
				newFromDate = new Date(todayStart)
				newFromDate.setDate(todayStart.getDate() - 29)
				newToDate = todayEnd
				break
			case 'Custom':
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
			<div className='w-full grid grid-cols-2 md:grid-cols-5 items-end gap-2 bg-white rounded-lg'>
				<div className='text-center flex gap-2 items-center'>
					<Input value={`Total ${total} Entries`} disabled />
					<BsDownload
						onClick={handleExport}
						className='cursor-pointer border h-full border-gray-500 rounded p-1 text-pr-red'
					/>
				</div>
				<div className='md:hidden'>
					<AddTransaction />
				</div>
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
		</div>
	)
}

export default TransactionHeader
