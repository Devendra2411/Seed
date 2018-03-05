/*global define */
define(['angular', '../../sample-module/sample-module'], function (angular, module) {
    'use strict';
    /**
    * PredixViewService is a sample angular service that integrates with Predix View Service API
    */
    module.factory('GEDataService', ['$http', '$q','$rootScope', function ($http, $q,$rootScope) {
    	 return {
    		 getGEAssociateData : function(successHandler,errorHandler){
             	console.log("service Url: "+$rootScope.baseServUrl+"/ge/getGeData");
             	  window.px.dealer.httpRequest({
                       url: $rootScope.baseServUrl+"/ge/getGeData",
                       method: 'GET'  
                   }).then(function(data){
                          successHandler(data)
                   },function(data){
                 	  console.log(data);
                   });              
             	
             },
             insertGeDetails : function(data,successHandler,errorHandler){
               	console.log("service Url: "+$rootScope.baseServUrl+"/ge/addGeAssociateDetails?userId="+$rootScope.userId);
               	  window.px.dealer.httpRequest({
                         url: $rootScope.baseServUrl+"/ge/addGeAssociateDetails?userId="+$rootScope.userId,
                         method: 'POST',
                         data: data,
                         headers: {'Accept' : 'text/plain' , 'Content-Type': 'application/json'}
                     }).then(function(data){
                            successHandler(data)
                     },function(data){
                   	  console.log(data);
                     });              
               	
               },
             
             editGeDetails : function(data,successHandler,errorHandler){
                	console.log("service Url: "+$rootScope.baseServUrl+"/ge/editGeAssociateDetails?userId="+$rootScope.userId);
                	  window.px.dealer.httpRequest({
                          url: $rootScope.baseServUrl+"/ge/editGeAssociateDetails?userId="+$rootScope.userId,
                          method: 'POST',
                          data: data,
                          headers: {'Accept' : 'text/plain' , 'Content-Type': 'application/json'}
                      }).then(function(data){
                             successHandler(data)
                      },function(data){
                    	  console.log(data);
                      });              
                	
                },
                deleteGeAssociates : function(data,successHandler,errorHandler){
                   	console.log("service Url: "+$rootScope.baseServUrl+"/ge/deleteGeAssociates");
                   	  window.px.dealer.httpRequest({
                             url: $rootScope.baseServUrl+"/ge/deleteGeAssociates",
                             data : data,
                             method: 'POST',
                             headers : { 'Content-Type' : 'application/json', 'Accept' : 'text/plain'}
                         }).then(function(data){
                                successHandler(data)
                         },function(data){
                       	  	errorHandler(data);
                         });              
                   	
                   }
    	 }
    	
    	 
    	
    	 
    }]);
});
