/*global define */
define(['angular', '../../sample-module/sample-module'], function (angular, module) {
    'use strict';
    /**
    * PredixViewService is a sample angular service that integrates with Predix View Service API
    */
    module.factory('ProjectDataService', ['$http', '$q','$rootScope', function ($http, $q,$rootScope) {
    	
    	 return {
    		 getProjectData : function(successHandler,errorHandler){
             	console.log("service Url: "+$rootScope.baseServUrl+"/projects/getProjectData");
             	  window.px.dealer.httpRequest({
                       url: $rootScope.baseServUrl+"/projects/getProjectData",
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
