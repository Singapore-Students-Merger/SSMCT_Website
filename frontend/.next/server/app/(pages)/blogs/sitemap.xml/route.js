"use strict";(()=>{var e={};e.id=7841,e.ids=[7841],e.modules={96330:e=>{e.exports=require("@prisma/client")},10846:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},98605:(e,t,i)=>{i.r(t),i.d(t,{patchFetch:()=>h,routeModule:()=>v,serverHooks:()=>_,workAsyncStorage:()=>g,workUnitAsyncStorage:()=>y});var r={};i.r(r),i.d(r,{default:()=>c,dynamic:()=>u});var o={};i.r(o),i.d(o,{GET:()=>m,dynamic:()=>u});var n=i(42706),a=i(28203),l=i(45994),s=i(39187),d=i(84908);let u="force-dynamic";async function c(){return(await d.A.blogs.findMany({select:{id:!0,date:!0}})).map(e=>({url:`https://ssmct.org/blogs/${e.id}`,lastModified:e.date}))}var p=i(13192);let f={...r}.default;if("function"!=typeof f)throw Error('Default export is missing in "C:\\Users\\czhon\\Documents\\GitHub\\SSMCT_Website\\frontend\\src\\app\\(pages)\\blogs\\sitemap.ts"');async function m(e,t){let{__metadata_id__:i,...r}=await t.params||{},o=!!i&&i.endsWith(".xml");if(i&&!o)return new s.NextResponse("Not Found",{status:404});let n=i&&o?i.slice(0,-4):void 0,a=await f({id:n}),l=(0,p.resolveRouteData)(a,"sitemap");return new s.NextResponse(l,{headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=0, must-revalidate"}})}let v=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/(pages)/blogs/sitemap.xml/route",pathname:"/blogs/sitemap.xml",filename:"sitemap",bundlePath:"app/(pages)/blogs/sitemap.xml/route"},resolvedPagePath:"next-metadata-route-loader?filePath=C%3A%5CUsers%5Cczhon%5CDocuments%5CGitHub%5CSSMCT_Website%5Cfrontend%5Csrc%5Capp%5C(pages)%5Cblogs%5Csitemap.ts&isDynamicRouteExtension=1!?__next_metadata_route__",nextConfigOutput:"",userland:o}),{workAsyncStorage:g,workUnitAsyncStorage:y,serverHooks:_}=v;function h(){return(0,l.patchFetch)({workAsyncStorage:g,workUnitAsyncStorage:y})}},13192:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var i in t)Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}(t,{resolveManifest:function(){return a},resolveRobots:function(){return o},resolveRouteData:function(){return l},resolveSitemap:function(){return n}});let r=i(90026);function o(e){let t="";for(let i of Array.isArray(e.rules)?e.rules:[e.rules]){for(let e of(0,r.resolveArray)(i.userAgent||["*"]))t+=`User-Agent: ${e}
`;if(i.allow)for(let e of(0,r.resolveArray)(i.allow))t+=`Allow: ${e}
`;if(i.disallow)for(let e of(0,r.resolveArray)(i.disallow))t+=`Disallow: ${e}
`;i.crawlDelay&&(t+=`Crawl-delay: ${i.crawlDelay}
`),t+="\n"}return e.host&&(t+=`Host: ${e.host}
`),e.sitemap&&(0,r.resolveArray)(e.sitemap).forEach(e=>{t+=`Sitemap: ${e}
`}),t}function n(e){let t=e.some(e=>Object.keys(e.alternates??{}).length>0),i=e.some(e=>{var t;return!!(null==(t=e.images)?void 0:t.length)}),r=e.some(e=>{var t;return!!(null==(t=e.videos)?void 0:t.length)}),o="";for(let s of(o+='<?xml version="1.0" encoding="UTF-8"?>\n',o+='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',i&&(o+=' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'),r&&(o+=' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"'),t?o+=' xmlns:xhtml="http://www.w3.org/1999/xhtml">\n':o+=">\n",e)){var n,a,l;o+="<url>\n",o+=`<loc>${s.url}</loc>
`;let e=null==(n=s.alternates)?void 0:n.languages;if(e&&Object.keys(e).length)for(let t in e)o+=`<xhtml:link rel="alternate" hreflang="${t}" href="${e[t]}" />
`;if(null==(a=s.images)?void 0:a.length)for(let e of s.images)o+=`<image:image>
<image:loc>${e}</image:loc>
</image:image>
`;if(null==(l=s.videos)?void 0:l.length)for(let e of s.videos)o+=["<video:video>",`<video:title>${e.title}</video:title>`,`<video:thumbnail_loc>${e.thumbnail_loc}</video:thumbnail_loc>`,`<video:description>${e.description}</video:description>`,e.content_loc&&`<video:content_loc>${e.content_loc}</video:content_loc>`,e.player_loc&&`<video:player_loc>${e.player_loc}</video:player_loc>`,e.duration&&`<video:duration>${e.duration}</video:duration>`,e.view_count&&`<video:view_count>${e.view_count}</video:view_count>`,e.tag&&`<video:tag>${e.tag}</video:tag>`,e.rating&&`<video:rating>${e.rating}</video:rating>`,e.expiration_date&&`<video:expiration_date>${e.expiration_date}</video:expiration_date>`,e.publication_date&&`<video:publication_date>${e.publication_date}</video:publication_date>`,e.family_friendly&&`<video:family_friendly>${e.family_friendly}</video:family_friendly>`,e.requires_subscription&&`<video:requires_subscription>${e.requires_subscription}</video:requires_subscription>`,e.live&&`<video:live>${e.live}</video:live>`,e.restriction&&`<video:restriction relationship="${e.restriction.relationship}">${e.restriction.content}</video:restriction>`,e.platform&&`<video:platform relationship="${e.platform.relationship}">${e.platform.content}</video:platform>`,e.uploader&&`<video:uploader${e.uploader.info&&` info="${e.uploader.info}"`}>${e.uploader.content}</video:uploader>`,`</video:video>
`].filter(Boolean).join("\n");if(s.lastModified){let e=s.lastModified instanceof Date?s.lastModified.toISOString():s.lastModified;o+=`<lastmod>${e}</lastmod>
`}s.changeFrequency&&(o+=`<changefreq>${s.changeFrequency}</changefreq>
`),"number"==typeof s.priority&&(o+=`<priority>${s.priority}</priority>
`),o+="</url>\n"}return o+"</urlset>\n"}function a(e){return JSON.stringify(e)}function l(e,t){return"robots"===t?o(e):"sitemap"===t?n(e):"manifest"===t?a(e):""}},90026:(e,t)=>{function i(e){return Array.isArray(e)?e:[e]}function r(e){if(null!=e)return i(e)}function o(e){let t;if("string"==typeof e)try{t=(e=new URL(e)).origin}catch{}return t}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var i in t)Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}(t,{getOrigin:function(){return o},resolveArray:function(){return i},resolveAsArrayOrUndefined:function(){return r}})},84908:(e,t,i)=>{i.d(t,{A:()=>o});var r=i(96330);let o=global.prisma||new r.PrismaClient({log:["query"]})}};var t=require("../../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),r=t.X(0,[638,5452],()=>i(98605));module.exports=r})();