import DialogBox from	'components/DialogBox';
import {USERS} from 'utils/constants';

const TransferDialogBox = () => {
	return (
		<DialogBox
			options={[
				{label: `Learn how to transfer Craft Materials between ${USERS}`, onClick: () => {
					const win = window.open('https://scarcity.game', '_blank');
					win.focus();
				}
				},
				{label: `Learn how to transfer Gold between ${USERS}`, onClick: () => {
					const win = window.open('https://scarcity.game', '_blank');
					win.focus();
				}},
			]}
		/>
	);
};

export default TransferDialogBox;
