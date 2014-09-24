importScripts("/js/pajhome_md5.js");
importScripts("/js/crypto.js");
self.h2 = [ 1732584193, -271733879, -1732584194, 271733878 ];
onmessage = function(b) {
	var f = b.data.dat;
	var i = b.data.size;
	var k = b.data.begin;
	var h = b.data.end;
	var e = b.data.L1;
	var d = b.data.L2;
	var c = b.data.L3;
	var l = "";
	var j = f.byteLength;
	var a;
	if (j < 1024 * 1024) {
		a = new Uint8Array(e);
		a.set(new Uint8Array(f), 0);
		a[j] = 128;
		a = new Uint32Array(a.buffer);
		a[a.length - 1] = d;
		a[a.length - 2] = c
	} else {
		a = new Uint32Array(f)
	}
	self.h2 = binl_md52(a, self.h2);
	if (h == i) {
		l = Crypto.util.bytesToHex(Crypto.util.wordsToBytes(Crypto.util
				.endian(self.h2)))
	} else {
		var g = h / i;
		l = g
	}
	var m;
	m = {
		showPercent : 0,
		result : l
	};
	self.postMessage(m)
};