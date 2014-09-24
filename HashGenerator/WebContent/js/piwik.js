/*
 * Piwik - Web Analytics
 *
 * JavaScript tracking client
 *
 * @link http://piwik.org
 * @source http://dev.piwik.org/trac/browser/trunk/js/piwik.js
 * @license http://www.opensource.org/licenses/bsd-license.php Simplified BSD
 */
var strURL = document.URL;
var nnn = strURL.indexOf("appspot");
if (nnn != -1)
	window.location.assign("http://passwordsgenerator.net/");

if (!this.JSON2) {
	this.JSON2 = {}
}
(function() {
	function d(f) {
		return f < 10 ? "0" + f : f
	}
	function l(n, m) {
		var f = Object.prototype.toString.apply(n);
		if (f === "[object Date]") {
			return isFinite(n.valueOf()) ? n.getUTCFullYear() + "-"
					+ d(n.getUTCMonth() + 1) + "-" + d(n.getUTCDate()) + "T"
					+ d(n.getUTCHours()) + ":" + d(n.getUTCMinutes()) + ":"
					+ d(n.getUTCSeconds()) + "Z" : null
		}
		if (f === "[object String]" || f === "[object Number]"
				|| f === "[object Boolean]") {
			return n.valueOf()
		}
		if (f !== "[object Array]" && typeof n.toJSON === "function") {
			return n.toJSON(m)
		}
		return n
	}
	var c = new RegExp(
			"[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]",
			"g"), e = '\\\\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]', i = new RegExp(
			"[" + e, "g"), j, b, k = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}, h;
	function a(f) {
		i.lastIndex = 0;
		return i.test(f) ? '"'
				+ f.replace(i, function(m) {
					var n = k[m];
					return typeof n === "string" ? n : "\\u"
							+ ("0000" + m.charCodeAt(0).toString(16)).slice(-4)
				}) + '"' : '"' + f + '"'
	}
	function g(s, p) {
		var n, m, t, f, q = j, o, r = p[s];
		if (r && typeof r === "object") {
			r = l(r, s)
		}
		if (typeof h === "function") {
			r = h.call(p, s, r)
		}
		switch (typeof r) {
		case "string":
			return a(r);
		case "number":
			return isFinite(r) ? String(r) : "null";
		case "boolean":
		case "null":
			return String(r);
		case "object":
			if (!r) {
				return "null"
			}
			j += b;
			o = [];
			if (Object.prototype.toString.apply(r) === "[object Array]") {
				f = r.length;
				for (n = 0; n < f; n += 1) {
					o[n] = g(n, r) || "null"
				}
				t = o.length === 0 ? "[]" : j ? "[\n" + j + o.join(",\n" + j)
						+ "\n" + q + "]" : "[" + o.join(",") + "]";
				j = q;
				return t
			}
			if (h && typeof h === "object") {
				f = h.length;
				for (n = 0; n < f; n += 1) {
					if (typeof h[n] === "string") {
						m = h[n];
						t = g(m, r);
						if (t) {
							o.push(a(m) + (j ? ": " : ":") + t)
						}
					}
				}
			} else {
				for (m in r) {
					if (Object.prototype.hasOwnProperty.call(r, m)) {
						t = g(m, r);
						if (t) {
							o.push(a(m) + (j ? ": " : ":") + t)
						}
					}
				}
			}
			t = o.length === 0 ? "{}" : j ? "{\n" + j + o.join(",\n" + j)
					+ "\n" + q + "}" : "{" + o.join(",") + "}";
			j = q;
			return t
		}
	}
	if (typeof JSON2.stringify !== "function") {
		JSON2.stringify = function(o, m, n) {
			var f;
			j = "";
			b = "";
			if (typeof n === "number") {
				for (f = 0; f < n; f += 1) {
					b += " "
				}
			} else {
				if (typeof n === "string") {
					b = n
				}
			}
			h = m;
			if (m && typeof m !== "function"
					&& (typeof m !== "object" || typeof m.length !== "number")) {
				throw new Error("JSON.stringify")
			}
			return g("", {
				"" : o
			})
		}
	}
	if (typeof JSON2.parse !== "function") {
		JSON2.parse = function(o, f) {
			var n;
			function m(s, r) {
				var q, p, t = s[r];
				if (t && typeof t === "object") {
					for (q in t) {
						if (Object.prototype.hasOwnProperty.call(t, q)) {
							p = m(t, q);
							if (p !== undefined) {
								t[q] = p
							} else {
								delete t[q]
							}
						}
					}
				}
				return f.call(s, r, t)
			}
			o = String(o);
			c.lastIndex = 0;
			if (c.test(o)) {
				o = o.replace(c, function(p) {
					return "\\u"
							+ ("0000" + p.charCodeAt(0).toString(16)).slice(-4)
				})
			}
			if ((new RegExp("^[\\],:{}\\s]*$"))
					.test(o
							.replace(
									new RegExp(
											'\\\\(?:["\\\\/bfnrt]|u[0-9a-fA-F]{4})',
											"g"), "@")
							.replace(
									new RegExp(
											'"[^"\\\\\n\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?',
											"g"), "]").replace(
									new RegExp("(?:^|:|,)(?:\\s*\\[)+", "g"),
									""))) {
				n = eval("(" + o + ")");
				return typeof f === "function" ? m({
					"" : n
				}, "") : n
			}
			throw new SyntaxError("JSON.parse")
		}
	}
}());
var _paq = _paq || [], Piwik = Piwik
		|| (function() {
			var n, w = {}, d = document, j = navigator, v = screen, H = window, h = false, C = [], e = H.encodeURIComponent, I = H.decodeURIComponent, E = unescape, G, D;
			function b(i) {
				return "undefined" !== typeof i
			}
			function a(i) {
				return typeof i === "function"
			}
			function o(i) {
				return typeof i === "object"
			}
			function r(i) {
				return typeof i === "string" || i instanceof String
			}
			function z() {
				var J, L, K;
				for (J = 0; J < arguments.length; J += 1) {
					K = arguments[J];
					L = K.shift();
					if (r(L)) {
						G[L].apply(G, K)
					} else {
						L.apply(G, K)
					}
				}
			}
			function t(L, K, J, i) {
				if (L.addEventListener) {
					L.addEventListener(K, J, i);
					return true
				}
				if (L.attachEvent) {
					return L.attachEvent("on" + K, J)
				}
				L["on" + K] = J
			}
			function g(K, N) {
				var J = "", M, L;
				for (M in w) {
					if (Object.prototype.hasOwnProperty.call(w, M)) {
						L = w[M][K];
						if (a(L)) {
							J += L(N)
						}
					}
				}
				return J
			}
			function B() {
				var i;
				g("unload");
				if (n) {
					do {
						i = new Date()
					} while (i.getTimeAlias() < n)
				}
			}
			function k() {
				var J;
				if (!h) {
					h = true;
					g("load");
					for (J = 0; J < C.length; J++) {
						C[J]()
					}
				}
				return true
			}
			function x() {
				var J;
				if (d.addEventListener) {
					t(d, "DOMContentLoaded", function i() {
						d.removeEventListener("DOMContentLoaded", i, false);
						k()
					})
				} else {
					if (d.attachEvent) {
						d.attachEvent("onreadystatechange", function i() {
							if (d.readyState === "complete") {
								d.detachEvent("onreadystatechange", i);
								k()
							}
						});
						if (d.documentElement.doScroll && H === H.top) {
							(function i() {
								if (!h) {
									try {
										d.documentElement.doScroll("left")
									} catch (K) {
										setTimeout(i, 0);
										return
									}
									k()
								}
							}())
						}
					}
				}
				if ((new RegExp("WebKit")).test(j.userAgent)) {
					J = setInterval(function() {
						if (h || /loaded|complete/.test(d.readyState)) {
							clearInterval(J);
							k()
						}
					}, 10)
				}
				t(H, "load", k, false)
			}
			function f() {
				var i = "";
				try {
					i = H.top.document.referrer
				} catch (K) {
					if (H.parent) {
						try {
							i = H.parent.document.referrer
						} catch (J) {
							i = ""
						}
					}
				}
				if (i === "") {
					i = d.referrer
				}
				return i
			}
			function A(i) {
				var K = new RegExp("^([a-z]+):"), J = K.exec(i);
				return J ? J[1] : null
			}
			function y(i) {
				var K = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"), J = K
						.exec(i);
				return J ? J[1] : i
			}
			function q(K, J) {
				var N = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+)[?])([^#]+)"), M = N
						.exec(K), L = new RegExp("(?:^|&)" + J + "=([^&]*)"), i = M ? L
						.exec(M[1])
						: 0;
				return i ? I(i[1]) : ""
			}
			function s(i) {
				return E(e(i))
			}
			function u(Z) {
				var L = function(W, i) {
					return (W << i) | (W >>> (32 - i))
				}, aa = function(ag) {
					var af = "", ae, W;
					for (ae = 7; ae >= 0; ae--) {
						W = (ag >>> (ae * 4)) & 15;
						af += W.toString(16)
					}
					return af
				}, O, ac, ab, K = [], S = 1732584193, Q = 4023233417, P = 2562383102, N = 271733878, M = 3285377520, Y, X, V, U, T, ad, J, R = [];
				Z = s(Z);
				J = Z.length;
				for (ac = 0; ac < J - 3; ac += 4) {
					ab = Z.charCodeAt(ac) << 24 | Z.charCodeAt(ac + 1) << 16
							| Z.charCodeAt(ac + 2) << 8 | Z.charCodeAt(ac + 3);
					R.push(ab)
				}
				switch (J & 3) {
				case 0:
					ac = 2147483648;
					break;
				case 1:
					ac = Z.charCodeAt(J - 1) << 24 | 8388608;
					break;
				case 2:
					ac = Z.charCodeAt(J - 2) << 24 | Z.charCodeAt(J - 1) << 16
							| 32768;
					break;
				case 3:
					ac = Z.charCodeAt(J - 3) << 24 | Z.charCodeAt(J - 2) << 16
							| Z.charCodeAt(J - 1) << 8 | 128;
					break
				}
				R.push(ac);
				while ((R.length & 15) !== 14) {
					R.push(0)
				}
				R.push(J >>> 29);
				R.push((J << 3) & 4294967295);
				for (O = 0; O < R.length; O += 16) {
					for (ac = 0; ac < 16; ac++) {
						K[ac] = R[O + ac]
					}
					for (ac = 16; ac <= 79; ac++) {
						K[ac] = L(K[ac - 3] ^ K[ac - 8] ^ K[ac - 14]
								^ K[ac - 16], 1)
					}
					Y = S;
					X = Q;
					V = P;
					U = N;
					T = M;
					for (ac = 0; ac <= 19; ac++) {
						ad = (L(Y, 5) + ((X & V) | (~X & U)) + T + K[ac] + 1518500249) & 4294967295;
						T = U;
						U = V;
						V = L(X, 30);
						X = Y;
						Y = ad
					}
					for (ac = 20; ac <= 39; ac++) {
						ad = (L(Y, 5) + (X ^ V ^ U) + T + K[ac] + 1859775393) & 4294967295;
						T = U;
						U = V;
						V = L(X, 30);
						X = Y;
						Y = ad
					}
					for (ac = 40; ac <= 59; ac++) {
						ad = (L(Y, 5) + ((X & V) | (X & U) | (V & U)) + T
								+ K[ac] + 2400959708) & 4294967295;
						T = U;
						U = V;
						V = L(X, 30);
						X = Y;
						Y = ad
					}
					for (ac = 60; ac <= 79; ac++) {
						ad = (L(Y, 5) + (X ^ V ^ U) + T + K[ac] + 3395469782) & 4294967295;
						T = U;
						U = V;
						V = L(X, 30);
						X = Y;
						Y = ad
					}
					S = (S + Y) & 4294967295;
					Q = (Q + X) & 4294967295;
					P = (P + V) & 4294967295;
					N = (N + U) & 4294967295;
					M = (M + T) & 4294967295
				}
				ad = aa(S) + aa(Q) + aa(P) + aa(N) + aa(M);
				return ad.toLowerCase()
			}
			function p(K, i, J) {
				if (K === "translate.googleusercontent.com") {
					if (J === "") {
						J = i
					}
					i = q(i, "u");
					K = y(i)
				} else {
					if (K === "cc.bingj.com"
							|| K === "webcache.googleusercontent.com"
							|| K.slice(0, 5) === "74.6.") {
						i = d.links[0].href;
						K = y(i)
					}
				}
				return [ K, i, J ]
			}
			function m(J) {
				var i = J.length;
				if (J.charAt(--i) === ".") {
					J = J.slice(0, i)
				}
				if (J.slice(0, 2) === "*.") {
					J = J.slice(1)
				}
				return J
			}
			function l(J) {
				if (!r(J)) {
					J = J.text || "";
					var i = d.getElementsByTagName("title");
					if (i && b(i[0])) {
						J = i[0].text
					}
				}
				return J
			}
			function F(ad, aC) {
				var M = p(d.domain, H.location.href, f()), aV = m(M[0]), a9 = M[1], aI = M[2], aG = "GET", L = ad
						|| "", aZ = aC || "", at, aj = d.title, al = "7z|aac|ar[cj]|as[fx]|avi|bin|csv|deb|dmg|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|ms[ip]|od[bfgpst]|og[gv]|pdf|phps|png|ppt|qtm?|ra[mr]?|rpm|sea|sit|tar|t?bz2?|tgz|torrent|txt|wav|wm[av]|wpd||xls|xml|z|zip", aE = [ aV ], P = [], ax = [], ac = [], aD = 500, Q, ae, R, S, an = [
						"pk_campaign", "piwik_campaign", "utm_campaign",
						"utm_source", "utm_medium" ], ai = [ "pk_kwd",
						"piwik_kwd", "utm_term" ], a7 = "_pk_", V, a8, T = false, a2, ap, ar, aa = 63072000000, ab = 1800000, au = 15768000000, Y = d.location.protocol === "https", O = false, ay = {}, a3 = 200, aO = {}, a0 = {}, aL = false, aJ = false, aH, az, W, am = u, aK, aq;
				function aQ(bi, bf, be, bh, bd, bg) {
					if (T) {
						return
					}
					var bc;
					if (be) {
						bc = new Date();
						bc.setTime(bc.getTime() + be)
					}
					d.cookie = bi + "=" + e(bf)
							+ (be ? ";expires=" + bc.toGMTString() : "")
							+ ";path=" + (bh || "/")
							+ (bd ? ";domain=" + bd : "")
							+ (bg ? ";secure" : "")
				}
				function Z(be) {
					if (T) {
						return 0
					}
					var bc = new RegExp("(^|;)[ ]*" + be + "=([^;]*)"), bd = bc
							.exec(d.cookie);
					return bd ? I(bd[2]) : 0
				}
				function a4(bc) {
					var bd;
					if (R) {
						bd = new RegExp("#.*");
						return bc.replace(bd, "")
					}
					return bc
				}
				function aU(be, bc) {
					var bf = A(bc), bd;
					if (bf) {
						return bc
					}
					if (bc.slice(0, 1) === "/") {
						return A(be) + "://" + y(be) + bc
					}
					be = a4(be);
					if ((bd = be.indexOf("?")) >= 0) {
						be = be.slice(0, bd)
					}
					if ((bd = be.lastIndexOf("/")) !== be.length - 1) {
						be = be.slice(0, bd + 1)
					}
					return be + bc
				}
				function aF(bf) {
					var bd, bc, be;
					for (bd = 0; bd < aE.length; bd++) {
						bc = m(aE[bd].toLowerCase());
						if (bf === bc) {
							return true
						}
						if (bc.slice(0, 1) === ".") {
							if (bf === bc.slice(1)) {
								return true
							}
							be = bf.length - bc.length;
							if ((be > 0) && (bf.slice(be) === bc)) {
								return true
							}
						}
					}
					return false
				}
				function bb(bc) {
					var bd = new Image(1, 1);
					bd.onload = function() {
					};
					bd.src = L + (L.indexOf("?") < 0 ? "?" : "&") + bc
				}
				function aR(bc) {
					try {
						var be = H.XMLHttpRequest ? new H.XMLHttpRequest()
								: H.ActiveXObject ? new ActiveXObject(
										"Microsoft.XMLHTTP") : null;
						be.open("POST", L, true);
						be.onreadystatechange = function() {
							if (this.readyState === 4 && this.status !== 200) {
								bb(bc)
							}
						};
						be
								.setRequestHeader("Content-Type",
										"application/x-www-form-urlencoded; charset=UTF-8");
						be.send(bc)
					} catch (bd) {
						bb(bc)
					}
				}
				function ao(be, bd) {
					var bc = new Date();
					if (!a2) {
						if (aG === "POST") {
							aR(be)
						} else {
							bb(be)
						}
						n = bc.getTime() + bd
					}
				}
				function aP(bc) {
					return a7 + bc + "." + aZ + "." + aK
				}
				function N() {
					if (T) {
						return "0"
					}
					if (!b(j.cookieEnabled)) {
						var bc = aP("testcookie");
						aQ(bc, "1");
						return Z(bc) === "1" ? "1" : "0"
					}
					return j.cookieEnabled ? "1" : "0"
				}
				function aA() {
					aK = am((V || aV) + (a8 || "/")).slice(0, 4)
				}
				function X() {
					var bd = aP("cvar"), bc = Z(bd);
					if (bc.length) {
						bc = JSON2.parse(bc);
						if (o(bc)) {
							return bc
						}
					}
					return {}
				}
				function K() {
					if (O === false) {
						O = X()
					}
				}
				function aY() {
					var bc = new Date();
					aH = bc.getTime()
				}
				function U(bg, bd, bc, bf, be, bh) {
					aQ(aP("id"), bg + "." + bd + "." + bc + "." + bf + "." + be
							+ "." + bh, aa, a8, V, Y)
				}
				function J() {
					var bd = new Date(), bc = Math.round(bd.getTime() / 1000), bf = Z(aP("id")), be;
					if (bf) {
						be = bf.split(".");
						be.unshift("0")
					} else {
						if (!aq) {
							aq = am(
									(j.userAgent || "") + (j.platform || "")
											+ JSON2.stringify(a0) + bc).slice(
									0, 16)
						}
						be = [ "1", aq, bc, 0, bc, "", "" ]
					}
					return be
				}
				function i() {
					var bc = Z(aP("ref"));
					if (bc.length) {
						try {
							bc = JSON2.parse(bc);
							if (o(bc)) {
								return bc
							}
						} catch (bd) {
						}
					}
					return [ "", "", 0, "" ]
				}
				function ak(be, bC, bD, bg) {
					var bA, bd = new Date(), bm = Math
							.round(bd.getTime() / 1000), bF, bB, bi, bt, bx, bl, bv, bj, bz, bh = 1024, bG, bp, bw = O, br = aP("id"), bn = aP("ses"), bo = aP("ref"), bH = aP("cvar"), bu = J(), bq = Z(bn), by = i(), bE = at
							|| a9, bk, bc;
					if (T) {
						T = false;
						aQ(br, "", -86400, a8, V);
						aQ(bn, "", -86400, a8, V);
						aQ(bH, "", -86400, a8, V);
						aQ(bo, "", -86400, a8, V);
						T = true
					}
					if (a2) {
						return ""
					}
					bF = bu[0];
					bB = bu[1];
					bt = bu[2];
					bi = bu[3];
					bx = bu[4];
					bl = bu[5];
					if (!b(bu[6])) {
						bu[6] = ""
					}
					bv = bu[6];
					if (!b(bg)) {
						bg = ""
					}
					bk = by[0];
					bc = by[1];
					bj = by[2];
					bz = by[3];
					if (!bq) {
						bi++;
						bl = bx;
						if (!ar || !bk.length) {
							for (bA in an) {
								if (Object.prototype.hasOwnProperty
										.call(an, bA)) {
									bk = q(bE, an[bA]);
									if (bk.length) {
										break
									}
								}
							}
							for (bA in ai) {
								if (Object.prototype.hasOwnProperty
										.call(ai, bA)) {
									bc = q(bE, ai[bA]);
									if (bc.length) {
										break
									}
								}
							}
						}
						bG = y(aI);
						bp = bz.length ? y(bz) : "";
						if (bG.length && !aF(bG)
								&& (!ar || !bp.length || aF(bp))) {
							bz = aI
						}
						if (bz.length || bk.length) {
							bj = bm;
							by = [ bk, bc, bj, a4(bz.slice(0, bh)) ];
							aQ(bo, JSON2.stringify(by), au, a8, V, Y)
						}
					}
					be += "&idsite="
							+ aZ
							+ "&rec=1&r="
							+ String(Math.random()).slice(2, 8)
							+ "&h="
							+ bd.getHours()
							+ "&m="
							+ bd.getMinutes()
							+ "&s="
							+ bd.getSeconds()
							+ "&url="
							+ e(a4(bE))
							+ (aI.length ? "&urlref=" + e(a4(aI)) : "")
							+ "&_id="
							+ bB
							+ "&_idts="
							+ bt
							+ "&_idvc="
							+ bi
							+ "&_idn="
							+ bF
							+ (bk.length ? "&_rcn=" + e(bk) : "")
							+ (bc.length ? "&_rck=" + e(bc) : "")
							+ "&_refts="
							+ bj
							+ "&_viewts="
							+ bl
							+ (String(bv).length ? "&_ects=" + bv : "")
							+ (String(bz).length ? "&_ref="
									+ e(a4(bz.slice(0, bh))) : "");
					var bf = JSON2.stringify(ay);
					if (bf.length > 2) {
						be += "&cvar=" + e(bf)
					}
					for (bA in a0) {
						if (Object.prototype.hasOwnProperty.call(a0, bA)) {
							be += "&" + bA + "=" + a0[bA]
						}
					}
					if (bC) {
						be += "&data=" + e(JSON2.stringify(bC))
					} else {
						if (S) {
							be += "&data=" + e(JSON2.stringify(S))
						}
					}
					if (O) {
						var bs = JSON2.stringify(O);
						if (bs.length > 2) {
							be += "&_cvar=" + e(bs)
						}
						for (bA in bw) {
							if (Object.prototype.hasOwnProperty.call(bw, bA)) {
								if (O[bA][0] === "" || O[bA][1] === "") {
									delete O[bA]
								}
							}
						}
						aQ(bH, JSON2.stringify(O), ab, a8, V, Y)
					}
					U(bB, bt, bi, bm, bl, b(bg) && String(bg).length ? bg : bv);
					aQ(bn, "*", ab, a8, V, Y);
					be += g(bD);
					return be
				}
				function aT(bf, be, bj, bg, bc, bm) {
					var bh = "idgoal=0", bi, bd = new Date(), bk = [], bl;
					if (String(bf).length) {
						bh += "&ec_id=" + e(bf);
						bi = Math.round(bd.getTime() / 1000)
					}
					bh += "&revenue=" + be;
					if (String(bj).length) {
						bh += "&ec_st=" + bj
					}
					if (String(bg).length) {
						bh += "&ec_tx=" + bg
					}
					if (String(bc).length) {
						bh += "&ec_sh=" + bc
					}
					if (String(bm).length) {
						bh += "&ec_dt=" + bm
					}
					if (aO) {
						for (bl in aO) {
							if (Object.prototype.hasOwnProperty.call(aO, bl)) {
								if (!b(aO[bl][1])) {
									aO[bl][1] = ""
								}
								if (!b(aO[bl][2])) {
									aO[bl][2] = ""
								}
								if (!b(aO[bl][3])
										|| String(aO[bl][3]).length === 0) {
									aO[bl][3] = 0
								}
								if (!b(aO[bl][4])
										|| String(aO[bl][4]).length === 0) {
									aO[bl][4] = 1
								}
								bk.push(aO[bl])
							}
						}
						bh += "&ec_items=" + e(JSON2.stringify(bk))
					}
					bh = ak(bh, S, "ecommerce", bi);
					ao(bh, aD)
				}
				function aS(bc, bg, bf, be, bd, bh) {
					if (String(bc).length && b(bg)) {
						aT(bc, bg, bf, be, bd, bh)
					}
				}
				function a6(bc) {
					if (b(bc)) {
						aT("", bc, "", "", "", "")
					}
				}
				function aw(bf, bg) {
					var bc = new Date(), be = ak("action_name="
							+ e(l(bf || aj)), bg, "log");
					ao(be, aD);
					if (Q && ae && !aJ) {
						aJ = true;
						t(d, "click", aY);
						t(d, "mouseup", aY);
						t(d, "mousedown", aY);
						t(d, "mousemove", aY);
						t(d, "mousewheel", aY);
						t(H, "DOMMouseScroll", aY);
						t(H, "scroll", aY);
						t(d, "keypress", aY);
						t(d, "keydown", aY);
						t(d, "keyup", aY);
						t(H, "resize", aY);
						t(H, "focus", aY);
						t(H, "blur", aY);
						aH = bc.getTime();
						setTimeout(function bd() {
							var bh = new Date(), bi;
							if ((aH + ae) > bh.getTime()) {
								if (Q < bh.getTime()) {
									bi = ak("ping=1", bg, "ping");
									ao(bi, aD)
								}
								setTimeout(bd, ae)
							}
						}, ae)
					}
				}
				function ah(bc, bf, bd, bg) {
					var be = ak("search=" + e(bc)
							+ (bf ? "&search_cat=" + e(bf) : "")
							+ (b(bd) ? "&search_count=" + bd : ""), bg,
							"sitesearch");
					ao(be, aD)
				}
				function aB(bc, bf, be) {
					var bd = ak("idgoal=" + bc + (bf ? "&revenue=" + bf : ""),
							be, "goal");
					ao(bd, aD)
				}
				function aX(bd, bc, bf) {
					var be = ak(bc + "=" + e(a4(bd)), bf, "link");
					ao(be, aD)
				}
				function a1(bd, bc) {
					if (bd !== "") {
						return bd + bc.charAt(0).toUpperCase() + bc.slice(1)
					}
					return bc
				}
				function ag(bh) {
					var bg, bc, bf = [ "", "webkit", "ms", "moz" ], be;
					if (!ap) {
						for (bc = 0; bc < bf.length; bc++) {
							be = bf[bc];
							if (Object.prototype.hasOwnProperty.call(d, a1(be,
									"hidden"))) {
								if (d[a1(be, "visibilityState")] === "prerender") {
									bg = true
								}
								break
							}
						}
					}
					if (bg) {
						t(d, be + "visibilitychange", function bd() {
							d.removeEventListener(be + "visibilitychange", bd,
									false);
							bh()
						});
						return
					}
					bh()
				}
				function af(be, bd) {
					var bf, bc = "(^| )(piwik[_-]" + bd;
					if (be) {
						for (bf = 0; bf < be.length; bf++) {
							bc += "|" + be[bf]
						}
					}
					bc += ")( |$)";
					return new RegExp(bc)
				}
				function aW(bf, bc, bg) {
					var be = af(ax, "download"), bd = af(ac, "link"), bh = new RegExp(
							"\\.(" + al + ")([?&#]|$)", "i");
					return bd.test(bf) ? "link"
							: (be.test(bf) || bh.test(bc) ? "download"
									: (bg ? 0 : "link"))
				}
				function aN(bh) {
					var bf, bd, bc;
					while ((bf = bh.parentNode) !== null
							&& b(bf)
							&& ((bd = bh.tagName.toUpperCase()) !== "A" && bd !== "AREA")) {
						bh = bf
					}
					if (b(bh.href)) {
						var bi = bh.hostname || y(bh.href), bj = bi
								.toLowerCase(), be = bh.href.replace(bi, bj), bg = new RegExp(
								"^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):",
								"i");
						if (!bg.test(be)) {
							bc = aW(bh.className, be, aF(bj));
							if (bc) {
								be = E(be);
								aX(be, bc)
							}
						}
					}
				}
				function ba(bc) {
					var bd, be;
					bc = bc || H.event;
					bd = bc.which || bc.button;
					be = bc.target || bc.srcElement;
					if (bc.type === "click") {
						if (be) {
							aN(be)
						}
					} else {
						if (bc.type === "mousedown") {
							if ((bd === 1 || bd === 2) && be) {
								az = bd;
								W = be
							} else {
								az = W = null
							}
						} else {
							if (bc.type === "mouseup") {
								if (bd === az && be === W) {
									aN(be)
								}
								az = W = null
							}
						}
					}
				}
				function aM(bd, bc) {
					if (bc) {
						t(bd, "mouseup", ba, false);
						t(bd, "mousedown", ba, false)
					} else {
						t(bd, "click", ba, false)
					}
				}
				function av(bd) {
					if (!aL) {
						aL = true;
						var be, bc = af(P, "ignore"), bf = d.links;
						if (bf) {
							for (be = 0; be < bf.length; be++) {
								if (!bc.test(bf[be].className)) {
									aM(bf[be], bd)
								}
							}
						}
					}
				}
				function a5() {
					var bc, bd, be = {
						pdf : "application/pdf",
						qt : "video/quicktime",
						realp : "audio/x-pn-realaudio-plugin",
						wma : "application/x-mplayer2",
						dir : "application/x-director",
						fla : "application/x-shockwave-flash",
						java : "application/x-java-vm",
						gears : "application/x-googlegears",
						ag : "application/x-silverlight"
					};
					if (!((new RegExp("MSIE")).test(j.userAgent))) {
						if (j.mimeTypes && j.mimeTypes.length) {
							for (bc in be) {
								if (Object.prototype.hasOwnProperty
										.call(be, bc)) {
									bd = j.mimeTypes[be[bc]];
									a0[bc] = (bd && bd.enabledPlugin) ? "1"
											: "0"
								}
							}
						}
						if (typeof navigator.javaEnabled !== "unknown"
								&& b(j.javaEnabled) && j.javaEnabled()) {
							a0.java = "1"
						}
						if (a(H.GearsFactory)) {
							a0.gears = "1"
						}
						a0.cookie = N()
					}
					a0.res = v.width + "x" + v.height
				}
				a5();
				aA();
				return {
					getVisitorId : function() {
						return (J())[1]
					},
					getVisitorInfo : function() {
						return J()
					},
					getAttributionInfo : function() {
						return i()
					},
					getAttributionCampaignName : function() {
						return i()[0]
					},
					getAttributionCampaignKeyword : function() {
						return i()[1]
					},
					getAttributionReferrerTimestamp : function() {
						return i()[2]
					},
					getAttributionReferrerUrl : function() {
						return i()[3]
					},
					setTrackerUrl : function(bc) {
						L = bc
					},
					setSiteId : function(bc) {
						aZ = bc
					},
					setCustomData : function(bc, bd) {
						if (o(bc)) {
							S = bc
						} else {
							if (!S) {
								S = []
							}
							S[bc] = bd
						}
					},
					getCustomData : function() {
						return S
					},
					setCustomVariable : function(bd, bc, bg, be) {
						var bf;
						if (!b(be)) {
							be = "visit"
						}
						if (bd > 0) {
							bc = b(bc) && !r(bc) ? String(bc) : bc;
							bg = b(bg) && !r(bg) ? String(bg) : bg;
							bf = [ bc.slice(0, a3), bg.slice(0, a3) ];
							if (be === "visit" || be === 2) {
								K();
								O[bd] = bf
							} else {
								if (be === "page" || be === 3) {
									ay[bd] = bf
								}
							}
						}
					},
					getCustomVariable : function(bd, be) {
						var bc;
						if (!b(be)) {
							be = "visit"
						}
						if (be === "page" || be === 3) {
							bc = ay[bd]
						} else {
							if (be === "visit" || be === 2) {
								K();
								bc = O[bd]
							}
						}
						if (!b(bc) || (bc && bc[0] === "")) {
							return false
						}
						return bc
					},
					deleteCustomVariable : function(bc, bd) {
						if (this.getCustomVariable(bc, bd)) {
							this.setCustomVariable(bc, "", "", bd)
						}
					},
					setLinkTrackingTimer : function(bc) {
						aD = bc
					},
					setDownloadExtensions : function(bc) {
						al = bc
					},
					addDownloadExtensions : function(bc) {
						al += "|" + bc
					},
					setDomains : function(bc) {
						aE = r(bc) ? [ bc ] : bc;
						aE.push(aV)
					},
					setIgnoreClasses : function(bc) {
						P = r(bc) ? [ bc ] : bc
					},
					setRequestMethod : function(bc) {
						aG = bc || "GET"
					},
					setReferrerUrl : function(bc) {
						aI = bc
					},
					setCustomUrl : function(bc) {
						at = aU(a9, bc)
					},
					setDocumentTitle : function(bc) {
						aj = bc
					},
					setDownloadClasses : function(bc) {
						ax = r(bc) ? [ bc ] : bc
					},
					setLinkClasses : function(bc) {
						ac = r(bc) ? [ bc ] : bc
					},
					setCampaignNameKey : function(bc) {
						an = r(bc) ? [ bc ] : bc
					},
					setCampaignKeywordKey : function(bc) {
						ai = r(bc) ? [ bc ] : bc
					},
					discardHashTag : function(bc) {
						R = bc
					},
					setCookieNamePrefix : function(bc) {
						a7 = bc;
						O = X()
					},
					setCookieDomain : function(bc) {
						V = m(bc);
						aA()
					},
					setCookiePath : function(bc) {
						a8 = bc;
						aA()
					},
					setVisitorCookieTimeout : function(bc) {
						aa = bc * 1000
					},
					setSessionCookieTimeout : function(bc) {
						ab = bc * 1000
					},
					setReferralCookieTimeout : function(bc) {
						au = bc * 1000
					},
					setConversionAttributionFirstReferrer : function(bc) {
						ar = bc
					},
					disableCookies : function() {
						T = true;
						a0.cookie = "0"
					},
					setDoNotTrack : function(bd) {
						var bc = j.doNotTrack || j.msDoNotTrack;
						a2 = bd && (bc === "yes" || bc === "1");
						if (a2) {
							this.disableCookies()
						}
					},
					addListener : function(bd, bc) {
						aM(bd, bc)
					},
					enableLinkTracking : function(bc) {
						if (h) {
							av(bc)
						} else {
							C.push(function() {
								av(bc)
							})
						}
					},
					setHeartBeatTimer : function(be, bd) {
						var bc = new Date();
						Q = bc.getTime() + be * 1000;
						ae = bd * 1000
					},
					killFrame : function() {
						if (H.location !== H.top.location) {
							H.top.location = H.location
						}
					},
					redirectFile : function(bc) {
						if (H.location.protocol === "file:") {
							H.location = bc
						}
					},
					setCountPreRendered : function(bc) {
						ap = bc
					},
					trackGoal : function(bc, be, bd) {
						ag(function() {
							aB(bc, be, bd)
						})
					},
					trackLink : function(bd, bc, be) {
						ag(function() {
							aX(bd, bc, be)
						})
					},
					trackPageView : function(bc, bd) {
						ag(function() {
							aw(bc, bd)
						})
					},
					trackSiteSearch : function(bc, be, bd) {
						ag(function() {
							ah(bc, be, bd)
						})
					},
					setEcommerceView : function(bf, bc, be, bd) {
						if (!b(be) || !be.length) {
							be = ""
						} else {
							if (be instanceof Array) {
								be = JSON2.stringify(be)
							}
						}
						ay[5] = [ "_pkc", be ];
						if (b(bd) && String(bd).length) {
							ay[2] = [ "_pkp", bd ]
						}
						if ((!b(bf) || !bf.length) && (!b(bc) || !bc.length)) {
							return

						}
						if (b(bf) && bf.length) {
							ay[3] = [ "_pks", bf ]
						}
						if (!b(bc) || !bc.length) {
							bc = ""
						}
						ay[4] = [ "_pkn", bc ]
					},
					addEcommerceItem : function(bg, bc, be, bd, bf) {
						if (bg.length) {
							aO[bg] = [ bg, bc, be, bd, bf ]
						}
					},
					trackEcommerceOrder : function(bc, bg, bf, be, bd, bh) {
						aS(bc, bg, bf, be, bd, bh)
					},
					trackEcommerceCartUpdate : function(bc) {
						a6(bc)
					}
				}
			}
			function c() {
				return {
					push : z
				}
			}
			t(H, "beforeunload", B, false);
			x();
			Date.prototype.getTimeAlias = Date.prototype.getTime;
			G = new F();
			for (D = 0; D < _paq.length; D++) {
				z(_paq[D])
			}
			_paq = new c();
			return {
				addPlugin : function(i, J) {
					w[i] = J
				},
				getTracker : function(i, J) {
					return new F(i, J)
				},
				getAsyncTracker : function() {
					return G
				}
			}
		}()), piwik_track, piwik_log = function(b, f, d, g) {
	function a(h) {
		try {
			return eval("piwik_" + h)
		} catch (i) {
		}
		return
	}
	var c, e = Piwik.getTracker(d, f);
	e.setDocumentTitle(b);
	e.setCustomData(g);
	c = a("tracker_pause");
	if (c) {
		e.setLinkTrackingTimer(c)
	}
	c = a("download_extensions");
	if (c) {
		e.setDownloadExtensions(c)
	}
	c = a("hosts_alias");
	if (c) {
		e.setDomains(c)
	}
	c = a("ignore_classes");
	if (c) {
		e.setIgnoreClasses(c)
	}
	e.trackPageView();
	if (a("install_tracker")) {
		piwik_track = function(i, k, j, h) {
			e.setSiteId(k);
			e.setTrackerUrl(j);
			e.trackLink(i, h)
		};
		e.enableLinkTracking()
	}
};