/* site.js — contacto anti-spam + capa de animación (GSAP + ScrollTrigger).
   Todo el contenido existe en el HTML: si GSAP no carga o el usuario pide menos movimiento,
   el sitio se ve completo y estático. */
(function () {
  "use strict";
  var doc = document.documentElement;
  var rev = function (s) { return s.split("").reverse().join(""); };

  /* ---------- 1. Contacto: se arma aquí, no queda escrito en el HTML ---------- */
  document.querySelectorAll("[data-mail]").forEach(function (a) {
    var m = rev(a.getAttribute("data-u")) + "@" + rev(a.getAttribute("data-d"));
    a.href = "mailto:" + m;
    a.querySelectorAll("[data-mail-text]").forEach(function (t) { t.textContent = m; });
    a.hidden = false;
  });
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var n = rev(a.getAttribute("data-n")).replace(/\s/g, "");          // 51951887425
    a.href = "https://wa.me/" + n;
    a.querySelectorAll("[data-wa-text]").forEach(function (t) {
      t.textContent = "+" + n.slice(0, 2) + " " + n.slice(2, 5) + " " + n.slice(5, 8) + " " + n.slice(8);
    });
  });
  document.querySelectorAll("[data-reach]").forEach(function (r) { r.hidden = false; });

  /* ---------- 2. Movimiento ---------- */
  var gsap = window.gsap, ST = window.ScrollTrigger;
  if (!gsap || !ST || !doc.classList.contains("anim")) { doc.classList.remove("anim"); return; }
  gsap.registerPlugin(ST);
  var fine = matchMedia("(pointer: fine)").matches;
  var $ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var ease = "power3.out";

  // barra de progreso de lectura
  var bar = document.querySelector(".progress");
  if (bar) gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

  // contador: el número final ya está en el HTML; aquí sube/baja hasta él
  function count(el, delay) {
    var to = parseFloat(el.textContent), from = parseFloat(el.getAttribute("data-from")), o = { v: from };
    el.textContent = from;
    return gsap.to(o, { v: to, duration: 1.8, delay: delay || 0, ease: "expo.out",
      onUpdate: function () { el.textContent = Math.round(o.v); } });
  }
  // tachado que se dibuja (variable CSS --k)
  function strike(el, delay) {
    gsap.set(el, { "--k": 0 });
    return gsap.to(el, { "--k": 1, duration: 0.7, delay: delay || 0, ease: "power2.inOut" });
  }
  // separa un título en letras con máscara (solo títulos sin data-i18n)
  function split(h) {
    h.classList.add("split");
    $(".w", h).forEach(function (w) {
      var t = w.textContent; w.textContent = "";
      var m = document.createElement("span"); m.className = "mask"; m.setAttribute("aria-hidden", "true");
      t.split("").forEach(function (c) { var s = document.createElement("span"); s.className = "ch"; s.textContent = c; m.appendChild(s); });
      w.appendChild(m);
      w.setAttribute("data-t", t);
    });
    return $(".ch", h);
  }

  /* --- HERO (index) --- */
  var hero = document.querySelector(".hero");
  if (hero) {
    var h1 = hero.querySelector("h1"), chars = h1 ? split(h1) : [];
    var tl = gsap.timeline({ defaults: { ease: ease } });
    tl.fromTo(hero.querySelector(".eyebrow"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 })
      .from(chars, { yPercent: 115, rotate: 6, duration: 0.9, stagger: 0.028, ease: "power4.out" }, "-=0.3")
      .fromTo(hero.querySelector(".lead"), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.5")
      .fromTo($(".meta span", hero), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 }, "-=0.5")
      .fromTo($(".ctas .btn", hero), { autoAlpha: 0, y: 16, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08 }, "-=0.35")
      .fromTo($(".stat", hero), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.35")
      .add(function () { $(".stat .count", hero).forEach(function (c, i) { count(c, i * 0.12); }); }, "-=0.6")
      .fromTo(".orb", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 0.4)
      .add(function () { // devolver el título a texto plano: la máscara recortaba el brillo
        if (h1) { $(".w", h1).forEach(function (w) { w.textContent = w.getAttribute("data-t"); }); h1.classList.remove("split"); }
      }, 1.9);
    // el contenido del hero se desplaza un poco más lento que la página
    gsap.to(hero.querySelector(".wrap"), { yPercent: -8, autoAlpha: 0.35, ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
    network(hero);
    if (fine) orb(hero);
  } else {
    if ($(".stat").length) gsap.set($(".stat"), { autoAlpha: 1 });
  }

  /* --- HERO (case study) --- */
  var cs = document.querySelector(".cs-hero");
  if (cs) {
    var kids = $(".wrap > *", cs);
    gsap.timeline({ defaults: { ease: ease } })
      .fromTo(kids, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 })
      .add(function () { $(".strike", cs).forEach(function (s) { strike(s); }); $(".count", cs).forEach(function (c) { count(c, 0.35); }); }, 0.35)
      .from($(".bars div", cs), { width: 0, minWidth: 0, duration: 1.3, stagger: 0.25, ease: "expo.out" }, 0.6);
  }

  /* --- encabezados de sección --- */
  $("section:not(.hero):not(.cs-hero):not(.contact)").forEach(function (sec) {
    var head = $(".sec-head .eyebrow, .sec-head h2, :scope > .wrap > .eyebrow, :scope > .wrap > h2", sec);
    if (head.length) gsap.from(head, { autoAlpha: 0, y: 36, duration: 0.9, stagger: 0.1, ease: ease,
      scrollTrigger: { trigger: sec, start: "top 80%", once: true } });
    var b = sec.querySelector(".sec-head .bar i");
    if (b) gsap.from(b, { width: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: b, start: "top 88%", once: true } });
  });

  /* --- tarjetas, pills, párrafos: entran en lote al aparecer --- */
  function batch(sel, from, to) {
    var els = $(sel).filter(function (e) { return !e.closest(".hero, .cs-hero") && !(e.matches(".card") && e.closest(".cs-step")); });
    if (!els.length) return;
    gsap.set(els, from);
    ST.batch(els, { start: "top 88%", once: true,
      onEnter: function (b) { gsap.to(b, Object.assign({ autoAlpha: 1, y: 0, x: 0, scale: 1, rotate: 0, duration: 0.85, stagger: 0.09, ease: ease }, to || {})); } });
  }
  batch(".card, .cs-step", { autoAlpha: 0, y: 46 });
  batch(".pill", { autoAlpha: 0, scale: 0.7 }, { duration: 0.5, stagger: 0.03, ease: "back.out(2)" });
  batch("section .lead, .quote, .work li, .tl p, .contact .ctas .btn, .reach-card", { autoAlpha: 0, y: 20 });
  batch(".cs-step .n", { autoAlpha: 0, scale: 0.4, rotate: -90 }, { ease: "back.out(1.8)" });

  /* --- caso (index): tachado + cuenta regresiva + imagen --- */
  var big = document.querySelector("#case .bignum");
  if (big) {
    gsap.from(big, { autoAlpha: 0, x: -40, duration: 0.8, ease: ease,
      scrollTrigger: { trigger: big, start: "top 82%", once: true,
        onEnter: function () { $(".strike", big).forEach(function (s) { strike(s, 0.4); }); $(".count", big).forEach(function (c) { count(c, 0.7); }); } } });
    $(".strike", big).forEach(function (s) { gsap.set(s, { "--k": 0 }); });
  }

  /* --- imágenes: se destapan y tienen parallax --- */
  $("#case figure, .work figure").forEach(function (fig, i) {
    var img = fig.querySelector("img"), left = fig.closest(".work") ? (i % 2 === 0) : false;
    gsap.fromTo(fig, { clipPath: left ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0%)", duration: 1.3, ease: "expo.inOut", scrollTrigger: { trigger: fig, start: "top 82%", once: true } });
    // parallax del marco completo (no de la imagen: sus textos no se recortan)
    gsap.fromTo(fig, { y: 36 }, { y: -36, ease: "none",
      scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true } });
    if (fine && img) { // inclinación 3D suave al pasar el cursor
      gsap.set(fig, { transformPerspective: 900 });
      var rx = gsap.quickTo(fig, "rotationX", { duration: 0.5 }), ry = gsap.quickTo(fig, "rotationY", { duration: 0.5 });
      fig.addEventListener("pointermove", function (e) { var r = fig.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 6); rx(-((e.clientY - r.top) / r.height - 0.5) * 6); });
      fig.addEventListener("pointerleave", function () { rx(0); ry(0); });
    }
  });
  $(".work h3, .work > div > .eyebrow").forEach(function (h) {
    gsap.from(h, { autoAlpha: 0, x: 30, duration: 0.8, ease: ease, scrollTrigger: { trigger: h, start: "top 85%", once: true } });
  });

  /* --- línea de tiempo que se dibuja con el scroll --- */
  var tline = document.querySelector(".tl");
  if (tline) {
    gsap.fromTo(tline, { "--tl": 0 }, { "--tl": 1, ease: "none",
      scrollTrigger: { trigger: tline, start: "top 75%", end: "bottom 60%", scrub: 0.5 } });
    batch(".tl .row", { autoAlpha: 0, x: -36 }, { stagger: 0.14 });
  }

  /* --- resultado del caso: barras de 'vs' y métricas --- */
  $(".vs .card").forEach(function (c, i) {
    gsap.fromTo(c, { autoAlpha: 0, x: i ? 60 : -60 }, { autoAlpha: 1, x: 0, duration: 0.9, ease: ease,
      scrollTrigger: { trigger: c, start: "top 85%", once: true } });
  });
  $("h2 .strike, h2 s.r").forEach(function (s) {
    s.classList.add("strike"); gsap.set(s, { "--k": 0 });
    ST.create({ trigger: s, start: "top 80%", once: true, onEnter: function () { strike(s, 0.5); } });
  });

  /* --- contacto: el título crece --- */
  var ct = document.querySelector(".contact h2");
  if (ct) gsap.from(ct, { scale: 0.86, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ct, start: "top 85%", once: true } });

  /* --- marquesina del stack (cambia de sentido según el scroll) --- */
  var track = document.querySelector(".mq-track");
  if (track) {
    track.innerHTML += track.innerHTML;
    var loop = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    ST.create({ start: 0, end: "max", onUpdate: function (self) {
      gsap.to(loop, { timeScale: self.direction * Math.min(4, 1 + Math.abs(self.getVelocity()) / 600), duration: 0.4, overwrite: true });
      gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.4, overwrite: false });
    } });
  }

  /* --- menú: resalta la sección visible --- */
  $(".nav nav a[href^='#']").forEach(function (a) {
    var sec = document.querySelector(a.getAttribute("href"));
    if (sec) ST.create({ trigger: sec, start: "top 45%", end: "bottom 45%", toggleClass: { targets: a, className: "on" } });
  });

  /* --- interacción con puntero fino: foco de luz en tarjetas + botones magnéticos --- */
  if (fine) {
    $(".card, .stat, .tl .row, .reach-card").forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty("--mx", (e.clientX - r.left) + "px");
        c.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
    $(".btn").forEach(function (b) {
      var xTo = gsap.quickTo(b, "x", { duration: 0.4, ease: "power3" }), yTo = gsap.quickTo(b, "y", { duration: 0.4, ease: "power3" });
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.25); yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      b.addEventListener("pointerleave", function () { xTo(0); yTo(0); });
    });
  }

  // al cambiar de idioma los textos cambian de alto: recalcular posiciones
  $("[data-lang-toggle]").forEach(function (b) { b.addEventListener("click", function () { setTimeout(function () { ST.refresh(); }, 50); }); });
  window.addEventListener("load", function () { ST.refresh(); });

  /* ---------- fondo del hero: red de nodos (se pausa fuera de pantalla) ---------- */
  function network(host) {
    var cv = host.querySelector(".net"); if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1), W, H, pts = [], mouse = { x: -999, y: -999 }, run = true, raf;
    function size() {
      W = host.clientWidth; H = host.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(90, Math.round(W * H / 15000)); pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.6 + 0.6 });
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 17000) { ctx.strokeStyle = "rgba(56,182,255," + (0.16 * (1 - d / 17000)) + ")"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        var mx = p.x - mouse.x, my = p.y - mouse.y, md = mx * mx + my * my;
        if (md < 32000) { ctx.strokeStyle = "rgba(127,208,255," + (0.45 * (1 - md / 32000)) + ")"; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        ctx.fillStyle = "rgba(127,208,255,.75)"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      if (run) raf = requestAnimationFrame(frame);
    }
    size(); frame();
    var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(size, 150); });
    host.addEventListener("pointermove", function (e) { var r = host.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    host.addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) {
      var v = en[0].isIntersecting; if (v && !run) { run = true; frame(); } else if (!v) { run = false; cancelAnimationFrame(raf); }
    }).observe(host);
  }
  // halo que sigue al cursor dentro del hero
  function orb(host) {
    var o = host.querySelector(".orb"); if (!o) return;
    gsap.set(o, { x: host.clientWidth * 0.7, y: host.clientHeight * 0.3 });
    var xTo = gsap.quickTo(o, "x", { duration: 1.2, ease: "power3" }), yTo = gsap.quickTo(o, "y", { duration: 1.2, ease: "power3" });
    host.addEventListener("pointermove", function (e) { var r = host.getBoundingClientRect(); xTo(e.clientX - r.left); yTo(e.clientY - r.top); });
  }
})();
