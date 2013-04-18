/*
 * GET home page.
 */

//get Index
 exports.index = function(req, res){
   res.render('index');
 };

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.twiml = function (req, res) {
  var name = req.params.name;
  res.header('Content-Type', 'application/xml'); 
  res.render('twiml/' + name);
};