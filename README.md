This is completely possible. 

You will want to use the 
REST API to start your calls. 

Feel free to spam them in, as Twilio will queue your calls, 
and handles them at a rate of 1 call per sec. 

When a call is answered, Twilio will hit the Url you specified when 
starting the call. Set your url to return some TwiML to play a message 
and retrieve the caller input. 

Then you handle the input, and do what you wish with it. 

If you need information on the calls that failed, set the StatusCallBack 
variable when starting your call. This will then be hit when the call ends, 
either with success or failure. It also allows you to retry an busy numbers. 



200 OK - Everything worked as expected.
400 Bad Request - Often missing a required parameter.
401 Unauthorized - No valid API key provided.
402 Request Failed - Parameters were valid but request failed.
404 Not Found - The requested item doesn't exist.
500, 502, 503, 504 Server errors - something went wrong on our end.

app.get('/login', function(req, res){
  user = loadUser(req.body.username, req.body.password)
  req.session.userId = user.id
})


## HI ON TODO
## Verify twilio signature from
req.headers["x-twilio-signature"]
this signature is generated from HMAC-SHA1 using your twilio apiKey
Find a way to test and dycrypt this signature to verify.