const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { countArticleWords, calculatePilotReadTime } = require("./pilotReadTime");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const indexPath = path.join(build, "index.html");
const journalPath = path.join(root, "src", "lib", "journalContent.js");
const expansionPath = path.join(root, "src", "lib", "journalExpansion.js");
const longformPath = path.join(root, "src", "lib", "journalLongform.js");
const specialPath = path.join(root, "src", "lib", "journalSpecialArticles.js");
const pilotPath = path.join(root, "src", "lib", "journal", "journalPilotArticles.js");
const tempJournalPath = path.join(build, "__fitme_journal.mjs");
const tempExpansionPath = path.join(build, "__fitme_journal_expansion.mjs");
const tempLongformPath = path.join(build, "__fitme_journal_longform.mjs");
const tempSpecialPath = path.join(build, "__fitme_journal_special.mjs");
const tempPilotPath = path.join(build, "__fitme_journal_pilots.mjs");
const journalDataDir = path.join(build, "journal");
const specialArticleFiles = ["nutritionArticles.js","fitnessArticles.js","weightManagementArticles.js","bodyCompositionArticles.js","wellnessArticles.js","healthEducationArticles.js","phase3Batch1.js"];
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");
const NOINDEX_JOURNAL_CATEGORIES = new Set(["wellness", "health-education"]);
const NOINDEX_JOURNAL_ARTICLES = new Set(["fitness-for-beginners-the-ultimate-step-by-step-getting-started-guide","how-to-start-working-out-a-no-intimidation-beginners-roadmap","the-5-best-exercises-for-absolute-beginners-proper-form-included","how-often-should-a-beginner-workout-each-week","gym-etiquette-101-what-first-timers-need-to-know-before-walking-in","how-to-choose-the-right-personal-trainer-for-your-goals","the-complete-guide-to-setting-realistic-fitness-goals-that-stick","cardio-vs-weight-training-which-should-beginners-do-first","how-to-overcome-gym-anxiety-tips-for-your-first-month","basic-gym-terminology-explained-reps-sets-and-rest-periods","the-ultimate-20-minute-full-body-home-workout-routine-no-equipment","how-to-build-muscle-at-home-using-only-your-bodyweight","best-resistance-band-exercises-for-arms-legs-and-core","the-30-day-push-up-challenge-for-upper-body-strength","small-space-cardio-workouts-you-can-do-in-an-apartment","how-to-stay-fit-without-a-gym-membership","the-best-adjustable-dumbbells-for-home-gyms-reviewed","core-workouts-at-home-7-moves-for-a-stronger-midsection","morning-stretching-routine-to-wake-up-your-body","how-to-set-up-an-effective-garage-or-basement-gym-on-a-budget","how-to-lose-weight-safely-what-science-says-actually-works","the-truth-about-spot-reduction-can-you-lose-belly-fat","5-healthy-breakfast-tips-thatll-help-you-lose-weight","high-intensity-interval-training-hiit-vs-steady-state-cardio-for-fat-loss","walking-for-weight-loss-how-many-steps-do-you-really-need","want-to-lose-weight-then-watch-what-youre-drinking","the-role-of-metabolism-in-weight-loss-myths-vs-facts","intermittent-fasting-and-exercise-how-to-time-your-workouts","why-sleep-is-the-missing-link-in-your-weight-loss-journey","low-impact-exercises-for-weight-loss-if-you-have-joint-pain","how-to-choose-the-best-powerlifting-belt-or-lifting-belt","hypertrophy-101-how-to-structure-your-week-for-muscle-building","the-5-best-compound-movements-for-overall-mass","how-to-overcome-a-strength-plateau-on-your-bench-press","progressive-overload-explained-the-secret-to-continuous-gains","the-best-back-exercises-for-building-width-and-thickness","leg-day-essentials-squats-vs-lunges-vs-leg-press","how-to-fix-muscle-imbalances-and-asymmetry","the-importance-of-grip-strength-and-how-to-improve-it","recovery-secrets-how-many-rest-days-do-you-actually-need","pre-workout-nutrition-what-to-eat-before-the-gym-for-maximum-energy","post-workout-recovery-meals-the-importance-of-protein-and-carbs","creatine-monohydrate-benefits-side-effects-and-how-to-take-it","protein-powder-101-whey-vs-plant-based-vs-casein","hydration-and-performance-how-much-water-to-drink-during-exercise","the-healthiest-fruits-and-vegetables-and-why-athletes-need-them","are-bodybuilding-supplements-necessary-for-muscle-growth","clean-eating-on-a-budget-meal-prep-tips-for-fitness-goals","understanding-macros-how-to-calculate-protein-carbs-and-fats","healthy-snack-ideas-to-curb-sugar-cravings-after-a-workout","a-guide-to-the-mental-benefits-of-running","how-to-train-for-your-first-5k-an-8-week-running-plan","choosing-the-right-running-shoes-neutral-vs-stability","why-we-get-stitches-when-running-and-how-to-avoid-them","indoor-vs-outdoor-running-which-is-better-for-your-joints","how-to-improve-your-running-pace-and-endurance","cycling-benefits-5-reasons-to-get-on-a-bike","swimming-for-fitness-why-its-the-ultimate-low-impact-workout","rowing-machine-workouts-technique-and-calorie-burn","how-to-warm-up-properly-before-a-long-run","foam-rolling-101-how-to-relieve-tight-muscles-safely","daily-mobility-routines-to-reverse-sitting-all-day","common-lower-back-pain-from-deadlifts-causes-and-fixes","how-to-prevent-shin-splints-while-training","active-recovery-vs-passive-recovery-whats-best","posture-correction-exercises-for-desk-workers","the-importance-of-dynamic-warm-ups-vs-static-stretching","how-to-tell-the-difference-between-muscle-soreness-and-injury","shoulder-health-rotator-cuff-exercises-for-lifters","yoga-for-athletes-poses-to-enhance-flexibility-and-balance","safe-exercises-for-women-managing-polycystic-ovary-syndrome-pcos","fitness-over-50-how-to-maintain-bone-density-and-strength","prenatal-exercise-safe-workouts-during-pregnancy","postpartum-fitness-rebuilding-core-strength-safely","teen-fitness-age-appropriate-strength-training-guidelines","deskercise-simple-stretches-and-moves-for-office-workers","adaptive-fitness-workouts-for-limited-mobility","vegan-bodybuilding-how-to-hit-your-protein-goals-on-a-plant-diet","kinesiology-tape-does-it-work-and-how-do-you-apply-it","fitness-for-truck-drivers-staying-active-on-the-road","the-best-treadmills-for-home-use-in-2026","adjustable-kettlebells-vs-fixed-kettlebells-which-to-buy","best-resistance-bands-for-physical-therapy-and-strength","smart-home-gym-mirrors-compared-features-and-pricing","best-fitness-trackers-and-smartwatches-for-heart-rate-accuracy","exercise-bikes-vs-ellipticals-which-burns-more-calories","best-yoga-mats-for-hot-yoga-and-cushioning","foam-rollers-reviewed-standard-vs-vibrating","how-to-choose-a-quality-weight-bench-for-your-home","best-jump-ropes-for-speed-and-conditioning","how-to-build-a-sustainable-morning-routine-that-includes-fitness","psychology-of-habit-formation-making-the-gym-automatic","how-accountability-partners-help-you-reach-your-fitness-goals","dealing-with-burnout-what-to-do-when-you-lose-motivation","the-benefits-of-making-fitness-your-new-years-resolution","how-meditation-and-breathwork-complement-physical-training","tracking-non-scale-victories-measuring-true-progress","how-social-media-affects-body-image-and-fitness-expectations","the-long-term-health-benefits-of-consistent-physical-activity","creating-a-holistic-wellness-plan-beyond-just-the-gym"]);

if (!fs.existsSync(indexPath)) throw new Error(`Build output not found: ${indexPath}`);
for (const required of [journalPath, expansionPath, longformPath, specialPath, pilotPath]) {
  if (!fs.existsSync(required)) throw new Error(`Required Journal source not found: ${required}`);
}

const esc = (v) => String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;");
const json = (v) => JSON.stringify(v).replace(/</g,"\\u003c");

function stripSeoMeta(html) {
  return html
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:(?:type|title|description|url|site_name)["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");
}

function meta(html,title,description,canonical,robots="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"){
  html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${esc(title)}</title>`);
  html=html.replace(/<meta name="description" content="[^"]*"\s*\/?>(\s*)/i,`<meta name="description" content="${esc(description)}" />$1`);
  return html.replace(/<\/head>/i,`<meta name="robots" content="${robots}" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="article" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${canonical}" /></head>`);
}

function write(route,html){
  const dir=path.join(build,route.replace(/^\//,"").replace(/\/$/,""));
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,"index.html"),html,"utf8");
}

(async()=>{
  try{
    fs.writeFileSync(tempJournalPath,fs.readFileSync(journalPath,"utf8"),"utf8");
    fs.writeFileSync(tempExpansionPath,fs.readFileSync(expansionPath,"utf8"),"utf8");
    fs.writeFileSync(tempLongformPath,fs.readFileSync(longformPath,"utf8"),"utf8");
    fs.mkdirSync(journalDataDir,{recursive:true});
    for(const file of specialArticleFiles){
      const source=path.join(root,"src","lib","journal",file);
      const dest=path.join(journalDataDir,file.endsWith(".js") ? file.slice(0, -3) + ".mjs" : file);
      if(!fs.existsSync(source)) throw new Error(`Required Journal article source not found: ${source}`);
      fs.writeFileSync(dest,fs.readFileSync(source,"utf8"),"utf8");
    }
    let specialSource=fs.readFileSync(specialPath,"utf8");
    for(const file of specialArticleFiles){
      const base=file.endsWith(".js") ? file.slice(0, -3) : file;
      specialSource=specialSource.replaceAll(`./journal/${base}`,`./journal/${base}.mjs`);
    specialSource=specialSource.replaceAll("./journal/journalPilotArticles","./__fitme_journal_pilots.mjs");
    }
    fs.writeFileSync(tempSpecialPath,specialSource,"utf8");
    fs.writeFileSync(tempPilotPath,fs.readFileSync(pilotPath,"utf8"),"utf8");

    const journalMod=await import(`${pathToFileURL(tempJournalPath).href}?v=${Date.now()}`);
    const expansionMod=await import(`${pathToFileURL(tempExpansionPath).href}?v=${Date.now()}`);
    const longformMod=await import(`${pathToFileURL(tempLongformPath).href}?v=${Date.now()}`);
    const specialMod=await import(`${pathToFileURL(tempSpecialPath).href}?v=${Date.now()}`);

    const baseArticles=journalMod.JOURNAL_ARTICLES||[];
    const expansionArticles=expansionMod.JOURNAL_EXPANSION_ARTICLES||[];
    const getLongFormJournalArticle=longformMod.getLongFormJournalArticle;
    const specialArticles=specialMod.JOURNAL_SPECIAL_ARTICLES||[];
    if(typeof getLongFormJournalArticle!=="function") throw new Error("getLongFormJournalArticle was not exported from journalLongform.js");

    const bySlug=new Map();
    for(const article of [...baseArticles,...expansionArticles,...specialArticles]) bySlug.set(article.slug,article);
    const articles=[];
    for (const article of bySlug.values()) {
      try {
        const rendered=article.pilot===true ? { ...article } : getLongFormJournalArticle(article);
        if (!rendered || !Array.isArray(rendered.sections)) {
          throw new Error("Long-form renderer returned an invalid article/sections structure");
        }
        // Final safety normalization: the HTML renderer below requires tuple sections.
        rendered.sections = rendered.sections.map((section) => {
          if (Array.isArray(section)) return [section[0] || "Section", section[1] || ""];
          if (section && typeof section === "object") {
            return [section.label || "Section", section.text ?? section.url ?? ""];
          }
          return ["Section", String(section ?? "")];
        });
        rendered.sources = Array.isArray(rendered.sources)
          ? rendered.sources.filter(Boolean).map((source) => ({
              label: source?.label || source?.title || "Source",
              url: source?.url || source?.href || "#"
            }))
          : [];
        articles.push(rendered);
      } catch (error) {
        throw new Error(`Failed to render Journal article "${article?.slug || "unknown-slug"}": ${error?.stack || error}`);
      }
    }
    const base=fs.readFileSync(indexPath,"utf8");

    for(const article of articles){
      const canonical=`${siteUrl}/journal/${article.categorySlug}/${article.slug}`;
      const isPilot=article.pilot===true;
      const isPhase3=article.phase3===true;
      const faqItems=(isPilot||isPhase3)&&Array.isArray(article.faqs)?article.faqs.filter((item)=>Array.isArray(item)&&item.length>=2):[];
      const schema={"@context":"https://schema.org","@type":"Article",headline:article.title,description:article.description,datePublished:article.date || "2026-09-19",dateModified:article.dateModified || article.date || "2026-09-19",mainEntityOfPage:{"@type":"WebPage","@id":canonical},author:{"@type":"Organization",name:"FitMe Pro"},publisher:{"@type":"Organization",name:"FitMe Pro",url:siteUrl},articleSection:article.category,keywords:article.keywords,isAccessibleForFree:true};
      if(isPilot||isPhase3) schema["@graph"]=[{...schema},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqItems.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}}))}];

      const quickSummary=Array.isArray(article.quickSummary)?`<section style="margin:0 0 28px;padding:22px;border:1px solid #ddd;border-radius:20px"><h2 style="margin:0 0 10px;line-height:1.25;letter-spacing:normal;word-spacing:normal">Quick Summary</h2><ul style="margin:0;padding-left:22px;line-height:1.65">${article.quickSummary.map(p=>`<li style="margin-bottom:8px">${esc(p)}</li>`).join("")}</ul></section>`:"";
      const renderedSections=[...(article.sections||[])].filter(([h]) => h !== "Introduction");
      for (const key of ["extraSections","extraSections2","extraSections3","extraSections4","extraSections5","extraSections6"]) {
        if (Array.isArray(article[key])) renderedSections.push(...article[key]);
      }
      const cleanedSections=renderedSections
        .filter((section) => Array.isArray(section) && section.length >= 2)
        .map(([h,t])=>`<section style="margin:0 0 28px"><h2 style="margin:0 0 10px;line-height:1.25;letter-spacing:normal;word-spacing:normal">${esc(h)}</h2><p style="margin:0;line-height:1.65">${esc(t)}</p></section>`)
        .join("");
      const readTimePlaceholder=(isPilot||isPhase3) ? "0 min read" : article.readTime;
      if((isPilot||isPhase3)&&faqItems.length!==4)throw new Error(`${isPilot?"Pilot":"Phase 3"} article ${article.slug} must contain exactly 4 FAQs`);
      if((isPilot||isPhase3)&&!renderedSections.some(([h]) => /^Worked example/i.test(String(h)))) throw new Error(`${isPilot?"Pilot":"Phase 3"} article ${article.slug} is missing a worked example section`);
      const workedExampleHtml=isPilot&&article.workedExample ? "<section style=\"margin:0 0 28px\"><h2 style=\"margin:0 0 10px;line-height:1.25\">Worked Example</h2><p style=\"margin:0;line-height:1.65\">"+esc(article.workedExample)+"</p></section>" : "";
      const faqHtml=faqItems.length ? "<section style=\"margin:0 0 28px\"><h2 style=\"margin:0 0 10px;line-height:1.25\">Frequently Asked Questions</h2>"+faqItems.map(([q,a])=>"<div style=\"margin:0 0 18px\"><h3 style=\"margin:0 0 6px;line-height:1.35\">"+esc(q)+"</h3><p style=\"margin:0;line-height:1.65\">"+esc(a)+"</p></div>").join("")+"</section>" : "";

      const sources=(Array.isArray(article.sources) ? article.sources : []).map(s=>`<li style="margin-bottom:8px"><a href="${esc(s.url)}">${esc(s.label)}</a></li>`).join("");
      const calculatorItems=(isPhase3?article.matchingCalculators:[["BMR Calculator","/bmr-calculator"],["TDEE Calculator","/tdee-calculator"],["Protein Calculator","/protein-calculator"],["Calorie Deficit Calculator","/calorie-deficit-calculator"]]).map(([label,url])=>`<li><a href="${esc(url)}">${esc(label)}</a></li>`).join("");
      const relatedItems=(isPhase3&&Array.isArray(article.relatedLinks)?article.relatedLinks:[]).map((item)=>`<li><a href="${esc(item.url)}">${esc(item.label)}</a></li>`).join("");
      const topCalculatorHtml=isPhase3?`<section style="margin:0 0 28px;padding:22px;border:1px solid #ddd;border-radius:20px"><h2 style="margin:0 0 10px;line-height:1.25">Use the matching FitMe Pro calculator</h2><ul style="margin:0;padding-left:20px">${calculatorItems}</ul></section>`:"";
      const afterExampleHtml=isPhase3?`<section style="margin:0 0 28px;padding:22px;border:1px solid #ddd;border-radius:20px"><h2 style="margin:0 0 10px;line-height:1.25">Check the numbers with FitMe Pro</h2><ul style="margin:0;padding-left:20px">${calculatorItems}</ul></section>`:"";
      const relatedHtml=isPhase3?`<section style="margin:0 0 28px"><h2 style="margin:0 0 10px;line-height:1.25">Related FitMe Pro tools and guides</h2><ul style="margin:0;padding-left:20px">${relatedItems}</ul></section>`:"";
      const safetyNote="Sources are provided for further reading. FitMe Pro content is educational and calculator estimates are not a diagnosis or individualized medical prescription.";
      const phase3SectionsHtml=isPhase3?(()=>{const idx=cleanedSections.search(/<section[^>]*><h2[^>]*>Worked example/i);if(idx<0)return cleanedSections+afterExampleHtml;return cleanedSections.slice(0,idx)+cleanedSections.slice(idx)+afterExampleHtml;})():cleanedSections;
      const body=`<main><article style="max-width:900px;margin:0 auto;padding:40px 20px;font-family:Arial,sans-serif;overflow-wrap:anywhere"><a href="/journal/${article.categorySlug}" style="display:inline-block;margin-bottom:20px">← ${esc(article.category)} Journal</a><header style="margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid #ddd"><p style="margin-bottom:10px;letter-spacing:.04em">${esc(article.category)} · ${esc(readTimePlaceholder)}</p><h1 style="margin:0 0 16px;line-height:1.15;letter-spacing:normal;word-spacing:normal;overflow-wrap:anywhere">${esc(article.title)}</h1><p style="margin:0 0 14px;line-height:1.65">${esc(article.description)}</p><p style="margin:0">Published ${esc(article.date || "September 19, 2026")} · FitMe Pro Journal</p></header>${quickSummary}${topCalculatorHtml}${phase3SectionsHtml}${workedExampleHtml}${faqHtml}${relatedHtml}${!isPhase3?`<section style="margin:0 0 28px;padding:22px;border:1px solid #ddd;border-radius:20px"><h2 style="margin:0 0 10px;line-height:1.25;letter-spacing:normal;word-spacing:normal">Health and wellness calculators</h2><ul style="margin:0;padding-left:20px">${calculatorItems}</ul></section>`:""}<section style="padding-top:24px;border-top:1px solid #ddd"><h2 style="margin:0 0 10px;line-height:1.25;letter-spacing:normal;word-spacing:normal">Sources & further reading</h2><ul style="margin:0;padding-left:20px">${sources}</ul><p style="margin-top:18px;line-height:1.6">${safetyNote}</p></section></article></main>`;
      const robots = NOINDEX_JOURNAL_CATEGORIES.has(article.categorySlug) && !NOINDEX_JOURNAL_ARTICLES.has(article.slug)
        ? "noindex,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
      let html=meta(base,`${article.title} | FitMe Pro Journal`,article.description,canonical,robots);
      html=html.replace(/<div id="root"><\/div>/i,`<div id="root">${body}</div>`).replace(/<\/head>/i,`<script type="application/ld+json">${json(schema)}</script></head>`);
      if(isPilot||isPhase3){
        const renderedArticleWordCount=countArticleWords(html);
        const renderedReadTime=calculatePilotReadTime(renderedArticleWordCount) + " min read";
        html=html.replace(readTimePlaceholder,renderedReadTime);
      }
      html=html.replaceAll("Use our calculators to explore estimates alongside the information in this guide.","").replaceAll("Before applying the information, define your main goal, identify the measurement or behavior that actually reflects that goal...","");
      write(`/journal/${article.categorySlug}/${article.slug}`,html);
    }

    console.log(`Prerendered ${articles.length} long-form Journal articles (base + expanded).`);
  }finally{
    for(const file of [tempJournalPath,tempExpansionPath,tempLongformPath,tempSpecialPath]){try{fs.unlinkSync(file)}catch(_){} }
    for(const file of specialArticleFiles){try{fs.unlinkSync(path.join(journalDataDir,file.endsWith(".js") ? file.slice(0, -3) + ".mjs" : file))}catch(_){} }
    try{fs.rmdirSync(journalDataDir)}catch(_){}
  }
})().catch(e=>{console.error("Journal long-form prerender failed:",e);process.exit(1)});
