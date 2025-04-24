import { useState } from 'react'
import StoreForm from './StoreForm'

function AddStore({ store }) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleModal = () => setIsModalOpen(true)

	return (
		<>
			<button
				onClick={handleModal}
				className='flex min-w-max items-center text-xs md:text-sm cursor-pointer gap-1 p-3 text-white bg-pr-red rounded-full shadow-lg shadow-black/50'
			>
				<img src='/images/active-store.png' alt='' />
				<h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
					Add Store
				</h1>
			</button>{' '}
			<StoreForm
				store={store}
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
			/>
		</>
	)
}

export default AddStore
