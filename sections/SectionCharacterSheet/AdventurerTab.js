import {useState} from 'react';
import	Box					from	'components/Box';
import	Skills				from	'sections/SectionCharacterSheet/Skills';
import	Feats				from	'sections/SectionCharacterSheet/Feats';
import	Inventory			from	'sections/SectionCharacterSheet/Inventory';

const	AdventurerTab = ({adventurer, updateRarity, provider}) => {
	const	[selectedTab, set_selectedTab] = useState(0);

	return (
		<Box className={'flex flex-col w-full mt-2'}>
			<div className={'flex flex-col md:flex-row w-full space-x-0 md:-space-x-1'}>
				<div
					onClick={() => set_selectedTab(0)}
					className={`w-full cursor-pointer text-center border-solid ${selectedTab === 0 ? 'border-b-0 bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600' : 'border-b-0 md:border-b-4'} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Skills'}</p>
				</div>
				<div
					onClick={() => set_selectedTab(1)}
					className={`w-full cursor-pointer text-center border-solid border-l-0 md:border-l-4 ${selectedTab === 1 ? 'bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600 border-b-0' : 'border-b-0 md:border-b-4'} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Feats'}</p>
				</div>
				<div
					onClick={() => set_selectedTab(2)}
					className={`w-full cursor-pointer text-center border-solid border-l-0 md:border-l-4 ${selectedTab === 2 ? 'bg-gray-principal md:bg-white dark:bg-dark-400 md:dark:bg-dark-600 border-b-4 md:border-b-0' : 'border-b-4 md:border-b-4'} border-black dark:border-dark-100 text-center py-4`}>
					<p>{'Inventory'}</p>
				</div>
			</div>
			<div className={'w-full border-black dark:border-dark-100 py-4 md:-mt-1'}>
				{selectedTab === 0 ? <Skills adventurer={adventurer} updateRarity={updateRarity} provider={provider} /> : null}
				{selectedTab === 1 ? <Feats adventurer={adventurer} updateRarity={updateRarity} provider={provider} /> : null}
				{selectedTab === 2 ? <Inventory adventurer={adventurer} /> : null}			</div>
		</Box>
	);
};

export default AdventurerTab;