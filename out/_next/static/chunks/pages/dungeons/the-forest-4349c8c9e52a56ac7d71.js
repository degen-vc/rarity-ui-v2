(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[641],{81410:function(e,n,r){"use strict";r.d(n,{zy:function(){return p}});var t=r(70885),u=r(15861),o=r(87757),a=r.n(o),s=r(67294),i=r(87046),c=r(93226),l=r(64260),d=r(17090),f=r(85893),v=r(34155),h=(0,s.createContext)();function m(e){return g.apply(this,arguments)}function g(){return(g=(0,u.Z)(a().mark((function e(n){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new l.zt,console.log("provider",n),e.next=4,r.init(n);case 4:return e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var p=function(e){var n=e.children,r=e.adventurer,o=(0,i.ZP)(),g=o.chainID,p=o.provider,x=(0,s.useState)({}),_=x[0],b=x[1];function N(){var e=new l.CH(v.env.DUNGEON_THE_CELLAR_ADDR,d.Z);return[e.adventurers_log(r.tokenID),e.base_attack_bonus_by_class_and_level(r.tokenID,r.level),e.armor_class(r.attributes.dexterity),e.attack_bonus(r.class,r.attributes.strength,r.level),e.health_by_class_and_level(r.class,r.level,r.attributes.constitution),e.damage(r.attributes.strength),e.dungeon_armor_class(),e.dungeon_damage(),e.dungeon_health(),e.dungeon_to_hit(),e.scout(r.tokenID)]}function D(e){return k.apply(this,arguments)}function k(){return(k=(0,u.Z)(a().mark((function e(n){var r,t,u,o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1337!==Number(g)){e.next=12;break}return e.next=3,m(new c.r("http://localhost:8545"));case 3:return(r=e.sent).multicallAddress=v.env.MULTICALL_ADDRESS,r.multicall2Address=v.env.MULTICALL2_ADDRESS,e.next=8,r.all(n);case 8:return t=e.sent,e.abrupt("return",t);case 12:return e.next=14,m(p);case 14:return u=e.sent,e.next=17,u.all(n);case 17:return o=e.sent,e.abrupt("return",o);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e){var n=(0,t.Z)(e,11),u=n[0],o=n[1],a=n[2],s=n[3],i=n[4],c=n[5],l=n[6],d=n[7],f=n[8],v=n[9],h=n[10];b({tokenID:r.tokenID,log:Number(u),adventurerBaseAttack:Number(o),adventurerArmor:Number(a),adventurerBonusAttack:Number(s),adventurerHealth:Number(i),adventurerDamage:Number(c),dungeonArmor:Number(l),dungeonDamage:Number(d),dungeonHealth:Number(f),dungeonToHit:Number(v),scout:Number(h)})}function E(){return(E=(0,u.Z)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D(N());case 2:w(e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,s.useEffect)((function(){r.tokenID&&function(){E.apply(this,arguments)}()}),[r.tokenID]),(0,f.jsx)(h.Provider,{value:{dungeon:_},children:n})};n.ZP=function(){return(0,s.useContext)(h)}},56692:function(e,n,r){"use strict";r.r(n);var t=r(67294),u=r(25675),o=r(81410),a=r(87046),s=r(50427),i=r(15324),c=r(94775),l=r(15722),d=r(69316),f=r(85893),v=r(34155);function h(){var e=(0,t.useState)(0),n=e[0],r=e[1];return(0,f.jsx)("h1",{className:"text-sm md:text-lg leading-normal md:leading-10",children:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(c.Z,{onDone:function(){return r((function(e){return e+1}))},shouldStart:0===n,children:"YOU ARE ABOUT TO LEAVE THE TOWN TO EXPLORE "}),(0,f.jsx)("span",{className:"text-tag-info",children:(0,f.jsx)(c.Z,{onDone:function(){return r((function(e){return e+1}))},shouldStart:1===n,children:"THE FOREST"})}),(0,f.jsx)(c.Z,{onDone:function(){return r((function(e){return e+1}))},shouldStart:2===n,children:". FOR HOW LONG DO YOU WANT TO TAKE PROVISIONS FOR ?"})]})})}function m(e){var n=e.dungeon,r=e.adventurer,t=e.router,o=(0,a.ZP)().provider,c=(0,s.ZP)().updateRarity;function m(e){(0,l.fO)({provider:o,contractAddress:v.env.DUNGEON_THE_FOREST_ADDR,tokenID:r.tokenID,timeInDays:e},(function(e){var r=e.error;if(r)return console.error(r);c(n.tokenID),"/dungeons/the-forest"===t.pathname&&t.push("/town/quest?tab=the-forest")}))}return(0,f.jsx)("section",{className:"max-w-full",children:(0,f.jsxs)("div",{className:"max-w-screen-lg w-full mx-auto",children:[(0,f.jsxs)("div",{className:"flex flex-col md:flex-row items-center md:items-center mb-8 md:mb-8",children:[(0,f.jsx)("div",{className:"w-auto md:w-64 mr-0 md:mr-16",style:{minWidth:256},children:(0,f.jsx)(u.default,{src:d.X[r.class],loading:"eager",quality:100,width:256,height:256})}),(0,f.jsx)(h,{})]}),(0,f.jsx)(i.Z,{options:[{label:"Go for 4 days",onClick:function(){return m(4)}},{label:"Go for 5 days",onClick:function(){return m(5)}},{label:"Go for 6 days",onClick:function(){return m(6)}},{label:"Go for 7 days",onClick:function(){return m(7)}}]})]})})}function g(e){var n=e.router,r=e.adventurer,t=(0,o.ZP)().dungeon;return(0,f.jsx)(m,{router:n,dungeon:t,adventurer:r})}n.default=function(e){var n,r,t,u=e.rarities,a=e.router;return u&&u!=={}?u[null===a||void 0===a||null===(n=a.query)||void 0===n?void 0:n.adventurer]?(0,f.jsx)(o.zy,{adventurer:u[null===a||void 0===a||null===(r=a.query)||void 0===r?void 0:r.adventurer],children:(0,f.jsx)(g,{router:a,adventurer:u[null===a||void 0===a||null===(t=a.query)||void 0===t?void 0:t.adventurer]})}):(a.push("/town/quest?tab=the-forest"),null):null}},69316:function(e,n,r){"use strict";r.d(n,{X:function(){return t}});var t=["","/front/barbarian.svg","/front/bard.svg","/front/cleric.svg","/front/druid.svg","/front/fighter.svg","/front/monk.svg","/front/paladin.svg","/front/ranger.svg","/front/rogue.svg","/front/sorcerer.svg","/front/wizard.svg"]},48133:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dungeons/the-forest",function(){return r(56692)}])}},function(e){e.O(0,[722,774,888,179],(function(){return n=48133,e(e.s=n);var n}));var n=e.O();_N_E=n}]);