/* Behaviour for every trek page: photo banner, tab strip carousel, scroll highlight. */
(function () {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

  /* ----- Top banner photo gallery ----- */
  const gal = $("#gal"), slides = $$("#gal .gslide"), thumbs = $$("[data-g]"), cnt = $("#gcount");
  let cur = 0;
  function show(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle("opacity-0", j !== cur));
    thumbs.forEach(t => {
      const on = +t.dataset.g === cur;
      t.classList.toggle("border-flag", on);
      t.classList.toggle("border-transparent", !on);
    });
    if (cnt) cnt.textContent = (cur + 1) + " / " + slides.length;
  }
  if ($("[data-gp]")) $("[data-gp]").onclick = () => show(cur - 1);
  if ($("[data-gn]")) $("[data-gn]").onclick = () => show(cur + 1);
  thumbs.forEach(t => t.onclick = () => show(+t.dataset.g));
  let sx = 0;
  gal.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
  gal.addEventListener("touchend", e => {
    const d = e.changedTouches[0].clientX - sx;
    if (Math.abs(d) > 50) show(cur + (d < 0 ? 1 : -1));
  });

  /* ----- Gallery grid: open a photo in the banner ----- */
  $$("[data-gg]").forEach(b => b.onclick = () => {
    show(+b.dataset.gg);
    gal.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  /* ----- Tab strip carousel + smooth scroll to sections ----- */
  const tabs = $("#tabs"), tabBtns = $$("#tabs [data-s]");
  $("[data-tp]").onclick = () => tabs.scrollBy({ left: -260, behavior: "smooth" });
  $("[data-tn]").onclick = () => tabs.scrollBy({ left: 260, behavior: "smooth" });
  document.addEventListener("click", e => {
    const s = e.target.closest("[data-s]");
    if (!s) return;
    const el = document.getElementById(s.dataset.s);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
  });
  function setActive(id) {
    tabBtns.forEach(b => {
      const on = b.dataset.s === id;
      b.classList.toggle("bg-white", on);
      b.classList.toggle("text-flag", on);
      b.classList.toggle("text-white", !on);
      if (on) {
        const r = b.getBoundingClientRect(), c = tabs.getBoundingClientRect();
        tabs.scrollBy({ left: r.left - c.left - (c.width - r.width) / 2, behavior: "smooth" });
      }
    });
  }
  const io = new IntersectionObserver(es => {
    es.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
  }, { rootMargin: "-170px 0px -60% 0px" });
  tabBtns.forEach(b => { const el = document.getElementById(b.dataset.s); if (el && b.dataset.s !== "t-dep") io.observe(el); });
})();
