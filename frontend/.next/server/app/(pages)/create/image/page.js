(()=>{var e={};e.id=1013,e.ids=[1013],e.modules={96330:e=>{"use strict";e.exports=require("@prisma/client")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},79428:e=>{"use strict";e.exports=require("buffer")},55511:e=>{"use strict";e.exports=require("crypto")},94735:e=>{"use strict";e.exports=require("events")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},33873:e=>{"use strict";e.exports=require("path")},11723:e=>{"use strict";e.exports=require("querystring")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},82346:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>i.a,__next_app__:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var s=t(70260),n=t(28203),a=t(25155),i=t.n(a),o=t(67292),l={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);t.d(r,l);let d=["",{children:["(pages)",{children:["create",{children:["image",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,38046)),"C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\app\\(pages)\\create\\image\\page.tsx"]}]},{}]},{}]},{"not-found":[()=>Promise.resolve().then(t.t.bind(t,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,51520))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,7752)),"C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(t.bind(t,21154)),"C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,51520))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\app\\(pages)\\create\\image\\page.tsx"],p={require:t,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:n.RouteKind.APP_PAGE,page:"/(pages)/create/image/page",pathname:"/create/image",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},6117:(e,r,t)=>{Promise.resolve().then(t.bind(t,52255))},42565:(e,r,t)=>{Promise.resolve().then(t.bind(t,7141))},7141:(e,r,t)=>{"use strict";t.d(r,{default:()=>x});var s=t(45512),n=t(32692),a=t(87010),i=t(62149),o=t(22403),l=t(58009),d=t(77360),c=t(81441),p=t(94805);let u=({value:e,placeholder:r,onInput:t,beforeIcon:n,afterIcon:a,className:i,version:o="primary",shadow:l=!0,label:d,name:c,required:u=!1,onChange:m,onBlur:x,onFocus:h})=>{let f=`
        text-primary
        ${l?"shadow-[0_0_2px_0_var(--tw-shadow-color)] shadow-primary/50":""}
        rounded-full
        px-4 py-2
        font-semibold
        hover:brightness-90 
        transition
        duration-200
        flex items-center justify-center
        text-lg
        focus:outline-none
        focus:ring-2
        focus:ring-primary
        flex 
        justify-between
        min-w-72
    `;return(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsxs)("div",{className:(0,p.QP)(f,"primary"===o?"bg-secondary-tier1/50":"bg-secondary-tier3","border-2 border-secondary-tier2",i),children:[n&&(0,s.jsx)("span",{className:"mr-2",children:n}),(0,s.jsx)("input",{className:"bg-transparent w-full placeholder:text-primary placeholder:font-normal",onInput:t,onChange:m,onBlur:x,onFocus:h,placeholder:r,type:"date",value:e??"",name:c,required:u}),a&&(0,s.jsx)("span",{className:"ml-2",children:a})]}),d&&(0,s.jsx)("label",{className:"text-primary text-lg md:text-md ml-2",children:d})]})},m=e=>{let r=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${r}-${t}-${s}`};function x(){let[e,r]=(0,l.useState)([]),[t,p]=(0,l.useState)({title:"",image:null,event:null,description:"",date:m(new Date)}),x=e=>{let{name:r,value:t}=e.target;p(e=>({...e,[r]:t}))};return(0,s.jsxs)(n.A,{gradientPosition:"center",className:"p-10 min-h-screen",children:[(0,s.jsx)("h1",{className:"text-[3rem] mb-10 font-bold",children:"Upload Image"}),(0,s.jsx)(o.Toaster,{}),(0,s.jsxs)("form",{onSubmit:e=>{e.preventDefault();let r=new FormData;for(let e in t){let s=t[e];if(null===s){o.Ay.error("Please fill in all the fields");return}s instanceof File?r.append(e,s):s instanceof Object?r.append(e,JSON.stringify(s)):r.append(e,s)}fetch("/api/images/upload",{method:"POST",body:r}).then(e=>e.json()).then(e=>{"error"==e.status?o.Ay.error(e.error):o.Ay.success("Image uploaded successfully")}).catch(e=>{o.Ay.error("Failed to upload image: "+e.message)})},className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-y-2 gap-x-10",children:[(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsx)(a.A,{placeholder:"Title",version:"secondary",className:"rounded-xl",name:"title",value:t.title,onChange:x,required:!0}),(0,s.jsx)("label",{children:"Title"})]}),(0,s.jsxs)("div",{className:"flex flex-col gap-2 row-span-3 justify-start items-start",children:[(0,s.jsx)("textarea",{className:"text-primary placeholder-primary h-[20rem] rounded-xl w-[100%] bg-secondary-tier3 resize-none border-2 border-secondary-tier2 px-4 py-2 text-lg",placeholder:"Description",name:"description",value:t.description,onChange:x,required:!0}),(0,s.jsx)("label",{children:"Description"})]}),(0,s.jsx)("div",{className:"row-span-2",children:(0,s.jsx)(d.VY,{accept:"image/*",onFileUpload:e=>{p(r=>({...r,image:e}))},label:"Image",file:t.image})}),(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsx)(c.A,{options:e,setSelectedOption:e=>{e?p(r=>({...r,event:{title:e.label,id:e.id}})):p(e=>({...e,event:null}))},placeholder:"CTF"}),(0,s.jsxs)("label",{children:["Related Event ",!t.event?.id&&(0,s.jsx)("span",{className:"text-red-500 text-sm",children:"(Event not found. It will be created.)"})]})]}),(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsx)(u,{placeholder:"Date",version:"secondary",className:"rounded-xl",name:"date",value:t.date,onChange:x,required:!0}),(0,s.jsx)("label",{children:"Date Taken"})]}),(0,s.jsx)(i.A,{type:"submit",className:"col-span-1 md:col-span-2 lg:col-span-1 h-[3rem] rounded-xl mt-[1rem] order-",children:"Create"})]})]})}},38046:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>l,dynamic:()=>o});var s=t(62740),n=t(85562),a=t(31831),i=t(52255);let o="force-dynamic";async function l(){return await (0,n.j)()||(0,a.redirect)("/auth/signin"),(0,s.jsx)(i.default,{})}},52255:(e,r,t)=>{"use strict";t.d(r,{default:()=>s});let s=(0,t(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\czhon\\\\Documents\\\\GitHub\\\\SSMCT_Website\\\\frontend\\\\src\\\\components\\\\CreateImagePage.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\components\\CreateImagePage.tsx","default")}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,2888,6622,8433,6493,1652,221],()=>t(82346));module.exports=s})();