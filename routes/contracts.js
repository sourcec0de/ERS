var Contract = require('../models/contract.js');

exports.getAll = function(req,res){
  Contract.find({},function(err,contracts){
    if(err){
      res.json(err,400);
    }else{
      res.json(contracts);
    }
  });
};

exports.findById = function(req,res){
  Contract.findOne({_id:req.params.id},function(err,contract){
    if(err){
      res.json(err,400);
    }else{
      res.json(contract);
    }
  });
};

exports.post = function(req,res){
//  console.log(req.body)
  var contract = new Contract(req.body);
  contract.save(function (err,contract) {
    if (!err){
      res.json(contract,201);
    }else{
      res.json(err,400);
      console.warn(err);
    }
  });

};

exports.update = function(req,res){
  
};