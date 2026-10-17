/* Herramientas interactivas de Finanzas Hispanas USA. Sin dependencias. */
(function () {
  "use strict";
  var usd = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  var usd2 = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var num = new Intl.NumberFormat("es-US", { maximumFractionDigits: 2 });
  function $(root, sel) { return root.querySelector(sel); }
  function $$(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }
  function val(root, name) { var el = $(root, '[name="' + name + '"]'); var v = parseFloat(String(el.value).replace(/,/g, "")); return isFinite(v) ? v : 0; }
  function bind(root, fn) { $$(root, "input, select").forEach(function (el) { el.addEventListener("input", fn); el.addEventListener("change", fn); }); fn(); }
  function track(name) { try { if (window.gtag) window.gtag("event", "tool_use", { tool: name }); } catch (e) {} }

  var tools = {
    remesas: function (root) {
      var used = false;
      bind(root, function () {
        var amount = val(root, "monto"), metodo = $(root, '[name="metodo"]').value;
        var tax = metodo === "efectivo" ? amount * 0.01 : 0;
        var res = ["a", "b"].map(function (k) {
          var fee = val(root, "fee_" + k), rate = val(root, "rate_" + k);
          return { k: k, fee: fee, rate: rate, recibe: amount * rate, paga: amount + fee + tax };
        });
        var market = val(root, "mercado");
        res.forEach(function (r) {
          $(root, '[data-out="recibe_' + r.k + '"]').textContent = num.format(Math.round(r.recibe));
          $(root, '[data-out="paga_' + r.k + '"]').textContent = usd2.format(r.paga);
          var hidden = market > 0 && r.rate > 0 ? (market - r.rate) * amount / market : 0;
          var total = hidden + r.fee + tax;
          $(root, '[data-out="costo_' + r.k + '"]').textContent = amount > 0 ? usd2.format(total) + " (" + num.format(total / amount * 100) + " %)" : "—";
        });
        var a = res[0], b = res[1];
        var perA = a.paga ? a.recibe / a.paga : 0, perB = b.paga ? b.recibe / b.paga : 0;
        var win = perA >= perB ? a : b, lose = win === a ? b : a;
        $$(root, ".rm-col").forEach(function (c) { c.classList.toggle("is-best", c.dataset.k === win.k && amount > 0); });
        var diff = win.recibe - lose.recibe * (win.paga / (lose.paga || 1));
        var verdict = $(root, '[data-out="veredicto"]');
        if (amount <= 0 || !a.rate || !b.rate) { verdict.textContent = "Completa los datos para comparar."; return; }
        var anual = diff * 12;
        verdict.innerHTML = "Con la <b>opción " + win.k.toUpperCase() + "</b> tu familia recibe <b>" + num.format(Math.round(Math.abs(diff))) + " en moneda local</b> más por el mismo costo. Si envías cada mes, son <b>" + num.format(Math.round(Math.abs(anual))) + "</b> más al año." + (tax ? " Pagando en efectivo sumas " + usd2.format(tax) + " de impuesto: hazlo desde tu cuenta bancaria y te lo ahorras." : "");
        if (!used) { used = true; track("remesas"); }
      });
    },

    presupuesto: function (root) {
      bind(root, function () {
        var ingreso = val(root, "ingreso"), familia = $(root, '[name="familia"]').checked;
        var parts = familia ? [["Necesidades", .5, "nec"], ["Familia (remesas)", .2, "fam"], ["Deseos", .1, "des"], ["Ahorro y deudas", .2, "aho"]] : [["Necesidades", .5, "nec"], ["Deseos", .3, "des"], ["Ahorro y deudas", .2, "aho"]];
        var bar = $(root, ".bp-bar"), list = $(root, ".bp-list");
        bar.innerHTML = ""; list.innerHTML = "";
        parts.forEach(function (p) {
          var seg = document.createElement("span"); seg.className = "bp-seg " + p[2]; seg.style.width = (p[1] * 100) + "%"; seg.title = p[0]; bar.appendChild(seg);
          var li = document.createElement("li");
          li.innerHTML = '<span class="dot ' + p[2] + '"></span><span>' + p[0] + ' <small>' + Math.round(p[1] * 100) + ' %</small></span><b>' + usd.format(ingreso * p[1]) + '</b>';
          list.appendChild(li);
        });
        var real = val(root, "renta"), pct = ingreso > 0 ? real / ingreso : 0;
        var tip = $(root, '[data-out="tip"]');
        if (!ingreso) tip.textContent = "";
        else if (pct > .4) tip.innerHTML = "Tu renta es el <b>" + Math.round(pct * 100) + " %</b> de tu ingreso. Está por encima de lo recomendado: recorta primero en deseos para no dejar de ahorrar.";
        else if (real > 0) tip.innerHTML = "Tu renta es el <b>" + Math.round(pct * 100) + " %</b> de tu ingreso. Vas por buen camino.";
        else tip.textContent = "Añade tu renta para ver si encaja en el plan.";
        $(root, '[data-out="ahorro_anual"]').textContent = usd.format(ingreso * .2 * 12);
      });
    },

    credito: function (root) {
      var rows = $(root, ".uc-rows");
      function addRow(b, l) {
        var r = document.createElement("div"); r.className = "uc-row";
        r.innerHTML = '<label>Saldo<input inputmode="decimal" name="saldo" value="' + (b || "") + '" placeholder="0"></label><label>Límite<input inputmode="decimal" name="limite" value="' + (l || "") + '" placeholder="0"></label><button type="button" class="uc-del" aria-label="Quitar tarjeta">×</button>';
        rows.appendChild(r);
        $$(r, "input").forEach(function (el) { el.addEventListener("input", calc); });
        $(r, ".uc-del").addEventListener("click", function () { if (rows.children.length > 1) { r.remove(); calc(); } });
      }
      function n(el) { var v = parseFloat(String(el.value).replace(/,/g, "")); return isFinite(v) ? v : 0; }
      function calc() {
        var saldo = 0, limite = 0;
        $$(rows, ".uc-row").forEach(function (r) { saldo += n($(r, '[name="saldo"]')); limite += n($(r, '[name="limite"]')); });
        var u = limite > 0 ? saldo / limite : 0, pct = Math.min(u * 100, 100);
        var meter = $(root, ".uc-fill"); meter.style.width = pct + "%";
        var level = u < .1 ? ["Excelente", "ok"] : u < .3 ? ["Buena", "ok"] : u < .5 ? ["Regular", "warn"] : ["Alta", "bad"];
        meter.dataset.level = level[1];
        $(root, '[data-out="pct"]').textContent = limite ? num.format(u * 100) + " %" : "—";
        $(root, '[data-out="nivel"]').textContent = limite ? level[0] : "";
        $(root, '[data-out="nivel"]').dataset.level = level[1];
        var to30 = Math.max(0, saldo - limite * .3), to10 = Math.max(0, saldo - limite * .1);
        $(root, '[data-out="consejo"]').innerHTML = !limite ? "Añade el saldo y el límite de tus tarjetas." :
          to30 > 0 ? "Paga <b>" + usd.format(Math.ceil(to30)) + "</b> antes de la fecha de cierre del estado de cuenta para bajar al 30 %, y <b>" + usd.format(Math.ceil(to10)) + "</b> para llegar al 10 %." :
          to10 > 0 ? "Estás bajo el 30 %. Si pagas <b>" + usd.format(Math.ceil(to10)) + "</b> más antes del cierre, bajarás al 10 %, el rango de los mejores puntajes." :
          "Tu utilización está en el rango ideal. Mantén los pagos a tiempo.";
      }
      $(root, ".uc-add").addEventListener("click", function () { addRow(); track("credito"); });
      addRow(450, 1000); addRow(120, 500);
      calc();
    },

    emergencia: function (root) {
      bind(root, function () {
        var gastos = val(root, "gastos"), meses = val(root, "situacion"), actual = val(root, "actual"), aporte = val(root, "aporte");
        var meta = gastos * meses, falta = Math.max(0, meta - actual), prog = meta ? Math.min(actual / meta, 1) : 0;
        $(root, '[data-out="meta"]').textContent = usd.format(meta);
        $(root, ".ef-fill").style.width = (prog * 100) + "%";
        $(root, '[data-out="prog"]').textContent = Math.round(prog * 100) + " %";
        var t = $(root, '[data-out="tiempo"]');
        if (!meta) { t.textContent = "Escribe tus gastos esenciales del mes."; return; }
        if (!falta) { t.innerHTML = "¡Ya alcanzaste tu meta! Mantén el dinero en una cuenta de ahorro asegurada y repónlo si lo usas."; return; }
        if (!aporte) { t.innerHTML = "Te faltan <b>" + usd.format(falta) + "</b>. Añade cuánto puedes ahorrar al mes para calcular la fecha."; return; }
        var m = Math.ceil(falta / aporte), d = new Date(); d.setMonth(d.getMonth() + m);
        var fecha = d.toLocaleDateString("es-US", { month: "long", year: "numeric" });
        var hito = actual < 1000 ? " Tu primer hito, <b>$1,000</b>, llega en " + Math.max(1, Math.ceil((1000 - actual) / aporte)) + " meses." : "";
        t.innerHTML = "Te faltan <b>" + usd.format(falta) + "</b>. Ahorrando " + usd.format(aporte) + " al mes llegas en <b>" + m + " meses</b> (" + fecha + ")." + hito;
      });
    },

    deudas: function (root) {
      function sim(ds, extra, order) {
        ds = ds.map(function (d) { return { n: d.n, s: d.s, r: d.r, m: d.m }; });
        var months = 0, interest = 0, done = [];
        while (ds.some(function (d) { return d.s > 0.005; }) && months < 600) {
          months++;
          var pool = extra;
          ds.forEach(function (d) { if (d.s > 0) { var i = d.s * d.r / 1200; d.s += i; interest += i; } });
          ds.forEach(function (d) { if (d.s > 0) { var p = Math.min(d.m, d.s); d.s -= p; } else pool += d.m; });
          var live = ds.filter(function (d) { return d.s > 0.005; }).sort(order);
          live.forEach(function (d) { var p = Math.min(pool, d.s); d.s -= p; pool -= p; });
          ds.forEach(function (d) { if (d.s <= 0.005 && done.indexOf(d.n) < 0) { d.s = 0; done.push(d.n); } });
        }
        return { months: months, interest: interest, done: done, stuck: months >= 600 };
      }
      function fecha(m) { var d = new Date(); d.setMonth(d.getMonth() + m); return d.toLocaleDateString("es-US", { month: "long", year: "numeric" }); }
      function plazo(m) { var a = Math.floor(m / 12), r = m % 12; return (a ? a + (a > 1 ? " años" : " año") + (r ? " y " : "") : "") + (r ? r + (r > 1 ? " meses" : " mes") : ""); }
      bind(root, function () {
        var ds = [1, 2, 3].map(function (k) { return { n: $(root, '[name="n' + k + '"]').value || "Deuda " + k, s: val(root, "s" + k), r: val(root, "r" + k), m: val(root, "m" + k) }; }).filter(function (d) { return d.s > 0; });
        var out = $(root, '[data-out="veredicto"]');
        if (!ds.length) { out.textContent = "Escribe el saldo de al menos una deuda."; return; }
        var extra = val(root, "extra");
        var av = sim(ds, extra, function (a, b) { return b.r - a.r; }), bn = sim(ds, extra, function (a, b) { return a.s - b.s; });
        [["av", av], ["bn", bn]].forEach(function (x) {
          var k = x[0], r = x[1];
          $(root, '[data-out="' + k + '_t"]').textContent = r.stuck ? "No termina" : plazo(r.months);
          $(root, '[data-out="' + k + '_i"]').innerHTML = r.stuck ? "Los pagos no cubren los intereses." : "Intereses: <b>" + usd.format(r.interest) + "</b> · libre en " + fecha(r.months);
          $(root, '[data-out="' + k + '_o"]').textContent = r.stuck ? "" : "Orden: " + r.done.join(" → ");
        });
        $$(root, ".dd-card").forEach(function (c) { c.classList.remove("win"); });
        if (av.stuck) { out.innerHTML = "Con estos pagos la deuda no baja. Sube el pago extra o pide a tu banco una tasa más baja."; return; }
        var ahorro = bn.interest - av.interest;
        $(root, '.dd-card[data-m="av"]').classList.add("win");
        var base = sim(ds, 0, function (a, b) { return b.r - a.r; });
        var msg = ahorro > 1 ? "La <b>avalancha</b> te ahorra <b>" + usd.format(ahorro) + "</b> en intereses. Si necesitas motivación rápida, la bola de nieve paga primero la deuda más pequeña." : "Con tus deudas ambos métodos cuestan casi lo mismo: elige la <b>bola de nieve</b> para ver resultados antes.";
        if (extra > 0 && !base.stuck) msg += " Tu pago extra de " + usd.format(extra) + " te ahorra <b>" + usd.format(base.interest - av.interest) + "</b> y " + (base.months - av.months) + " meses frente a pagar solo los mínimos.";
        out.innerHTML = msg;
        track("deudas");
      });
    },

    quiz: function (root) {
      var qs = $$(root, ".qz-q"), i = 0, score = 0, weak = [];
      var bar = $(root, ".qz-fill"), step = $(root, '[data-out="paso"]');
      function show() {
        qs.forEach(function (q, k) { q.hidden = k !== i; });
        bar.style.width = (i / qs.length * 100) + "%";
        step.textContent = "Pregunta " + (i + 1) + " de " + qs.length;
      }
      qs.forEach(function (q) {
        $$(q, "button").forEach(function (b) {
          b.addEventListener("click", function () {
            var pts = +b.dataset.pts; score += pts;
            if (pts < 2) weak.push(q.dataset.tema);
            if (i === 0) track("quiz");
            i++;
            if (i < qs.length) show(); else finish();
          });
        });
      });
      var guides = { credito: ["Construye tu crédito", "/como-construir-credito-en-estados-unidos-desde-cero/"], banco: ["Abre tu cuenta bancaria", "/como-abrir-una-cuenta-bancaria-en-estados-unidos-sin-seguro-social/"], emergencia: ["Arma tu fondo de emergencia", "/fondo-de-emergencia-cuanto-ahorrar-y-donde-guardarlo/"], presupuesto: ["Haz tu presupuesto", "/como-hacer-un-presupuesto-mensual-regla-50-30-20/"], remesas: ["Envía dinero pagando menos", "/como-enviar-dinero-a-latinoamerica-mas-barato/"], impuestos: ["Pon en orden tus impuestos", "/itin-vs-ssn-diferencias-y-como-solicitar-el-itin/"], deudas: ["Sal de deudas con un plan", "/como-salir-de-deudas-de-tarjetas-de-credito/"] };
      function finish() {
        qs.forEach(function (q) { q.hidden = true; });
        bar.style.width = "100%"; step.textContent = "Resultado";
        var pct = Math.round(score / (qs.length * 2) * 100);
        var res = $(root, ".qz-res"); res.hidden = false;
        $(root, '[data-out="score"]').textContent = pct;
        $(root, '[data-out="label"]').textContent = pct >= 80 ? "Finanzas sólidas" : pct >= 50 ? "Vas por buen camino" : "Hay que poner orden";
        res.dataset.level = pct >= 80 ? "ok" : pct >= 50 ? "warn" : "bad";
        var ul = $(root, ".qz-recs"); ul.innerHTML = "";
        var seen = {};
        (weak.length ? weak : ["emergencia", "credito"]).forEach(function (t) {
          if (seen[t] || !guides[t]) return; seen[t] = 1;
          var li = document.createElement("li"); li.innerHTML = '<a href="' + guides[t][1] + '">' + guides[t][0] + " →</a>"; ul.appendChild(li);
        });
      }
      $(root, ".qz-again").addEventListener("click", function () { i = 0; score = 0; weak = []; $(root, ".qz-res").hidden = true; show(); });
      show();
    }
  };

  $$(document, "[data-tool]").forEach(function (el) { var f = tools[el.dataset.tool]; if (f) f(el); });

  /* Índice, barra de lectura y copiar enlace en artículos */
  var art = document.querySelector(".post .prose"), toc = document.querySelector(".toc ol");
  if (art && toc) {
    var hs = $$(art, "h2");
    if (hs.length < 3) { document.querySelector(".toc").hidden = true; }
    hs.forEach(function (h) { var li = document.createElement("li"); li.innerHTML = '<a href="#' + h.id + '">' + h.textContent + "</a>"; toc.appendChild(li); });
    if ("IntersectionObserver" in window) {
      var links = $$(toc, "a");
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); }); }); }, { rootMargin: "0px 0px -70% 0px" });
      hs.forEach(function (h) { io.observe(h); });
    }
  }
  var pb = document.querySelector(".progress span");
  if (pb) { var upd = function () { var h = document.documentElement, max = h.scrollHeight - h.clientHeight; pb.style.width = (max > 0 ? h.scrollTop / max * 100 : 0) + "%"; }; window.addEventListener("scroll", upd, { passive: true }); upd(); }

  /* Buscador de la portada */
  var sb = document.querySelector("[data-search]");
  if (sb) {
    var input = $(sb, "input"), out = $(sb, ".sr"), data = null;
    var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
    input.addEventListener("focus", function () { if (!data) fetch("/search.json").then(function (r) { return r.json(); }).then(function (d) { data = d; run(); }).catch(function () {}); });
    var run = function () {
      var q = norm(input.value.trim()); out.innerHTML = "";
      if (!q || !data) { out.hidden = true; return; }
      var terms = q.split(/\s+/);
      var hits = data.filter(function (p) { var t = norm(p.title + " " + p.description + " " + p.category + " " + p.keywords); return terms.every(function (w) { return t.indexOf(w) > -1; }); }).slice(0, 6);
      out.hidden = false;
      out.innerHTML = hits.length ? hits.map(function (p) { return '<li><a href="' + p.url + '"><small>' + p.category + "</small>" + p.title + "</a></li>"; }).join("") : '<li class="none">No hay resultados todavía. Prueba con "crédito", "ITIN" o "remesas".</li>';
    };
    input.addEventListener("input", run);
  }
})();
