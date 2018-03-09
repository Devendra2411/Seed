/*global define */
define(['angular', './sample-module'], function (angular, module) {
    'use strict';
    /**
    * PredixViewService is a sample angular service that integrates with Predix View Service API
    */
    module.factory('PredixViewService',['$http', '$q','$rootScope',  function ($http, $q,$rootScope) {
        return {
        	uploadFileToUrl : function(file, uploadUrl, fd,successHandler,errorHandler){
                fd.append('importFile', file);
                fd.append('created_by','520133');
                  $http.post(uploadUrl, fd, {
                      transformRequest: angular.identity,
                      headers: {'Accept' : 'text/plain','Content-Type': undefined}
                  })
                  .then(function(data){
                      successHandler(data)
               },function(data){
             	  console.log(data);
               });
            
        },
        getData : function(successHandler,errorHandler){
        	console.log("service Url: "+$rootScope.baseServUrl+"/pgccontrol/getAllRows");
        	  window.px.dealer.httpRequest({
                  url: $rootScope.baseServUrl+"/pgccontrol/getAllRows",
                  method: 'GET',
                  headers: {'Accept' : 'text/plain' , 'Content-Type': 'application/json'}
              }).then(function(data){
                     successHandler(data)
              },function(data){
            	  console.log(data);
              });              
        	
        },
        insertPGCData : function(data,successHandler,errorHandler){
        	console.log("service Url: "+$rootScope.baseServUrl+"/pgccontrol/insertRecords");
        	  window.px.dealer.httpRequest({
                  url: $rootScope.baseServUrl+"/pgccontrol/insertRecords",
                  method: 'POST',
                  data: data,
                  headers: {'Accept' : 'text/plain' , 'Content-Type': 'application/json'}
              }).then(function(data){
                     successHandler(data)
              },function(data){
            	  console.log(data);
              });              
        	
        },
        editPGCData : function(data,successHandler,errorHandler){
        	console.log("service Url: "+$rootScope.baseServUrl+"/pgccontrol/editRecords");
        	  window.px.dealer.httpRequest({
                  url: $rootScope.baseServUrl+"/pgccontrol/editRecords",
                  method: 'POST',
                  data: data,
                  headers: {'Accept' : 'text/plain' , 'Content-Type': 'application/json'}
              }).then(function(data){
                     successHandler(data)
              },function(data){
            	  console.log(data);
              });              
        	
        },
        downloadTemplate : function(successHandler,errorHandler){
        	debugger;
        	console.log("service Url: "+$rootScope.baseServUrl+"/pgccontrol/downloadTemplate");
        	  window.px.dealer.httpRequest({
                  url: $rootScope.baseServUrl+"/get/excel",
                  method: 'POST'
                 
              }).then(function(data){
                     successHandler(data)
              },function(data){
            	  console.log(data);
              });              
        	
        },
        
        }
    }]);
    module.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
            	debugger;
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                
                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);
});
