const InfoRow = ({name, value, className}) => (
	<div className={`w-full flex flex-row items-center justify-between py-2 ${className}`}>
		<span className={'text-left opacity-80 text-xs md:text-sm mr-2 max-w-fit '}>{name}</span>
		<span className={'text-right min-w-fit'}>{value}</span>
	</div>
);
export default InfoRow;
