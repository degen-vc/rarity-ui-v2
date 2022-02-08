const InfoRow = ({name, value, className}) => (
	<div className={`text-xs m:text-sm w-full flex flex-row justify-between py-2 ${className}`}>
		<span className={'text-left opacity-80 mr-2'}>{name}</span>
		<span className={'text-right flex-1 whitespace-nowrap'}>{value}</span>
	</div>
);
export default InfoRow;
