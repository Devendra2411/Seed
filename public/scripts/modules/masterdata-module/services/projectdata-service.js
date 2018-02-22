/*global define */
define(['angular', '../../sample-module/sample-module'], function (angular, module) {
    'use strict';
    /**
    * PredixViewService is a sample angular service that integrates with Predix View Service API
    */
    module.factory('ProjectDataService', ['$http', '$q','$rootScope', function ($http, $q,$rootScope) {
    	
    	 return {
    		 getProjectData : function(successHandler,errorHandler){
             	console.log("service Url: "+$rootScope.baseServUrl+"/projects/getProjectData?role="+$rootScope.role+"&userId="+$rootScope.userId);
             	  window.px.dealer.httpRequest({
                       url: $rootScope.baseServUrl+"/projects/getProjectData?role="+$rootScope.role+"&userId="+$rootScope.userId,
                       method: 'GET'  
                   }).then(function(data){
                          successHandler(data)
                   },function(data){
                 	  console.log(data);
                   });              
             	
             },
             insertprojectDetails : function(data,successHandler,errorHandler){
                	console.log("service Url: "+$rootScope.baseServUrl+"/projects/addProjectDetails?userId="+$rootScope.userId);
                	  window.px.dealer.httpRequest({
                          url: $rootScope.baseServUrl+"/projects/addProjectDetails?userId="+$rootScope.userId,
                          method: 'POST',
                          data: data,
                          headers: {'Accept' : 'text/plain' , 'Content-Type': 'application/json'}
                      }).then(function(data){
                             successHandler(data)
                      },function(data){
                    	  console.log(data);
                      });              
                	
                },
              
              editProjectDetails : function(data,successHandler,errorHandler){
                 	console.log("service Url: "+$rootScope.baseServUrl+"/projects/editProjectDetails?userId="+$rootScope.userId);
                 	  window.px.dealer.httpRequest({
                           url: $rootScope.baseServUrl+"/projects/editProjectDetails?userId="+$rootScope.userId,
                           method: 'POST',
                           data: data,
                           headers: {'Accept' : 'text/plain' , 'Content-Type': 'application/json'}
                       }).then(function(data){
                              successHandler(data)
                       },function(data){
                     	  console.log(data);
                       });              
                 	
                 },
                 deleteProjectData : function(data,successHandler,errorHandler){
                     window.px.dealer.httpRequest({
                         url: $rootScope.baseServUrl+"/projects/deleteProjects",
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
