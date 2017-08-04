function packgeMac(head,body){
	//获取JSON
	var pararme = {
		head: head,
		body: body
	};

	//获取JSON字符串
	var pararmes = JSON.stringify(pararme);
	
	//packgeMac加密
	var packgeMac = md5(pararmes).toUpperCase();
	head["packgeMac"] = packgeMac;
	pararmes = JSON.stringify(pararme);
	
	function encrypt(text) {
		var key = '6A5C9F18148340FF';
		key = CryptoJS.enc.Utf8.parse(key);
		var iv = "0102030405060708";
		iv = CryptoJS.enc.Utf8.parse(iv);
		var encrypted = CryptoJS.AES.encrypt(text, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		var decryptedStr = encrypted.ciphertext.toString();
		return decryptedStr
	}
	
	var mydata = {
		paramsStr: encrypt(pararmes)
	};
	
	return mydata;
}

