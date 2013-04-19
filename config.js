/**
  * Application Configuration
  */
exports.config = {
	redisToGoURL : 'redis://redistogo:38df4870a653987fc9d4461d2deed62c@spinyfin.redistogo.com:9385/'
,	sess_prefix	 : 'mtsession:'
,	sess_salt	 : '2bb1c7a0efc5475abca3f9078b253d06'
,	mongoURL	 : 'mongodb://nix:vbnvbn45@dharma.mongohq.com:10034/miller-timber-staging'
,	twilio:{
		accountSSID:'AC20e0df1b72aacfd81b7ae828929d931d',
		authToken:'1e20554259bdb8a9dd1982a208f82243',
		makeCallURL:'http://ers.skyteclabs.com/twiml/makeCall',
		statusCallbackURL:'http://ers.skyteclabs.com/statusCallback',
		ifMachine:'Hangup',
		fromNumber:'+15412334656'
	}
,	pubNub:{
		pubKey:'pub-c-80d25b0f-3cb6-4b81-8dca-f56bf581a16c',
		subKey:'sub-c-5845e5a4-968f-11e2-94d8-12313f022c90',
		channel:'bc76627d-3852-464c-8bcf-0d6996444b1c'
	}
,	lessConfig:{ 
		dest: __dirname + '/public/css',
		src: __dirname + '/src/less',
		prefix:'/css',
		compress:true,
		debug:true,
		once:false,
		force:true
	}
,	staticDIR : __dirname + '/public'
,	viewsDIR  : __dirname + '/views'
,	viewEngine: 'jade'
,	prettyLocals  : true
,	devErrHandler : { dumpExceptions: true, showStack: true }
};