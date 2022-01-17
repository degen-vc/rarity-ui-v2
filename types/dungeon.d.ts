import { BigNumberish } from 'ethers';
import { ReactNode } from 'react';

export interface Adventurer {
  tokenID: string;
  owner: string;
  xp: string;
  class: number;
  level: number;
  log: number;
  name: string;
  usdcAllw: number;
  gold: {
    balance: string;
    claimable: string;
  },
  attributes: {
    isInit: boolean;
    remainingPoints: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  },
  skills: number[],
  dungeons: { [id: string]: any },
  inventory: BigNumberish[];
}

export interface Dungeon {
  tokenID: string;
  log: number;
  adventurerBaseAttack: number;
  adventurerArmor: number;
  adventurerBonusAttack: number;
  adventurerHealth: number;
  adventurerDamage: number;
  dungeonArmor: number;
  dungeonDamage: number;
  dungeonHealth: number;
  dungeonToHit: number;
  scout: number;
}

declare module "contexts/useDungeons" {
  const DungeonContextApp: ({ children, adventurer }: {
    children: ReactNode;
    adventurer: Adventurer;
  }) => JSX.Element;
  const useDungeon: () => { dungeon: Dungeon };
  export { DungeonContextApp, useDungeon };
  export default useDungeon;
}
