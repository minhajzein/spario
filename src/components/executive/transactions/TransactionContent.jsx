import { Pagination } from 'antd'
import TransactionRow from './TransactionRow'
import TransactionTile from './TransactionTile'
import { IoIosArrowDropright, IoIosArrowDroprightCircle } from 'react-icons/io'

function TransactionContent({ ids, params, setPage, setPageSize, total }) {
	const tableContent = ids?.length
		? ids.map(transactionId => (
				<TransactionRow
					key={transactionId}
					params={params}
					transactionId={transactionId}
				/>
		  ))
		: null

	const tileContent = ids?.length
		? ids.map(transactionId => (
				<TransactionTile
					key={transactionId}
					params={params}
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
			<div className='flex w-full flex-col items-center bg-white py-2  rounded-lg '>
				<Pagination
					total={total}
					showTotal={total => (
						<h1 className='truncate'>Total {total} Transactions</h1>
					)}
					showSizeChanger
					pageSize={params.pageSize}
					onChange={(page, pageSize) => {
						setPage(page)
						setPageSize(pageSize)
					}}
				/>
			</div>
		</>
	)
}

export default TransactionContent
