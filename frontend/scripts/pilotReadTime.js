function countArticleWords(html){
  const match=String(html??"").match(/<article\\b[^>]*>([\\s\\S]*?)<\\/article>/i);
  if(!match)return 0;
  const text=match[1]
    .replace(/<script[\\s\\S]*?<\\/script>/gi," ")
    .replace(/<style[\\s\\S]*?<\\/style>/gi," ")
    .replace(/<[^>]+>/g," ")
    .replace(/&amp;/g,"&")
    .replace(/&lt;/g,"<")
    .replace(/&gt;/g,">")
    .replace(/&quot;/g,'"')
    .replace(/&#39;/g,"'")
    .replace(/\\s+/g," ")
    .trim();
  return text?text.split(/\\s+/).filter(Boolean).length:0;
}

function calculatePilotReadTime(words){return Math.max(1,Math.round(words/200));}

module.exports={countArticleWords,calculatePilotReadTime};
