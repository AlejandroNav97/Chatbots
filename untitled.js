const TelegramBot = require('node-telegram-bot-api');

const token = '850600110:AAHo-UCi-fsyBTsX_DhC5d6swFoIrtD1VI8';//Cambiar por el token de telegram
const bot = new TelegramBot(token, {
  polling: true
});
var IdMiChat = 744798488;//cambiar por tu ID del chat

var SerialPort = require('serialport');
var MiPuerto = new SerialPort('/dev/cu.usbmodem14201', {
  baudRate: 9600,
  autoOpen: true
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log("El ID del chat es " + chatId);
  var Mensaje = msg.text;
  if (Mensaje == "Encender") {
    console.log("Encendiendo el LED");
    bot.sendMessage(chatId, 'Se encendió el LED');
    MiPuerto.write("H");
  } else if (Mensaje == "Apagar") {
    console.log("Apagando el LED");
    bot.sendMessage(chatId, 'Se apagó el LED');
    MiPuerto.write("L");
  }
});

MiPuerto.setEncoding('utf8');

MiPuerto.on('data', function(data) {
  console.log("Lo que entró es " + data);
  if (data[0] == 'H') {
    console.log("Boton Presionado");
    bot.sendMessage(IdMiChat, "Se presionó el boton");
  }
});