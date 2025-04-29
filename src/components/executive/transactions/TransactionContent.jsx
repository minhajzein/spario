import TransactionRow from './TransactionRow'
import TransactionTile from './TransactionTile'

function TransactionContent({ ids, executiveId }) {
	const tableContent = ids?.length
		? ids.map(transactionId => (
				<TransactionRow
					key={transactionId}
					executiveId={executiveId}
					transactionId={transactionId}
				/>
		  ))
		: null

	const tileContent = ids?.length
		? ids.map(transactionId => (
				<TransactionTile
					key={transactionId}
					executiveId={executiveId}
					transactionId={transactionId}
				/>
		  ))
		: null

	return (
		<>
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
								Entry
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
		</>
	)
}

export default TransactionContent
