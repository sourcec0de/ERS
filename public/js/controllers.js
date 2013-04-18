'use strict';

/* Controllers */


//HOME
//----------------------------------
function HomeCtrl($scope,$http) {
//  var PUBNUB = PUBNUB;
  // LISTEN FOR MESSAGES
  $scope.callRes = [];
  PUBNUB.subscribe({
      channel    : "bc76627d-3852-464c-8bcf-0d6996444b1c",      // CONNECT TO THIS CHANNEL.
      restore    : false,              // STAY CONNECTED, EVEN WHEN BROWSER IS CLOSED
                                       // OR WHEN PAGE CHANGES.
      callback   : function(message) { // RECEIVED A MESSAGE.
          $scope.callRes.push(message);
      },
      connect    : function() {        // CONNECTION ESTABLISHED.
          PUBNUB.publish({             // SEND A MESSAGE.
              channel : "a62f92a4-4ae6-4615-90df-b8d40d7360e3",
              message : "ERS Connected"
          });
      },
      disconnect : function() {        // LOST CONNECTION.
          console.log(
              "Connection Lost." +
              "Will auto-reconnect when Online."
          );
      },
      reconnect  : function() {        // CONNECTION RESTORED.
          console.log("And we're Back!");
      },
      presence   : function(message) {
          console.log(message, true);
      }
  })
  
  
  
  
}
HomeCtrl.$inject = ["$scope","$http"];





//CONTRACTS
//-----------------------------------------------------
//-----------------------------------------------------

//SHOW ALL CONTRACTS
function ContractsCtrl($scope,$http){
  var s = $scope;
  $http({method: 'GET', url: '/contracts'}).
  success(function(data, status, headers, config) {
    s.contracts = data;
  }).
  error(function(data, status, headers, config) {
    s.error = data;
  });
}
ContractsCtrl.$inject = ["$scope","$http"];

//SHOW CONTRACT BY ID
function ShowContractCtrl($scope,$http,$routeParams) {
  var s = $scope
  ,   params = $routeParams
  ;
  
  $http({method: 'GET', url: '/contracts/'+params.id}).
  success(function(data, status, headers, config) {
    s.contract = data;
  }).
  error(function(data, status, headers, config) {
    s.error = data;
  });
}
ShowContractCtrl.$inject = ["$scope","$http","$routeParams"];

//CREATE NEW CONTRACTS CONTROLLER
function NewContractCtrl($scope,$http) {
  var s = $scope;
  
  s.contract = {
    name: "",
    contractor: "",
    type: "",
    fulfilled: false,
    fulfillment_date: null,
    created_at: null,
    updated_at: null,
    assigned_personnel:[],
    required_personnel: [
      {
        type: "",
        needed: 0,
        call_list: []
      }
    ]
  };
  
  $http({method: 'GET', url: '/employees'}).
  success(function(data, status, headers, config) {
    s.employees = data;
  }).
  error(function(data, status, headers, config) {
    s.error = data;
  });
  
  s.addToCallList = function(employee){
    var call = {
      id: employee._id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      phone_1: {
        number: employee.phone_number,
        twilioSID:null,
        status: "not dialed"
      },
      phone_2: {
        number: employee.phone_number_2,
        twilioSID:null,
        status: "not dialed"
      },
      phone_3: {
        number: employee.phone_number3,
        twilioSID:null,
        status: "not dialed"
      },
      answered: false,
      reply: null,
      assigned: false
    };
    s.contract.required_personnel[0].call_list.push(call);
  };
}
NewContractCtrl.$inject = ["$scope","$http"];


//EMPLOYEES
//-----------------------------------------------------
//-----------------------------------------------------

//SHOW ALL EMPLOYEES
function EmployeesCtrl($scope,$http){
  var s = $scope;
  $http({method: 'GET', url: '/employees'}).
  success(function(data, status, headers, config) {
    s.employees = data;
  }).
  error(function(data, status, headers, config) {
    s.error = data;
  });
}
EmployeesCtrl.$inject = ["$scope","$http"];

//SHOW Employee BY ID
function ShowEmployeeCtrl($scope,$http,$routeParams) {
  var s = $scope
  ,   params = $routeParams
  ;
  
  $http({method: 'GET', url: '/employees/'+params.id}).
  success(function(data, status, headers, config) {
    s.employee = data;
  }).
  error(function(data, status, headers, config) {
    s.error = data;
  });
}
ShowEmployeeCtrl.$inject = ["$scope","$http","$routeParams"];



//CALLS
//-----------------------------------------------------
//-----------------------------------------------------

//SHOW ALL CALLS
function CallsCtrl($scope,$http){
  var s = $scope;
  $http({method: 'GET', url: '/calls'}).
  success(function(data, status, headers, config) {
    s.calls = data;
  }).
  error(function(data, status, headers, config) {
    s.error = data;
  });
}
CallsCtrl.$inject = ["$scope","$http"];

//SHOW CALL BY ID
function ShowCallCtrl($scope,$http,$routeParams) {
  var s = $scope
  ,   params = $routeParams
  ;
  
  $http({method: 'GET', url: '/calls/'+params.id}).
  success(function(data, status, headers, config) {
    s.call = data;
  }).
  error(function(data, status, headers, config) {
    s.error = data;
  });
}
ShowCallCtrl.$inject = ["$scope","$http","$routeParams"];