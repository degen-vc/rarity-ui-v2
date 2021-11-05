/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday September 6th 2021
**	@Filename:				rarity.abi.js
******************************************************************************/

const	ABI = [{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'creator','type':'address'},{'indexed':false,'internalType':'uint256','name':'summoner','type':'uint256'},{'indexed':false,'internalType':'uint32','name':'strength','type':'uint32'},{'indexed':false,'internalType':'uint32','name':'dexterity','type':'uint32'},{'indexed':false,'internalType':'uint32','name':'constitution','type':'uint32'},{'indexed':false,'internalType':'uint32','name':'intelligence','type':'uint32'},{'indexed':false,'internalType':'uint32','name':'wisdom','type':'uint32'},{'indexed':false,'internalType':'uint32','name':'charisma','type':'uint32'}],'name':'Created','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'leveler','type':'address'},{'indexed':false,'internalType':'uint256','name':'summoner','type':'uint256'},{'indexed':false,'internalType':'uint32','name':'strength','type':'uint32'},{'indexed':false,'internalType':'uint32','name':'dexterity','type':'uint32'},{'indexed':false,'internalType':'uint32','name':'constitution','type':'uint32'},{'indexed':false,'internalType':'uint32','name':'intelligence','type':'uint32'},{'indexed':false,'internalType':'uint32','name':'wisdom','type':'uint32'},{'indexed':false,'internalType':'uint32','name':'charisma','type':'uint32'}],'name':'Leveled','type':'event'},{'inputs':[{'internalType':'uint256','name':'current_level','type':'uint256'}],'name':'abilities_by_level','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'pure','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'ability_scores','outputs':[{'internalType':'uint32','name':'strength','type':'uint32'},{'internalType':'uint32','name':'dexterity','type':'uint32'},{'internalType':'uint32','name':'constitution','type':'uint32'},{'internalType':'uint32','name':'intelligence','type':'uint32'},{'internalType':'uint32','name':'wisdom','type':'uint32'},{'internalType':'uint32','name':'charisma','type':'uint32'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'score','type':'uint256'}],'name':'calc','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'pure','type':'function'},{'inputs':[{'internalType':'uint256','name':'_str','type':'uint256'},{'internalType':'uint256','name':'_dex','type':'uint256'},{'internalType':'uint256','name':'_const','type':'uint256'},{'internalType':'uint256','name':'_int','type':'uint256'},{'internalType':'uint256','name':'_wis','type':'uint256'},{'internalType':'uint256','name':'_cha','type':'uint256'}],'name':'calculate_point_buy','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'pure','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'character_created','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'}],'name':'increase_charisma','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'}],'name':'increase_constitution','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'}],'name':'increase_dexterity','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'}],'name':'increase_intelligence','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'}],'name':'increase_strength','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'}],'name':'increase_wisdom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'level_points_spent','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'},{'internalType':'uint32','name':'_str','type':'uint32'},{'internalType':'uint32','name':'_dex','type':'uint32'},{'internalType':'uint32','name':'_const','type':'uint32'},{'internalType':'uint32','name':'_int','type':'uint32'},{'internalType':'uint32','name':'_wis','type':'uint32'},{'internalType':'uint32','name':'_cha','type':'uint32'}],'name':'point_buy','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'_summoner','type':'uint256'}],'name':'tokenURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'}];

export default ABI;