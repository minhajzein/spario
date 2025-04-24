import { Select } from 'antd'
import { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import {
	useCreateRouteMutation,
	useGetAllRoutesQuery,
} from '../../../store/apiSlices/routeApiSlice'
import { toast } from 'react-toastify'

function RouteInput({ formik }) {
	const { data: routes, isSuccess } = useGetAllRoutesQuery()
	const [createRoute, { isLoading: creatingRoute }] = useCreateRouteMutation()
	const [searchValue, setSearchValue] = useState('')
	const [showAddButton, setShowAddButton] = useState(false)

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
					onSearch={handleSearch}
					showSearch
					optionFilterProp='children'
					filterOption={(input, option) =>
						(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
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
						<CiCirclePlus className={`${createRoute && 'animate-spin'}`} />
					</button>
				)}
			</div>
			{formik.touched.route && (
				<p className='text-pr-red text-xs'>{formik.errors.route}</p>
			)}
		</div>
	)
}

export default RouteInput
