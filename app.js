/**
 * ERS-Emergency-Response-System initilization.
 */

var express = require('express')
,   config = require('./config.js').config
,   url = require('url')
,   rtg = url.parse(config.redisToGoURL)
,   rtg_pass = rtg.auth.split(":")[1]
// ,   redis   = require("redis")
// ,   redisClient = redis.createClient(rtg.port, rtg.hostname)
,   RedisStore  = require('connect-redis')(express)
,   session_store = new RedisStore({host: rtg.host, port: rtg.port, pass: rtg_pass, prefix: config.sess_prefix})
,   session  = function() {return express.session({ store: session_store, secret: config.sess_salt })}
,   colors   = require('colors')
,   mongoose = require('mongoose')
,   routes   = require('./routes')
;
// DISPLAY CONFIG
console.log(JSON.stringify(config,null,2))

var app = module.exports = express(express.logger());

// Connect to MongoDB when app initilizes
mongoose.connect(config.mongoURL);

// Configuration
app.configure(function(){
  app.set('views', config.viewsDIR);
  app.set('view engine', config.viewEngine);
  app.locals.pretty = config.prettyLocals;
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  //  app.use(express.favicon());
  //  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(require('less-middleware')(config.lessConfig));
  app.use(express.static(config.staticDIR));
});

app.configure('development', function(){
  app.use(express.errorHandler(config.devErrHandler));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// CORRECT SESSION USE EXAMPLE
// app.get('/admin', session(), function(req, res) {});


// Routes Config
// Route Functions are passed in as secondary param
// You can view API Route functions in routes/api
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
/*Sets index and partial locations*/

// Twilio API Interface
// -------------------------------------------------
var twilio = require('./routes/twilio');
//Initilize a message, or call to be made
app.get('/twilio/sendSMS/:number/:text', twilio.sendSMS);
app.get('/twilio/makeCall/:number', twilio.makeCall);
app.get('/twilio/multiCall', twilio.multiCall);

//List all information about your account
app.get('/twilio/listSMS/:number', twilio.listSMS);
app.get('/twilio/listCalls', twilio.listCalls);
app.get('/twilio/listCalls/:number', twilio.listCallsFrom);
app.get('/twilio/getCall/:sid', twilio.getCall);

//Display TWIML XML For calls
app.post('/twiml/:name', routes.twiml);
app.get('/twiml/:name', routes.twiml);
//Echo Twilio Action Response
app.post('/actionRes', twilio.twilioAction);
app.get('/actionRes', twilio.twilioAction);
//Status Callback URL
app.post('/statusCallback', twilio.callStatus);
app.get('/handleDialStatus', twilio.dialStatus);


// Employees
// -------------------------------------------------
var employees = require('./routes/employees');
app.get('/employees', employees.getAll);
app.get('/employees/:id', employees.findById);

// Contracts
// -------------------------------------------------
var contracts = require('./routes/contracts');
app.get('/contracts', contracts.getAll);
app.get('/contracts/:id', contracts.findById);
app.post('/contracts/new', contracts.post);
app.put('/contracts/:id', contracts.update);
app.delete('/contracts/delete/:id', contracts.delete);

// Calls
// -------------------------------------------------
var calls = require('./routes/calls');
app.get('/calls', calls.getAll);
app.get('/calls/:id', calls.findById);

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);

// Start server
var port = process.env.PORT || 80;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode".underline.green, this.address().port, app.settings.env);
});



/* ---------------------------------------------------------------------------
Listen for Messages
--------------------------------------------------------------------------- */
//pubnub.subscribe({
//    channel  : "a62f92a4-4ae6-4615-90df-b8d40d7360e3",
//    callback : function(message) {
//        console.log( "Message From Browser - ".yellow, message );
//    }
//});
//
///* ---------------------------------------------------------------------------
//Type Console Message
//--------------------------------------------------------------------------- */
//setInterval( function() {
//    console.log("Message Sent".green)
//    pubnub.publish({
//        channel : "bc76627d-3852-464c-8bcf-0d6996444b1c",
//        message : 'Checking Connection 10 sec interval'
//    });
//}, 5000 );




// Testing Redis Connection
// redisClient.set("server:name", "Miller Timber ERS");
// redisClient.get("server:name", function (err, reply) {
//  if(!err){
//    console.log("Redis connected Successfully");
//    console.log("Redis Server Name: " + reply.toString());
//  }else{
//    console.warn("A redis error occured:");
//    console.warn(err.toString());
//  }
// });




// DEV TESTING REFERENCE
// -------------------------------------------------
// -------------------------------------------------
// app.get   ('/apiV1/post/:id', apiV1.post);
// app.post  ('/apiV1/post'    , apiV1.addPost);
// app.put   ('/apiV1/post/:id', apiV1.editPost);
// app.delete('/apiV1/post/:id', apiV1.deletePost);


// ALLOW CORS
// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });