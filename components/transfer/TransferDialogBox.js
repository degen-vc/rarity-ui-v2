import DialogBox from	'components/DialogBox';

const TransferDialogBox = () => {
	return (
		<DialogBox
			options={[
				{label: 'Learn how to transfer Craft Materials between Adventurers', onClick: () => {
					const win = window.open('https://scarcity.game', '_blank');
					win.focus();
				}
				},
				{label: 'Learn how to transfer Gold between Adventurers', onClick: () => {
					const win = window.open('https://scarcity.game', '_blank');
					win.focus();
				}},
			]}
		/>
	);
};

export default TransferDialogBox;
