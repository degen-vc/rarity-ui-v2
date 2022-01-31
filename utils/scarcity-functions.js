/***************************************************************
* Contains utility functions to help split up the logic
* between the scarcity and the separately-updated rarity parts
* of the application.
****************************************************************/

export const dungeonTypes = {
    CELLAR: 'cellar',
    FOREST: 'forest',
};

export function isDungeonAvailable(dungeon) {
    switch (dungeon) {
        case dungeonTypes.CELLAR:
            return !!process.env.DUNGEON_THE_CELLAR_ADDR;
        case dungeonTypes.FOREST:
            return !!process.env.DUNGEON_THE_FOREST_ADDR && !!process.env.DUNGEON_THE_FOREST_V1_ADDR;
        default:
            return false;
    }
}

export const numberOfDungeonsAvailable = Object.keys(dungeonTypes).reduce((count, dungeonKey) => (
    isDungeonAvailable(dungeonTypes[dungeonKey]) ? count + 1 : count
), 0);

export const parsePlots = (plots, address) => plots.reduce((all, plot) => {
	const [x, y, owner] = `${plot}`.split(',');
	return {...all, [`${x}-${y}`]: {x, y, owner, isOwner: address === owner}};
}, {});
