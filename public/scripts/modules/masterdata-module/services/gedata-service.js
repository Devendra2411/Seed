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
             	
             }
    	 }
    }]);
});
