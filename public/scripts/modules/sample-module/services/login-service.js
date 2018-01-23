/*global define */
define(['angular', '../sample-module'], function (angular, module) {
    'use strict';
    /**
    * PredixViewService is a sample angular service that integrates with Predix View Service API
    */
    module.factory('LogInService', ['$http', '$q','$rootScope', function ($http, $q,$rootScope) {
        return {
             logInService : function(data,successHandler,errorHandler){
            	console.log("service Url: "+$rootScope.baseServUrl+"/login");
            	  window.px.dealer.httpRequest({
                      url: $rootScope.baseServUrl+"/login",
                      method: 'POST',
                      data:data,
                      headers : { 'Content-Type': "application/json",
                    	            'Accept' : "text/plain"}
                  }).then(function(data){
                         successHandler(data)
                  },function(data){
                	  console.log(data);
                  });              
            	
            }
        };
    }]);
});
