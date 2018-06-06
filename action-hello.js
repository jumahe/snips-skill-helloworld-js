#! /usr/bin/env node

var mqtt = require('mqtt')

var client  = mqtt.connect('mqtt://localhost:1883')

var request = require('request');

client.on('connect', function () {
  client.subscribe('hermes/intent/jumahe:hello')
})


var callback_hello = function(){
	console.log("*****\nhello");
}

var lastIntentDetails;

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic)
  let intentDetails = JSON.parse(message.toString());
  console.log(intentDetails);
  lastIntentDetails = intentDetails;

  switch(topic){
	case "hermes/intent/jumahe:hello":
    	callback_hello();
		break;
  }

})
