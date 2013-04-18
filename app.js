/**
 * ERS-Emergency-Response-System initilization.
 */

var express = require('express')
//,   redis = require("redis")
//,   redisClient = redis.createClient()
,   RedisStore = require('connect-redis')(express)
,   url = require('url')
,   colors = require('colors')
,   mongoose = require('mongoose')
,   routes = require('./routes')
;

var app = module.exports = express(express.logger());

// Connect to MongoDB when app initilizes
mongoose.connect('mongodb://nix:vbnvbn45@dharma.mongohq.com:10034/miller-timber-staging');

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.locals.pretty = true;
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  //  app.use(express.favicon());
  //  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.session({ 
                            secret: 'bb25b6f0-a84f-11e2-9e96-0800200c9a66',
                            store: new RedisStore({
                              host:'redis://redistogo:2ff82e84b5708867835939c88f69c0d9@squawfish.redistogo.com',
                              port:'9430',
                              db:'ers'
                            })
                          }));
  app.use(require('less-middleware')({ 
                                      dest: __dirname + '/public/css',
                                      src: __dirname + '/src/less',
                                      prefix:'/css',
                                      compress:true,
                                      debug:true,
                                      once:false,
                                      force:true
                                      }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

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
//redisClient.set("server:name", "Miller Timber ERS");
//redisClient.get("server:name", function (err, reply) {
//  if(!err){
//    console.log("Redis connected Successfully");
//    console.log("Redis Server Name: " + reply.toString());
//  }else{
//    console.warn("A redis error occured:");
//    console.warn(err.toString());
//  }
//});




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