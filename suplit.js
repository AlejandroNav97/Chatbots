const TelegramBot = require('node-telegram-bot-api');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
var DeviceClient = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;
const express = require("express");

var temperature = "";
var humidity = "";
var persons = "";

const token = '850600110:AAHo-UCi-fsyBTsX_DhC5d6swFoIrtD1VI8';
const bot = new TelegramBot(token, {polling: true});

const app = express();

var connectionString = '{Your device connection string here}';

var IdMiChat = 741463923;
const MiPuerto = new SerialPort('/dev/cu.usbmodem14201', {
  baudRate: 9600,
  //autoOpen: true,
  
  
});

const parser = MiPuerto.pipe(new Readline({delimiter: '\r\n'}));



// REST API AZURE

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/PowerOn', function (req, res) {
    console.log("encendiendo el led");
    bot.sendMessage(IdMiChat, "ESTATUS: On");
    MiPuerto.write("H");
    res.send('POWER ON!');
});
app.get('/PowerOff', function (req, res) {
    bot.sendMessage(IdMiChat, "ESTATUS: Off");
    console.log("apagando el led");
    MiPuerto.write("L");
    res.send('POWER OFF!');
});
app.get('/Temperature', function (req, res) {
  MiPuerto.write("T");
  console.log("Mostrando temperatura");
  res.send(temperature +' ºC');
  bot.sendMessage(IdMiChat, temperature +' ºC');
});
app.get('/Humidity', function (req, res) {
  MiPuerto.write("T");
  console.log("Mostrando humedad");
  res.send(humidity +' %');
  bot.sendMessage(IdMiChat, humidity +' %');
});
app.get('/People', function (req, res) {
  MiPuerto.write("T");
  console.log("Mostrando personas");
  res.send('Personas que han ingresado: ' +persons);
  bot.sendMessage(IdMiChat, 'Personas que han ingresado: ' +persons);
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});






//BOT TELEGRAM CONNECTION ARDUINO

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  var Mensaje = msg.text;
  
  if (Mensaje == "Temperature"){
    //MiPuerto.write("T");
    console.log("Showing Temperature");
    bot.sendMessage(chatId, temperature +' ºC');
  } else if (Mensaje == "PowerOn") {
    console.log("encendiendo el led");
    bot.sendMessage(chatId, 'Se encendió el LED');
    MiPuerto.write("H");
  } else if (Mensaje == "PowerOff") {
    console.log("apagar el led");
    bot.sendMessage(chatId, 'Se apagó el LED');
    MiPuerto.write("L");
  } 
  else if (Mensaje == "Humidity"){
    console.log("Showing humidity");
    bot.sendMessage(chatId, humidity +' %');
    

  }

  else if (Mensaje == "People"){
    console.log("Personas");
    bot.sendMessage(chatId, 'Personas que han ingresado: ' +persons);
    MiPuerto.write("P");

  }

  
});








//SERIAL PORT ARDUINO

MiPuerto.setEncoding('utf8');
var cont = 0;
parser.on('data', function(data) {

  var info = data.split(":"); //[temperatura, humedad]
  // console.log(data);
  temperature = info[0];
  humidity = info[1];
  persons = info[2];

  // humidity = data[1];

  // console.log(data);

console.log(data.toString());

  // if(cont < 2){
  //   //var info = data.split(":"); //[temperatura, humedad]
  //   temperature += data;
    
  //   cont++;
  // }else {
  //   temperature = data;
    
  //   cont = 3;
  // }

  // if(cont < 2  ){
  //   //var info = data.split(":"); //[temperatura, humedad]
  //   temperature += data;
    
  //   cont++;
  // }else {
  //   temperature = data;
    
  //   cont = 1;
  // }

  

  });

//}), 100);


  // if(data[0]=='2' && cont < 2){

  //   temperature += data;
  //   cont++;

  // } else{ temperature = data;
  //   cont = 1;
  
  // }

  // if(data[5]=='5' && cont <2){

  //   humidity += data;
  //   cont++;}
  //   else{ humidity = data;
  //   cont = 1}
  

  // if (isNaN(data)==false){

  //   temperature = data[0,4];

  // }
  
