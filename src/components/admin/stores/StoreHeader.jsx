import { Input } from 'antd'
import AddStore from './AddStore'

function StoreHeader() {
	return (
		<div className='w-full flex gap-3'>
			<Input
				type='search'
				allowClear
				size='large'
				placeholder='Search for stores'
			/>
			<AddStore />
		</div>
	)
}

export default StoreHeader
