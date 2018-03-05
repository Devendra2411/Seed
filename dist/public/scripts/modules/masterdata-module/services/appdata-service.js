/*global define */
define(['angular', '../../sample-module/sample-module'], function (angular, module) {
    'use strict';
    /**
    * PredixViewService is a sample angular service that integrates with Predix View Service API
    */
    module.factory('AppDataService', ['$http', '$q','$rootScope', function ($http, $q,$rootScope) {
    	
    	return {
    		getAppData : function(successHandler,errorHandler){
             	console.log("service Url: "+$rootScope.baseServUrl+"/apps/getAppData?role="+$rootScope.role+"&userId="+$rootScope.userId);
             	  window.px.dealer.httpRequest({
                       url: $rootScope.baseServUrl+"/apps/getAppData?role="+$rootScope.role+"&userId="+$rootScope.userId,
                       method: 'GET'  
                   }).then(function(data){
                          successHandler(data)
                   },function(data){
                 	  console.log(data);
                   });              
             	
             },
             insertAppDetails : function(data,successHandler,errorHandler){
                	console.log("service Url: "+$rootScope.baseServUrl+"/apps/addApp?userId="+$rootScope.userId);
                	  window.px.dealer.httpRequest({
                          url: $rootScope.baseServUrl+"/apps/addApp?userId="+$rootScope.userId,
                          method: 'POST',
                          data: data,
                          headers: {'Accept' : 'text/plain' , 'Content-Type': 'application/json'}
                      }).then(function(data){
                             successHandler(data)
                      },function(data){
                    	  console.log(data);
                      });              
                	
                },
              
              editAppDetails : function(data,successHandler,errorHandler){
                 	console.log("service Url: "+$rootScope.baseServUrl+"/apps/editApp?userId="+$rootScope.userId);
                 	  window.px.dealer.httpRequest({
                           url: $rootScope.baseServUrl+"/apps/editApp?userId="+$rootScope.userId,
                           method: 'POST',
                           data: data,
                           headers: {'Accept' : 'text/plain' , 'Content-Type': 'application/json'}
                       }).then(function(data){
                              successHandler(data)
                       },function(data){
                     	  console.log(data);
                       });              
                 	
                 },
             deleteApps : function(data,successHandler,errorHandler){
              	window.px.dealer.httpRequest({
                        url: $rootScope.baseServUrl+"/apps/deleteApps",
                        data:data,
                        method: 'POST',
                        headers : { 'Content-Type' : 'application/json', 'Accept' : 'text/plain'}
                    }).then(function(data){
                           successHandler(data)
                    },function(data){
                  	  console.log(data);
                    });              
              	
              }
    	 }
    	
    }]);
});
