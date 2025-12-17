import { Input, Pagination } from 'antd'
import { useState } from 'react'
import ExecutiveForm from './ExecutiveForm'
import { useGetAllExecutivesQuery } from '../../../store/apiSlices/executiveApiSlice'
import ExecutiveRow from './ExecutiveRow'
import Loading from '../../loading/Loading'

function Executives() {
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	const { data: executives, isLoading, isSuccess } = useGetAllExecutivesQuery({
		search: searchTerm,
		page,
		limit: pageSize,
	})
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentExecutive, setCurrentExecutive] = useState(null)

	const handleModal = () => {
		setCurrentExecutive(null)
		setIsModalOpen(true)
	}
	let content
	if (isSuccess && executives) {
		const { ids, total } = executives
		const tableContent = ids?.length
			? ids.map(executiveId => (
					<ExecutiveRow 
						key={executiveId} 
						executiveId={executiveId}
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
						placeholder='Search for executives'
						size='large'
					/>
					<button
						onClick={handleModal}
						className='flex min-w-max items-center text-xs md:text-sm p-3 cursor-pointer gap-1 text-white bg-pr-red rounded-full shadow-lg shadow-black/50'
					>
						<img src='/images/active-executives.png' alt='' />
						<h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
							Add Executive
						</h1>
					</button>
				</div>
				<div className='w-full overflow-auto'>
					<table className='w-full bg-white rounded'>
						<thead className='border-b-2 border-black'>
							<tr>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Name
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Password
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Contact
								</th>
								<th className='p-2 border-r border-gray-300 text-gray-500'>
									Status
								</th>
								<th className='p-2 text-gray-500'>Actions</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
				<div className='flex w-full flex-col items-center bg-white py-2 rounded-lg'>
					<Pagination
						total={total}
						showTotal={total => (
							<h1 className='truncate'>Total {total} Executives</h1>
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
				<ExecutiveForm
					isOpen={isModalOpen}
					executive={currentExecutive}
					setIsOpen={setIsModalOpen}
				/>
			</div>
		)
	}

	return isLoading ? <Loading /> : content
}

export default Executives
