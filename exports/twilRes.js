/*
* Parsing the twilio response 
* from the nodeJS client
*/

exports.twilioResponseParser = function(err, resData){
  var response = {};
  if (!err) {
    response.status = resData.nodeClientResponse.statusCode;
    response.body = JSON.parse(resData.nodeClientResponse.body);
    return response;
  }else{
    response.status = err.status;
    response.message = err.message;
    response.code = err.code;
    console.warn(JSON.stringify(response));
    return response;
  }
};