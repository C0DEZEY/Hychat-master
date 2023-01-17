var fetch = require("node-fetch")
const express = require('express')
const app2 = express()
const server = require('http').createServer(app2);
const WebSocket = require('ws');
const fs = require('fs')
const wss = new WebSocket.Server({
    server: server
});

let data = "null"
let dataToken
let token = false
let tokenIsInValid 
let usedtoken
let ListOFusedTokens
let tokenIsValid = false
// On the client connectin
wss.on('connection', function connection(ws) {
    console.log('A new client Connected!');
    ws.on('message', function incoming(message) {
        console.log(message)

// Scan the token

 if (message.includes("[TOKENSCAN]")) {
    // Define Vars 
clear = message.replace("[TOKENSCAN]", "")
removespaces = clear.replace(" ", '')

            // Reading the File "Tokens" 
            fs.readFile('tokens.json', 'utf8', (err, data) => {
                usedtoken = removespaces
                let dataToken = JSON.parse(data);         
                if (err) {
                    console.error(err);
                    return;
                }

                // Read file Data of used tokens 
           fs.readFile('875t67yguhi987uy.json', 'utf8', (err, data) => {
                ListOFusedTokens = JSON.parse(data)
                if (err) {
                    console.error(err);
                    return;
                }

// Checking if the "Input" Doesnt contain a Token

dataToken.forEach(token => {
    if (token === removespaces) {
        tokenIsValid = true;
    }
});
ListOFusedTokens.forEach(token => {
    if (token === removespaces) {
        tokenIsInValid = true;
    }
});
  if (!tokenIsValid) {
    try {

     ws.send("[Token Error] invalid token if this is a mistake try again later or contacts admins.")
     token = false
     console.log(token + " stage 1")
    } 
    catch(err) {
        console.log(e)
    }

  } else { 
    // If there is no token we go onto the second stage of scanning 
    // Gets the list of usedd tokens and scans for that data. 
    if (tokenIsInValid) {
        console.log("Not a vaild token")
        token = false
        console.log(token + "False stage 2" + removespaces)
        ws.send("[Token Error] Token has been used before sorry! contacts admins if this is a mistake")
    } else {
        // If they pass both checks then we will send the correct token data.
    console.log("Token is safe.")
    ws.send("[Token] Correct token!")

    token = true
    console.log(token + " Passed")
    }
  }

 })
});

console.log("Passed all check: sec: 1, Creating users account! Current Token sate = " + token)

    }
}) 
 // On a messsage even 
ws.on('message', function incoming(message) {
    // Check if it contains new user
if (message.includes("[NEWUSER]")) {
                // if the token is vaild then run ... 
            if (token = true) {
                let user = message.replace("[NEWUSER]", "")
                let u = user.replace(" ", "")
                console.log(" U=" +u )
                getstats()
                async function getstats() {
                    console.log("Gathering player data")
                    try {
                    let api = await fetch(`https://api.slothpixel.me/api/players/${u}`)
                    api = await api.json();
                    let id = api.uuid
                    console.log(id)
                    let uuid = id
                    let logs = fs.readFileSync("usernames.txt")
                    if (uuid != undefined && uuid != "[object Object]" && !logs.includes(user) && token && !logs.includes(removespaces = data)) {
                        ws.send("Welcome" + user + " To Hypixel plus to add more accounts please goto our discord server and open a support ticket please do note we have a log of each account use")
                        fs.appendFile('usernames.txt', user + " (Accounts: 4/5) " + " UUID: " + id + "\n", function(err) {
                            if (err) throw err + "Error writeing account data";
                            console.log('Saved!');

                        });
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();

                        today = mm + '/' + dd + '/' + yyyy;

                        fs.appendFile('logs.txt', user + " Created an account at " + today + " at " + new Date().toLocaleTimeString() + " With the token: " + usedtoken + "\n", function(err) {
                            if (err) throw err + " Error appening file logs";
                            console.log('Saved!');
                        });

fs.readFile('./875t67yguhi987uy.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        let jsonData = JSON.parse(data);
        jsonData.push(usedtoken);
        fs.writeFile('./875t67yguhi987uy.json', JSON.stringify(jsonData), (err) => {
            if (err) throw err;
            console.log('The token has been added to the list!');
        });
    }
});



                    } else {
                        try {
                        ws.send("[UUID] Not a player OR player has created an account already!")
                         ws.send("[UUID] please make sure that you have entered the correct username and details, if this is a mistae on our end we willl be fixing this problem shortly we are now saving the error to our server and notfiing staff members if this issuse still precistest contact admins and they will guide you futher.")
                        } 
                        catch(err) {
                            console.log("Error sending message to websocket")
                        }
                    }
                    }
                
catch(err) {
    console.log( "Error saving file data. "+err)
}
                
                }
            

            }
        
        } 
 });
}); //ws connection 






var date = new Date();




app2.get('/', (req, res) => res.send('Powered by the lofi gen'))

server.listen(8080, () => console.log(`Lisening on port :8080`))