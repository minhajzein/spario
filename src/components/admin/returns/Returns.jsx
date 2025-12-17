import React, { useState } from 'react'
import { useGetAllReturnsQuery } from '../../../store/apiSlices/returnApiSlice'
import Loading from '../../loading/Loading'
import { Input, Pagination } from 'antd'
import ReturnRow from './ReturnRow'
import ReturnTile from './ReturnTile'

function Returns() {
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	const { data: returns, isSuccess, isLoading } = useGetAllReturnsQuery({
		search: searchTerm,
		page,
		limit: pageSize,
	})

	let content

	if (isSuccess && returns) {
		const { ids, total } = returns
		const tableContent = ids?.length
			? ids.map(returnId => (
					<ReturnRow 
						key={returnId} 
						returnId={returnId}
						queryParams={{ search: searchTerm, page, limit: pageSize }}
					/>
			  ))
			: null
		const tileContent = ids?.length
			? ids.map(returnId => (
					<ReturnTile 
						key={returnId} 
						returnId={returnId}
						queryParams={{ search: searchTerm, page, limit: pageSize }}
					/>
			  ))
			: null
		content = (
			<div className='w-full flex flex-col gap-3'>
				<div className='flex gap-3 items-center'>
					<Input
						type='search'
						value={searchTerm}
						onChange={e => {
							setSearchTerm(e.target.value)
							setPage(1)
						}}
						allowClear
						placeholder='Search for Returns'
						size='large'
					/>
				</div>
				<div className='max-w-full hidden md:block overflow-auto'>
					<table className='w-full   bg-white rounded'>
						<thead className='border-b-2 border-black'>
							<tr>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Store Name
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Executive
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
				<div className='flex w-full flex-col items-center bg-white py-2 rounded-lg'>
					<Pagination
						total={total}
						showTotal={total => (
							<h1 className='truncate'>Total {total} Returns</h1>
						)}
						showSizeChanger
						pageSize={pageSize}
						current={page}
						onShowSizeChange={(current, size) => {
							setPage(current)
							setPageSize(size)
						}}
						onChange={(page, size) => {
							setPage(page)
							setPageSize(size)
						}}
					/>
				</div>
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Returns
