import { IoReturnDownBackOutline } from 'react-icons/io5'

function AddReturn() {
	return (
		<button className='flex min-w-max items-center text-xs md:text-sm cursor-pointer gap-1 p-3 text-white bg-pr-red rounded-full shadow-lg shadow-black/50'>
			<IoReturnDownBackOutline />
			Add Return
		</button>
	)
}

export default AddReturn
