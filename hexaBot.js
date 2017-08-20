// Jimp is used to create the image that gets posted
var Jimp = require("jimp");

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const fs = require("fs");
// I am reading it from a JSON so I do not need to add/remove it evertime I push updates
const token = JSON.parse(fs.readFileSync("discordAppToken.json", "utf8"));;

// Filename for the image that is posted, it gets overwritten everytime
//	the bot is triggered
const imageFilename = 'colour.png';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () =>
{
	console.log('I am ready!');
});

function hex2dec(hex)
{
	return parseInt(hex, 16);
}

function makeImage(hex)
{
	var r = hex2dec(hex.substr(0,2));
	var g = hex2dec(hex.substr(2,2));
	var b = hex2dec(hex.substr(4,2));
	var a;
	if (hex.length == 8)
	{
		a = hex2dec(hex.substr(6,2));
	}
	else
	{
		a = 255;
	}
	var pixelVal = Jimp.rgbaToInt(r, g, b, a);
	var image = new Jimp(256, 256, pixelVal).write(imageFilename); // save
}

// Create an event listener for messages
client.on('message', message =>
{
	if (message.author.username != "HexaPicture")
	{
		// If the message reads a hexadecimal code
		if (message.content.match((/([0-9A-F]{8})|([0-9A-F]{6})/ig)))
		{
			// Send the user's avatar URL
			var hex = message.content.match(/([0-9A-F]{8})|([0-9A-F]{6})/ig)[0];
			makeImage(hex);
			message.channel.send("0x".concat(message.content.match(
				(/([0-9A-F]{8})|([0-9A-F]{6})/ig))));
		}
	}
	else if (message.content.match((/([0-9A-F]{8})|([0-9A-F]{6})/ig)) && message.author.username == "HexaPicture")
	{
		message.channel.send("",{file: imageFilename});
	}
});

// Log our bot in
client.login(token);
