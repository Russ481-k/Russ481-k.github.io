(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[226],{3836:function(e,o,t){Promise.resolve().then(t.bind(t,5862)),Promise.resolve().then(t.t.bind(t,9269,23)),Promise.resolve().then(t.t.bind(t,8349,23))},5862:function(e,o,t){"use strict";t.r(o),t.d(o,{default:function(){return l}});var n=t(9268),a=t(6006),i=t(6708),r=t(8201);function l(e){let{children:o,lang:t}=e,{t:l}=(0,i.$G)("common");return(0,a.useEffect)(()=>{console.log("Translation test:",{title:l("title"),headerTitle:l("header.title")})},[l]),(0,a.useEffect)(()=>{let e=async()=>{try{r.Z.resolvedLanguage!==t&&await r.Z.changeLanguage(t)}catch(e){console.error("Language change error:",e)}};e()},[t]),(0,n.jsx)(n.Fragment,{children:o})}},8201:function(e,o,t){"use strict";t.d(o,{Z:function(){return c}});var n=t(3412),a=t(6708),i=t(8410);let r={en:{common:{title:"Bin's Space",header:{title:"Bin's Space",nav:{intro:"Intro",work:"Work",notion:"Notion"}},profile:{position:"Full Stack Developer",name:"Russ",image:"Profile Image",blog:"BLOG",emailLabel:"EMAIL",positionLabel:"POSITION",copied:"Copied!",social:{github:"GitHub",notion:"Notion",email:"Email"}},categories:{all:"All Posts",projects:"Projects",about:"About",career:"Career",architecture:"Architecture",database:"Database",frontend:"Frontend",backend:"Backend"},modal:{loading:"Loading...",close:"Close",toc:"Table of Contents",prev:"Previous Post",next:"Next Post",share:{title:"Share",copy:"Copy Link",copied:"Copied!"}},experience:{title:"Career History",current:"Present",skills:{nextjs:"Next.js Web Application Development",optimization:"Performance Optimization and UX Improvement"},projectSection:{title:"Projects",blog:"Personal Blog Development",portfolio:"Portfolio Website Creation"},company:"Company Name"},search:{placeholder:"Search",totalPosts:"Total {{count}} posts"},sidebar:{category:"CATEGORY"}}},ko:{common:{title:"Bin's Space",header:{title:"Bin's Space",nav:{intro:"소개",work:"경력",notion:"노션"}},profile:{position:"풀스택 개발자",name:"러스",image:"프로필 이미지",blog:"블로그",emailLabel:"이메일",positionLabel:"직책",copied:"복사됨!",social:{github:"깃허브",notion:"노션",email:"이메일"}},categories:{all:"전체 글",projects:"프로젝트",about:"소개",career:"경력",architecture:"아키텍처",database:"데이터베이스",frontend:"프론트엔드",backend:"백엔드"},modal:{loading:"로딩 중...",close:"닫기",toc:"목차",prev:"이전 글",next:"다음 글",share:{title:"공유하기",copy:"링크 복사",copied:"복사됨!"}},experience:{title:"경력 사항",current:"현재",skills:{nextjs:"Next.js를 사용한 웹 애플리케이션 개발",optimization:"성능 최적화 및 사용자 경험 개선"},projectSection:{title:"프로젝트",blog:"개인 블로그 개발",portfolio:"포트폴리오 웹사이트 제작"},company:"회사명"},search:{placeholder:"검색",totalPosts:"총 {{count}}개의 글"},sidebar:{category:"카테고리"}}}},l=async()=>{await n.ZP.use(a.Db).use(i.Z).init({resources:r,lng:"en",fallbackLng:"en",defaultNS:"common",ns:["common"],react:{useSuspense:!1},interpolation:{escapeValue:!1}})};n.ZP.isInitialized||l().catch(e=>{console.error("i18n initialization error:",e)}),console.log("i18n resources:",r),console.log("current language:",n.ZP.language),console.log("resolved language:",n.ZP.resolvedLanguage);var c=n.ZP},9269:function(){},8349:function(e){e.exports={style:{fontFamily:"'__Inter_a184c8', '__Inter_Fallback_a184c8'",fontStyle:"normal"},className:"__className_a184c8"}}},function(e){e.O(0,[257,667,139,744],function(){return e(e.s=3836)}),_N_E=e.O()}]);