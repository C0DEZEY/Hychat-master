var crypto = require('crypto'),
	fs = require('fs');

var Encrypt = {};

Encrypt.encryptFile = function(input, output, key, options, cb){

	var algorithm;

	if(typeof options === 'function'){
		cb = options;
		algorithm = 'aes192';
	}
	else{
		algorithm = options;
	}

	var inputStream = fs.createReadStream(input);
	var outputStream  = fs.createWriteStream(output);

	var cipher = crypto.createCipher(algorithm, key);

	inputStream.pipe(cipher).pipe(outputStream);

	inputStream.on('finish', function(){
		inputStream.close();
	});

	outputStream.on('finish', function(){
		outputStream.close();
		cb();
	});

	process.on('uncaughtException', function(err){
		cb(err.message);
	});
};

Encrypt.decryptFile = function(input, output, key, options, cb){
	
	var algorithm;

	if(typeof options === 'function'){
		cb = options;
		algorithm = 'aes192';
	}
	else{
		algorithm = options;
	}
	
	var inputStream = fs.createReadStream(input);
	var outputStream  = fs.createWriteStream(output);

	var cipher = crypto.createDecipher(algorithm, key);

	inputStream.pipe(cipher).pipe(outputStream);

	inputStream.on('finish', function(){
		inputStream.close();
	});

	outputStream.on('finish', function(){
		outputStream.close();
		cb();
	});

	process.on('uncaughtException', function(err){
		cb(err.message);
	});
	
};

Encrypt.getCiphers = function(cb){
	var ciphers = crypto.getCiphers();
	cb(ciphers);
};

module.exports = Encrypt;


