import { Input } from 'antd'
import AddReturn from './AddReturn'
import { useGetReturnsByExecutiveQuery } from '../../../store/apiSlices/querySlices/returnsByExecutive'
import { useSelector } from 'react-redux'
import { User } from 'lucide-react'
import ReturnRow from './ReturnRow'
import ReturnTile from './ReturnTile'
import Loading from '../../loading/Loading'

function Returns() {
	const executiveId = useSelector(state => state.user.user._id)
	const {
		data: returns,
		isSuccess,
		isLoading,
	} = useGetReturnsByExecutiveQuery(executiveId)

	let content
	if (isSuccess) {
		const { ids } = returns
		const tableContent = ids?.length
			? ids.map(returnId => <ReturnRow key={returnId} returnId={returnId} />)
			: null
		const tileContent = ids?.length
			? ids.map(returnId => <ReturnTile key={returnId} returnId={returnId} />)
			: null
		content = (
			<div className='w-full flex flex-col gap-3'>
				<div className='flex gap-3 items-center'>
					<Input
						type='search'
						allowClear
						placeholder='Search for Returns'
						size='large'
					/>
					<AddReturn />
				</div>
				<div className='max-w-full hidden md:block overflow-auto'>
					<table className='w-full   bg-white rounded'>
						<thead className='border-b-2 border-black'>
							<tr>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Store Name
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Date
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Type
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Amount
								</th>
								<th className='p-2 text-gray-500'>Actions</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
				<div className='flex flex-col bg-white rounded md:hidden'>
					{tileContent}
				</div>
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Returns
