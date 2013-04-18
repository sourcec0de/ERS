var Call = require('../models/call');

exports.getAll = function(req,res){
  Call.find({},function(err,calls){
      if(err){
          res.json(err,402);
      }else{
          res.json(calls);
      }
  });
};

exports.findById = function(req,res){
  Call.findOne({_id:req.params.id},function(err,call){
      if(err){
          res.json(err,402);
      }else{
          res.json(call);
      }
  });
};