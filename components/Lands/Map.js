import Box from 'components/Box';

// TODO(???): move map to canvas if possible
const Map = ({rows, cols, url, plot, plots, selectPlot}) => {
	const rowsArr = [...Array(rows).keys()];
	const colsArr = [...Array(cols).keys()];

	const select = (selectedPlot) => {
		if (selectedPlot.x === plot?.x && selectedPlot.y === plot?.y) return;
		selectPlot(selectedPlot);
	};
	
	return (
		<Box className={'w-full'}>
			<div style={{padding: '5px 1px'}}>
				<div className={'overflow-hidden relative min-w-fit'}>
					<img
						src={url}
						className={'inset-0 relative z-0'}
					/>
					<div className={'flex flex-col absolute inset-0 z-10'}>
						{rowsArr?.map((row) => (
							<div className={'flex'} key={row} style={{height: `calc(100% / ${rows})`}}>
								{colsArr.map((col) => {
									const xCell = col+1;
									const yCell = row+1;
									const isBought = plots?.[`${xCell}-${yCell}`];
									const cellBg = isBought ? isBought?.isOwner ? 'bg-items-epic' : 'bg-blackLight' : 'hover:bg-items-legendary';
									const isActive = (plot?.x === xCell && plot?.y === yCell) ? 'bg-items-legendary' : '';

									return (
										<div
											key={col}
											style={{width: `calc(100% / ${cols})`, cursor: 'pointer', transition: 'all .3s'}}
											className={`border-black border-solid border relative ${cellBg} ${isActive} opacity-80`}
											onClick={() => select(isBought || {x: xCell, y: yCell})}
										/>
									);
								})}
							</div>
						))}
					</div>
				</div>
			</div>
		</Box>
	);
};

export default Map;