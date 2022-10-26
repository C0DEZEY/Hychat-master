
//createing text boxes 
const messages = document.querySelector('#messages');
    const messageBox = document.querySelector('#messageBox');
// Show the message sent 
    function showMessage(message) {
      messages.textContent += `\n\n${message}`;
      messages.scrollTop = messages.scrollHeight;
      messageBox.value = '';
    }
    const socket = new WebSocket('wss://localhost:8080');
    socket.addEventListener('open', function (event) {
        console.log('Connected to WS Server')
    });



    socket.onmessage = event => {
        showMessage(event.data)
    }

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });



    const sendMessageAcc = () => {
        sent = document.getElementById("input2").value;
           socket.send("&c[Announcement] &r" + ": " + sent);
           showMessage("[Announcement] " + ": " + sent)
       
   }

    const sendMessage = () => {
         username = document.getElementById("username").value;
         sent = document.getElementById("input").value;

        socket.send("[DEV] " + username + ": " + sent);
        showMessage("[WEB] " +username + ": " + sent)
    }
    document.querySelector('#myButton').addEventListener('click', function(event) {
  event.preventDefault();
});
document.querySelector('#myButton2').addEventListener('click', function(event) {
    event.preventDefault();
  });