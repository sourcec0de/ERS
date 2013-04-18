var mongoose = require('mongoose');

// Initialize Model Schema's
var callSchema = mongoose.Schema({
  AccountSid:String,
  ToZip:String,
  FromState:String,
  Called:String,
  FromCountry:String,
  CallerCountry:String,
  CalledZip:String,
  Direction:String,
  FromCity:String,
  CalledCountry:String,
  Duration:String,
  CallerState:String,
  CallSid:String,
  CalledState:String,
  From:String,
  CallerZip:String,
  FromZip:String,
  CallStatus:String,
  ToCity:String,
  ToState:String,
  To:String,
  CallDuration:String,
  ToCountry:String,
  CallerCity:String,
  ApiVersion:String,
  Caller:String,
  CalledCity:String
});

module.exports = mongoose.model('Call', callSchema);



//// DATA STRUCTURE FOR CALL
//{ AccountSid: 'AC20e0df1b72aacfd81b7ae828929d931d',
//  ToZip: '',
//  FromState: 'OR',
//  Called: '+19715991578',
//  FromCountry: 'US',
//  CallerCountry: 'US',
//  CalledZip: '',
//  Direction: 'outbound-api',
//  FromCity: 'CORVALLIS',
//  CalledCountry: 'US',
//  Duration: '1',
//  CallerState: 'OR',
//  CallSid: 'CA4566ba10d5a30df5d955f725a8533205',
//  CalledState: 'OR',
//  From: '+15412502056',
//  CallerZip: '97333',
//  FromZip: '97333',
//  CallStatus: 'completed',
//  ToCity: '',
//  ToState: 'OR',
//  To: '+19715991578',
//  CallDuration: '4',
//  ToCountry: 'US',
//  CallerCity: 'CORVALLIS',
//  ApiVersion: '2010-04-01',
//  Caller: '+15412502056',
//  CalledCity: '' }
