/* setup websocket and callback for received message */
var ws = new WebSocket("wss://connor-brooks.com:8765/");

/* new message callback */
ws.onmessage = function (event) {
	recMessage(event.data)
};

/* Close connection when window closed */
window.onbeforeunload = function() {
	ws.onclose = function () {};
	ws.close();
};

function sendMessage() {
	/* Grab values */
	var key = document.getElementById("keyTextbox").value;
	var username = document.getElementById("usernameTextbox").value;
	var message = document.getElementById("messageBox").value;
	var toSend = "";
	var encrypted = "";

	/* Ignore blank messages */
	if(message == "") return;

	/* Prevent blank key */
	if(key == "") {
		logMessageToList("Client: Please set a custom encryption key to chat");
		return;
	}

	/* Prevent blank username */
	if(username == "" ) {
		logMessageToList("Client: Please set a custom username to chat");
		return;
	}

	/* Encrypt and send message to server */
	toSend = username + ": " + message;
	encrypted = encryptMessage(toSend, key);
	ws.send(encrypted);

	/* Clear textbox */
	document.getElementById("messageBox").value = "";
}

function encryptMessage(message, key) {
	encrypted = CryptoJS.AES.encrypt(message, key);
	return encrypted;
}

function decryptMessage(message, key) {
	var decrypted = CryptoJS.AES.decrypt(message, key);
	decrypted = decrypted.toString(CryptoJS.enc.Utf8);
	/* If message can't be decrypted, warn user */
	if(decrypted == "") {
		decrypted = "Client: A plaintext or non-decryptable message has been received (See raw message bar)"
	}
	return decrypted;
}

function recMessage(message) {
	/* Update raw data box */
	document.getElementById("rawData").textContent = message;

	/* Attempt to decrypt message */
	var key = document.getElementById("keyTextbox").value;
	var decrypted = decryptMessage(message, key);

	/* Add to message list */
	logMessageToList(decrypted);
}

function logMessageToList(message) {
	/* Create new list item, fill with message, append to message list */
	var messageList = document.getElementById("messages");
	var newMessage = document.createElement('li');
	var content = document.createTextNode(message);

	newMessage.appendChild(content);
	messageList.appendChild(newMessage);
}

function inputReturnHit() {
	if (event.keyCode == 13 && !event.shiftKey) {
		// Prevent newline being entered to textarea
		if(event.preventDefault) event.preventDefault();
		sendMessage();
		return false;
	}
}

/* Initally set the height to be based off window's inner height,
   for better fullscreen on mobile*/
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

/* If window is resized, updated the height variable */
window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});
