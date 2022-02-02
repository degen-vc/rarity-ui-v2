import DialogBox from	'components/DialogBox';

const LaunchDialogBox = () => {	
	return (
		<DialogBox
			options={[{label: 'Nevermind', onClick: () => console.log('+')}]}
		/>
	);
};

export default LaunchDialogBox;
