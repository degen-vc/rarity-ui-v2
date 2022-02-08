import Box from 'components/Box';

const BoxWithTitle = ({title, className = '', children}) => {
	return (
		<Box className={`nes-container with-title px-4 pb-8 xs:pb-6 pt-10 xs:pt-8 relative ${className}`}>
			<div className={'bg-white dark:bg-dark-600 z-50 px-2 absolute'} style={{transform: 'translateY(-2.7rem)'}}>{title}</div>
			{children}
		</Box>
	);
};

export default BoxWithTitle;
