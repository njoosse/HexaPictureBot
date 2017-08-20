# HexaPictureBot

This is a bot for Discord (https://discordapp.com/) that will add an image of any 6-character hexadecimal code that is sent in chat, this image is saved in the same folder as the bot when it is created, it gets overwritten every time the bot reads a new hexadecimal code.

It is currently set to read the channel from a discordAppToken.json file in the same directory as the hexaBot.js file, this can be changed to a string of the token, it is mainly for testing and posting at this time.

## Requires:
* Discord JS (discord.js)
* JIMP (https://github.com/oliver-moran/jimp)

### To-do
* Change the way that it displays the images to support multiple hex codes in a single message.
