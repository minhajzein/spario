import { Input } from 'antd'
import AddTransaction from './AddTransaction'

function TransactionHeader() {
	return (
		<div className='w-full flex gap-3'>
			<Input
				type='search'
				allowClear
				size='large'
				placeholder='Search for transactions'
			/>
			<AddTransaction />
		</div>
	)
}

export default TransactionHeader
