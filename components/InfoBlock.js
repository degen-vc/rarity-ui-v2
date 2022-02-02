const InfoBlock = ({name, value = '-', className = '', children}) => (
	<div className={className}>
		<p className={'mb-2 text-blackLight text-xs'}>{name}</p>
		<p className={'text-base'}>{value}</p>
		{children && children}
	</div>
);

export default InfoBlock;
