import { FunctionComponent, useEffect, useState } from 'react';

import { DungeonContextApp, useDungeon }        from 'contexts/useDungeon';

import Box                                      from 'components/Box';
import DialogBox                                from 'components/DialogBox';

import { Router }                               from 'next/dist/client/router';
import { Adventurer, Dungeon }                  from 'types/dungeon';

const	Index: FunctionComponent<{
  adventurer: Adventurer;
  dungeon: Dungeon;
  router: Router;
}> = ({ dungeon, adventurer, router }) => {
	const	[adventurerHealth, set_adventurerHealth] = useState(dungeon.adventurerHealth);
	const	[dungeonHealth, set_dungeonHealth] = useState(dungeon.dungeonHealth); 

	useEffect(() => {
		set_adventurerHealth(dungeon.adventurerHealth);
		set_dungeonHealth(dungeon.dungeonHealth);
	}, [dungeon]);

	return (
		<section className={'relative'}>
      <DialogBox
        options={[
          {label: 'Exit', onClick: () => router.push('/')},
        ]}
      />
		</section>
	);
}

const	Wrapper: FunctionComponent<{
  adventurer: Adventurer;
  router: Router;
}> = ({ adventurer, router }) => {
	const	{ dungeon } = useDungeon();

	if (!dungeon.adventurerHealth || !dungeon.dungeonHealth) {
		return null;
	}

	return (
		<Index router={router} dungeon={dungeon} adventurer={adventurer} />
	);
}

export const WithContext: FunctionComponent<{
  rarities: { [id: string]: Adventurer };
  router: Router;
}> = ({ rarities, router }) => {
  const adventurer = router?.query?.adventurer as string;
  if (!rarities || rarities === {}) {
		return null;
	}
	if (!rarities[adventurer]) {
		if (typeof(window) !== 'undefined')
			router.push('/');
		return null;
	}
	return (
		<DungeonContextApp adventurer={rarities[adventurer]}>
			<Wrapper router={router} adventurer={rarities[adventurer]} />
		</DungeonContextApp>
	);
}

export default WithContext;