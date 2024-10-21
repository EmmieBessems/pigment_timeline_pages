var S=Object.defineProperty;var i=(t,e)=>S(t,"name",{value:e,configurable:!0});var m,d,p,D=Object.defineProperty,f=i((t,e)=>D(t,"name",{value:e,configurable:!0}),"o$3");const b=new Map;function w(t,e,r=location){const n=new URL(t,r).href;if(e==null)b.delete(n);else{const{path:a,mimeType:o,lastModified:s,size:v}=e,c=new $(new URL(a,r).href,t.split("/").pop(),o,s,v);return b.set(n,c),c}}i(w,"y"),f(w,"registerFile");function g(t,e=location){if(new.target!==void 0)throw new TypeError("FileAttachment is not a constructor");let r;typeof t=="object"&&t&&"name"in t&&(r=t,t=t.name);const n=b.get(new URL(t,e).href);if(n)return n;if(r)return w(t,r,e);throw new Error(`File not found: ${t}`)}i(g,"d$2"),f(g,"FileAttachment");async function l(t){const e=await fetch(await t.url());if(!e.ok)throw new Error(`Unable to load file: ${t.name}`);return e}i(l,"n$1"),f(l,"remote_fetch");const j=(m=class{constructor(e,r="application/octet-stream",n,a){Object.defineProperties(this,{name:{value:`${e}`,enumerable:!0},mimeType:{value:`${r}`,enumerable:!0},lastModified:{value:+n,enumerable:!0},size:{value:+a,enumerable:!0}})}async blob(){return(await l(this)).blob()}async arrayBuffer(){return(await l(this)).arrayBuffer()}async text(e){return e===void 0?(await l(this)).text():new TextDecoder(e).decode(await this.arrayBuffer())}async json(){return(await l(this)).json()}async stream(){return(await l(this)).body}async dsv({delimiter:e=",",array:r=!1,typed:n=!1}={}){const[a,o]=await Promise.all([this.text(),import("../_npm/d3-dsv@3.0.1/407f7a1f.js")]),s=o.dsvFormat(e);return(r?s.parseRows:s.parse)(a,n&&o.autoType)}async csv(e){return this.dsv({...e,delimiter:","})}async tsv(e){return this.dsv({...e,delimiter:"	"})}async image(e){const r=await this.url();return new Promise((n,a)=>{const o=new Image;new URL(r,document.baseURI).origin!==new URL(location).origin&&(o.crossOrigin="anonymous"),Object.assign(o,e),o.onload=()=>n(o),o.onerror=()=>a(new Error(`Unable to load file: ${this.name}`)),o.src=r})}async arrow(){const[e,r]=await Promise.all([import("../_npm/apache-arrow@16.0.0/_esm.js"),l(this)]);return e.tableFromIPC(r)}async arquero(e){let r,n;switch(this.mimeType){case"application/json":r=this.text(),n="fromJSON";break;case"text/tab-separated-values":e?.delimiter===void 0&&(e={...e,delimiter:"	"});case"text/csv":r=this.text(),n="fromCSV";break;default:if(/\.arrow$/i.test(this.name))r=this.arrow(),n="fromArrow";else if(/\.parquet$/i.test(this.name))r=this.parquet(),n="fromArrow";else throw new Error(`unable to determine Arquero loader: ${this.name}`);break}const[a,o]=await Promise.all([import("../_npm/arquero@5.4.0/_esm.js"),r]);return a[n](o,e)}async parquet(){const[e,r,n]=await Promise.all([import("../_npm/apache-arrow@16.0.0/_esm.js"),import("../_npm/parquet-wasm@0.6.1/_esm.js").then(async a=>(await a.default(import.meta.resolve("../_npm/parquet-wasm@0.6.1/esm/parquet_wasm_bg.wasm")),a)),this.arrayBuffer()]);return e.tableFromIPC(r.readParquet(new Uint8Array(n)).intoIPCStream())}async sqlite(){const[{SQLiteDatabaseClient:e},r]=await Promise.all([import("./stdlib/sqlite.js"),this.arrayBuffer()]);return e.open(r)}async zip(){const[{ZipArchive:e},r]=await Promise.all([import("./stdlib/zip.js"),this.arrayBuffer()]);return e.from(r)}async xml(e="application/xml"){return new DOMParser().parseFromString(await this.text(),e)}async html(){return this.xml("text/html")}async xlsx(){const[{Workbook:e},r]=await Promise.all([import("./stdlib/xlsx.js"),this.arrayBuffer()]);return e.load(r)}},i(m,"m"),m);f(j,"AbstractFile");let x=j;const A=(d=class extends x{constructor(e,r,n,a,o){super(r,n,a,o),Object.defineProperty(this,"href",{value:e})}async url(){return this.href}},i(d,"w"),d);f(A,"FileAttachmentImpl");let $=A;Object.defineProperty($,"name",{value:"FileAttachment"}),g.prototype=$.prototype;var _=Object.defineProperty,N=i((t,e)=>_(t,"name",{value:e,configurable:!0}),"r$3");async function*u(t){let e,r,n=!1;const a=t(o=>(r=o,e?(e(o),e=null):n=!0,o));if(a!=null&&typeof a!="function")throw new Error(typeof a.then=="function"?"async initializers are not supported":"initializer returned something, but not a dispose function");try{for(;;)yield n?(n=!1,r):new Promise(o=>e=o)}finally{a?.()}}i(u,"u"),N(u,"observe");var V=Object.defineProperty,F=i((t,e)=>V(t,"name",{value:e,configurable:!0}),"o$2");function k(){return u(t=>{let e;const r=matchMedia("(prefers-color-scheme: dark)"),n=F(()=>{const a=getComputedStyle(document.body).getPropertyValue("color-scheme")==="dark";e!==a&&t(e=a)},"changed");return n(),r.addEventListener("change",n),()=>r.removeEventListener("change",n)})}i(k,"m"),F(k,"dark");var G=Object.defineProperty,y=i((t,e)=>G(t,"name",{value:e,configurable:!0}),"e$2");function E(t){return u(e=>{const r=z(t);let n=P(t);const a=y(()=>e(P(t)),"inputted");return t.addEventListener(r,a),n!==void 0&&e(n),()=>t.removeEventListener(r,a)})}i(E,"o$1"),y(E,"input");function P(t){switch(t.type){case"range":case"number":return t.valueAsNumber;case"date":return t.valueAsDate;case"checkbox":return t.checked;case"file":return t.multiple?t.files:t.files[0];case"select-multiple":return Array.from(t.selectedOptions,e=>e.value);default:return t.value}}i(P,"a"),y(P,"valueof");function z(t){switch(t.type){case"button":case"submit":case"checkbox":return"click";case"file":return"change";default:return"input"}}i(z,"f$2"),y(z,"eventof");var J=Object.defineProperty,Q=i((t,e)=>J(t,"name",{value:e,configurable:!0}),"e$1");async function*L(){for(;;)yield Date.now()}i(L,"i$3"),Q(L,"now");var W=Object.defineProperty,Z=i((t,e)=>W(t,"name",{value:e,configurable:!0}),"r$2");async function*q(t){let e;const r=[],n=t(a=>(r.push(a),e&&(e(r.shift()),e=null),a));if(n!=null&&typeof n!="function")throw new Error(typeof n.then=="function"?"async initializers are not supported":"initializer returned something, but not a dispose function");try{for(;;)yield r.length?r.shift():new Promise(a=>e=a)}finally{n?.()}}i(q,"l"),Z(q,"queue");var H=Object.defineProperty,K=i((t,e)=>H(t,"name",{value:e,configurable:!0}),"i$2");function R(t,e){return u(r=>{let n;const a=new ResizeObserver(([o])=>{const s=o.contentRect.width;s!==n&&r(n=s)});return a.observe(t,e),()=>a.disconnect()})}i(R,"d"),K(R,"width");var X=Object.freeze({__proto__:null,dark:k,input:E,now:L,observe:u,queue:q,width:R}),Y=Object.defineProperty,ee=i((t,e)=>Y(t,"name",{value:e,configurable:!0}),"r$1");function U(t){let e;return Object.defineProperty(u(r=>{e=r,t!==void 0&&e(t)}),"value",{get:()=>t,set:r=>void e(t=r)})}i(U,"f$1"),ee(U,"Mutable");var te=Object.defineProperty,C=i((t,e)=>te(t,"name",{value:e,configurable:!0}),"r");function B(t,e){const r=document.createElement("div");r.style.position="relative",t.length!==1&&(r.style.height="100%");let n=0,a=0,o;const s=new ResizeObserver(async([v])=>{const{width:c,height:I}=v.contentRect;if(t.length===1&&c===o)return;o=c;const O=++n,h=c>0?await t(c,I):null;if(!(a>O)){for(a=O;r.lastChild;)r.lastChild.remove();h!=null&&(t.length!==1&&M(h)&&(h.style.position="absolute"),r.append(h))}});return s.observe(r),e?.then(()=>s.disconnect()),r}i(B,"p"),C(B,"resize");function M(t){return typeof t=="object"&&t.nodeType===1}i(M,"v"),C(M,"isElement");var re=Object.defineProperty,ne=i((t,e)=>re(t,"name",{value:e,configurable:!0}),"o");const T=(p=class{},i(p,"e"),p);ne(T,"Library");let ae=T;const ie=void 0;export{x as AbstractFile,g as FileAttachment,ie as FileAttachments,X as Generators,ae as Library,U as Mutable,w as registerFile,B as resize};
