import { Input } from 'antd'
import AddStore from './AddStore'

function StoreHeader({ searchTerm, setSearchTerm }) {
	return (
		<div className='w-full flex gap-3'>
			<Input
				type='search'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				allowClear
				size='large'
				placeholder='Search for stores'
			/>
			<AddStore />
		</div>
	)
}

export default StoreHeader
