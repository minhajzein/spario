import { Input } from 'antd'

function Returns() {
	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='flex gap-3 items-center'>
				<Input
					type='search'
					allowClear
					placeholder='Search for Returns'
					size='large'
				/>
			</div>
		</div>
	)
}

export default Returns
