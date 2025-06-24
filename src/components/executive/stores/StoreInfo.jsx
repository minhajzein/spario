function StoreInfo({ store }) {
	if (!store) return null
	return (
		<div className='bg-white flex flex-col gap-1'>
			<div className='flex justify-between items-center gap-3'>
				<div className='font-semibold'>Store Name:</div>
				<div>{store?.storeName}</div>
			</div>
			<div className='flex justify-between items-center gap-3'>
				<div className='font-semibold'>Owner Name:</div>
				<div>{store?.ownerName}</div>
			</div>
			<div className='flex justify-between items-center gap-3'>
				<div className='font-semibold'>Contact Number:</div>
				<div>{store?.contactNumber}</div>
			</div>
			<div className='flex justify-between items-center gap-3'>
				<div className='font-semibold'>Opening Balance:</div>
				<div>{store?.openingBalance}</div>
			</div>
			<div className='flex justify-between items-center gap-3'>
				<div className='font-semibold'>Total Outstanding:</div>
				<div>{store?.totalOutstanding}</div>
			</div>
			<div className='flex justify-between items-center gap-3'>
				<div className='font-semibold'>Paid Amount:</div>
				<div>{store?.paidAmount}</div>
			</div>
			<div className='flex justify-between items-center gap-3'>
				<div className='font-semibold'>Balance:</div>
				<div>{store?.balance}</div>
			</div>
		</div>
	)
}

export default StoreInfo
