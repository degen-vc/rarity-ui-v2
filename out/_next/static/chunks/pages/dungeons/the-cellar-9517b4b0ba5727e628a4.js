(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[953],{81410:function(e,t,r){"use strict";r.d(t,{zy:function(){return g}});var n=r(70885),a=r(15861),u=r(87757),s=r.n(u),o=r(67294),c=r(87046),i=r(93226),l=r(64260),d=r(17090),m=r(85893),h=r(34155),p=(0,o.createContext)();function f(e){return x.apply(this,arguments)}function x(){return(x=(0,a.Z)(s().mark((function e(t){var r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new l.zt,console.log("provider",t),e.next=4,r.init(t);case 4:return e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var g=function(e){var t=e.children,r=e.adventurer,u=(0,c.ZP)(),x=u.chainID,g=u.provider,v=(0,o.useState)({}),b=v[0],k=v[1];function w(){var e=new l.CH(h.env.DUNGEON_THE_CELLAR_ADDR,d.Z);return[e.adventurers_log(r.tokenID),e.base_attack_bonus_by_class_and_level(r.tokenID,r.level),e.armor_class(r.attributes.dexterity),e.attack_bonus(r.class,r.attributes.strength,r.level),e.health_by_class_and_level(r.class,r.level,r.attributes.constitution),e.damage(r.attributes.strength),e.dungeon_armor_class(),e.dungeon_damage(),e.dungeon_health(),e.dungeon_to_hit(),e.scout(r.tokenID)]}function y(e){return N.apply(this,arguments)}function N(){return(N=(0,a.Z)(s().mark((function e(t){var r,n,a,u;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1337!==Number(x)){e.next=12;break}return e.next=3,f(new i.r("http://localhost:8545"));case 3:return(r=e.sent).multicallAddress=h.env.MULTICALL_ADDRESS,r.multicall2Address=h.env.MULTICALL2_ADDRESS,e.next=8,r.all(t);case 8:return n=e.sent,e.abrupt("return",n);case 12:return e.next=14,f(g);case 14:return a=e.sent,e.next=17,a.all(t);case 17:return u=e.sent,e.abrupt("return",u);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e){var t=(0,n.Z)(e,11),a=t[0],u=t[1],s=t[2],o=t[3],c=t[4],i=t[5],l=t[6],d=t[7],m=t[8],h=t[9],p=t[10];k({tokenID:r.tokenID,log:Number(a),adventurerBaseAttack:Number(u),adventurerArmor:Number(s),adventurerBonusAttack:Number(o),adventurerHealth:Number(c),adventurerDamage:Number(i),dungeonArmor:Number(l),dungeonDamage:Number(d),dungeonHealth:Number(m),dungeonToHit:Number(h),scout:Number(p)})}function D(){return(D=(0,a.Z)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(w());case 2:j(e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,o.useEffect)((function(){r.tokenID&&function(){D.apply(this,arguments)}()}),[r.tokenID]),(0,m.jsx)(p.Provider,{value:{dungeon:b},children:t})};t.ZP=function(){return(0,o.useContext)(p)}},95854:function(e,t,r){"use strict";r.r(t);var n=r(42982),a=r(15861),u=r(87757),s=r.n(u),o=r(67294),c=r(25675),i=r(41664),l=r(81410),d=r(87046),m=r(50427),h=r(15722),p=r(15324),f=r(85893),x=r(34155),g=["","/back/barbarian.svg","/back/bard.png","/back/cleric.png","/back/druid.png","/back/fighter.png","/back/monk.svg","/back/paladin.png","/back/ranger.png","/back/rogue.png","/back/sorcerer.png","/back/wizard.png"];function v(e){return new Promise((function(t){return setTimeout(t,e)}))}function b(e){var t=e.router,r=e.step,n=e.stepAuto,a=e.ratEscaped,u=e.adventurerWon,s=e.expectedLoot,o=e.loot;return a?(0,f.jsx)(p.Z,{options:[{label:"THE BIG UGLY RAT HAS ESCAPED",onClick:function(){return t.push("/town/quest?tab=the-cellar")}}]}):u?0===s?(0,f.jsx)(p.Z,{options:[{label:"YOU HAVE DEFEATED THE RAT ! UNFORTUNATELY, THERE IS NOTHING TO RECOVER",onClick:function(){return t.push("/town/quest?tab=the-cellar")}}]}):(0,f.jsx)(p.Z,{options:[{label:"YOU HAVE DEFEATED THE RAT ! YOU CAN LOOT ".concat(s," SKIN").concat(s>0?"s":""),onClick:o}]}):(0,f.jsx)(p.Z,{options:[{label:"FIGHT",onClick:r},{label:"FIGHT (AUTO)",onClick:n},{label:"ESCAPE",onClick:function(){return t.push("/town/quest?tab=the-cellar")}}]})}function k(e){var t=e.dungeon,r=e.adventurer,u=e.router,l=(0,d.ZP)().provider,p=(0,m.ZP)().updateRarity,k=(0,o.useState)(0),w=k[0],y=k[1],N=(0,o.useState)(0),j=N[0],D=N[1],_=(0,o.useState)(!1),E=_[0],A=_[1],T=(0,o.useState)(!1),H=T[0],Z=T[1],R=(0,o.useState)(t.adventurerHealth),I=R[0],C=R[1],U=(0,o.useState)(t.dungeonHealth),S=U[0],L=U[1],O=(0,o.useState)([]),P=O[0],q=O[1];function Y(){return(Y=(0,a.Z)(s().mark((function e(){var r,a,u;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:D(1),r=I,a=S,u=10;case 4:if(!(u>=w)){e.next=26;break}if(L((function(e){return e-t.adventurerDamage})),!((a-=t.adventurerDamage)<=0)){e.next=11;break}return q((function(e){return[].concat((0,n.Z)(e),["Vigo will be happy, you killed this Ugly rat!"])})),Z(!0),e.abrupt("return",!0);case 11:return q((function(e){return[].concat((0,n.Z)(e),["Your adventurer attacks the Big Ugly Rat and deals ".concat(t.adventurerDamage," dmg.")])})),e.next=14,v(0);case 14:if(!(t.adventurerArmor<t.dungeonToHit)){e.next=20;break}if(C((function(e){return e-t.dungeonDamage})),!((r-=t.dungeonDamage)<=0)){e.next=20;break}return q((function(e){return[].concat((0,n.Z)(e),["Your adventurer fades out"])})),e.abrupt("return",!1);case 20:return q((function(e){return[].concat((0,n.Z)(e),["The Big Ugly Rat attacks your adventurer and deals ".concat(t.dungeonDamage," dmg.")])})),e.next=23,v(0);case 23:u--,e.next=4;break;case 26:q((function(e){return[].concat((0,n.Z)(e),["The big ugly rat escaped"])})),A(!0);case 28:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){return(B=(0,a.Z)(s().mark((function e(){var r,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1!==j){e.next=2;break}return e.abrupt("return");case 2:if(D(0),r=I,a=S,10!==w){e.next=9;break}return q((function(e){return[].concat((0,n.Z)(e),["The big ugly rat escaped"])})),A(!0),e.abrupt("return");case 9:if(L((function(e){return e-t.adventurerDamage})),!((a-=t.adventurerDamage)<=0)){e.next=15;break}return q((function(e){return[].concat((0,n.Z)(e),["Facu will be happy, you killed this Ugly rat!"])})),Z(!0),e.abrupt("return",!0);case 15:return q((function(e){return[].concat((0,n.Z)(e),["Your adventurer attacks the Big Ugly Rat and deals ".concat(t.adventurerDamage," dmg.")])})),e.next=18,v(450);case 18:if(!(t.adventurerArmor<t.dungeonToHit)){e.next=24;break}if(C((function(e){return e-t.dungeonDamage})),!((r-=t.dungeonDamage)<=0)){e.next=24;break}return q((function(e){return[].concat((0,n.Z)(e),["Your adventurer fades out"])})),e.abrupt("return",!1);case 24:return q((function(e){return[].concat((0,n.Z)(e),["The Big Ugly Rat attacks your adventurer and deals ".concat(t.dungeonDamage," dmg.")])})),e.next=27,v(450);case 27:y((function(e){return e+1}));case 28:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,o.useEffect)((function(){C(t.adventurerHealth),L(t.dungeonHealth)}),[t]),(0,f.jsxs)("section",{className:"relative",children:[(0,f.jsxs)("div",{className:"absolute bg-black inset-0 z-10 -top-24 -left-4 -right-4 flex flex-col items-center min-h-screen transition-opacity duration-1000 ".concat(I<=0?"opacity-100":"opacity-0 pointer-events-none"),children:[(0,f.jsx)("p",{className:"text-2xl text-white pt-20 mx-4 md:mx-0 md:pt-64 max-w-screen-sm text-center",children:"you passed out"}),(0,f.jsx)("p",{className:"text-base text-white pt-8 mx-4 md:mx-0 max-w-screen-sm text-center",children:"After some time, the rat returns to his hole and Vigo the tavernkeeper, worried, finds you lying on the floor"}),(0,f.jsx)(i.default,{href:"/town/quest?tab=the-cellar",children:(0,f.jsx)("div",{className:"text-base text-white mt-16 mx-4 md:mx-0 py-2 px-4 max-w-screen-sm text-center animate-pulse border-t-4 border-b-4 border-white hover:bg-white hover:text-black transition-colors cursor-pointer hover:animate-none",style:{cursor:"pointer"},children:"Rest weak adventurer, Rest..."})})]}),(0,f.jsx)("div",{className:"max-w-screen-sm w-full mx-auto mt-12",children:(0,f.jsxs)("div",{className:"flex flex-col items-center",children:[(0,f.jsxs)("div",{className:"w-full flex flex-row ml-0 md:ml-32",children:[(0,f.jsxs)("div",{className:"w-full mr-14",children:[(0,f.jsx)("p",{className:"whitespace-nowrap",children:"Big Ugly Rat"}),(0,f.jsxs)("div",{className:"flex flex-row items-center w-full py-2",children:[(0,f.jsx)("div",{className:"text-opacity-80 text-black dark:text-white text-sm w-32",children:"HP:"}),(0,f.jsx)("progress",{className:"border-solid border-2 border-black dark:border-dark-400 p-1.5 nes-progress is-error w-full transition-all",value:S,max:t.dungeonHealth})]})]}),(0,f.jsx)("div",{className:"w-60 hidden md:block transform",style:{transform:S<=0?"rotate3d(0, 1, 0, 0deg)":"rotate3d(0, 1, 0, 180deg)",minWidth:240,opacity:E?0:100},children:(0,f.jsx)(c.default,{src:S<=0?"/dungeons/rat_dead.png":"/dungeons/rat.gif",loading:"eager",quality:100,width:240,height:141})}),(0,f.jsx)("div",{className:"w-30 block md:hidden transform",style:{transform:S<=0?"rotate3d(0, 1, 0, 0deg)":"rotate3d(0, 1, 0, 180deg)",minWidth:120,opacity:E?0:100},children:(0,f.jsx)(c.default,{src:S<=0?"/dungeons/rat_dead.png":"/dungeons/rat.gif",loading:"eager",quality:100,width:120,height:70.5})})]}),(0,f.jsxs)("div",{className:"w-full flex flex-row mt-2 md:-mt-10 mr-0 md:mr-32",children:[(0,f.jsx)("div",{className:"w-60 hidden md:block",style:{minWidth:240},children:(0,f.jsx)(c.default,{src:g[r.class],loading:"eager",quality:100,width:240,height:240})}),(0,f.jsx)("div",{className:"w-32 block md:hidden",style:{minWidth:120},children:(0,f.jsx)(c.default,{src:g[r.class],loading:"eager",quality:100,width:120,height:120})}),(0,f.jsxs)("div",{className:"w-full mt-auto mb-2",children:[(0,f.jsx)("p",{children:t.tokenID}),(0,f.jsxs)("div",{className:"flex flex-row items-center w-full py-2",children:[(0,f.jsx)("div",{className:"text-opacity-80 text-black dark:text-white text-sm w-32",children:"HP:"}),(0,f.jsx)("progress",{className:"nes-progress border-solid border-2 border-black dark:border-dark-400 p-1.5 is-success w-full transition-all",value:I,max:t.adventurerHealth})]})]})]})]})}),(0,f.jsx)("div",{className:"max-w-screen-md w-full mx-auto",children:(0,f.jsx)(b,{router:u,step:function(){return B.apply(this,arguments)},stepAuto:function(){return Y.apply(this,arguments)},ratEscaped:E,adventurerWon:H,expectedLoot:t.scout,loot:function(){(0,h.yL)({provider:l,contractAddress:x.env.DUNGEON_THE_CELLAR_ADDR,tokenID:t.tokenID},(function(e){var r=e.error;if(r)return console.error(r);p(t.tokenID),"/dungeons/the-cellar"===u.pathname&&u.push("/town/quest?tab=the-cellar")}))}})}),(0,f.jsx)("div",{className:"max-w-screen-md w-full mx-auto",children:(0,f.jsx)("div",{className:"space-y-4 text-center",children:P.map((function(e,t){return(0,f.jsx)("p",{className:"text-sx",children:e},t)}))})})]})}function w(e){var t=e.router,r=e.adventurer,n=(0,l.ZP)().dungeon;return n.adventurerHealth&&n.dungeonHealth?(0,f.jsx)(k,{router:t,dungeon:n,adventurer:r}):null}t.default=function(e){var t,r,n,a=e.rarities,u=e.router;return a&&a!=={}?a[null===u||void 0===u||null===(t=u.query)||void 0===t?void 0:t.adventurer]?(0,f.jsx)(l.zy,{adventurer:a[null===u||void 0===u||null===(r=u.query)||void 0===r?void 0:r.adventurer],children:(0,f.jsx)(w,{router:u,adventurer:a[null===u||void 0===u||null===(n=u.query)||void 0===n?void 0:n.adventurer]})}):(u.push("/"),null):null}},40661:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dungeons/the-cellar",function(){return r(95854)}])}},function(e){e.O(0,[722,774,888,179],(function(){return t=40661,e(e.s=t);var t}));var t=e.O();_N_E=t}]);