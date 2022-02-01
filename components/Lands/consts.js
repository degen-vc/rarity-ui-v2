import LAND_GAME_ABI from 'utils/abi/landGame.abi';

export const landsGameAddress = process.env.LANDS_GAME_ADDR;

// TODO: fill some info from contract
export const MAPS = {
	[landsGameAddress]: {
		abi: LAND_GAME_ABI,
		address: landsGameAddress,
		url: 'https://i.ytimg.com/vi/QuBh955v3f8/maxresdefault.jpg'
	}
};
