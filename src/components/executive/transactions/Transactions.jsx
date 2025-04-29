import { useSelector } from 'react-redux'
import { useGetAllTransactionsByExecutiveQuery } from '../../../store/apiSlices/querySlices/transactionsByExecutive'
import Loading from '../../loading/Loading'
import TransactionContent from './TransactionContent'
import TransactionHeader from './TransactionHeader'

function Transactions() {
	const executiveId = useSelector(state => state.user.user._id)
	const {
		data: transactions,
		isSuccess,
		isLoading,
	} = useGetAllTransactionsByExecutiveQuery(executiveId)

	let content

	if (isSuccess) {
		const { ids } = transactions

		content = (
			<div className='flex flex-col w-full gap-3'>
				<TransactionHeader />
				<TransactionContent executiveId={executiveId} ids={ids} />
			</div>
		)
	}
	return isLoading ? <Loading /> : content
}

export default Transactions
