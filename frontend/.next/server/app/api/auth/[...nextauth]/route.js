(()=>{var e={};e.id=1014,e.ids=[1014],e.modules={96330:e=>{"use strict";e.exports=require("@prisma/client")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},79428:e=>{"use strict";e.exports=require("buffer")},55511:e=>{"use strict";e.exports=require("crypto")},94735:e=>{"use strict";e.exports=require("events")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},11723:e=>{"use strict";e.exports=require("querystring")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},64426:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>g,routeModule:()=>d,serverHooks:()=>h,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>f});var s={};t.r(s),t.d(s,{GET:()=>p,POST:()=>p});var i=t(42706),n=t(28203),o=t(45994),u=t(51825),a=t.n(u),c=t(85562);let p=a()(c.$),d=new i.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/auth/[...nextauth]/route",pathname:"/api/auth/[...nextauth]",filename:"route",bundlePath:"app/api/auth/[...nextauth]/route"},resolvedPagePath:"C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\app\\api\\auth\\[...nextauth]\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:l,workUnitAsyncStorage:f,serverHooks:h}=d;function g(){return(0,o.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:f})}},96487:()=>{},78335:()=>{},37301:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"createDedupedByCallsiteServerErrorLoggerDev",{enumerable:!0,get:function(){return a}});let s=function(e,r){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=i(void 0);if(t&&t.has(e))return t.get(e);var s={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var u=n?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(s,o,u):s[o]=e[o]}return s.default=e,t&&t.set(e,s),s}(t(76301));function i(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap,t=new WeakMap;return(i=function(e){return e?t:r})(e)}let n={current:null},o="function"==typeof s.cache?s.cache:e=>e,u=console.warn;function a(e){return function(...r){u(e(...r))}}o(e=>{try{u(n.current)}finally{n.current=null}})},42706:(e,r,t)=>{"use strict";e.exports=t(44870)},85562:(e,r,t)=>{"use strict";t.d(r,{$:()=>a,j:()=>c});var s=t(51825),i=t(64912),n=t(86259),o=t(84908);let u=async e=>{let r=process.env.DISCORD_GUILD_ID,t=await fetch("https://discord.com/api/v10/users/@me/guilds",{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw console.error("Failed to fetch user's Discord guilds"),Error("Failed to fetch user's Discord guilds");return!!(await t.json()).some(e=>e.id===r)||(console.error("User is not in the required Discord guild"),!1)},a={adapter:(0,n.y)(o.A),pages:{signIn:"/",signOut:"/auth/signout",error:"/auth/signin",newUser:"/auth/new_user"},session:{strategy:"database"},providers:[(0,i.A)({clientId:process.env.DISCORD_CLIENT_ID,clientSecret:process.env.DISCORD_CLIENT_SECRET,authorization:{params:{scope:"identify guilds guilds.members.read"}},token:"https://discord.com/api/oauth2/token",userinfo:"https://discord.com/api/users/@me",profile:e=>({id:e.id,name:e.username,image:e.avatar?`https://cdn.discordapp.com/avatars/${e.id}/${e.avatar}.png`:null})})],callbacks:{async signIn({account:e,user:r}){if(!e||!r)return!1;if("discord"===e.provider){if(console.log(e),!e.access_token)return!1;if(!await u(e.access_token))throw Error("User is not in the required Discord guild")}return!0},session:async({session:e,user:r})=>(e?.user&&(e.user.id=r.id),e)}};function c(...e){return(0,s.getServerSession)(...e,a)}},84908:(e,r,t)=>{"use strict";t.d(r,{A:()=>i});var s=t(96330);let i=global.prisma||new s.PrismaClient({log:["query"]})}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,6622],()=>t(64426));module.exports=s})();