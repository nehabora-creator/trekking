
const $=id=>document.getElementById(id);
/* Home page behaviour. Slides, treks and photos live in js/data.js. */
const scene=c=>`<svg class="absolute inset-x-0 bottom-0 w-full h-2/3" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true"><path d="M0 230 L140 140 L260 210 L400 90 L520 190 L650 110 L780 220 L900 120 L1040 200 L1200 140 V400 H0Z" fill="#fff" opacity=".18"/><path d="M0 300 L180 210 L330 280 L500 190 L680 290 L860 200 L1020 280 L1200 220 V400 H0Z" fill="#000" opacity=".25"/></svg>`;
$("slides").innerHTML=slides.map((s,i)=>`<div class="slide absolute inset-0 ${i?'opacity-0':''}" data-i="${i}" style="background:${s.img?`center/cover url('${s.img}')`:`linear-gradient(${s.c[0]},${s.c[1]})`}">${s.img?"":scene(s.c)}</div>`).join("");
$("dots").innerHTML=slides.map((_,i)=>`<button aria-label="Go to slide ${i+1}" data-d="${i}" class="h-2.5 rounded-full bg-white/60 w-2.5"></button>`).join("");
let cur=0,timer;
function go(i){cur=(i+slides.length)%slides.length;
 document.querySelectorAll(".slide").forEach((el,j)=>el.classList.toggle("opacity-0",j!=cur));
 document.querySelectorAll("#dots button").forEach((b,j)=>{b.classList.toggle("w-8",j==cur);b.classList.toggle("w-2.5",j!=cur);b.classList.toggle("bg-white",j==cur)});
 $("ct").textContent=slides[cur].t;$("cs").textContent=slides[cur].s}
const play=()=>{clearInterval(timer);if(!matchMedia("(prefers-reduced-motion:reduce)").matches)timer=setInterval(()=>go(cur+1),5000)};
$("prev").onclick=()=>{go(cur-1);play()};$("next").onclick=()=>{go(cur+1);play()};
$("dots").onclick=e=>{const b=e.target.closest("[data-d]");if(b){go(+b.dataset.d);play()}};
const hero=$("top");hero.onmouseenter=()=>clearInterval(timer);hero.onmouseleave=play;
let sx=0;hero.ontouchstart=e=>sx=e.touches[0].clientX;hero.ontouchend=e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50){go(cur+(d<0?1:-1));play()}};
go(0);play();

/* ===== TREKS: name, region, days, grade, season, short text ===== */
T.forEach(t=>$("trek").add(new Option(t[0],t[0])));
/* ===== TREK FILTER CHIPS + CAROUSEL ===== */
const SE=["Spring","Summer","Autumn","Monsoon","Winter"],RG=[...new Set(T.map(t=>t[1]))];
let ss="",sr="";
$("fr").innerHTML='<option value="">All</option>'+RG.map(v=>`<option>${v}</option>`).join("");$("fs").innerHTML='<option value="">All</option>'+SE.map(v=>`<option>${v}</option>`).join("");
$("fd").innerHTML='<option value="">All levels</option>'+[...new Set(T.map(t=>t[3]))].map(v=>`<option>${v}</option>`).join("");
const chip=(v,on)=>`<button data-c="${v}" aria-pressed="${on}" class="shrink-0 rounded-full border px-6 py-2.5 text-lg font-semibold whitespace-nowrap ${on?'bg-flag border-flag text-white':'border-slate-300 dark:border-slate-600 hover:border-slate-500'}">${v}</button>`;
const heart='<svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="fill:none" aria-hidden="true"><path d="M12 21s-7-4.6-9.3-9.1C1 8.6 3 5 6.4 5c2 0 3.5 1.1 4.2 2.4h.8C12.1 6.1 13.6 5 15.6 5 19 5 21 8.6 19.3 11.9 17 16.4 12 21 12 21z"/></svg>';
const pin='<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
function render(){
 const sl=$("chips").scrollLeft;
 $("chips").innerHTML=SE.map(s=>chip(s,s==ss)).join("")+RG.map(r=>chip(r,r==sr)).join("");$("chips").scrollLeft=sl;
 $("fr").value=sr;$("fs").value=ss;
 const q=$("q").value.toLowerCase(),d=$("fd").value;
 const L=T.filter(t=>t[0].toLowerCase().includes(q)&&(!sr||t[1]==sr)&&(!ss||t[4]==ss)&&(!d||t[3]==d));
 $("ttl").textContent=sr&&ss?`${ss} Treks in ${sr}`:sr?`Unforgettable Trails of ${sr}`:ss?`Best ${ss} Treks`:"Unforgettable Himalayan Trails";
 $("grid").innerHTML=L.length?L.map(t=>`<article class="snap-start transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl motion-reduce:transform-none shrink-0 w-[290px] sm:w-[340px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col"><div class="relative h-64 overflow-hidden bg-gradient-to-br ${col[T.indexOf(t)%col.length]} to-slate-900 group">${(IMG[t[0]]||[]).map((s,k)=>`<img src="${s}" alt="${t[0]}" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition duration-500 motion-reduce:transform-none group-hover:scale-110 ${k?'opacity-0 group-hover:opacity-100':''}">`).join("")}<button data-f="${t[0]}" aria-label="Save ${t[0]}" aria-pressed="false" class="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow">${heart}</button></div><div class="p-4 flex flex-col gap-2 flex-1"><div class="flex items-start justify-between gap-2"><h4 class="font-display font-bold text-xl leading-snug">${t[0]}</h4><span class="shrink-0 inline-flex items-center gap-1 bg-slate-900 text-white text-xs rounded px-2.5 py-1.5">${pin}${t[1]}</span></div><p class="text-sm uppercase tracking-wide text-slate-600 dark:text-slate-400"><b class="font-semibold">Duration:</b> ${t[2]} days</p><p class="text-sm uppercase tracking-wide text-slate-600 dark:text-slate-400"><b class="font-semibold">Grade:</b> ${t[3]}</p><button data-t="${t[0]}" class="mt-auto rounded py-2.5 font-semibold bg-flag text-white transition hover:bg-black">View Trek Details</button></div></article>`).join(""):'<p class="text-slate-500">No treks match these filters. Clear a filter to see more.</p>';
 $("grid").scrollLeft=0}
$("chips").onclick=e=>{const b=e.target.closest("[data-c]");if(!b)return;const v=b.dataset.c;if(SE.includes(v))ss=ss==v?"":v;else sr=sr==v?"":v;render()};
$("cn").onclick=()=>$("chips").scrollBy({left:320,behavior:"smooth"});
$("ft").onclick=()=>{const m=$("more");m.classList.toggle("hidden");$("ft").setAttribute("aria-expanded",!m.classList.contains("hidden"))};
["q","fd"].forEach(i=>$(i).addEventListener("input",render));
$("fr").onchange=()=>{sr=$("fr").value;render()};$("fs").onchange=()=>{ss=$("fs").value;render()};
$("reset").onclick=()=>{ss=sr="";$("q").value="";$("fd").value="";render()};
$("grid").onclick=e=>{const f=e.target.closest("button[data-f]");if(f){const on=f.getAttribute("aria-pressed")!="true";f.setAttribute("aria-pressed",on);f.firstElementChild.style.fill=on?"#ef4444":"none";f.firstElementChild.style.color=on?"#ef4444":"";return}
 const b=e.target.closest("button[data-t]");if(b){location.href="treks/"+slug(b.dataset.t)+".html"}};
const TP=["Book a trek","Ask a question","Group or family","School or college"];let tp=TP[0];
function drawT(){$("topics").innerHTML=TP.map(t=>`<button type="button" data-t="${t}" aria-pressed="${t==tp}" class="rounded-full border px-4 py-2 text-base font-semibold transition ${t==tp?'bg-flag border-flag text-white':'border-slate-300 dark:border-slate-600 hover:border-slate-500'}">${t}</button>`).join("")}
$("topics").onclick=e=>{const b=e.target.closest("[data-t]");if(b){tp=b.dataset.t;drawT()}};drawT();
["January","February","March","April","May","June","July","August","September","October","November","December"].forEach(m=>$("mon").add(new Option(m,m)));
$("cbg").src=IMG["Kashmir Great Lakes"][0];
$("form").onsubmit=e=>{e.preventDefault();$("ok").textContent="Thanks "+$("name").value+"! Your enquiry ("+tp+") is noted. Connect this form to your email or backend to receive it.";e.target.reset();tp=TP[0];drawT()};

/* ===== TREK CAROUSEL ARROWS + STAY INFORMED TABS ===== */
$("gp").onclick=()=>$("grid").scrollBy({left:-340,behavior:"smooth"});$("gn").onclick=()=>$("grid").scrollBy({left:340,behavior:"smooth"});
$("up").onclick=()=>$("ucar").scrollBy({left:-340,behavior:"smooth"});$("un").onclick=()=>$("ucar").scrollBy({left:340,behavior:"smooth"});
// tab, title, text, photo (trek name from IMG)
const U={"Trek updates":[
["Sample update","Kedarnath Trek","Weather and trail notes for the coming batches","Kedarnath Trek"],
["Sample update","Chandratal Lake","Clear skies and open camps this week","Chandratal Lake"],
["Sample update","Roopkund","Snow patches on the upper trail, carry gaiters","Roopkund"],
["Sample update","Everest Base Camp","Acclimatisation days added to every batch","Everest Base Camp"],
["Sample update","Goechala","Clear mornings expected for peak views","Goechala"]],
"Articles":[
["Guide","How to choose your first trek","Easy routes, ideal months and what to expect","Dayara Bugyal"],
["Guide","Packing list for a 5-day trek","Layers, shoes and the small things people forget","Brahmatal"],
["Guide","Altitude sickness: what to know","Signs to watch for and how to acclimatise","Annapurna Base Camp"],
["Guide","Best time for flowers and lakes","Monsoon blooms and summer lakes in the Himalayas","Valley of Flowers"],
["Guide","Ladakh treks for beginners","Valleys, villages and passes to start with","Markha Valley"]]};
let ut="Trek updates";
function drawU(){
 $("utabs").innerHTML=Object.keys(U).map(k=>`<button role="tab" aria-selected="${k==ut}" data-k="${k}" class="rounded-full px-4 py-1.5 text-base font-semibold border ${k==ut?'bg-flag text-white border-flag':'border-slate-300 dark:border-slate-600'}">${k}</button>`).join("");
 $("ucar").innerHTML=U[ut].map(u=>`<a href="#contact" class="group relative snap-start shrink-0 w-72 sm:w-80 h-80 rounded-xl overflow-hidden block bg-slate-800"><img src="${IMG[u[3]][0]}" alt="${u[3]}" loading="lazy" class="absolute inset-0 w-full h-full object-cover"><div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div><div class="absolute inset-x-0 bottom-0 p-4 text-white"><small class="opacity-80">${u[0]}</small><h3 class="font-display font-bold text-xl">${u[1]}</h3><p class="text-base overflow-hidden transition-all duration-300 ease-out max-h-0 opacity-0 translate-y-4 group-hover:max-h-24 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:max-h-24 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 [@media(hover:none)]:max-h-24 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0 motion-reduce:transition-none">${u[2]}</p></div></a>`).join("");$("ucar").scrollLeft=0}
$("utabs").onclick=e=>{const b=e.target.closest("[data-k]");if(b){ut=b.dataset.k;drawU()}};
drawU();

/* ===== GOOGLE REVIEWS CAROUSEL (sample data: name, trek, text) ===== */
const R=[
["Aarav Mehta","Kedarnath Trek","Well planned from start to finish. The guide kept a steady pace and checked on everyone along the way."],
["Neha Sharma","Valley of Flowers","The trail was green and quiet, and the team handled the rain without any fuss. Great first Himalayan trek."],
["Rohan Verma","Roopkund","Tough climb, but the leaders explained each day clearly and the camps were warm and comfortable."],
["Priya Nair","Annapurna Base Camp","Lovely group, great food at every stop, and a guide who knew every turn. Would trek with them again."],
["Karan Singh","Chandratal Lake","Easy to book, easy to follow. The lake at sunrise made the whole trip worth it."],
["Ishita Roy","Goechala","Eleven days felt short. Clear weather updates and kind, patient support from the whole team."],
["Vikram Rao","Kashmir Great Lakes","Every lake looked better than the last. The local crew looked after us very well."],
["Ananya Das","Dayara Bugyal","We took the kids on this one. The pace was gentle and the guides made it fun for them."]];
const AV=["#2f6f7e","#3c7a5a","#6a5a9a","#a0603a","#4a6aa0","#8a4a5a"];
const q='<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 7h4v4c0 3-1.5 5-4 6l-.7-1.3C7.600 15 8 13.800 8 12.500H7V7zm8 0h4v4c0 3-1.500 5-4 6l-.7-1.300c1.300-.7 1.700-1.900 1.700-3.200h-1V7z"/></svg>';
$("rcar").innerHTML=R.map((r,i)=>`<article class="snap-start shrink-0 w-[290px] sm:w-[340px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col"><div class="relative h-44 bg-slate-700"><img src="${IMG[r[1]][0]}" alt="${r[1]}" loading="lazy" class="w-full h-full object-cover"><span class="absolute left-4 -bottom-6 w-14 h-14 rounded-full border-4 border-white dark:border-slate-800 text-white text-xl font-bold flex items-center justify-center" style="background:${AV[i%AV.length]}">${r[0][0]}</span></div><div class="pt-9 px-5 pb-5 flex flex-col gap-2 flex-1"><div class="flex items-start justify-between gap-2"><div><h3 class="font-display font-bold text-lg leading-tight">${r[0]}</h3><p class="text-sm text-slate-500">${r[1]}</p></div><span class="text-flag">${q}</span></div><p class="text-amber-400 tracking-wider" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</p><p class="text-base text-slate-600 dark:text-slate-300 line-clamp-5">${r[2]}</p><p class="mt-auto pt-2 text-xs text-slate-500 flex items-center gap-1.5"><b style="color:#4285F4">G</b> Posted on Google</p></div></article>`).join("");
const rc=$("rcar"),stepR=()=>rc.firstElementChild.offsetWidth+20;
const nextR=()=>rc.scrollLeft+rc.clientWidth>=rc.scrollWidth-4?rc.scrollTo({left:0,behavior:"smooth"}):rc.scrollBy({left:stepR(),behavior:"smooth"});
$("rn").onclick=nextR;$("rp").onclick=()=>rc.scrollBy({left:-stepR(),behavior:"smooth"});
let rt;const rplay=()=>{clearInterval(rt);if(!matchMedia("(prefers-reduced-motion:reduce)").matches)rt=setInterval(nextR,4500)};
rc.onmouseenter=()=>clearInterval(rt);rc.onmouseleave=rplay;rplay();

/* ===== FAQ TABS + ACCORDION (edit the text below) ===== */
const FQ={
"Beginners Guide":[
["How do I choose the right trek?","Start with your fitness level and the number of days you have. For a first trek, pick an easy or easy-to-moderate route of 4 to 6 days with a gradual climb, and check the best season. If you are unsure, send us an enquiry and we will suggest options."],
["Can a beginner choose a tough trek?","We do not recommend it. High altitude, steep slopes and rough ground need experience and fitness. Begin with an easier trek and build up from there."],
["Is there an age limit?","There is no fixed age limit. Fitness and health matter more. If you have a medical condition, please check with your doctor before booking."],
["Can I join the trek solo?","Yes. Book a fixed-date batch and we will place you in a group with other trekkers."],
["What food will I get?","Simple, filling vegetarian meals and snacks on the trail. Tell us about allergies or special diets when you book so we can plan ahead."],
["How much water should I carry?","Carry two one-litre bottles. You can refill them at every camp."]],
"Booking Guide":[
["How do I book a trek?","Pick a trek and a batch date, then send us an enquiry using the form below. We will confirm availability and share the payment steps."],
["What is included in the price?","Add your own inclusions here, for example camps or stays, meals on the trek, trek leader and guides, permits and a safety kit."],
["Can I change my batch date?","Add your date-change rules here. Ask us as early as possible so we can check space in other batches."],
["What is the cancellation policy?","Add your cancellation and refund terms here."]],
"Family Treks":[
["Can I trek with kids?","Yes, on easy routes such as Dayara Bugyal. Check the minimum age for each trek with our team before booking."],
["Can we book a private family batch?","Add your private or customised trek details here, including group size and pricing."],
["What should kids carry?","A small day pack with water, a snack and a rain layer. Adults or porters carry the main load."]],
"Rent":[
["What gear can I rent?","Jackets, trekking poles, sleeping bags and shoes. Add your full list here."],
["How does renting work?","Tell us the gear and dates in your enquiry. You collect and return it at the base point. Add your own steps here."],
["Is there a deposit?","Add your deposit and damage policy here."]],
"Repeat Your Trek Policy":[
["What is the repeat trek policy?","Describe what you offer to returning trekkers here, for example a discount on the next booking."],
["How do I claim it?","Add the steps here, such as quoting your earlier booking ID."]],
"Trek Ambassador":[
["What is a Trek Ambassador?","A past trekker who shares their experience and helps new trekkers choose and prepare. Describe your own programme here."],
["How can I become one?","Add the requirements and the sign-up steps here."]],
"Women Trekker":[
["Is it safe for women trekkers?","Add your safety details here. Common points are trained leaders, daily check-ins, clear camp rules and the option of women-only batches."],
["Can I join a women-only batch?","Add your women-only batch dates and details here."]]};
let ft=Object.keys(FQ)[0],fo=0;
function drawF(){
 const IC={"Beginners Guide":'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/>',"Booking Guide":'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',"Family Treks":'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.300 2.700-6 6-6s6 2.700 6 6M15 14.500c3 0 6 1.500 6 5"/>',"Rent":'<path d="M3 12l9-9h8v8l-9 9z"/><circle cx="16" cy="8" r="1.500"/>',"Repeat Your Trek Policy":'<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',"Trek Ambassador":'<circle cx="12" cy="9" r="6"/><path d="M8.500 14L7 22l5-3 5 3-1.500-8"/>',"Women Trekker":'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.500-7 8-7s8 3 8 7"/>'};
 const sl=$("ftabs").scrollLeft;
 $("ftabs").innerHTML=Object.keys(FQ).map(k=>`<button role="tab" aria-selected="${k==ft}" data-k="${k}" class="shrink-0 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-lg font-semibold whitespace-nowrap ${k==ft?'bg-flag border-flag text-white':'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-slate-500'}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]||""}</svg>${k}</button>`).join("");$("ftabs").scrollLeft=sl;
 $("fbody").innerHTML=FQ[ft].map((x,i)=>`<div class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"><button data-i="${i}" aria-expanded="${i==fo}" class="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-display font-bold text-lg"><span>${x[0]}</span><span class="shrink-0 text-flag transition-transform duration-300 ${i==fo?'rotate-180':''}" aria-hidden="true">&#9662;</span></button><div class="grid grid-cols-1 transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${i==fo?'grid-rows-[1fr]':'grid-rows-[0fr]'}"><div class="overflow-hidden"><p class="px-5 pb-5 text-slate-600 dark:text-slate-300">${x[1]}</p></div></div></div>`).join("")}
$("ftabs").onclick=e=>{const b=e.target.closest("[data-k]");if(b){ft=b.dataset.k;fo=0;drawF();$("ftabs").querySelector('[aria-selected="true"]').scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}};
$("tp").onclick=()=>$("ftabs").scrollBy({left:-260,behavior:"smooth"});$("tn").onclick=()=>$("ftabs").scrollBy({left:260,behavior:"smooth"});
$("fbody").onclick=e=>{const b=e.target.closest("[data-i]");if(!b)return;const i=+b.dataset.i;fo=fo==i?-1:i;
 [...$("fbody").children].forEach((c,j)=>{const on=j==fo;c.firstElementChild.setAttribute("aria-expanded",on);c.firstElementChild.lastElementChild.classList.toggle("rotate-180",on);const g=c.lastElementChild;g.classList.toggle("grid-rows-[1fr]",on);g.classList.toggle("grid-rows-[0fr]",!on)})};
drawF();

/* ===== WHY SECTION: highlight card on hover + count-up numbers ===== */
const wc=[...document.querySelectorAll("#why [data-card]")];
const actW=c=>wc.forEach(x=>{const on=x==c;x.classList.toggle("border-flag",on);x.classList.toggle("border-transparent",!on)});
wc.forEach(c=>{c.onmouseenter=()=>actW(c);c.onclick=()=>actW(c)});
const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;io.unobserve(en.target);const el=en.target,n=+el.dataset.n,t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/1200);el.textContent=Math.round(n*k).toLocaleString("en-US");if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}));
if(!matchMedia("(prefers-reduced-motion:reduce)").matches)document.querySelectorAll("#why .cnt").forEach(el=>io.observe(el));


/* ===== Pre-fill the enquiry form when coming from a trek page (?trek=Name&batch=Date) ===== */
const qp=new URLSearchParams(location.search);
if(qp.get("trek"))$("trek").value=qp.get("trek");
if(qp.get("batch"))$("msg").value="Preferred batch: "+qp.get("batch");
render();
if(location.hash==="#contact")setTimeout(()=>$("contact").scrollIntoView(),150);
