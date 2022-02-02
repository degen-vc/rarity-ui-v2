import	Image							     from	'next/image';
import	Box								     from	'components/Box';

const HeroHeader = ({imageUrl = '/avatar/facu.png', children}) => {
	return (
		<div className={'flex flex-col md:flex-row items-center mb-8 md:mb-8'}>
			<div className={'w-auto md:w-64 mr-0 md:mr-8'} style={{minWidth: 256}}>
				<Image
					src={imageUrl}
					loading={'eager'}
					quality={100}
					width={256}
					height={256} />
			</div>
			<Box className={'p-4'}>{children}</Box>
		</div>
	);
};

export default HeroHeader;
