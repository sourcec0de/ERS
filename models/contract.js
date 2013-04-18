var mongoose = require('mongoose');

// Initialize Model Schema's
var contractSchema = mongoose.Schema({
  name: { type:String, required: true },
  contractor: { type:String, required: true },
  type: { type:String, required:true },
  fulfilled:{ type:Boolean, default: false },
  fulfillment_date:{ type:Date, default: null },
  created_at:{ type:Date, default: Date.now },
  updated_at:{ type:Date, default: Date.now },
  required_personnel:[{
    type: {type:String, required: true},
    needed: {type:Number, required: true},
    call_list: [{
        id: {type:String, required: true},
        first_name:{type:String, required: true},
        last_name:{type:String, required: true},
        phone_1:{ number: Number, status: String },
        phone_2:{ number: Number, status: String },
        phone_3:{ number: Number, status: String },
        answered:{type:Boolean, default:false},
        reply:{type:String, default:"queued", required:true},
        assigned: {type:Boolean, default:false}
    }]
  }]
});

module.exports = mongoose.model('Contract', contractSchema);


//{ 
//  type: String, 
//  required: true, 
//  index: { 
//    unique: true, 
//    sparse: true 
//  }, 
//  validate: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/ 
//}



//// DATA STRUCTURE FOR CALL
//{
//  _id: ObjectId("514ff25d19508b341300043e"),
//  name: "Faller Cotract",
//  contractor: "Jiffy Lube",
//  type: "State",
//  fulfilled:false,
//  fulfillment_date:null,
//  created_at:Date(1364194711989),
//  updated_at:Date(1364194711989),
//  required_personnel: [
//    {
//      type: "Faller",
//      needed: 2,
//      call_list: [
//        {
//          id: "x1234fda",
//          first_name: "James",
//          last_name: "Qualls",
//          phone_1: {
//            number: 15412502056,
//            status: "in progress"
//          },
//          phone_2: {
//            number: 1,
//            status: "not dialed"
//          },
//          phone_3: {
//            number: null,
//            status: "not available"
//          },
//          answered: false,
//          reply: "Available For Deployment",
//          assigned: false
//        }
//      ]
//    }
//  ]
//}