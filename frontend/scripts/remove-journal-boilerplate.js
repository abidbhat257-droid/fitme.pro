const fs=require("fs");const path=require("path");
const build=path.resolve(__dirname,"..","build");
const A="Use our calculators to explore estimates alongside the information in this guide.";
const B="Before applying the information, define your main goal, identify the measurement or behavior that actually reflects that goal...";
function walk(dir){let out=[];for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...walk(p));else if(e.name==="index.html")out.push(p)}return out}
const files=walk(build);let changed=0;
for(const file of files){let html=fs.readFileSync(file,"utf8");const next=html.replaceAll(A,"").replaceAll(B,"");if(next!==html){fs.writeFileSync(file,next,"utf8");changed++}}
console.log(JSON.stringify({htmlFiles:files.length,changed,removedBoilerplateA:true,removedBoilerplateB:true},null,2));