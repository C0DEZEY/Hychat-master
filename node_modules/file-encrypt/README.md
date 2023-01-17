# file-encrypt
Simple module for encrypting and decrypting files.

### Installation
npm install file-encrypt

### Usage
```javascript
var encrypt = require('file-encrypt');
```
```javascript
var input = 'D:/in/input.txt';
var output = 'D:/out/output.txt';
var key = 'Your secret key for encryption and decryption';

encrypt.encryptFile(input, output, key, function(err){
	if(err){
		console.log("Something went wrong", err);
	}
	else{
		console.log("Successfully encrypted");
	}
})
```

```javascript
var input = 'D:/in/input.txt'; //encrypted file
var output = 'D:/out/output.txt';
var key = 'Your secret key for encryption and decryption';

encrypt.decryptFile(input, output, key, function(err){
	if(err){
		console.log("Something went wrong", err);
	}
	else{
		console.log("Successfully decrypted");
	}
});
```
Deafult cipher used for encryption and decryption
```javascript
aes192
````
But you can change this sending an another parameter 
```javascript
var input = 'D:/in/input.txt';
var output = 'D:/out/output.txt';
var key = 'Your secret key for encryption and decryption';

encrypt.encryptFile(input, output, key, 'aes-256-gcm' function(err){
	if(err){
		console.log("Something went wrong", err);
	}
	else{
		console.log("Successfully encrypted");
	}
});
```
If you want the list of ciphers available use
````javascript
encrypt.getCiphers(function(ciphers){
	console.log(ciphers) // Array of ciphers
});
````
