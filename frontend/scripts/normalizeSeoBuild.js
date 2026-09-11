const fs=require('fs');const path=require('path');
const build=path.resolve(__dirname,'../build');
const site=(process.env.SITE_URL||'https://fitme-pro.vercel.app').replace(/\/$/,'');
function esc(v){return String(v??'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function files(dir){let out=[];for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(e.name==='static')continue;const p=path.join(dir,e.name);if(e.isDirectory())out.push(...files(p));else if(e.name==='index.html')out.push(p)}return out}
function normalize(file){let html=fs.readFileSync(file,'utf8');const rel=path.relative(build,file).replace(/\\/g,'/');const route=rel==='index.html'?'':rel.replace(/\/index\.html$/,'');const canonical=route?`${site}/${route}`:`${site}/`;
let title=(html.match(/<title>([\s\S]*?)<\/title>/i)||[])[1]||'FitMe Pro';
let descMatch=html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);let desc=descMatch?.[1];
if(!desc){const og=html.match(/<meta\s+property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i);desc=og?.[1]}
if(!desc)desc=`${title.replace(/\s*[·|—-]\s*FitMe Pro.*$/,'')} — free health and fitness calculator from FitMe Pro.`;
html=html.replace(/<meta\s+name=["']description["'][^>]*>\s*/gi,'').replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi,'').replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi,'');
html=html.replace(/<head>/i,`<head><meta name="description" content="${esc(desc)}" /><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" /><link rel="canonical" href="${canonical}" />`);
fs.writeFileSync(file,html,'utf8')}
const all=files(build);for(const f of all)normalize(f);console.log(`Normalized SEO metadata on ${all.length} prerendered pages.`);
