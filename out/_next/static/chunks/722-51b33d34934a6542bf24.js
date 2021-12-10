"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[722],{15722:function(e,t,r){r.d(t,{mt:function(){return S},Oe:function(){return D},s8:function(){return W},ds:function(){return A},cA:function(){return G},cI:function(){return C},wj:function(){return E},fO:function(){return Y},Ju:function(){return v},$4:function(){return P},Hm:function(){return g},$X:function(){return X},yL:function(){return b},nw:function(){return T},p$:function(){return $},KT:function(){return k},s2:function(){return L}});var n=r(15861),a=r(87757),s=r.n(a),i=r(96519),o=r(2593),u=r(77616),p=r(88279),c=r(69125),d=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"approved",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"operator",type:"address"},{indexed:!1,internalType:"bool",name:"approved",type:"bool"}],name:"ApprovalForAll",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!1,internalType:"uint256",name:"check",type:"uint256"},{indexed:!1,internalType:"uint256",name:"summoner",type:"uint256"},{indexed:!1,internalType:"uint256",name:"base_type",type:"uint256"},{indexed:!1,internalType:"uint256",name:"item_type",type:"uint256"},{indexed:!1,internalType:"uint256",name:"gold",type:"uint256"},{indexed:!1,internalType:"uint256",name:"craft_i",type:"uint256"}],name:"Crafted",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[],name:"SUMMMONER_ID",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"approve",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_summoner",type:"uint256"},{internalType:"uint8",name:"_base_type",type:"uint8"},{internalType:"uint8",name:"_item_type",type:"uint8"},{internalType:"uint256",name:"_crafting_materials",type:"uint256"}],name:"craft",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_summoner",type:"uint256"},{internalType:"uint256",name:"_dc",type:"uint256"}],name:"craft_skillcheck",outputs:[{internalType:"bool",name:"crafted",type:"bool"},{internalType:"int256",name:"check",type:"int256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"getApproved",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_item_id",type:"uint256"}],name:"get_armor_dc",outputs:[{internalType:"uint256",name:"dc",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"uint256",name:"_base_type",type:"uint256"},{internalType:"uint256",name:"_item_id",type:"uint256"}],name:"get_dc",outputs:[{internalType:"uint256",name:"dc",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[],name:"get_goods_dc",outputs:[{internalType:"uint256",name:"dc",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"uint256",name:"_base_type",type:"uint256"},{internalType:"uint256",name:"_item_type",type:"uint256"}],name:"get_item_cost",outputs:[{internalType:"uint256",name:"cost",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"uint256",name:"_item",type:"uint256"}],name:"get_token_uri_armor",outputs:[{internalType:"string",name:"output",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_item",type:"uint256"}],name:"get_token_uri_goods",outputs:[{internalType:"string",name:"output",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_item",type:"uint256"}],name:"get_token_uri_weapon",outputs:[{internalType:"string",name:"output",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_type_id",type:"uint256"}],name:"get_type",outputs:[{internalType:"string",name:"_type",type:"string"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"uint256",name:"_item_id",type:"uint256"}],name:"get_weapon_dc",outputs:[{internalType:"uint256",name:"dc",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"operator",type:"address"}],name:"isApprovedForAll",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_base_type",type:"uint256"},{internalType:"uint256",name:"_item_type",type:"uint256"}],name:"isValid",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"items",outputs:[{internalType:"uint8",name:"base_type",type:"uint8"},{internalType:"uint8",name:"item_type",type:"uint8"},{internalType:"uint32",name:"crafted",type:"uint32"},{internalType:"uint256",name:"crafter",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_attribute",type:"uint256"}],name:"modifier_for_attribute",outputs:[{internalType:"int256",name:"_modifier",type:"int256"}],stateMutability:"pure",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"next_item",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"ownerOf",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"},{internalType:"bytes",name:"_data",type:"bytes"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"operator",type:"address"},{internalType:"bool",name:"approved",type:"bool"}],name:"setApprovalForAll",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_summoner",type:"uint256"},{internalType:"uint256",name:"_base_type",type:"uint256"},{internalType:"uint256",name:"_item_type",type:"uint256"},{internalType:"uint256",name:"_crafting_materials",type:"uint256"}],name:"simulate",outputs:[{internalType:"bool",name:"crafted",type:"bool"},{internalType:"int256",name:"check",type:"int256"},{internalType:"uint256",name:"cost",type:"uint256"},{internalType:"uint256",name:"dc",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes4",name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"index",type:"uint256"}],name:"tokenByIndex",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"uint256",name:"index",type:"uint256"}],name:"tokenOfOwnerByIndex",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_item",type:"uint256"}],name:"tokenURI",outputs:[{internalType:"string",name:"uri",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"transferFrom",outputs:[],stateMutability:"nonpayable",type:"function"}],l=r(34155);function m(e,t,r){return y.apply(this,arguments)}function y(){return(y=(0,n.Z)(s().mark((function e(t,r,n){var a,o,u,c,d,l,m;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.provider,o=r.contractAddress,u=r.tokenID,c=p.ZP.loading(t),d=a.getSigner(),l=new i.Contract(o,["function adventure(uint256 _summoner) public"],d),e.prev=4,e.next=7,l.callStatic.adventure(u);case 7:e.next=15;break;case 9:return e.prev=9,e.t0=e.catch(4),p.ZP.dismiss(c),p.ZP.error("Impossible to submit transaction"),n({error:e.t0,data:void 0}),e.abrupt("return");case 15:return e.prev=15,e.next=18,l.adventure(u);case 18:return m=e.sent,e.next=21,m.wait();case 21:1===e.sent.status?(n({error:!1,data:u}),p.ZP.dismiss(c),p.ZP.success("Transaction successful")):(p.ZP.dismiss(c),p.ZP.error("Transaction reverted"),n({error:!0,data:void 0})),e.next=31;break;case 25:e.prev=25,e.t1=e.catch(15),console.error(e.t1),p.ZP.dismiss(c),p.ZP.error("Something went wrong, please try again later."),n({error:e.t1,data:void 0});case 31:case"end":return e.stop()}}),e,null,[[4,9],[15,25]])})))).apply(this,arguments)}function v(e,t){return f.apply(this,arguments)}function f(){return(f=(0,n.Z)(s().mark((function e(t,r){var n,a,i,o;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.loader,a=t.provider,i=t.contractAddress,o=t.tokenID,m(n||"Going on an adventure...",{provider:a,contractAddress:i,tokenID:o},r);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e,t){return Z.apply(this,arguments)}function Z(){return(Z=(0,n.Z)(s().mark((function e(t,r){var n,a,i;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.provider,a=t.contractAddress,i=t.tokenID,m("Looting the Big Ugly Rat...",{provider:n,contractAddress:a,tokenID:i},r);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e,t){return w.apply(this,arguments)}function w(){return(w=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,d,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.tokenID,u=p.ZP.loading("Level-up ".concat(o,"...")),c=n.getSigner(),d=new i.Contract(a,["function level_up(uint256 _summoner) public"],c),e.prev=4,e.next=7,d.callStatic.level_up(o);case 7:e.next=15;break;case 9:return e.prev=9,e.t0=e.catch(4),p.ZP.dismiss(u),p.ZP.error("Impossible to submit transaction"),r({error:e.t0,data:void 0}),e.abrupt("return");case 15:return e.prev=15,e.next=18,d.level_up(o);case 18:return l=e.sent,e.next=21,l.wait();case 21:1===e.sent.status?(r({error:!1,data:o}),p.ZP.dismiss(u),p.ZP.success("Transaction successful")):(p.ZP.dismiss(u),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=31;break;case 25:e.prev=25,e.t1=e.catch(15),console.error(e.t1),p.ZP.dismiss(u),p.ZP.error("Something went wrong, please try again later."),r({error:e.t1,data:void 0});case 31:case"end":return e.stop()}}),e,null,[[4,9],[15,25]])})))).apply(this,arguments)}function P(e,t){return x.apply(this,arguments)}function x(){return(x=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,d,l,m;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.tokenID,u=t.skills,c=p.ZP.loading("Learning new skills..."),d=n.getSigner(),l=new i.Contract(a,["function set_skills(uint256 _summoner, uint8[36] _skills) public"],d),e.prev=4,e.next=7,l.callStatic.set_skills(o,u);case 7:e.next=15;break;case 9:return e.prev=9,e.t0=e.catch(4),p.ZP.dismiss(c),p.ZP.error("Impossible to submit transaction"),r({error:e.t0,data:void 0}),e.abrupt("return");case 15:return e.prev=15,e.next=18,l.set_skills(o,u);case 18:return m=e.sent,e.next=21,m.wait();case 21:1===e.sent.status?(r({error:!1,data:o}),p.ZP.dismiss(c),p.ZP.success("Transaction successful")):(p.ZP.dismiss(c),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=31;break;case 25:e.prev=25,e.t1=e.catch(15),console.error(e.t1),p.ZP.dismiss(c),p.ZP.error("Something went wrong, please try again later."),r({error:e.t1,data:void 0});case 31:case"end":return e.stop()}}),e,null,[[4,9],[15,25]])})))).apply(this,arguments)}function T(e,t){return h.apply(this,arguments)}function h(){return(h=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,d,l,m;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.classID,u=p.ZP.loading("Recruiting a ".concat(c.Z[o].name,"...")),d=n.getSigner(),l=new i.Contract(a,["function summon(uint256 _class) public"],d),e.prev=4,e.next=7,l.callStatic.summon(o);case 7:e.next=15;break;case 9:return e.prev=9,e.t0=e.catch(4),p.ZP.dismiss(u),p.ZP.error("Impossible to submit transaction"),r({error:e.t0,data:void 0}),e.abrupt("return");case 15:return e.prev=15,e.next=18,l.summon(o);case 18:return m=e.sent,e.next=21,m.wait();case 21:1===e.sent.status?(r({error:!1,data:o}),p.ZP.dismiss(u),p.ZP.success("Transaction successful")):(p.ZP.dismiss(u),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=31;break;case 25:e.prev=25,e.t1=e.catch(15),console.error(e.t1),p.ZP.dismiss(u),p.ZP.error("Something went wrong, please try again later."),r({error:e.t1,data:void 0});case 31:case"end":return e.stop()}}),e,null,[[4,9],[15,25]])})))).apply(this,arguments)}function k(e,t){return _.apply(this,arguments)}function _(){return(_=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,d,l,m,y,v,f,b,Z;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t._summoner,u=t._str,c=t._dex,d=t._const,l=t._int,m=t._wis,y=t._cha,v=p.ZP.loading("Setting attributes for ".concat(o,"...")),f=n.getSigner(),b=new i.Contract(a,["function point_buy(uint _summoner, uint32 _str, uint32 _dex, uint32 _const, uint32 _int, uint32 _wis, uint32 _cha) public"],f),e.prev=4,e.next=7,b.callStatic.point_buy(o,u,c,d,l,m,y);case 7:e.next=15;break;case 9:return e.prev=9,e.t0=e.catch(4),p.ZP.dismiss(v),p.ZP.error("Impossible to submit transaction"),r({error:e.t0,data:void 0}),e.abrupt("return");case 15:return e.prev=15,e.next=18,b.point_buy(o,u,c,d,l,m,y);case 18:return Z=e.sent,e.next=21,Z.wait();case 21:1===e.sent.status?(r({error:!1,data:{_summoner:o,_str:u,_dex:c,_const:d,_int:l,_wis:m,_cha:y}}),p.ZP.dismiss(v),p.ZP.success("Transaction successful")):(p.ZP.dismiss(v),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=31;break;case 25:e.prev=25,e.t1=e.catch(15),console.error(e.t1),p.ZP.dismiss(v),p.ZP.error("Something went wrong, please try again later."),r({error:e.t1,data:void 0});case 31:case"end":return e.stop()}}),e,null,[[4,9],[15,25]])})))).apply(this,arguments)}function A(e,t){return I.apply(this,arguments)}function I(){return(I=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,d,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.tokenID,u=p.ZP.loading("Claiming gold for ".concat(o,"...")),c=n.getSigner(),d=new i.Contract(a,["function claim(uint256 _summoner) public"],c),e.prev=4,e.next=7,d.callStatic.claim(o);case 7:e.next=15;break;case 9:return e.prev=9,e.t0=e.catch(4),p.ZP.dismiss(u),p.ZP.error("Impossible to submit transaction"),r({error:e.t0,data:void 0}),e.abrupt("return");case 15:return e.prev=15,e.next=18,d.claim(o);case 18:return l=e.sent,e.next=21,l.wait();case 21:1===e.sent.status?(r({error:!1,data:o}),p.ZP.dismiss(u),p.ZP.success("Transaction successful")):(p.ZP.dismiss(u),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=31;break;case 25:e.prev=25,e.t1=e.catch(15),console.error(e.t1),p.ZP.dismiss(u),p.ZP.error("Something went wrong, please try again later."),r({error:e.t1,data:void 0});case 31:case"end":return e.stop()}}),e,null,[[4,9],[15,25]])})))).apply(this,arguments)}function S(e,t){return M.apply(this,arguments)}function M(){return(M=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,d,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.amount,u=p.ZP.loading("Processing deposit..."),c=n.getSigner(),d=new i.Contract(a,["function deposit() public payable"],c),e.prev=4,e.next=7,d.deposit({value:o});case 7:return l=e.sent,e.next=10,l.wait();case 10:1===e.sent.status?(r({error:!1,data:void 0}),p.ZP.dismiss(u),p.ZP.success("Transaction successful")):(p.ZP.dismiss(u),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=20;break;case 14:e.prev=14,e.t0=e.catch(4),console.error(e.t0),p.ZP.dismiss(u),p.ZP.error("Something went wrong, please try again later."),r({error:e.t0,data:void 0});case 20:case"end":return e.stop()}}),e,null,[[4,14]])})))).apply(this,arguments)}function D(e,t){return R.apply(this,arguments)}function R(){return(R=(0,n.Z)(s().mark((function e(t,r){var n,a,u,c,d,l,m,y,v,f,b,Z,g;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.address,u=t.zapAddress,c=t.contractAddress,d=t.amount,l=t.wantTokenName,m=p.ZP.loading("1/2 - Approving token yv".concat(l,"...")),y=n.getSigner(),v=new i.Contract(c,["function allowance(address, address) external view returns (uint256)","function approve(address to, uint256 amount) external"],y),f=new i.Contract(u,["function withdraw(uint256) public"],y),e.prev=5,e.next=8,v.allowance(a,u);case 8:if(b=e.sent,!o.O$.from(b).gte(d)){e.next=13;break}p.ZP.dismiss(m),e.next=27;break;case 13:return e.next=15,v.approve(u,d);case 15:return Z=e.sent,e.next=18,Z.wait();case 18:if(1!==e.sent.status){e.next=23;break}p.ZP.dismiss(m),e.next=27;break;case 23:return p.ZP.dismiss(m),p.ZP.error("Approve reverted"),r({error:!0,data:void 0}),e.abrupt("return");case 27:e.next=36;break;case 29:return e.prev=29,e.t0=e.catch(5),console.error(e.t0),p.ZP.dismiss(m),p.ZP.error("Something went wrong, please try again later."),r({error:e.t0,data:void 0}),e.abrupt("return");case 36:return e.prev=36,e.next=39,f.withdraw(d);case 39:return g=e.sent,e.next=42,g.wait();case 42:1===e.sent.status?(r({error:!1,data:void 0}),p.ZP.dismiss(m),p.ZP.success("Transaction successful")):(p.ZP.dismiss(m),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=52;break;case 46:e.prev=46,e.t1=e.catch(36),console.error(e.t1),p.ZP.dismiss(m),p.ZP.error("Something went wrong, please try again later."),r({error:e.t1,data:void 0});case 52:case"end":return e.stop()}}),e,null,[[5,29],[36,46]])})))).apply(this,arguments)}function C(e,t){return F.apply(this,arguments)}function F(){return(F=(0,n.Z)(s().mark((function e(t,r){var n,a,u,c,d,l,m,y,v,f,b,Z,g;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.address,u=t.contractAddress,c=t.amount,d=t.wantTokenAddress,l=t.wantTokenName,m=p.ZP.loading("1/2 - Approving token ".concat(l,"...")),y=n.getSigner(),v=new i.Contract(u,["function deposit(uint256) public"],y),e.prev=4,f=new i.Contract(d,["function allowance(address, address) external view returns (uint256)","function approve(address to, uint256 amount) external"],y),e.next=8,f.allowance(a,u);case 8:if(b=e.sent,!o.O$.from(b).gte(c)){e.next=13;break}p.ZP.dismiss(m),e.next=27;break;case 13:return e.next=15,f.approve(u,c);case 15:return Z=e.sent,e.next=18,Z.wait();case 18:if(1!==e.sent.status){e.next=23;break}p.ZP.dismiss(m),e.next=27;break;case 23:return p.ZP.dismiss(m),p.ZP.error("Approve reverted"),r({error:!0,data:void 0}),e.abrupt("return");case 27:e.next=36;break;case 29:return e.prev=29,e.t0=e.catch(4),console.error(e.t0),p.ZP.dismiss(m),p.ZP.error("Something went wrong, please try again later."),r({error:e.t0,data:void 0}),e.abrupt("return");case 36:return m=p.ZP.loading("2/2 - Deposit ".concat(l,"...")),e.prev=37,e.next=40,v.callStatic.deposit(c);case 40:e.next=48;break;case 42:return e.prev=42,e.t1=e.catch(37),p.ZP.dismiss(m),p.ZP.error("Impossible to deposit tokens"),r({error:e.t1,data:void 0}),e.abrupt("return");case 48:return e.prev=48,e.next=51,v.deposit(c);case 51:return g=e.sent,e.next=54,g.wait();case 54:1===e.sent.status?(r({error:!1,data:void 0}),p.ZP.dismiss(m),p.ZP.success("Transaction successful")):(p.ZP.dismiss(m),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=64;break;case 58:e.prev=58,e.t2=e.catch(48),console.error(e.t2),p.ZP.dismiss(m),p.ZP.error("Something went wrong, please try again later."),r({error:e.t2,data:void 0});case 64:case"end":return e.stop()}}),e,null,[[4,29],[37,42],[48,58]])})))).apply(this,arguments)}function L(e,t){return O.apply(this,arguments)}function O(){return(O=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,d,l,m;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.amount,u=t.wantTokenName,c=p.ZP.loading("Withdrawing yv".concat(u,"...")),d=n.getSigner(),l=new i.Contract(a,["function withdraw(uint256) public","function allowance(address, address) external view returns (uint256)","function approve(address to, uint256 amount) external"],d),e.prev=4,e.next=7,l.callStatic.withdraw(o);case 7:e.next=15;break;case 9:return e.prev=9,e.t0=e.catch(4),p.ZP.dismiss(c),p.ZP.error("Impossible to withdraw tokens"),r({error:e.t0,data:void 0}),e.abrupt("return");case 15:return e.prev=15,e.next=18,l.withdraw(o);case 18:return m=e.sent,e.next=21,m.wait();case 21:1===e.sent.status?(r({error:!1,data:void 0}),p.ZP.dismiss(c),p.ZP.success("Transaction successful")):(p.ZP.dismiss(c),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=31;break;case 25:e.prev=25,e.t1=e.catch(15),console.error(e.t1),p.ZP.dismiss(c),p.ZP.error("Something went wrong, please try again later."),r({error:e.t1,data:void 0});case 31:case"end":return e.stop()}}),e,null,[[4,9],[15,25]])})))).apply(this,arguments)}function Y(e,t){return N.apply(this,arguments)}function N(){return(N=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,d,l,m;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.tokenID,u=t.timeInDays,c=p.ZP.loading("Heading to the Forest..."),d=n.getSigner(),l=new i.Contract(a,["function startResearch(uint256 _summoner, uint256 timeInDays) public"],d),e.prev=4,e.next=7,l.callStatic.startResearch(o,u,{gasLimit:2e5});case 7:e.next=15;break;case 9:return e.prev=9,e.t0=e.catch(4),p.ZP.dismiss(c),p.ZP.error("Impossible to explore The Forest"),r({error:e.t0,data:void 0}),e.abrupt("return");case 15:return e.prev=15,e.next=18,l.startResearch(o,u,{gasLimit:2e5});case 18:return m=e.sent,e.next=21,m.wait();case 21:1===e.sent.status?(r({error:!1,data:o}),p.ZP.dismiss(c),p.ZP.success("Transaction successful")):(p.ZP.dismiss(c),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=31;break;case 25:e.prev=25,e.t1=e.catch(15),console.error(e.t1),p.ZP.dismiss(c),p.ZP.error("Something went wrong, please try again later."),r({error:e.t1,data:void 0});case 31:case"end":return e.stop()}}),e,null,[[4,9],[15,25]])})))).apply(this,arguments)}function E(e,t){return U.apply(this,arguments)}function U(){return(U=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,d,l;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.tokenID,u=p.ZP.loading("Digging in the Forest..."),c=n.getSigner(),d=new i.Contract(a,["function discover(uint256 _summoner) public"],c),e.prev=4,e.next=7,d.callStatic.discover(o,{gasLimit:3e5});case 7:e.next=15;break;case 9:return e.prev=9,e.t0=e.catch(4),p.ZP.dismiss(u),p.ZP.error("Your shovel broke ... Try another one"),r({error:e.t0,data:void 0}),e.abrupt("return");case 15:return e.prev=15,e.next=18,d.discover(o,{gasLimit:3e5});case 18:return l=e.sent,e.next=21,l.wait();case 21:1===e.sent.status?(r({error:!1,data:o}),p.ZP.dismiss(u),p.ZP.success("Transaction successful")):(p.ZP.dismiss(u),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=31;break;case 25:e.prev=25,e.t1=e.catch(15),console.error(e.t1),p.ZP.dismiss(u),p.ZP.error("Your shovel broke ... Try another one"),r({error:e.t1,data:void 0});case 31:case"end":return e.stop()}}),e,null,[[4,9],[15,25]])})))).apply(this,arguments)}function X(e,t){return H.apply(this,arguments)}function H(){return(H=(0,n.Z)(s().mark((function e(t,r){var n,a,o,c,d,m,y,v,f,b,Z,g,w,P,x;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.tokenID,c=t.adventurerID,d=t.treasureName,m=t.xpRequired,y=p.ZP.loading("1/3 - Approving Proxy Spender ".concat(c,"...")),v=n.getSigner(),e.next=5,v.getAddress();case 5:return f=e.sent,b=new i.Contract(a,["function levelUp(uint256 tokenId) public"],v),e.prev=7,Z=new i.Contract(l.env.RARITY_ADDR,["function setApprovalForAll(address operator, bool approved) external","function isApprovedForAll(address owner, address operator) external view returns (bool)"],v),e.next=11,Z.isApprovedForAll(f,l.env.RARITY_XP_PROXY);case 11:if(!e.sent){e.next=15;break}e.next=29;break;case 15:return e.next=17,Z.setApprovalForAll(l.env.RARITY_XP_PROXY,!0);case 17:return g=e.sent,e.next=20,g.wait();case 20:if(1!==e.sent.status){e.next=25;break}p.ZP.dismiss(y),e.next=29;break;case 25:return p.ZP.dismiss(y),p.ZP.error("Approve reverted"),r({error:!0,data:void 0}),e.abrupt("return");case 29:e.next=38;break;case 31:return e.prev=31,e.t0=e.catch(7),console.error(e.t0),p.ZP.dismiss(y),p.ZP.error("Something went wrong, please try again later."),r({error:e.t0,data:void 0}),e.abrupt("return");case 38:return e.prev=38,y=p.ZP.loading("2/3 - Approving ".concat(u.dF(m)," XP to be used...")),w=new i.Contract(l.env.RARITY_XP_PROXY,["function allowance(address _owner, uint _adventurer, address _operator) external view returns (uint256)","function approve(uint _adventurer, address _operator, uint _amount) external returns (bool)"],v),e.next=43,w.allowance(f,c,a);case 43:if(!e.sent.gte(m)){e.next=48;break}p.ZP.dismiss(y),e.next=62;break;case 48:return e.next=50,w.approve(c,a,m);case 50:return P=e.sent,e.next=53,P.wait();case 53:if(1!==e.sent.status){e.next=58;break}p.ZP.dismiss(y),e.next=62;break;case 58:return p.ZP.dismiss(y),p.ZP.error("Approve reverted"),r({error:!0,data:void 0}),e.abrupt("return");case 62:e.next=71;break;case 64:return e.prev=64,e.t1=e.catch(38),console.error(e.t1),p.ZP.dismiss(y),p.ZP.error("Something went wrong, please try again later."),r({error:e.t1,data:void 0}),e.abrupt("return");case 71:return y=p.ZP.loading("3/3 - Level-up treasure ".concat(d,"...")),e.prev=72,e.next=75,b.callStatic.levelUp(o,{gasLimit:2e5});case 75:e.next=83;break;case 77:return e.prev=77,e.t2=e.catch(72),p.ZP.dismiss(y),p.ZP.error("Impossible to submit transaction"),r({error:e.t2,data:void 0}),e.abrupt("return");case 83:return e.prev=83,e.next=86,b.levelUp(o,{gasLimit:2e5});case 86:return x=e.sent,e.next=89,x.wait();case 89:1===e.sent.status?(r({error:!1,data:o}),p.ZP.dismiss(y),p.ZP.success("Transaction successful")):(p.ZP.dismiss(y),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=99;break;case 93:e.prev=93,e.t3=e.catch(83),console.error(e.t3),p.ZP.dismiss(y),p.ZP.error("Something went wrong, please try again later."),r({error:e.t3,data:void 0});case 99:case"end":return e.stop()}}),e,null,[[7,31],[38,64],[72,77],[83,93]])})))).apply(this,arguments)}function $(e,t){return B.apply(this,arguments)}function B(){return(B=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,d,m,y,v,f,b;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.tokenID,u=t.treasureName,c=t.adventurerID,d=p.ZP.loading("1/2 - Approving treasure ".concat(u,"...")),m=n.getSigner(),y=new i.Contract(a,["function restoreTreasure(uint256 tokenId, uint256 receiver) public"],m),e.prev=4,v=new i.Contract(l.env.DUNGEON_THE_FOREST_V1_ADDR,["function getApproved(uint256 tokenId) external view returns (address operator)","function approve(address to, uint256 tokenId) external"],m),e.next=8,v.getApproved(o);case 8:if(e.sent!==a){e.next=13;break}p.ZP.dismiss(d),e.next=27;break;case 13:return e.next=15,v.approve(a,o);case 15:return f=e.sent,e.next=18,f.wait();case 18:if(1!==e.sent.status){e.next=23;break}p.ZP.dismiss(d),e.next=27;break;case 23:return p.ZP.dismiss(d),p.ZP.error("Approve reverted"),r({error:!0,data:void 0}),e.abrupt("return");case 27:e.next=36;break;case 29:return e.prev=29,e.t0=e.catch(4),console.error(e.t0),p.ZP.dismiss(d),p.ZP.error("Something went wrong, please try again later."),r({error:e.t0,data:void 0}),e.abrupt("return");case 36:return d=p.ZP.loading("2/2 - Restoring treasure ".concat(u,"...")),e.prev=37,e.next=40,y.callStatic.restoreTreasure(o,c,{gasLimit:3e5});case 40:e.next=48;break;case 42:return e.prev=42,e.t1=e.catch(37),p.ZP.dismiss(d),p.ZP.error("Impossible to submit transaction"),r({error:e.t1,data:void 0}),e.abrupt("return");case 48:return e.prev=48,e.next=51,y.restoreTreasure(o,c,{gasLimit:3e5});case 51:return b=e.sent,e.next=54,b.wait();case 54:1===e.sent.status?(r({error:!1,data:o}),p.ZP.dismiss(d),p.ZP.success("Transaction successful")):(p.ZP.dismiss(d),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0})),e.next=64;break;case 58:e.prev=58,e.t2=e.catch(48),console.error(e.t2),p.ZP.dismiss(d),p.ZP.error("Something went wrong, please try again later."),r({error:e.t2,data:void 0});case 64:case"end":return e.stop()}}),e,null,[[4,29],[37,42],[48,58]])})))).apply(this,arguments)}function G(e,t){return V.apply(this,arguments)}function V(){return(V=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,m,y,v,f,b,Z,g,w,P,x,T,h;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.tokenID,u=t.itemName,c=t.baseType,m=t.itemType,y=t.craftingMaterials,v=t.forced,f=void 0!==v&&v,b=!1,g=n.getSigner(),w=new i.Contract(a,d,g),e.prev=4,P=new i.Contract(l.env.RARITY_ADDR,["function getApproved(uint256 tokenId) external view returns (address operator)","function approve(address to, uint256 tokenId) external"],g),e.next=8,P.getApproved(o);case 8:if(e.sent===a){e.next=26;break}return b=!0,Z=p.ZP.loading("1/2 - Approving craft ..."),e.next=14,P.approve(a,o);case 14:return x=e.sent,e.next=17,x.wait();case 17:if(1!==e.sent.status){e.next=22;break}p.ZP.dismiss(Z),e.next=26;break;case 22:return p.ZP.dismiss(Z),p.ZP.error("Approve reverted"),r({error:!0,data:void 0}),e.abrupt("return");case 26:e.next=35;break;case 28:return e.prev=28,e.t0=e.catch(4),console.error(e.t0),p.ZP.dismiss(Z),p.ZP.error("Something went wrong, please try again later."),r({error:e.t0,data:void 0}),e.abrupt("return");case 35:if(f){e.next=43;break}return e.next=38,w.simulate(o,c,m,y);case 38:if(e.sent.crafted){e.next=43;break}return r({error:"SIMULATION_FAILED",data:o}),p.ZP.error("IT'S A BAD IDEA TO CRAFT THAT RIGHT NOW. TRY AGAIN LATER"),e.abrupt("return");case 43:return Z=b?p.ZP.loading("2/2 Trying to craft ".concat(u,"...")):p.ZP.loading("Trying to craft ".concat(u,"...")),e.prev=44,e.next=47,w.callStatic.craft(o,c,m,y);case 47:e.next=55;break;case 49:return e.prev=49,e.t1=e.catch(44),p.ZP.dismiss(Z),p.ZP.error("You have a bad feeling about this. You should retry later."),r({error:e.t1,data:void 0}),e.abrupt("return");case 55:return e.prev=55,e.next=58,w.craft(o,c,m,y,{gasLimit:4e5});case 58:return T=e.sent,e.next=61,T.wait();case 61:if(1!==(h=e.sent).status){e.next=73;break}if(0!==h.logs.length){e.next=68;break}return r({error:"CRAFT_FAILED",data:o}),p.ZP.dismiss(Z),p.ZP.error("YOU FAILED YOUR CRAFT ATTEMPT"),e.abrupt("return");case 68:r({error:!1,data:o}),p.ZP.dismiss(Z),p.ZP.success("Transaction successful"),e.next=76;break;case 73:p.ZP.dismiss(Z),p.ZP.error("Transaction reverted"),r({error:!0,data:void 0});case 76:e.next=84;break;case 78:e.prev=78,e.t2=e.catch(55),console.error(e.t2),p.ZP.dismiss(Z),p.ZP.error("Something went wrong, please try again later."),r({error:e.t2,data:void 0});case 84:case"end":return e.stop()}}),e,null,[[4,28],[44,49],[55,78]])})))).apply(this,arguments)}function W(e,t){return j.apply(this,arguments)}function j(){return(j=(0,n.Z)(s().mark((function e(t,r){var n,a,o,u,c,d,l,m,y,v;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provider,a=t.contractAddress,o=t.adventurerID,u=t.spender,c=t.amount,d=t.name,l=p.ZP.loading("Approving ".concat(d,"...")),m=n.getSigner(),e.prev=3,y=new i.Contract(a,["function approve(uint256 from, uint256 spender, uint256 amount) external"],m),e.next=7,y.approve(o,u,c);case 7:return v=e.sent,e.next=10,v.wait();case 10:if(1!==e.sent.status){e.next=17;break}return p.ZP.dismiss(l),r({error:!1,data:void 0}),e.abrupt("return");case 17:return p.ZP.dismiss(l),p.ZP.error("Approve reverted"),r({error:!0,data:void 0}),e.abrupt("return");case 21:e.next=30;break;case 23:return e.prev=23,e.t0=e.catch(3),console.error(e.t0),p.ZP.dismiss(l),p.ZP.error("Something went wrong, please try again later."),r({error:e.t0,data:void 0}),e.abrupt("return");case 30:case"end":return e.stop()}}),e,null,[[3,23]])})))).apply(this,arguments)}}}]);