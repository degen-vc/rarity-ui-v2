import  TransferHeader        from 'components/transfer/TransferHeader';
import  TransferDialogBox     from 'components/transfer/TransferDialogBox';
import  TransferForm          from 'components/transfer/TransferForm'; 

const Transfer = () => {
	return (
		<section className={'max-w-full'}>
			<div className={'max-w-screen-lg w-full mx-auto'}>
				<TransferHeader />
				<TransferDialogBox />
				<TransferForm />
			</div>
		</section>
	);
};

export default Transfer;
