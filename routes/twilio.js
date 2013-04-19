//require the Twilio module and create a REST client
var config = require('../config.js').config
,   twilio = require('twilio')(config.twilio.accountSSID, config.twilio.authToken)
,   twilRes = require('../exports/twilRes').twilioResponseParser
,   Call = require('../models/call')
,   EventEmitter = require("events").EventEmitter
,   pubnub = require('pubnub').init({
    publish_key   : config.pubNub.pubKey,
    subscribe_key : config.pubNub.subKey
});

exports.sendSMS = function(req, res) {
  //Send an SMS text message
  twilio.sendSms({
    to: '+' + req.params.number,
    from: config.twilio.fromNumber,
    body: req.params.text
  }, function(err, responseData) {
    var twRes = twilRes(err, responseData);
    res.json(twRes,twRes.status);
  });
};

exports.listSMS = function(req,res){
  //Loop through a list of SMS messages sent from a given number
  twilio.listSms({
    from:'+' + req.params.number,
  }, function (err, responseData) {
    var twRes = twilRes(err, responseData);
    res.json(twRes,twRes.status);
  });
};

exports.makeCall = function(req,res){
  //Place a phone call, and respond with TwiML instructions from the given URL
  twilio.makeCall({
    to: '+' + req.params.number,
    from: config.twilio.fromNumber,
    url: config.twilio.makeCallURL,
    StatusCallback: config.twilio.statusCallbackURL,
    IfMachine: config.twilio.ifMachine
    
  }, function(err, responseData) {
    var twRes = twilRes(err, responseData);
    res.json(twRes,twRes.status);
  });
    
};

exports.getCall = function(req,res){
  twilio.getCall(req.params.sid, function(err, response){
    var twRes = twilRes(err, response);
    res.json(twRes,twRes.status);
  });
};

exports.listCalls = function(req,res){
  //Get a list of calls made by this account
  // GET /2010-04-01/Accounts/ACCOUNT_SID/Calls
  // alias for get is "list", if you prefer
  twilio.calls.get(function(err, response) {
    var twRes = twilRes(err, response);
    res.json(twRes,twRes.status);
  });
};

exports.listCallsFrom = function(req,res){
  twilio.calls.get({
    from:'+' + req.params.number
  }, function(err, response) {
    var twRes = twilRes(err, response);
    res.json(twRes,twRes.status);
  });
};

exports.twilioAction = function(req,res){
//  console.log(req.body.Digits);
////When call compeltes it still hits the action
////url with no response
//  console.log("From Action URL".red);
//  console.log(JSON.stringify(req.body,null,2));

  var notification = {};
  res.header('Content-Type', 'application/xml');

  if (req.body.Digits == '1') {
    // Render action 1.xml
    res.render('twiml/resAction/1');
    notification = req.body;
    //-------------------------------
  }else if(req.body.Digits == '2') {
    // Render action 2.xml
    res.render('twiml/resAction/2');
    notification = req.body;
    //-------------------------------
  }else if(req.body.Digits == '3') {
    // Render action 3.xml
    res.render('twiml/resAction/3');
    notification = req.body;
    //-------------------------------
  }else if(req.query.timeout == "true"){
    // Render action default.xml
    res.render('twiml/resAction/timeOut');
    notification = req.body;
  }
  
  pubnub.publish({
    channel : config.pubNub.channel,
    message : notification
  });
  
};

//Catch a post request containing a Call Object
exports.callStatus = function(req,res){
//    console.log(req.body);
//  Check if twilio is making post Req
//  console.log(req.headers);
  if(req.headers["user-agent"] == 'TwilioProxy/1.1'){
    // Create New Call to be saved
    var call = new Call(req.body);
    call.save(function (err) {
      if (!err){
        res.json({message:"saved call"});
      }else{
        console.warn(err);
      }
    });
  }else{
    res.json({message:"UnAuthorized Access to this uri"},401);
  }
};


exports.multiCall = function(req,res){
  var regExp = /^((\d{11}),){1,}(\d{11})$/
  ,   test = false;

  if (req.query.numbers) {
    test = regExp.test(req.query.numbers);
  }
  console.log(req.query.numbers);
  if(test){
    // Split numbers into an array
    // assinging them to a queue
    
    var queue = req.query.numbers.split(',')
    ,   call = new EventEmitter()
    ,   completed_calls = [];
    
    // For each number in the queue
    // initilize a new phonecall with twilio
    queue.forEach(function(number){
      twilio.makeCall({
        to: '+'+number,
        from: config.twilio.fromNumber,
        url: config.twilio.makeCallURL,
        StatusCallback: config.twilio.statusCallbackURL,
        IfMachine: confif.twilio.ifMachine
      }, function(err, responseData) {
        var twRes = twilRes(err, responseData);
        call.emit('completed', twRes);
      });
    });
    
    //Listen for the call.completed event
    call.on('completed', function(twRes){
      // push the twilio response into the
      // completed_calls array
      completed_calls.push(twRes);  
      // check if all the calls have been completed
      // and stored in the completed calls variable
      // if they have then responde to the request
      if(completed_calls.length == queue.length){
        res.json(completed_calls);  
      }
    });
  }else{
    var error={
      status:400,
      message:"Bad Request - Often missing a required parameter."
    };
    res.json(error,error.status);
  }
};


//Check dial status
exports.dialStatus = function(req,res){
  switch (req.query.DialStatus) {
    case "no-answer":
      console.log("mark Notavailable");
      break;
    case "busy":
      console.log("busy maybe redial");
      break;
    case "answered":
      console.log("mark Answered start machine");
      break;
    case "failed":
      console.log("mark Notavailable and number as failed");
      break;
    default:
      console.log("some crazy response");
  }
};