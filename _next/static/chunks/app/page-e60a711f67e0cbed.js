(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{4614:function(e,t,s){Promise.resolve().then(s.bind(s,938)),Promise.resolve().then(s.bind(s,8636)),Promise.resolve().then(s.t.bind(s,6539,23)),Promise.resolve().then(s.t.bind(s,414,23)),Promise.resolve().then(s.bind(s,7116)),Promise.resolve().then(s.t.bind(s,1124,23))},8636:function(e,t,s){"use strict";s.r(t),s.d(t,{Body:function(){return k}});var n=s(9268),a=s(6006),i=s(9768),o=s.n(i);s(2929);var r=s(6394),l=s.n(r);let c=(e,t)=>{if(!t.trim())return e;let s=RegExp("(".concat(t,")"),"gi");return null==e?void 0:e.split(s).map((e,t)=>s.test(e)?(0,n.jsx)("mark",{className:"highlight",children:e},t):e)};var d=s(4128),u=s(5326);let h=e=>{let{title:t,searchTerm:s,tags:i,date:r,thumbnail:h}=e,[m,p]=(0,a.useState)(!1),x=(0,d.F)(h),f=new Date(r).toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric"}),[j,v]=(0,a.useState)(e);(0,a.useEffect)(()=>{o().init()},[]);let g=()=>{p(!0)},S=(null==i?void 0:i.slice(0,3))||[],N=(null==i?void 0:i.length)>3?i.length-3:0,{prevPost:b,nextPost:y}=(t=>{var s,n,a,i,o;let r=null===(s=e.posts)||void 0===s?void 0:s.findIndex(e=>e.id===t.id);return{prevPost:r&&r<(null!==(o=null===(n=e.posts)||void 0===n?void 0:n.length)&&void 0!==o?o:0)-1?null===(a=e.posts)||void 0===a?void 0:a[r+1]:null,nextPost:r&&r>0?null===(i=e.posts)||void 0===i?void 0:i[r-1]:null}})(j);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"post","data-aos-anchor-placement":"top","data-aos-delay":"100","data-aos-easing":"ease-in-out","data-aos-mirror":"true","data-aos":"flip-up",onClick:g,style:{cursor:"pointer"},children:[(0,n.jsx)("div",{className:"post_image_container",children:(0,n.jsx)(l(),{className:"post_image",src:x,width:260,height:260,alt:t||"post thumbnail",priority:!0})}),(0,n.jsxs)("div",{className:"post_content",children:[(0,n.jsxs)("div",{className:"post_header",children:[(0,n.jsxs)("div",{className:"title_section",children:[(0,n.jsx)("h1",{children:c(t||"",s||"")}),(0,n.jsxs)("div",{className:"tags",children:[S.map((e,t)=>(0,n.jsx)("span",{className:"tag",children:e},t)),N>0&&(0,n.jsxs)("span",{className:"more_tags",children:["+",N]})]})]}),(0,n.jsx)("span",{className:"date",children:f})]}),(0,n.jsx)("div",{className:"markdown-content",dangerouslySetInnerHTML:{__html:s?c(e.content,s):e.content}})]})]}),(0,n.jsx)(u.PostModal,{post:j,isOpen:m,onClose:()=>p(!1),prevPost:b,nextPost:y,onPostChange:t=>{v({...t,searchTerm:e.searchTerm,posts:e.posts})}})]})};s(332);let m=[{id:"all",name:"모든 글",description:"View all posts"},{id:"about",name:"소개",description:"Developer introduction"},{id:"career",name:"경력",description:"Work experience"},{id:"projects",name:"프로젝트",description:"Project portfolio"},{id:"backend",name:"백엔드",description:"Backend development"},{id:"frontend",name:"프론트엔드",description:"Frontend development"},{id:"database",name:"데이터베이스",description:"Database design"},{id:"architecture",name:"아키텍처",description:"System architecture"}],p=["about","career","projects","architecture","database","backend","frontend"],x=e=>{let{selectedCategory:t,searchTerm:s,onSearchChange:i,onSearchResults:o,posts:r}=e,[l,c]=(0,a.useState)([]),d=m.find(e=>e.id===t),u=function(e,t){let[s,n]=(0,a.useState)(e);return(0,a.useEffect)(()=>{let s=setTimeout(()=>{n(e)},t);return()=>{clearTimeout(s)}},[e,t]),s}(s,300),x=(0,a.useMemo)(()=>{let e="all"===t?r:r.filter(e=>e.category===t),s=e.filter(e=>e.content.replace(/<[^>]*>/g,"").toLowerCase().includes(u.toLowerCase())||e.title.toLowerCase().includes(u.toLowerCase()));return"all"===t?s.sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime()).sort((e,t)=>{let s=p.indexOf(e.category),n=p.indexOf(t.category);return s-n}):s},[r,u,t]),f=(0,a.useCallback)(e=>{i(e.target.value)},[i]);return(0,a.useEffect)(()=>{let e=0===x.length?r:x,t=e.map(e=>"".concat(e.title," ").concat(e.content," ").concat(e.description));c(t),o(t)},[x,r,o]),(0,n.jsxs)("div",{className:"post_container",children:[(0,n.jsxs)("div",{className:"category_header",children:[(0,n.jsxs)("div",{className:"category_info",children:[(0,n.jsx)("h2",{children:(null==d?void 0:d.name)||"전체 글"}),(0,n.jsx)("p",{children:null==d?void 0:d.description})]}),(0,n.jsx)("div",{className:"search_container",children:(0,n.jsx)("input",{type:"text",placeholder:"Search",value:s,onChange:f,className:"search_input"})}),(0,n.jsxs)("div",{className:"post_count",children:["총 ",x.length,"개의 글"]})]}),x.map(e=>(0,n.jsx)(h,{...e,searchTerm:u,posts:x},"".concat(e.id,"-").concat(t)))]})};s(5379);let f=e=>{let{categories:t,onCategorySelect:s,selectedCategory:i,categoryCounts:r}=e,[c,d]=(0,a.useState)(!1);(0,a.useEffect)(()=>{o().init()},[]);let u=e=>{e.externalLink?window.open(e.externalLink,"_blank"):s(e.id)},h=e=>{e.preventDefault(),navigator.clipboard.writeText("yunsubin481@gmail.com"),d(!0),setTimeout(()=>d(!1),2e3)};return(0,n.jsx)("div",{className:"sidebar","data-aos":"fade-right",children:(0,n.jsxs)("div",{className:"contents",children:[(0,n.jsx)("div",{className:"profile_top",children:(0,n.jsx)(l(),{className:"profile_image",src:"/images/profile2.jpg",width:200,height:200,alt:"profile",priority:!0})}),(0,n.jsxs)("div",{className:"profile_text",children:[(0,n.jsx)("h1",{className:"profile_name",children:"Russ"}),(0,n.jsxs)("h5",{className:"profile_info",children:[(0,n.jsx)("span",{children:"BLOG : "}),(0,n.jsx)("a",{className:"info_link",href:"https://binsspace.notion.site/Bin-s-Space-1ebe0875dc7442cc91f7e1defc3802ab",target:"_blank",children:"Notion"})]}),(0,n.jsxs)("h5",{className:"profile_info",children:[(0,n.jsx)("span",{children:"EMAIL : "}),(0,n.jsxs)("a",{className:"info_link",href:"#",onClick:h,children:["yunsubin481@gmail.com",c&&(0,n.jsx)("span",{className:"copy_tooltip",children:"Copied!"})]})]}),(0,n.jsx)("h5",{className:"profile_info",children:"POSITION : Full Stack"})]}),(0,n.jsxs)("div",{className:"profile_categories",children:[(0,n.jsx)("h3",{children:"CATEGORY"}),null==t?void 0:t.map(e=>(0,n.jsxs)("div",{className:"category_item ".concat(i===e.id?"active":""),onClick:()=>u(e),children:[(0,n.jsxs)("div",{className:"category_info",children:[(0,n.jsx)("h4",{children:e.name}),(0,n.jsx)("p",{children:e.description})]}),(0,n.jsx)("span",{className:"post_count",children:r[e.id]||0})]},e.id))]})]})})};s(5045);var j=s(9878),v=s(6949),g=s(3891);let S=["JavaScript","TypeScript","Python","Java","React","Next.js","C++","C#","Ruby","Go","Rust","Kotlin","Swift","HTML","CSS","SASS","SCSS","jQuery","Redux","Vuex","Webpack","Babel","ESLint","Prettier","Bootstrap","Tailwind","Material-UI","Chakra-UI","Storybook","Jest","Cypress","Node.js","Express","NestJS","Spring","Spring Boot","Django","Flask","FastAPI","Laravel","Nginx","Apache","Tomcat","PM2","Jenkins","Travis CI","CircleCI","MySQL","PostgreSQL","MongoDB","Redis","Elasticsearch","Oracle","SQLite","MariaDB","Sequelize","Mongoose","TypeORM","Prisma","GraphQL","DynamoDB","Cassandra","AWS","GCP","Azure","Docker","Kubernetes","Terraform","Lambda","S3","EC2","RDS","ECS","EKS","CloudFront","Route53","VPC","IAM","Serverless","HTTP","HTTPS","TCP/IP","DNS","SSL","TLS","SSH","FTP","WebSocket","REST","OAuth","JWT","CORS","Proxy","Load Balancer","Firewall","VPN","Git","GitHub","GitLab","Bitbucket","SVN","Jira","Confluence","Slack","Notion","Trello","Figma","Postman","Swagger","Bash","Shell","PowerShell","Vim","Nano","Curl","Wget","SSH","SCP","chmod","chown","sudo","apt","yum","brew","Hadoop","Spark","Kafka","ELK","Airflow","TensorFlow","PyTorch","Pandas","NumPy","Scikit-learn","Jupyter","Tableau","Power BI","MSA","DDD","TDD","BDD","SOLID","REST","GraphQL","MVC","MVVM","Clean Architecture","Event Sourcing","CQRS","Serverless","CDN","Cache","Lazy Loading","Code Splitting","Tree Shaking","Minification","Compression","Indexing","Clustering","Load Balancing","Sharding","Prometheus","Grafana","ELK Stack","Datadog","New Relic","Sentry","Winston","Morgan","Log4j","Splunk","Jest","Mocha","Chai","Selenium","Cypress","JUnit","PHPUnit","SonarQube","ESLint","Prettier","전자고지","전자문서","결제시스템","통계시스템","데이터베이스","서버","클라이언트","프론트엔드","백엔드","웹소켓","반응형","대시보드","모니터링","파이프라인","인프라","아키텍처","마이크로서비스","컨테이너","클라우드","보안","인증","권한","로깅","캐싱"],N={HTML:(0,n.jsx)(j.gtO,{}),CSS:(0,n.jsx)(j.r8,{}),JavaScript:(0,n.jsx)(j.zPb,{}),TypeScript:(0,n.jsx)(v.WZi,{}),React:(0,n.jsx)(j.huN,{}),"Next.js":(0,n.jsx)(v.Xou,{}),"Node.js":(0,n.jsx)(j.t0,{}),Redux:(0,n.jsx)(v.PoL,{}),GraphQL:(0,n.jsx)(v.dMV,{}),MongoDB:(0,n.jsx)(v.t$b,{}),PostgreSQL:(0,n.jsx)(v.u4B,{}),MySQL:(0,n.jsx)(v.uJt,{}),Tailwind:(0,n.jsx)(v.YnA,{}),Jest:(0,n.jsx)(v.Z$w,{}),Electron:(0,n.jsx)(v.OdR,{}),Webpack:(0,n.jsx)(v.u8q,{}),Babel:(0,n.jsx)(v.b$1,{}),Nginx:(0,n.jsx)(v.vUE,{}),Jenkins:(0,n.jsx)(v.hVb,{}),Git:(0,n.jsx)(j.U40,{}),GitHub:(0,n.jsx)(j.hJX,{}),Docker:(0,n.jsx)(j.X2n,{}),Kubernetes:(0,n.jsx)(v.CX5,{}),AWS:(0,n.jsx)(j.UC$,{}),Database:(0,n.jsx)(j.i1q,{}),Server:(0,n.jsx)(j.Els,{}),Default:(0,n.jsx)(g.ECw,{})},b=e=>{let{searchResults:t,onKeywordSelect:s}=e,[i,o]=(0,a.useState)([]),r=(0,a.useRef)(null);(0,a.useEffect)(()=>{if(t.length>0){let e=t.join(" ").split(/[\s/,()[\]{}]+/).map(e=>{let t=e.replace(/[,.!?()[\]{}]/g,"").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[-_.]/g," ").replace(/\s+/g," ").trim();if(/[\uAC00-\uD7AF]/.test(t))return t.length>=2?t:"";if(t.length>1&&!/^\d+$/.test(t)){let e=t.toUpperCase();if(S.includes(e))return e;let s=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();if(S.includes(s))return s}return t}).flatMap(e=>e.split(" ")).filter(e=>e&&e.length>1&&!/^\d+$/.test(e)),s=e.reduce((e,t)=>{if(S.includes(t))return e[t]=(e[t]||0)+1,e;let s=S.find(e=>e.toLowerCase()===(null==t?void 0:t.toLowerCase())||e.replace(/[-_.]/g,"").toLowerCase()===(null==t?void 0:t.toLowerCase())||e.replace(/\s+/g,"").toLowerCase()===(null==t?void 0:t.toLowerCase()));if(s)return e[s]=(e[s]||0)+1,e;let n=t.length>2?t:t.toUpperCase();return e[n]=(e[n]||0)+1,e},{}),n=Object.entries(s).map(e=>{let[t,s]=e;return{word:t,count:s,isTechStack:S.includes(t)}}).sort((e,t)=>e.isTechStack&&!t.isTechStack?-1:!e.isTechStack&&t.isTechStack?1:t.count-e.count).slice(0,30);o(n)}},[t]);let l=()=>i.map(e=>{let{word:t,count:a,isTechStack:i}=e;return(0,n.jsxs)("div",{className:"keyword_item ".concat(i?"tech_stack":""),onClick:()=>s(t),children:[(0,n.jsxs)("span",{className:"word",children:[i&&(0,n.jsx)("span",{className:"tech_icon",children:N[t]||N.Default}),t]}),(0,n.jsx)("span",{className:"count",children:a})]},t)});return(0,n.jsx)("div",{className:"side_index",children:(0,n.jsxs)("div",{className:"contents",children:[(0,n.jsx)("h3",{children:"Keywords"}),(0,n.jsx)("div",{className:"keyword_list",ref:r,children:(0,n.jsxs)("div",{className:"keywords_container",children:[l(),l()," "]})})]})})};s(225),s(1487);var y=s(5846),w=s.n(y);let C=e=>{let{selectedCategory:t,onCategoryChange:s,categoryCounts:i}=e,[o,r]=(0,a.useState)(!1),[c,d]=(0,a.useState)(!1),u=(0,a.useRef)(null),h=(0,a.useRef)(null);if((0,a.useEffect)(()=>{let e=e=>{u.current&&!u.current.contains(e.target)&&r(!1),h.current&&!h.current.contains(e.target)&&d(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),!m)return null;let p=m.find(e=>e.id===t),x=e=>{s(e),r(!1),window.scrollTo({top:0,behavior:"smooth"})};return(0,n.jsx)("div",{className:"mobile_header ".concat(o?"expanded":""),children:(0,n.jsx)("div",{className:"nav",children:(0,n.jsxs)("div",{className:"mobile_header_container",children:[(0,n.jsx)(w(),{href:"/",className:"logo",children:"Bin's Space"}),(0,n.jsxs)("div",{className:"category_dropdown",ref:u,children:[(0,n.jsxs)("button",{className:"category_button",type:"button",onClick:()=>{r(!o),d(!1)},children:[(0,n.jsxs)("span",{children:[(null==p?void 0:p.name)||"전체 글",(0,n.jsxs)("span",{className:"count",children:["(",i[t]||0,")"]})]}),(0,n.jsx)("span",{className:"arrow ".concat(o?"open":""),children:"▼"})]}),o&&(0,n.jsx)("div",{className:"category_list",children:m.map(e=>(0,n.jsxs)("button",{className:"category_item ".concat(t===e.id?"active":""),type:"button",onClick:()=>{x(e.id)},children:[(0,n.jsx)("span",{className:"category_name",children:e.name}),(0,n.jsxs)("span",{className:"count",children:["(",i[e.id]||0,")"]})]},e.id))})]}),(0,n.jsxs)("div",{className:"profile",ref:h,children:[(0,n.jsx)("button",{className:"profile_button",onClick:()=>{d(!c),r(!1)},children:(0,n.jsx)(l(),{src:"/images/profile0.jpg",alt:"Profile",width:28,height:28,className:"profile_image"})}),c&&(0,n.jsx)("div",{className:"profile_dropdown",children:(0,n.jsxs)("div",{className:"profile_info",children:[(0,n.jsx)(l(),{src:"/images/profile0.jpg",alt:"Profile",width:80,height:80,className:"large_profile_image"}),(0,n.jsx)("h3",{children:"Bin"}),(0,n.jsx)("p",{className:"position",children:"Full Stack Developer"}),(0,n.jsxs)("div",{className:"social_links",children:[(0,n.jsx)("a",{href:"https://github.com/Russ481-k",target:"_blank",rel:"noopener noreferrer",children:(0,n.jsx)(j.hJX,{})}),(0,n.jsx)("a",{href:"https://www.notion.so/binllionaire/Bin-s-Space-4d02e7c3c1d3476e935bf54a1757cf09",target:"_blank",rel:"noopener noreferrer",children:(0,n.jsx)(v.WTS,{})}),(0,n.jsx)("a",{href:"mailto:yunsubin481@gmail.com",children:(0,n.jsx)(j.SRX,{})})]})]})})]})]})})})};var _=s(9406);let k=()=>{let[e,t]=(0,a.useState)("all"),[s,i]=(0,a.useState)({}),[o,r]=(0,a.useState)(""),[l,c]=(0,a.useState)([]),[d,u]=(0,a.useState)([]);(0,a.useEffect)(()=>{let e=async()=>{try{let e=await (0,_.O)();u(e);let t=e.reduce((e,t)=>{e.all=(e.all||0)+1;let s=t.category||"uncategorized";return e[s]=(e[s]||0)+1,e},{});i(t)}catch(e){console.error("Error fetching posts:",e)}};e()},[]);let h=e=>{t(e),r(""),window.scrollTo({top:0,behavior:"smooth"})},p=e=>{r(e),window.scrollTo({top:0,behavior:"smooth"})};return(0,n.jsxs)("div",{className:"body",children:[(0,n.jsx)(C,{selectedCategory:e,onCategoryChange:h,categoryCounts:s}),(0,n.jsx)(f,{categories:m,onCategorySelect:h,selectedCategory:e,categoryCounts:s}),(0,n.jsx)(x,{selectedCategory:e,searchTerm:o,onSearchChange:r,onSearchResults:c,posts:d}),(0,n.jsx)(b,{searchResults:l,onKeywordSelect:p})]})}},7116:function(e,t,s){"use strict";s.r(t),s.d(t,{Header:function(){return d}});var n=s(9268),a=s(6006),i=s(5846),o=s.n(i),r=s(9234),l=s.n(r);s(4306);let c=l()(()=>Promise.resolve().then(s.bind(s,5326)).then(e=>e.default),{loadableGenerated:{webpack:()=>[5326]},loading:()=>(0,n.jsx)("div",{children:"Loading..."}),ssr:!1}),d=()=>{let[e,t]=(0,a.useState)(!0),[s,i]=(0,a.useState)(!0),[r,l]=(0,a.useState)(!1),[d,u]=(0,a.useState)(!1),[h,m]=(0,a.useState)(null),p={id:"experience",title:"Experience",content:"<h2>경력 사항</h2>\n              <h3>회사명 (2022 - 현재)</h3>\n              <p>프론트엔드 개발자</p>\n              <ul>\n                <li>Next.js를 사용한 웹 애플리케이션 개발</li>\n                <li>성능 최적화 및 사용자 경험 개선</li>\n              </ul>\n              <h3>프로젝트</h3>\n              <ul>\n                <li>개인 블로그 개발</li>\n                <li>포트폴리오 웹사이트 제작</li>\n              </ul>",date:new Date().toISOString(),description:"경력 사항",category:"about",tags:[],tocItems:[],imageHeights:{},thumbnail:"/images/experience.jpg"};return(0,a.useEffect)(()=>{let e=async()=>{let e=await fetch("/api/post/about-me");if(e.ok){let t=await e.json();m(t)}};e()},[]),(0,a.useEffect)(()=>{let e=()=>{window.scrollY>0?(t(!1),i(!1)):0===window.scrollY&&s&&t(!0)},n=()=>{s&&(t(!1),i(!1),window.scrollTo({top:1,behavior:"smooth"}))};return window.addEventListener("scroll",e),document.addEventListener("click",n),()=>{window.removeEventListener("scroll",e),document.removeEventListener("click",n)}},[s]),(0,n.jsxs)("header",{className:"header ".concat(e?"expanded":""),children:[(0,n.jsxs)("div",{className:"header_content",children:[(0,n.jsx)("h1",{className:"title",children:(0,n.jsx)(o(),{href:"/",children:"Bin's Space"})}),!e&&(0,n.jsxs)("nav",{className:"nav",children:[(0,n.jsx)(o(),{href:"#",onClick:()=>l(!0),children:"Intro"}),(0,n.jsx)(o(),{href:"#",onClick:()=>u(!0),children:"Work"}),(0,n.jsx)(o(),{href:"https://binsspace.notion.site/Bin-s-Space-1ebe0875dc7442cc91f7e1defc3802ab",target:"_blank",rel:"noopener noreferrer",className:"icon_link","aria-label":"Notion Page",children:"Notion"})]})]}),h&&r&&(0,n.jsx)(a.Suspense,{fallback:(0,n.jsx)("div",{children:"Loading..."}),children:(0,n.jsx)(c,{post:h,isOpen:r,onClose:()=>l(!1),prevPost:null,nextPost:null,onPostChange:()=>{}})}),d&&(0,n.jsx)(a.Suspense,{fallback:(0,n.jsx)("div",{children:"Loading..."}),children:(0,n.jsx)(c,{post:p,isOpen:d,onClose:()=>u(!1),prevPost:null,nextPost:null,onPostChange:()=>{}})})]})}},5326:function(e,t,s){"use strict";s.r(t),s.d(t,{PostModal:function(){return h},default:function(){return m}});var n=s(9268);s(1211);let a=e=>{let{name:t}=e;return(0,n.jsx)("span",{className:"tag",children:t})};var i=s(6006);s(3302);var o=s(6394),r=s.n(o),l=s(4128),c=s(8431);let d=e=>{let{children:t}=e,[s,n]=(0,i.useState)(!1);return(0,i.useEffect)(()=>(n(!0),()=>n(!1)),[]),s?(0,c.createPortal)(t,document.getElementById("modal-root")||document.body):null};var u=s(9406);let h=e=>{var t;let{post:s,isOpen:o,onClose:c,prevPost:h,nextPost:m,onPostChange:p}=e,[x,f]=(0,i.useState)(""),j=(0,i.useRef)(null),v=(0,i.useCallback)(e=>{var t;let n=null===(t=s.tocItems)||void 0===t?void 0:t.find(t=>t.id===e);if(!n||!j.current)return;let a=j.current.querySelector("#".concat(e));if(!a)return;let i=j.current.getBoundingClientRect(),o=a.getBoundingClientRect(),r=o.top-i.top+j.current.scrollTop;j.current.scrollTo({top:r-32,behavior:"smooth"})},[s.tocItems]),g=(0,i.useCallback)(()=>{var e;if(!j.current||!(null===(e=s.tocItems)||void 0===e?void 0:e.length))return;let t=j.current.getBoundingClientRect();j.current.scrollTop;let n=s.tocItems[0];for(let e of s.tocItems){let s=j.current.querySelector("#".concat(e.id));if(!s)continue;let a=s.getBoundingClientRect(),i=a.top-t.top;if(i<=42)n=e;else break}f(n.id)},[s.tocItems]);(0,i.useEffect)(()=>{let e=j.current;if(e)return e.addEventListener("scroll",g),g(),()=>e.removeEventListener("scroll",g)},[g]);let S=async e=>{try{let t=await (0,u.p)(e.id);p(t)}catch(e){console.error("Error fetching post:",e)}};if((0,i.useEffect)(()=>(o?(document.documentElement.style.overflow="hidden",document.body.style.overflow="hidden",document.body.style.height="100vh",document.body.style.touchAction="none"):(document.documentElement.style.overflow="",document.body.style.overflow="",document.body.style.height="",document.body.style.touchAction=""),()=>{document.documentElement.style.overflow="",document.body.style.overflow="",document.body.style.height="",document.body.style.touchAction=""}),[o]),!o)return null;let N=new Date(s.date).toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric"}),b=(0,l.F)(s.thumbnail);console.log("Post headings:",s.tocItems),console.log("Current post:",s);let y=(0,n.jsx)("div",{className:"modal_overlay",onClick:c,children:(0,n.jsxs)("div",{className:"modal_content",onClick:e=>e.stopPropagation(),children:[(0,n.jsxs)("div",{className:"modal_header",children:[h&&(0,n.jsx)("button",{className:"nav_button prev",onClick:()=>S(h),children:(0,n.jsxs)("div",{className:"nav_info",children:[(0,n.jsxs)("div",{className:"nav_info_left",children:[(0,n.jsx)("span",{className:"arrow",children:"←"}),(0,n.jsx)("span",{className:"label",children:"이전 포스트"})]}),(0,n.jsx)("span",{className:"title",children:h.title})]})}),(0,n.jsx)("h2",{children:s.title}),m&&(0,n.jsx)("button",{className:"nav_button next",onClick:()=>S(m),children:(0,n.jsxs)("div",{className:"nav_info",children:[(0,n.jsxs)("div",{className:"nav_info_right",children:[(0,n.jsx)("span",{className:"label",children:"다음 포스트"}),(0,n.jsx)("span",{className:"arrow",children:"→"})]}),(0,n.jsx)("span",{className:"title",children:m.title})]})})]}),(0,n.jsxs)("div",{className:"modal_meta",children:[(0,n.jsx)("div",{className:"tags",children:s.tags.map(e=>(0,n.jsx)(a,{name:e},e))}),(0,n.jsx)("span",{className:"date",children:N})]}),(0,n.jsxs)("div",{className:"modal_body",ref:j,children:[s.thumbnail&&(0,n.jsx)("div",{className:"modal_thumbnail",children:(0,n.jsx)(r(),{src:b,alt:s.title,width:800,height:600,priority:!0})}),(0,n.jsxs)("div",{className:"content_wrapper",children:[(0,n.jsx)("article",{className:"content",dangerouslySetInnerHTML:{__html:s.content}}),(null===(t=s.tocItems)||void 0===t?void 0:t.length)>0&&(0,n.jsxs)("nav",{className:"table_of_contents",children:[(0,n.jsx)("h3",{children:"Index"}),(0,n.jsx)("ul",{children:s.tocItems.map(e=>(0,n.jsx)("li",{className:"toc_item ".concat(e.isMainTopic?"main_topic":"sub_topic"," ").concat(x===e.id?"active":""),onClick:()=>v(e.id),children:e.text},e.id))})]})]})]}),(0,n.jsx)("div",{className:"modal_footer",children:(0,n.jsx)("button",{className:"close_button",onClick:c,children:"닫기"})})]})});return(0,n.jsx)(d,{children:y})};var m=h},938:function(e,t,s){"use strict";s.r(t),s.d(t,{TopButton:function(){return r}});var n=s(9268),a=s(6006),i=s(9768),o=s.n(i);function r(){let[e,t]=(0,a.useState)(0),[,s]=(0,a.useState)(!1),i=()=>{t(window.scrollY),e>100?s(!0):s(!1)},r=()=>{window.scrollTo({top:0,behavior:"smooth"}),t(0),s(!1)};return(0,a.useEffect)(()=>(window.addEventListener("scroll",i),()=>{window.removeEventListener("scroll",i)})),(0,a.useEffect)(()=>{o().init()},[]),(0,n.jsx)("button",{className:"top_button","data-aos-easing":"ease-in-out","data-aos":"fade-left",type:"button",onClick:r,children:"Top"})}s(2929)},9406:function(e,t,s){"use strict";async function n(){let e=await fetch("/data/posts.json");if(!e.ok)throw Error("Failed to fetch posts");return e.json()}async function a(e){let t=await fetch("/data/posts/".concat(e,".json"));if(!t.ok)throw Error("Failed to fetch post: ".concat(e));return t.json()}s.d(t,{O:function(){return n},p:function(){return a}})},4128:function(e,t,s){"use strict";function n(e){return e&&e.startsWith("/images/")?e:"/images/posts/default-thumbnail.jpg"}s.d(t,{F:function(){return n}})},225:function(){},6539:function(){},4306:function(){},1124:function(){},1487:function(){},332:function(){},3302:function(){},5045:function(){},5379:function(){},1211:function(){}},function(e){e.O(0,[789,422,440,136,667,139,744],function(){return e(e.s=4614)}),_N_E=e.O()}]);