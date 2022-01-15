import { BigNumber } from 'ethers';
import { Contract } from 'ethcall';

export class DungeonContract extends Contract {
  declare adventurers_log: (_summoner: BigNumber) => Promise<BigNumber>;
  declare base_attack_bonus_by_class_and_level: (_class: BigNumber, _level: BigNumber) => Promise<BigNumber>;
  declare armor_class: (_dex: BigNumber) => Promise<BigNumber>;
  declare attack_bonus: (_class: BigNumber, _str: BigNumber, _level: BigNumber) => Promise<BigNumber>;
  declare health_by_class_and_level: (_class: BigNumber, _level: BigNumber, _const: BigNumber) => Promise<BigNumber>;
  declare damage: (_str: BigNumber) => Promise<BigNumber>;
  declare dungeon_armor_class: () => Promise<BigNumber>;
  declare dungeon_damage: () => Promise<BigNumber>;
  declare dungeon_health: () => Promise<BigNumber>;
  declare dungeon_to_hit: () => Promise<BigNumber>;
  declare scout: (_summoner: BigNumber) => Promise<BigNumber>;
}
