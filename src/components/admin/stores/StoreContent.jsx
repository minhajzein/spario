import { Pagination } from 'antd'
import StoreRow from './StoreRow'
import StoreTile from './StoreTile'

function StoreContent({ ids, total, page, pageSize, setPage, setPageSize, queryParams }) {
	const tableContent = ids?.length
		? ids.map(storeId => (
				<StoreRow 
					key={storeId} 
					storeId={storeId}
					queryParams={queryParams}
				/>
		  ))
		: null

	const tileContent = ids?.length
		? ids.map(storeId => (
				<StoreTile 
					key={storeId} 
					storeId={storeId}
					queryParams={queryParams}
				/>
		  ))
		: null

	return (
		<div className='flex flex-col w-full gap-3'>
			<div className='max-w-full hidden md:block overflow-auto'>
				<table className='w-full   bg-white rounded'>
					<thead className='border-b-2 border-black'>
						<tr>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Name
							</th>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Owner
							</th>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Contact
							</th>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Executive
							</th>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Debit
							</th>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Credit
							</th>
							<th className='p-2 border-r border-gray-300 text-gray-500'>
								Balance
							</th>
							<th className='p-2 text-gray-500'>Actions</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
			</div>
			<div className='flex flex-col md:hidden'>{tileContent}</div>
			<div className='flex w-full flex-col items-center bg-white py-2 rounded-lg'>
				<Pagination
					total={total}
					showTotal={total => (
						<h1 className='truncate'>Total {total} Stores</h1>
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

export default StoreContent
