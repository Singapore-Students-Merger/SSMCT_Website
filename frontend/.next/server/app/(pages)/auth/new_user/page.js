(()=>{var e={};e.id=5882,e.ids=[5882],e.modules={96330:e=>{"use strict";e.exports=require("@prisma/client")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},79428:e=>{"use strict";e.exports=require("buffer")},55511:e=>{"use strict";e.exports=require("crypto")},94735:e=>{"use strict";e.exports=require("events")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},33873:e=>{"use strict";e.exports=require("path")},11723:e=>{"use strict";e.exports=require("querystring")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},94354:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>c,pages:()=>d,routeModule:()=>p,tree:()=>u});var o=r(70260),i=r(28203),s=r(25155),n=r.n(s),a=r(67292),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);r.d(t,l);let u=["",{children:["(pages)",{children:["auth",{children:["new_user",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,29045)),"C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\app\\(pages)\\auth\\new_user\\page.tsx"]}]},{}]},{}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,51520))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,71354)),"C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,21154)),"C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,51520))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\app\\(pages)\\auth\\new_user\\page.tsx"],c={require:r,loadChunk:()=>Promise.resolve()},p=new o.AppPageRouteModule({definition:{kind:i.RouteKind.APP_PAGE,page:"/(pages)/auth/new_user/page",pathname:"/auth/new_user",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},15702:(e,t,r)=>{Promise.resolve().then(r.bind(r,30302))},10974:(e,t,r)=>{Promise.resolve().then(r.bind(r,43e3))},43e3:(e,t,r)=>{"use strict";r.d(t,{default:()=>p});var o=r(45512),i=r(58009),s=r(62149),n=r(32692),a=r(87010),l=r(86397),u=r(94805);let d=({selected:e,className:t,children:r,beforeIcon:s,afterIcon:n,onClick:a,beforeIconClickHandler:l,afterIconClickHandler:d})=>{let[c,p]=(0,i.useState)(e);return(0,o.jsxs)("div",{onClick:()=>{a&&a(),p(e=>!e)},className:(0,u.QP)("bg-tertiary text-primary w-fit text-lg px-4 py-2 rounded-full cursor-pointer hover:brightness-50 transition-[filter] duration-200",c?"brightness-75 outline-primary outline-2 outline":"brightness-100",t),children:[s&&(0,o.jsx)("div",{onClick:l,children:s}),(0,o.jsx)("div",{children:r}),n&&(0,o.jsx)("div",{onClick:d,children:n})]})};var c=r(22403);function p({name:e,categories:t}){let[r,u]=(0,i.useState)(e||""),[p,f]=(0,i.useState)(""),[m,h]=(0,i.useState)("-1"),[y,b]=(0,i.useState)([]),g=t.map(e=>({value:e.id,label:e.name}));g.unshift({value:-1,label:"None"});let v=async()=>{if(!r.trim()){c.Ay.error("Display Name is required");return}if(""!=p&&!p.trim()){c.Ay.error("Did you think I wouldn't validate this :C? Please input your real name or leave it empty.");return}c.Ay.promise(fetch("/api/users/update-user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({displayName:r,realName:p,mainCategoryId:"-1"==m?null:parseInt(m),interests:y})}).then(async e=>e.ok?(window.location.href="/",Promise.resolve("User updated successfully")):Promise.reject((await e.json()).error||"Failed to update user")).catch(e=>{throw console.error("Error:",e),Error(e||"A network error occurred. Please try again.")}),{loading:"Updating user...",success:e=>e,error:e=>e.message||"An error occurred"})};return(0,o.jsxs)(n.A,{gradientPosition:"center",className:"min-h-screen flex items-center flex-col gap-8 justify-start py-20 px-10 md:px-20",children:[(0,o.jsxs)("h1",{className:"text-5xl font-bold text-center",children:[" Welcome ",e]}),(0,o.jsx)("p",{className:"text-white text-2xl text-center",children:"Before we begin, please tell us more about yourself"}),(0,o.jsxs)("div",{className:"grid grid-cols-1 gap-10 lg:grid-cols-3 w-full justify-center ",children:[(0,o.jsx)(a.A,{placeholder:"Display Name",className:"rounded-xl",label:"Display Name",value:r,onChange:e=>u(e.target.value)}),(0,o.jsx)(a.A,{placeholder:"Real Name",className:"rounded-xl",label:"Name (optional)",value:p,onChange:e=>f(e.target.value)}),(0,o.jsx)(l.A,{placeholder:"Select Main Category",className:"rounded-xl",label:"Main Category",options:g,onChange:e=>h(e.value)})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"border-2 border-secondary-tier2 w-full min-h-72 rounded-lg flex flex-wrap gap-4 items-start content-start px-4 py-4",children:t.map((e,t)=>(0,o.jsx)(d,{onClick:()=>{b(t=>t.includes(e.id)?t.filter(t=>t!==e.id):[...t,e.id])},selected:y.includes(e.id),children:e.name},t))}),(0,o.jsx)("p",{className:"text-primary text-lg md:text-md py-2 ml-2",children:"Categories of Interest"})]}),(0,o.jsx)(s.A,{className:"px-10",onClick:v,children:"Continue"}),(0,o.jsx)(c.Toaster,{})]})}},31831:(e,t,r)=>{"use strict";var o=r(67359);r.o(o,"redirect")&&r.d(t,{redirect:function(){return o.redirect}})},46347:(e,t,r)=>{"use strict";function o(){throw Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.")}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"forbidden",{enumerable:!0,get:function(){return o}}),r(26003).HTTP_ERROR_FALLBACK_ERROR_CODE,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},11271:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isNextRouterError",{enumerable:!0,get:function(){return s}});let o=r(26003),i=r(23543);function s(e){return(0,i.isRedirectError)(e)||(0,o.isHTTPAccessFallbackError)(e)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},67359:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ReadonlyURLSearchParams:function(){return d},RedirectType:function(){return i.RedirectType},forbidden:function(){return n.forbidden},notFound:function(){return s.notFound},permanentRedirect:function(){return o.permanentRedirect},redirect:function(){return o.redirect},unauthorized:function(){return a.unauthorized},unstable_rethrow:function(){return l.unstable_rethrow}});let o=r(26552),i=r(23543),s=r(39274),n=r(46347),a=r(10590),l=r(51370);class u extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class d extends URLSearchParams{append(){throw new u}delete(){throw new u}set(){throw new u}sort(){throw new u}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},39274:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"notFound",{enumerable:!0,get:function(){return i}});let o=""+r(26003).HTTP_ERROR_FALLBACK_ERROR_CODE+";404";function i(){let e=Error(o);throw e.digest=o,e}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},23543:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{REDIRECT_ERROR_CODE:function(){return i},RedirectType:function(){return s},isRedirectError:function(){return n}});let o=r(11541),i="NEXT_REDIRECT";var s=function(e){return e.push="push",e.replace="replace",e}({});function n(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let t=e.digest.split(";"),[r,s]=t,n=t.slice(2,-2).join(";"),a=Number(t.at(-2));return r===i&&("replace"===s||"push"===s)&&"string"==typeof n&&!isNaN(a)&&a in o.RedirectStatusCode}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},11541:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return r}});var r=function(e){return e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e}({});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},26552:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{getRedirectError:function(){return n},getRedirectStatusCodeFromError:function(){return c},getRedirectTypeFromError:function(){return d},getURLFromRedirectError:function(){return u},permanentRedirect:function(){return l},redirect:function(){return a}});let o=r(19121),i=r(11541),s=r(23543);function n(e,t,r){void 0===r&&(r=i.RedirectStatusCode.TemporaryRedirect);let o=Error(s.REDIRECT_ERROR_CODE);return o.digest=s.REDIRECT_ERROR_CODE+";"+t+";"+e+";"+r+";",o}function a(e,t){let r=o.actionAsyncStorage.getStore();throw n(e,t||((null==r?void 0:r.isAction)?s.RedirectType.push:s.RedirectType.replace),i.RedirectStatusCode.TemporaryRedirect)}function l(e,t){throw void 0===t&&(t=s.RedirectType.replace),n(e,t,i.RedirectStatusCode.PermanentRedirect)}function u(e){return(0,s.isRedirectError)(e)?e.digest.split(";").slice(2,-2).join(";"):null}function d(e){if(!(0,s.isRedirectError)(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function c(e){if(!(0,s.isRedirectError)(e))throw Error("Not a redirect error");return Number(e.digest.split(";").at(-2))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},10590:(e,t,r)=>{"use strict";function o(){throw Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.")}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"unauthorized",{enumerable:!0,get:function(){return o}}),r(26003).HTTP_ERROR_FALLBACK_ERROR_CODE,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},51370:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"unstable_rethrow",{enumerable:!0,get:function(){return function e(t){if((0,n.isNextRouterError)(t)||(0,s.isBailoutToCSRError)(t)||(0,o.isDynamicUsageError)(t)||(0,i.isPostpone)(t))throw t;t instanceof Error&&"cause"in t&&e(t.cause)}}});let o=r(62349),i=r(67418),s=r(40627),n=r(11271);("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},62349:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isDynamicUsageError",{enumerable:!0,get:function(){return a}});let o=r(42490),i=r(40627),s=r(11271),n=r(10436),a=e=>(0,o.isDynamicServerError)(e)||(0,i.isBailoutToCSRError)(e)||(0,s.isNextRouterError)(e)||(0,n.isDynamicPostpone)(e)},67418:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isPostpone",{enumerable:!0,get:function(){return o}});let r=Symbol.for("react.postpone");function o(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}},40627:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{BailoutToCSRError:function(){return o},isBailoutToCSRError:function(){return i}});let r="BAILOUT_TO_CLIENT_SIDE_RENDERING";class o extends Error{constructor(e){super("Bail out to client-side rendering: "+e),this.reason=e,this.digest=r}}function i(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}},29045:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l,dynamic:()=>a});var o=r(62740),i=r(85562),s=r(31831),n=r(30302);let a="force-dynamic";async function l(){let e=await (0,i.j)();e||(0,s.redirect)("/auth/signin");let t=await fetch("https://ssmct.org/api/categories").then(e=>e.json()).catch(e=>(console.error("Error:",e),[]));return(0,o.jsx)(n.default,{name:e.user.name,categories:t})}},85562:(e,t,r)=>{"use strict";r.d(t,{$:()=>l,j:()=>u});var o=r(51825),i=r(64912),s=r(86259),n=r(84908);let a=async e=>{let t=process.env.DISCORD_GUILD_ID,r=await fetch("https://discord.com/api/v10/users/@me/guilds",{headers:{Authorization:`Bearer ${e}`}});if(!r.ok)throw console.error("Failed to fetch user's Discord guilds"),Error("Failed to fetch user's Discord guilds");return!!(await r.json()).some(e=>e.id===t)||(console.error("User is not in the required Discord guild"),!1)},l={adapter:(0,s.y)(n.A),pages:{signIn:"/",signOut:"/auth/signout",error:"/auth/signin",newUser:"/auth/new_user"},session:{strategy:"database"},providers:[(0,i.A)({clientId:process.env.DISCORD_CLIENT_ID,clientSecret:process.env.DISCORD_CLIENT_SECRET,authorization:{params:{scope:"identify guilds guilds.members.read"}},token:"https://discord.com/api/oauth2/token",userinfo:"https://discord.com/api/users/@me",profile:e=>({id:e.id,name:e.username,image:e.avatar?`https://cdn.discordapp.com/avatars/${e.id}/${e.avatar}.png`:null})})],callbacks:{async signIn({account:e,user:t}){if(!e||!t)return!1;if("discord"===e.provider){if(console.log(e),!e.access_token)return!1;if(!await a(e.access_token))throw Error("User is not in the required Discord guild")}return!0},session:async({session:e,user:t})=>(e?.user&&(e.user.id=t.id),e)}};function u(...e){return(0,o.getServerSession)(...e,l)}},30302:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});let o=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\czhon\\\\Documents\\\\GitHub\\\\SSMCT_Website\\\\frontend\\\\src\\\\components\\\\UserForm.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\components\\UserForm.tsx","default")},22403:(e,t,r)=>{"use strict";r.d(t,{Toaster:()=>eu,Ay:()=>ed});var o,i=r(58009);let s={data:""},n=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||s,a=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,d=(e,t)=>{let r="",o="",i="";for(let s in e){let n=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+n+";":o+="f"==s[1]?d(n,s):s+"{"+d(n,"k"==s[1]?"":t)+"}":"object"==typeof n?o+=d(n,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=n&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=d.p?d.p(s,n):s+":"+n+";")}return r+(t&&i?t+"{"+i+"}":i)+o},c={},p=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+p(e[r]);return t}return e},f=(e,t,r,o,i)=>{let s=p(e),n=c[s]||(c[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!c[n]){let t=s!==e?e:(e=>{let t,r,o=[{}];for(;t=a.exec(e.replace(l,""));)t[4]?o.shift():t[3]?(r=t[3].replace(u," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(u," ").trim();return o[0]})(e);c[n]=d(i?{["@keyframes "+n]:t}:t,r?"":"."+n)}let f=r&&c.g?c.g:null;return r&&(c.g=c[n]),((e,t,r,o)=>{o?t.data=t.data.replace(o,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(c[n],t,o,f),n},m=(e,t,r)=>e.reduce((e,o,i)=>{let s=t[i];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+o+(null==s?"":s)},"");function h(e){let t=this||{},r=e.call?e(t.p):e;return f(r.unshift?r.raw?m(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,n(t.target),t.g,t.o,t.k)}h.bind({g:1});let y,b,g,v=h.bind({k:1});function x(e,t){let r=this||{};return function(){let o=arguments;function i(s,n){let a=Object.assign({},s),l=a.className||i.className;r.p=Object.assign({theme:b&&b()},a),r.o=/ *go\d+/.test(l),a.className=h.apply(r,o)+(l?" "+l:""),t&&(a.ref=n);let u=e;return e[0]&&(u=a.as||e,delete a.as),g&&u[0]&&g(a),y(u,a)}return t?t(i):i}}var _=e=>"function"==typeof e,j=(e,t)=>_(e)?e(t):e,E=(()=>{let e=0;return()=>(++e).toString()})(),w=(()=>{let e;return()=>e})(),R=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return R(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},P=[],O={toasts:[],pausedAt:void 0},C=e=>{O=R(O,e),P.forEach(e=>{e(O)})},D={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=(e={})=>{let[t,r]=(0,i.useState)(O);(0,i.useEffect)(()=>(P.push(r),()=>{let e=P.indexOf(r);e>-1&&P.splice(e,1)}),[t]);let o=t.toasts.map(t=>{var r,o,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(o=e[t.type])?void 0:o.duration)||(null==e?void 0:e.duration)||D[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...t,toasts:o}},T=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),M=e=>(t,r)=>{let o=T(t,e,r);return C({type:2,toast:o}),o.id},N=(e,t)=>M("blank")(e,t);N.error=M("error"),N.success=M("success"),N.loading=M("loading"),N.custom=M("custom"),N.dismiss=e=>{C({type:3,toastId:e})},N.remove=e=>C({type:4,toastId:e}),N.promise=(e,t,r)=>{let o=N.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?j(t.success,e):void 0;return i?N.success(i,{id:o,...r,...null==r?void 0:r.success}):N.dismiss(o),e}).catch(e=>{let i=t.error?j(t.error,e):void 0;i?N.error(i,{id:o,...r,...null==r?void 0:r.error}):N.dismiss(o)}),e};var k=(e,t)=>{C({type:1,toast:{id:e,height:t}})},A=()=>{C({type:5,time:Date.now()})},I=new Map,z=1e3,$=(e,t=z)=>{if(I.has(e))return;let r=setTimeout(()=>{I.delete(e),C({type:4,toastId:e})},t);I.set(e,r)},q=e=>{let{toasts:t,pausedAt:r}=S(e);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),o=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&N.dismiss(t.id);return}return setTimeout(()=>N.dismiss(t.id),r)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[t,r]);let o=(0,i.useCallback)(()=>{r&&C({type:6,time:Date.now()})},[r]),s=(0,i.useCallback)((e,r)=>{let{reverseOrder:o=!1,gutter:i=8,defaultPosition:s}=r||{},n=t.filter(t=>(t.position||s)===(e.position||s)&&t.height),a=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<a&&e.visible).length;return n.filter(e=>e.visible).slice(...o?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return(0,i.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)$(e.id,e.removeDelay);else{let t=I.get(e.id);t&&(clearTimeout(t),I.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:k,startPause:A,endPause:o,calculateOffset:s}}},U=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,H=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,G=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${G} 1s linear infinite;
`,W=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,K=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,X=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${K} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,J=x("div")`
  position: absolute;
`,Q=x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Y=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Z=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Y} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return void 0!==t?"string"==typeof t?i.createElement(Z,null,t):t:"blank"===r?null:i.createElement(Q,null,i.createElement(B,{...o}),"loading"!==r&&i.createElement(J,null,"error"===r?i.createElement(H,{...o}):i.createElement(X,{...o})))},ee=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,et=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=x("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,eo=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let r=e.includes("top")?1:-1,[o,i]=w()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ee(r),et(r)];return{animation:t?`${v(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},es=i.memo(({toast:e,position:t,style:r,children:o})=>{let s=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},n=i.createElement(V,{toast:e}),a=i.createElement(eo,{...e.ariaProps},j(e.message,e));return i.createElement(er,{className:e.className,style:{...s,...r,...e.style}},"function"==typeof o?o({icon:n,message:a}):i.createElement(i.Fragment,null,n,a))});o=i.createElement,d.p=void 0,y=o,b=void 0,g=void 0;var en=({id:e,className:t,style:r,onHeightUpdate:o,children:s})=>{let n=i.useCallback(t=>{if(t){let r=()=>{o(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return i.createElement("div",{ref:n,className:t,style:r},s)},ea=(e,t)=>{let r=e.includes("top"),o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:w()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...o}},el=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:s,containerStyle:n,containerClassName:a})=>{let{toasts:l,handlers:u}=q(r);return i.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:a,onMouseEnter:u.startPause,onMouseLeave:u.endPause},l.map(r=>{let n=r.position||t,a=ea(n,u.calculateOffset(r,{reverseOrder:e,gutter:o,defaultPosition:t}));return i.createElement(en,{id:r.id,key:r.id,onHeightUpdate:u.updateHeight,className:r.visible?el:"",style:a},"custom"===r.type?j(r.message,r):s?s(r):i.createElement(es,{toast:r,position:n}))}))},ed=N}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[638,2779,8077,6622,4805,8746,2988],()=>r(94354));module.exports=o})();