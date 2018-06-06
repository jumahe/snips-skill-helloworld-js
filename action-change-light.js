#! /usr/bin/env node

var mqtt = require('mqtt')
var gpio = require('rpi-gpio')
var gpiop = gpio.promise;

var client  = mqtt.connect('mqtt://localhost:1883')
var request = require('request');

client.on('connect', function ()
{
  client.subscribe('hermes/intent/jumahe:change-light')
})

var callback_hello = function()
{
	console.log("*****\ngot it!");
  gpiop.setup(14, gpio.DIR_OUT)
    .then(() => {
        return gpiop.write(14, true)
    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })
}

var lastIntentDetails;
client.on('message', function (topic, message)
{
  // message is Buffer
  console.log(topic)
  let intentDetails = JSON.parse(message.toString());
  console.log(intentDetails);
  lastIntentDetails = intentDetails;

  switch(topic)
  {
	   case "hermes/intent/jumahe:change-light":
        callback_hello();
		    break;
  }
})
