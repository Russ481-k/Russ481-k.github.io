(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[145,884],{8949:function(e,t,s){Promise.resolve().then(s.bind(s,7449))},7449:function(e,t,s){"use strict";s.r(t),s.d(t,{Body:function(){return L}});var a=s(9268),n=s(6006),r=s(9768),i=s.n(r);s(2929);var l=s(6394),o=s.n(l);let c=(e,t)=>{if(!t.trim())return e;let s=RegExp("(".concat(t,")"),"gi");return null==e?void 0:e.split(s).map((e,t)=>s.test(e)?(0,a.jsx)("mark",{className:"highlight",children:e},t):e)};var d=s(8174),u=s(5326),h=s(6708);let p=e=>{var t,s;let{t:r,i18n:l}=(0,h.$G)(),p=l.language,m=e.translations[p]||e.translations.en,{title:g,description:f,content:x,tocItems:v}=m,[j,S]=(0,n.useState)(!1),N=(0,d.F)(e.thumbnail,{title:m.title,tags:e.tags,id:e.id}),b=new Date(e.date).toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric"}),[_,C]=(0,n.useState)(e);(0,n.useEffect)(()=>{i().init()},[]);let y=()=>{S(!0)},k=(null===(t=e.tags)||void 0===t?void 0:t.slice(0,3))||[],w=(null===(s=e.tags)||void 0===s?void 0:s.length)>3?e.tags.length-3:0,{prevPost:T,nextPost:L}=(t=>{var s,a,n,r,i;let l=null===(s=e.posts)||void 0===s?void 0:s.findIndex(e=>e.id===t.id);return{prevPost:l&&l<(null!==(i=null===(a=e.posts)||void 0===a?void 0:a.length)&&void 0!==i?i:0)-1?null===(n=e.posts)||void 0===n?void 0:n[l+1]:null,nextPost:l&&l>0?null===(r=e.posts)||void 0===r?void 0:r[l-1]:null}})(_);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"post","data-aos-anchor-placement":"top","data-aos-delay":"100","data-aos-easing":"ease-in-out","data-aos-mirror":"true","data-aos":"flip-up",onClick:y,style:{cursor:"pointer"},children:[(0,a.jsx)("div",{className:"post_image_container",children:"string"==typeof N?(0,a.jsx)(o(),{src:N,alt:g,className:"post_image",width:260,height:260,priority:!0}):N}),(0,a.jsxs)("div",{className:"post_content",children:[(0,a.jsxs)("div",{className:"post_header",children:[(0,a.jsxs)("div",{className:"title_section",children:[(0,a.jsx)("h1",{children:c(g||"",e.searchTerm||"")}),(0,a.jsxs)("div",{className:"tags",children:[k.map((e,t)=>(0,a.jsx)("span",{className:"tag",children:e},t)),w>0&&(0,a.jsxs)("span",{className:"more_tags",children:["+",w]})]})]}),(0,a.jsx)("span",{className:"date",children:b})]}),(0,a.jsx)("div",{className:"markdown-content",dangerouslySetInnerHTML:{__html:e.searchTerm?c(x,e.searchTerm):x}})]})]}),(0,a.jsx)(u.default,{post:_,isOpen:j,onClose:()=>S(!1),prevPost:T,nextPost:L,onPostChange:t=>{C({...t,searchTerm:e.searchTerm,posts:e.posts})}})]})};s(332);let m=()=>{let{t:e}=(0,h.$G)();return[{id:"all",name:e("categories.all"),description:"View all posts"},{id:"projects",name:e("categories.projects"),description:"Project portfolio"},{id:"about",name:e("categories.about"),description:"Developer introduction"},{id:"career",name:e("categories.career"),description:"Work experience"},{id:"architecture",name:e("categories.architecture"),description:"System architecture"},{id:"database",name:e("categories.database"),description:"Database design"},{id:"frontend",name:e("categories.frontend"),description:"Frontend development"},{id:"backend",name:e("categories.backend"),description:"Backend development"}]},g=["about","career","projects","architecture","database","backend","frontend"];var f=s(9700),x=s(9878);let v=e=>{let{selectedCategory:t,searchTerm:s,onSearchChange:r,onSearchResults:i,posts:l}=e,{t:o,i18n:c}=(0,h.$G)(),d=m(),u=null==d?void 0:d.find(e=>e.id===t),v=function(e,t){let[s,a]=(0,n.useState)(e);return(0,n.useEffect)(()=>{let s=setTimeout(()=>{a(e)},t);return()=>{clearTimeout(s)}},[e,t]),s}(s,300),{register:j,handleSubmit:S}=(0,f.cI)({defaultValues:{searchTerm:s}}),N=(0,n.useMemo)(()=>{let e="all"===t?l:l.filter(e=>e.category===t),s=e.filter(e=>{var t,s;let a=c.language,n=(null===(t=e.translations)||void 0===t?void 0:t[a])||(null===(s=e.translations)||void 0===s?void 0:s.en);return(null==n?void 0:n.content.replace(/<[^>]*>/g,"").toLowerCase().includes(v.toLowerCase()))||(null==n?void 0:n.title.toLowerCase().includes(v.toLowerCase()))});return"all"===t?s.sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime()).sort((e,t)=>{let s=g.indexOf(e.category),a=g.indexOf(t.category);return s-a}):s},[l,v,t,c.language]),b=(0,n.useCallback)(e=>{r(e.searchTerm)},[r]);return(0,n.useEffect)(()=>{let e=0===N.length?l:N,t=c.language,s=e.map(e=>{var s,a;let n=(null===(s=e.translations)||void 0===s?void 0:s[t])||(null===(a=e.translations)||void 0===a?void 0:a.en);return"".concat(null==n?void 0:n.title," ").concat(null==n?void 0:n.content," ").concat(null==n?void 0:n.description)});i(s)},[N,l,i,c.language]),(0,a.jsxs)("div",{className:"post_container",children:[(0,a.jsxs)("div",{className:"category_header",children:[(0,a.jsxs)("div",{className:"category_info",children:[(0,a.jsx)("h2",{children:(null==u?void 0:u.name)||o("categories.all")}),(0,a.jsx)("p",{className:"category_description",children:null==u?void 0:u.description})]}),(0,a.jsx)("form",{className:"search_container",onSubmit:S(b),children:(0,a.jsxs)("div",{className:"search_input_wrapper",children:[(0,a.jsx)("input",{type:"text",placeholder:o("search.placeholder"),className:"search_input",...j("searchTerm")}),(0,a.jsx)("button",{type:"submit",className:"search_button",children:(0,a.jsx)(x.U41,{})})]})}),(0,a.jsx)("div",{className:"post_count",children:o("search.totalPosts",{count:N.length})}),(0,a.jsx)("div",{className:"post_count_mobile",children:N.length})]}),N.map(e=>(0,a.jsx)(p,{...e,searchTerm:v,posts:N},"".concat(e.id,"-").concat(t)))]})};s(5379);var j=s(9730);let S=e=>{let{categories:t,onCategorySelect:s,selectedCategory:r,categoryCounts:l}=e,[c,d]=(0,n.useState)(!1),{t:u}=(0,h.$G)();(0,n.useEffect)(()=>{i().init()},[]);let p=e=>{e.externalLink?window.open(e.externalLink,"_blank"):s(e.id)},m=e=>{e.preventDefault(),navigator.clipboard.writeText(j.p.EMAIL),d(!0),setTimeout(()=>d(!1),2e3)};return(0,a.jsx)("div",{className:"sidebar","data-aos":"fade-right",children:(0,a.jsxs)("div",{className:"contents",children:[(0,a.jsx)("div",{className:"profile_top",children:(0,a.jsx)(o(),{className:"profile_image",src:"/images/profile2.jpg",width:200,height:200,alt:u("profile.image"),priority:!0})}),(0,a.jsxs)("div",{className:"profile_text",children:[(0,a.jsx)("h1",{className:"profile_name",children:u("profile.name")}),(0,a.jsxs)("h5",{className:"profile_info",children:[(0,a.jsxs)("span",{children:[u("profile.blog")," : "]}),(0,a.jsx)("a",{className:"info_link",href:j.p.NOTION_URL,target:"_blank",children:"Notion"})]}),(0,a.jsxs)("h5",{className:"profile_info",children:[(0,a.jsxs)("span",{children:[u("profile.emailLabel")," : "]}),(0,a.jsxs)("a",{className:"info_link",href:"#",onClick:m,children:[j.p.EMAIL,c&&(0,a.jsx)("span",{className:"copy_tooltip",children:u("profile.copied")})]})]}),(0,a.jsxs)("h5",{className:"profile_info",children:[u("profile.positionLabel")," : ",u("profile.position")]})]}),(0,a.jsxs)("div",{className:"profile_categories",children:[(0,a.jsx)("h3",{children:u("sidebar.category")}),null==t?void 0:t.map(e=>(0,a.jsxs)("div",{className:"category_item ".concat(r===e.id?"active":""),onClick:()=>p(e),children:[(0,a.jsxs)("div",{className:"category_info",children:[(0,a.jsx)("h4",{children:e.name}),(0,a.jsx)("p",{children:e.description})]}),(0,a.jsx)("span",{className:"post_count",children:l[e.id]||0})]},e.id))]})]})})};s(5045);var N=s(6949),b=s(3891);let _=["JavaScript","TypeScript","Python","Java","React","Next.js","C++","C#","Ruby","Go","Rust","Kotlin","Swift","HTML","CSS","SASS","SCSS","jQuery","Redux","Vuex","Webpack","Babel","ESLint","Prettier","Bootstrap","Tailwind","Material-UI","Chakra-UI","Storybook","Jest","Cypress","Node.js","Express","NestJS","Spring","Spring Boot","Django","Flask","FastAPI","Laravel","Nginx","Apache","Tomcat","PM2","Jenkins","Travis CI","CircleCI","MySQL","PostgreSQL","MongoDB","Redis","Elasticsearch","Oracle","SQLite","MariaDB","Sequelize","Mongoose","TypeORM","Prisma","GraphQL","DynamoDB","Cassandra","AWS","GCP","Azure","Docker","Kubernetes","Terraform","Lambda","S3","EC2","RDS","ECS","EKS","CloudFront","Route53","VPC","IAM","Serverless","HTTP","HTTPS","TCP/IP","DNS","SSL","TLS","SSH","FTP","WebSocket","REST","OAuth","JWT","CORS","Proxy","Load Balancer","Firewall","VPN","Git","GitHub","GitLab","Bitbucket","SVN","Jira","Confluence","Slack","Notion","Trello","Figma","Postman","Swagger","Bash","Shell","PowerShell","Vim","Nano","Curl","Wget","SSH","SCP","chmod","chown","sudo","apt","yum","brew","Hadoop","Spark","Kafka","ELK","Airflow","TensorFlow","PyTorch","Pandas","NumPy","Scikit-learn","Jupyter","Tableau","Power BI","MSA","DDD","TDD","BDD","SOLID","REST","GraphQL","MVC","MVVM","Clean Architecture","Event Sourcing","CQRS","Serverless","CDN","Cache","Lazy Loading","Code Splitting","Tree Shaking","Minification","Compression","Indexing","Clustering","Load Balancing","Sharding","Prometheus","Grafana","ELK Stack","Datadog","New Relic","Sentry","Winston","Morgan","Log4j","Splunk","Jest","Mocha","Chai","Selenium","Cypress","JUnit","PHPUnit","SonarQube","ESLint","Prettier","전자고지","전자문서","결제시스템","통계시스템","데이터베이스","서버","클라이언트","프론트엔드","백엔드","웹소켓","반응형","대시보드","모니터링","파이프라인","인프라","아키텍처","마이크로서비스","컨테이너","클라우드","보안","인증","권한","로깅","캐싱"],C=e=>{let{name:t}=e,s={HTML:x.gtO,CSS:x.r8,JavaScript:x.zPb,TypeScript:N.WZi,React:x.huN,"Next.js":N.Xou,"Node.js":x.t0,Redux:N.PoL,GraphQL:N.dMV,MongoDB:N.t$b,PostgreSQL:N.u4B,MySQL:N.uJt,Tailwind:N.YnA,Jest:N.Z$w,Electron:N.OdR,Webpack:N.u8q,Babel:N.b$1,Nginx:N.vUE,Jenkins:N.hVb,Git:x.U40,GitHub:x.hJX,Docker:x.X2n,Kubernetes:N.CX5,AWS:x.UC$,Database:x.i1q,Server:x.Els,Default:b.ECw},a=s[t]||s.Default;return n.createElement(a,{size:16})},y=e=>{let{searchResults:t,onKeywordSelect:s}=e,[r,i]=(0,n.useState)([]),l=(0,n.useRef)(null);(0,n.useEffect)(()=>{if(t.length>0){let e=t.join(" ").split(/[\s/,()[\]{}]+/).map(e=>{let t=e.replace(/[,.!?()[\]{}]/g,"").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[-_.]/g," ").replace(/\s+/g," ").trim();if(/[\uAC00-\uD7AF]/.test(t))return t.length>=2?t:"";if(t.length>1&&!/^\d+$/.test(t)){let e=t.toUpperCase();if(_.includes(e))return e;let s=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();if(_.includes(s))return s}return t}).flatMap(e=>e.split(" ")).filter(e=>e&&e.length>1&&!/^\d+$/.test(e)),s=e.reduce((e,t)=>{if(_.includes(t))return e[t]=(e[t]||0)+1,e;let s=_.find(e=>e.toLowerCase()===(null==t?void 0:t.toLowerCase())||e.replace(/[-_.]/g,"").toLowerCase()===(null==t?void 0:t.toLowerCase())||e.replace(/\s+/g,"").toLowerCase()===(null==t?void 0:t.toLowerCase()));if(s)return e[s]=(e[s]||0)+1,e;let a=t.length>2?t:t.toUpperCase();return e[a]=(e[a]||0)+1,e},{}),a=Object.entries(s).map(e=>{let[t,s]=e;return{word:t,count:s,isTechStack:_.includes(t)}}).sort((e,t)=>e.isTechStack&&!t.isTechStack?-1:!e.isTechStack&&t.isTechStack?1:t.count-e.count).slice(0,30);i(a)}},[t]);let o=()=>r.map(e=>{let{word:t,count:n,isTechStack:r}=e;return(0,a.jsxs)("div",{className:"keyword_item ".concat(r?"tech_stack":""),onClick:()=>s(t),children:[(0,a.jsxs)("span",{className:"word",children:[r&&(0,a.jsx)("span",{className:"tech_icon",children:(0,a.jsx)(C,{name:t})}),t]}),(0,a.jsx)("span",{className:"count",children:n})]},t)});return(0,a.jsx)("div",{className:"side_index",children:(0,a.jsxs)("div",{className:"contents",children:[(0,a.jsx)("h3",{children:"Keywords"}),(0,a.jsx)("div",{className:"keyword_list",ref:l,children:(0,a.jsxs)("div",{className:"keywords_container",children:[o(),o()," "]})})]})})};s(225),s(1487);var k=s(7713);let w=e=>{let{selectedCategory:t,onCategoryChange:s,categoryCounts:r}=e,[i,l]=(0,n.useState)(!1),[c,d]=(0,n.useState)(!1),u=(0,n.useRef)(null),p=(0,n.useRef)(null),{t:g}=(0,h.$G)(),f=m();if((0,n.useEffect)(()=>{let e=e=>{u.current&&!u.current.contains(e.target)&&l(!1),p.current&&!p.current.contains(e.target)&&d(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),!f)return null;let v=f.find(e=>e.id===t),j=e=>{s(e),l(!1),window.scrollTo({top:0,behavior:"smooth"})};return(0,a.jsx)("div",{className:"mobile_header ".concat(i?"expanded":""),children:(0,a.jsx)("div",{className:"nav",children:(0,a.jsxs)("div",{className:"mobile_header_container",children:[(0,a.jsxs)("div",{className:"left_section",children:[(0,a.jsx)("h4",{className:"logo",children:g("header.title")}),(0,a.jsx)(k.$,{})]}),(0,a.jsxs)("div",{className:"category_dropdown",ref:u,children:[(0,a.jsxs)("button",{className:"category_button",type:"button",onClick:()=>{l(!i),d(!1)},children:[(0,a.jsxs)("span",{children:[(null==v?void 0:v.name)||g("categories.all"),(0,a.jsxs)("span",{className:"count",children:["(",r[t]||0,")"]})]}),(0,a.jsx)("span",{className:"arrow ".concat(i?"open":""),children:"▼"})]}),i&&(0,a.jsx)("div",{className:"category_list",children:f.map(e=>(0,a.jsxs)("button",{className:"category_item ".concat(t===e.id?"active":""),type:"button",onClick:()=>{j(e.id)},children:[(0,a.jsx)("span",{className:"category_name",children:e.name}),(0,a.jsxs)("span",{className:"count",children:["(",r[e.id]||0,")"]})]},e.id))})]}),(0,a.jsxs)("div",{className:"profile",ref:p,children:[(0,a.jsx)("button",{className:"profile_button",onClick:()=>{d(!c),l(!1)},children:(0,a.jsx)(o(),{src:"/images/profile0.jpg",alt:"Profile",width:28,height:28,className:"profile_image"})}),c&&(0,a.jsx)("div",{className:"profile_dropdown",children:(0,a.jsxs)("div",{className:"profile_info",children:[(0,a.jsx)(o(),{src:"/images/profile0.jpg",alt:"Profile",width:80,height:80,className:"large_profile_image"}),(0,a.jsx)("h3",{children:"Bin"}),(0,a.jsx)("p",{className:"position",children:g("profile.position")}),(0,a.jsxs)("div",{className:"social_links",children:[(0,a.jsx)("a",{href:"https://github.com/Russ481-k",target:"_blank",rel:"noopener noreferrer",title:g("profile.social.github"),children:(0,x.hJX)({size:16})}),(0,a.jsx)("a",{href:"https://binsspace.notion.site/...",target:"_blank",rel:"noopener noreferrer",title:g("profile.social.notion"),children:(0,N.WTS)({size:16})}),(0,a.jsx)("a",{href:"mailto:yunsubin481@gmail.com",title:g("profile.social.email"),children:(0,x.SRX)({size:16})})]})]})})]})]})})})};var T=s(9406);let L=()=>{let[e,t]=(0,n.useState)("all"),s=m(),[r,i]=(0,n.useState)({}),[l,o]=(0,n.useState)(""),[c,d]=(0,n.useState)([]),[u,h]=(0,n.useState)([]);(0,n.useEffect)(()=>{let e=async()=>{try{let e=await (0,T.O)();h(e);let t=e.reduce((e,t)=>{e.all=(e.all||0)+1;let s=t.category||"uncategorized";return e[s]=(e[s]||0)+1,e},{});i(t)}catch(e){console.error("Error fetching posts:",e)}};e()},[]);let p=e=>{t(e),o(""),window.scrollTo({top:0,behavior:"smooth"})},g=e=>{o(e),window.scrollTo({top:0,behavior:"smooth"})};return(0,a.jsxs)("div",{className:"body",children:[(0,a.jsx)(w,{selectedCategory:e,onCategoryChange:p,categoryCounts:r}),(0,a.jsx)(S,{categories:s,onCategorySelect:p,selectedCategory:e,categoryCounts:r}),(0,a.jsx)(v,{selectedCategory:e,searchTerm:l,onSearchChange:o,onSearchResults:d,posts:u}),(0,a.jsx)(y,{searchResults:c,onKeywordSelect:g})]})}},7713:function(e,t,s){"use strict";s.d(t,{$:function(){return i}});var a=s(9268),n=s(6008),r=s(6708);let i=e=>{let{disabled:t}=e,{t:s,i18n:i}=(0,r.$G)("common"),l=(0,n.useRouter)(),o=(0,n.usePathname)(),c=async()=>{if(!t)try{let e;let t="ko"===i.resolvedLanguage?"en":"ko";if(console.log("Current pathname:",o),"/"===o)e="/".concat(t);else{let s=o.split("/").filter(Boolean);"ko"===s[0]||"en"===s[0]?s[0]=t:s.unshift(t),e="/"+s.join("/")}console.log("New pathname:",e),l.replace(e)}catch(e){console.error("Language toggle error:",e)}};return(0,a.jsx)("div",{className:"language_selector",children:(0,a.jsx)("button",{className:"lang_btn",onClick:c,children:"en"===i.resolvedLanguage?t?"English":"eng":t?"Korean":"kor"})})}},9730:function(e,t,s){"use strict";s.d(t,{p:function(){return a}});let a={EMAIL:"yunsubin481@gmail.com",NOTION_URL:"https://binsspace.notion.site/Bin-s-Space-1ebe0875dc7442cc91f7e1defc3802ab"}},225:function(){},1487:function(){},332:function(){},5045:function(){},5379:function(){}},function(e){e.O(0,[789,422,440,363,394,68,326,667,139,744],function(){return e(e.s=8949)}),_N_E=e.O()}]);