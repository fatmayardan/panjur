/* ==========================================================
   Uludoğan Panjur — etkileşimler
   ========================================================== */
(function () {
  "use strict";

  var A = window.AYARLAR || {};
  var doc = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) doc.classList.add("reduce-motion");

  /* ---------- Ayarları sayfaya uygula ---------- */
  function waLink(msg) {
    var text = msg || A.whatsappMesaj || "";
    return "https://wa.me/" + (A.whatsapp || "") + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  $$("[data-tel]").forEach(function (el) {
    if (A.telefon) el.setAttribute("href", "tel:" + A.telefon);
  });
  $$("[data-tel-text]").forEach(function (el) {
    if (A.telefonGorunen) el.textContent = A.telefonGorunen;
  });
  $$("[data-wa]").forEach(function (el) {
    if (!A.whatsapp) return;
    el.setAttribute("href", waLink(el.getAttribute("data-wa-msg")));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
  $$("[data-saat]").forEach(function (el) { if (A.calismaSaatleri) el.textContent = A.calismaSaatleri; });
  $$("[data-pazar]").forEach(function (el) { el.textContent = A.pazar || ""; });
  $$("[data-bolge]").forEach(function (el) { el.textContent = A.bolge || ""; });
  $$("[data-adres]").forEach(function (el) { el.textContent = A.adres || ""; });

  if (A.eposta) {
    $$("[data-eposta]").forEach(function (el) { el.setAttribute("href", "mailto:" + A.eposta); });
    $$("[data-eposta-text]").forEach(function (el) { el.textContent = A.eposta; });
  } else {
    $$("[data-eposta-wrap]").forEach(function (el) { el.remove(); });
  }
  if (A.instagram) {
    $$("[data-instagram]").forEach(function (el) {
      el.href = A.instagram; el.hidden = false; el.target = "_blank"; el.rel = "noopener";
    });
  }

  var yil = $("#yil");
  if (yil) yil.textContent = new Date().getFullYear();

  // Arama motorları için işletme bilgisi (JSON-LD)
  try {
    var ld = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": A.firma || "Uludoğan Panjur",
      "founder": { "@type": "Person", "name": A.yetkili || "Seçkin Uludoğan" },
      "description": "Panjur, sineklik ve cam balkon satış, montaj, tamir ve bakım hizmeti.",
      "telephone": A.telefon,
      "areaServed": A.bolge,
      "address": { "@type": "PostalAddress", "addressLocality": "Kayseri", "addressCountry": "TR" },
      "image": "assets/img/og-image.jpg",
      "openingHours": "Mo-Sa 08:30-19:00"
    };
    if (A.siteAdresi) ld.url = A.siteAdresi;
    if (A.eposta) ld.email = A.eposta;
    if (A.adres) ld.address.streetAddress = A.adres;
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  } catch (e) {}

  /* ---------- Tema ---------- */
  var themeBtn = $(".theme-toggle");
  var themeMeta = $("#themeColor");
  function applyThemeUI() {
    var dark = doc.getAttribute("data-theme") === "dark";
    if (themeBtn) themeBtn.setAttribute("aria-label", dark ? "Açık temaya geç" : "Koyu temaya geç");
    if (themeMeta) themeMeta.setAttribute("content", dark ? "#0f1012" : "#f5f3ee");
  }
  applyThemeUI();
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = doc.getAttribute("data-theme") === "dark" ? "light" : "dark";
      doc.setAttribute("data-theme", next);
      try { localStorage.setItem("tema", next); } catch (e) {}
      applyThemeUI();
    });
  }

  /* ---------- Açılış animasyonu ---------- */
  function markLoaded() { requestAnimationFrame(function () { doc.classList.add("is-loaded"); }); }
  var heroImg = $(".hero-frame img");
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener("load", markLoaded, { once: true });
    heroImg.addEventListener("error", markLoaded, { once: true });
    setTimeout(markLoaded, 2500);
  } else {
    markLoaded();
  }

  /* ---------- Üst menü ---------- */
  var header = $(".site-header");
  var menuBtn = $(".menu-toggle");
  var waFloat = $(".wa-float");
  var mobileBar = $(".mobile-bar");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("is-scrolled", y > 12);
    var show = y > window.innerHeight * 0.55;
    if (waFloat) waFloat.classList.toggle("is-visible", show);
    if (mobileBar) mobileBar.classList.toggle("is-visible", show);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("menu-locked", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(!header.classList.contains("menu-open"));
    });
    $$(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 920 && header.classList.contains("menu-open")) setMenu(false);
    });
  }

  // Aktif bölümü menüde işaretle
  var navLinks = $$(".main-nav ul a");
  if ("IntersectionObserver" in window && navLinks.length) {
    var map = {};
    navLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          navLinks.forEach(function (a) { a.classList.remove("is-current"); });
          map[en.target.id].classList.add("is-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- Kaydırınca beliren öğeler ---------- */
  var revealEls = $$(".reveal, .steps");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Paralaks (çağrı bandı) ---------- */
  var band = $(".cta-band");
  var bandImg = band && $("img", band);
  if (band && bandImg && !reduceMotion) {
    var ticking = false;
    var updateParallax = function () {
      var r = band.getBoundingClientRect();
      var vh = window.innerHeight;
      if (r.bottom > 0 && r.top < vh) {
        var p = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
        bandImg.style.setProperty("--parallax", (p * -120 - 40).toFixed(1) + "px");
      }
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); }
    }, { passive: true });
    updateParallax();
  }

  /* ---------- Sekmeler ---------- */
  var tabs = $$('[role="tab"]');
  var indicator = $(".tab-indicator");
  function moveIndicator(tab) {
    if (!indicator || !tab) return;
    indicator.style.width = tab.offsetWidth + "px";
    indicator.style.transform = "translateX(" + tab.offsetLeft + "px)";
  }
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) { panel.hidden = !on; panel.classList.toggle("is-active", on); }
    });
    moveIndicator(tab);
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      var n = null;
      if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") n = tabs[0];
      if (e.key === "End") n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });
  if (tabs.length) {
    var setInitial = function () { moveIndicator($('[role="tab"][aria-selected="true"]')); };
    setInitial();
    window.addEventListener("resize", setInitial);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setInitial);
  }
  $$("[data-tab-link]").forEach(function (a) {
    a.addEventListener("click", function () {
      var t = document.getElementById("tab-" + a.getAttribute("data-tab-link"));
      if (t) selectTab(t);
    });
  });

  /* ---------- Galeri filtre ---------- */
  var chips = $$(".chip");
  var items = $$(".g-item");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      items.forEach(function (it, idx) {
        var show = f === "hepsi" || it.getAttribute("data-cat") === f;
        it.classList.remove("is-entering");
        it.classList.toggle("is-hidden", !show);
        if (show && !reduceMotion) {
          void it.offsetWidth;
          it.style.animationDelay = (idx % 6) * 0.04 + "s";
          it.classList.add("is-entering");
        }
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox");
  if (lb && typeof lb.showModal === "function") {
    var lbImg = $("img", lb);
    var lbCap = $("figcaption", lb);
    var current = 0;
    var visible = function () { return items.filter(function (it) { return !it.classList.contains("is-hidden"); }); };
    var show = function (i) {
      var list = visible();
      if (!list.length) return;
      current = (i + list.length) % list.length;
      var it = list[current];
      var img = $("img", it);
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = $("figcaption", it).textContent;
      lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
    };
    items.forEach(function (it) {
      $("button", it).addEventListener("click", function () {
        show(visible().indexOf(it));
        lb.showModal();
        document.body.classList.add("menu-locked");
      });
    });
    var close = function () { lb.close(); };
    lb.addEventListener("close", function () { document.body.classList.remove("menu-locked"); });
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-prev", lb).addEventListener("click", function () { show(current - 1); });
    $(".lb-next", lb).addEventListener("click", function () { show(current + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.tagName === "FIGURE") close(); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") show(current + 1);
      if (e.key === "ArrowLeft") show(current - 1);
    });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ---------- Teklif formu → WhatsApp ---------- */
  var form = $("#teklifFormu");
  if (form) {
    var setErr = function (input, msg) {
      var field = input.closest(".field");
      field.classList.toggle("has-error", !!msg);
      $(".field-error", field).textContent = msg || "";
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ad = form.elements.ad;
      var tel = form.elements.tel;
      var ok = true;
      if (ad.value.trim().length < 2) { setErr(ad, "Lütfen adınızı yazın."); ok = false; } else setErr(ad, "");
      var digits = tel.value.replace(/\D/g, "");
      if (digits.length < 10) { setErr(tel, "Lütfen geçerli bir telefon numarası yazın."); ok = false; } else setErr(tel, "");
      if (!ok) { (ad.getAttribute("aria-invalid") === "true" ? ad : tel).focus(); return; }

      var hizmet = (form.querySelector('input[name="hizmet"]:checked') || {}).value || "";
      var mesaj = form.elements.mesaj.value.trim();
      var text = "Merhaba Seçkin Bey, web sitenizden teklif almak istiyorum.\n\n" +
        "Ad soyad: " + ad.value.trim() + "\n" +
        "Telefon: " + tel.value.trim() + "\n" +
        "Hizmet: " + hizmet +
        (mesaj ? "\nNot: " + mesaj : "");
      window.open(waLink(text), "_blank", "noopener");
    });
    ["ad", "tel"].forEach(function (n) {
      form.elements[n].addEventListener("input", function () {
        if (this.getAttribute("aria-invalid") === "true") setErr(this, "");
      });
    });
  }
})();
