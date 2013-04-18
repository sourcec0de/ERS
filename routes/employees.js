var Employee = require('../models/employee.js');

exports.getAll = function(req,res){
    Employee.find({},function(err,employees){
        if(err){
            res.json(err,402);
        }else{
            res.json(employees);
        }
    });
};

exports.findById = function(req,res){
    Employee.findOne({_id:req.params.id},function(err,employee){
        if(err){
            res.json(err,402);
        }else{
            res.json(employee);
        }
    });
};