import StoreRow from './StoreRow'
import StoreTile from './StoreTile'

function StoreContent({ ids, executiveId }) {
	const tableContent = ids?.length
		? ids.map(storeId => (
				<StoreRow key={storeId} executiveId={executiveId} storeId={storeId} />
		  ))
		: null

	const tileContent = ids?.length
		? ids.map(storeId => (
				<StoreTile key={storeId} executiveId={executiveId} storeId={storeId} />
		  ))
		: null

	return (
		<>
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
			<div className='w-full md:hidden flex flex-col'>{tileContent}</div>
		</>
	)
}

export default StoreContent
