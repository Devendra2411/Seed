/*global define */
define(['angular', './sample-module'], function (angular, module) {
    'use strict';
    /**
    * PredixViewService is a sample angular service that integrates with Predix View Service API
    */
    module.factory('PredixViewService', ['$http', '$q', function ($http, $q) {
        return {
            billingRegistryReportsCall : function(baseUrl,successHandler){
            	
                var deferred = $q.defer();
                var config = {};
                $http.get(baseUrl)
             	.then(function (res) {
                   	successHandler(res.data);
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            },
            
            
            billingRegistryViewCall : function(baseUrl,successHandler){
            	
                var deferred = $q.defer();
                var config = {};
                $http.get(baseUrl)
             	.then(function (res) {
                   	successHandler(res.data);
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            
            	
            },
            chartViewCall : function(baseUrl,successHandler){
            	
                var deferred = $q.defer();
                var config = {};
                $http.get(baseUrl)
             	.then(function (res) {
                   	successHandler(res.data);
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            
            	
            },
            NameAndProductCall : function(baseUrl,data,successHandler){
            	
                var deferred = $q.defer();
                var config = {};
                $http.post(baseUrl,data)
             	.then(function (res) {
                   	successHandler(res.data);
                   	
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            
            	
            },
           logInService : function(baseUrl,data,successHandler){
            	
                var deferred = $q.defer();
                var config = {};
                $http.post(baseUrl,data)
             	.then(function (res) {
                   	successHandler(res.data);
                   	
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            
            	
            },
            
         
                /*     logInService : function(baseUrl,data,successHandler){
                    	
                    	  window.px.dealer.httpRequest({
                              url: baseUrl,
                              method: 'POST',
                              data:data,
                              headers : { 'Content-Type': "application/json" }
                          }).then(function(data){
                                 successHandler(data)
                          },function(data){
                        	  errorHandler(data)
                          }
                          );              
                    	
                    },*/
            
            billingRegistrySingleCall : function(baseUrl,data,successHandler){
            	
                var deferred = $q.defer();
                var config = {};
                $http.post(baseUrl,data)
             	.then(function (res) {
                   	successHandler(res.data);
                   	
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            
            	
            },
            
            addPaymentLineCall : function(baseUrl,data,successHandler){
            	
                var deferred = $q.defer();
                var config = {};
                $http.post(baseUrl,data)
             	.then(function (res) {
                   	successHandler(res.data);
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            
            },	
            editPaymentLineCall : function(baseUrl,data){
            	
            	return isString(json)
                ? JSON.parse(json)
                : json;
            	
                var deferred = $q.defer();
                var config = {};
                $http.post(baseUrl,data)
             	.then(function (res) {
             		console.log("In succees Handler");
             		alert("inedit");
                   	//successHandler(res.data);
                   	deferred.resolve(res.data);
                 }, function (res) {
                  	//errorHandler(res.data);
                  	alert("inedit");
                  	console.log("error");
                    deferred.reject('Error fetching decks with tags ');
               });
                return deferred.promise;
            
            },

            
            
          
            
            deletePaymentLineCall : function(baseUrl,data){
            	
                var deferred = $q.defer();
                var config = {};
                $http.post(baseUrl,data)
             	.then(function (res) {
                   	//successHandler(res.data);
             		alert("successfull");
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            
            },
            
            deleteRegisterCall : function(baseUrl,data){
            	
                var deferred = $q.defer();
                var config = {};
                $http.post(baseUrl,data)
             	.then(function (res) {
                   	//successHandler(res.data);
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            
            },
            
            
           /* nameandProductCall : function(baseUrl,data){
            	
                var deferred = $q.defer();
                var config = {};
                $http.post(baseUrl,data)
             	.then(function (res) {
                   	//successHandler(res.data);
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            
            },*/
            
    scheduleViewCall : function(baseUrl,successHandler){
            	
                var deferred = $q.defer();
                var config = {};
                $http.get(baseUrl)
             	.then(function (res) {
                   	successHandler(res.data);
                   	deferred.resolve(res.data);
                 }
               );
                return deferred.promise;
            
            	
            },
            
            
            editPaymentLineCall : function(baseUrl,data,successHandler){
               
                       window.px.dealer.httpRequest({
                                 url: baseUrl,
                                 method: 'POST',
                                 data:data,
                                 headers : { 'Content-Type' : "application/json"}
                             }).then(function(data){
                                    successHandler(data)
                             });  
             },
            
            
            JSONToCSVConvertor : function(JSONData, ReportTitle, ShowLabel) {
                //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                var CSV = '';   
                //Set Report title in first row or line
                CSV += ReportTitle + '\r\n\n';
                //This condition will generate the Label/Header
                if (ShowLabel) {
                    var row = "";
                    //This loop will extract the label from 1st index of on array
                    for (var index in arrData[0]) {
                        //Now convert each value to string and comma-seprated
                        row += index + ',';
                    }
                    row = row.slice(0, -1);
                    //append Label row with line break
                    CSV += row + '\r\n';
                }
                //1st loop is to extract each row
                for (var i = 0; i < arrData.length; i++) {
                    var row = "";
                    //2nd loop will extract each column and convert it in string comma-seprated
                    for (var index in arrData[i]) {
                        row += '"' + arrData[i][index] + '",';
                    }
                    row.slice(0, row.length - 1);
                    //add a line break after each row
                    CSV += row + '\r\n';
                }
                if (CSV == '') {       
                    alert("Invalid data");
                    return;
                }  
                //Generate a file name
                var fileName = "";
                var fileName1 = "";
                //this will remove the blank-spaces from the title and replace it with an underscore
                fileName += ReportTitle.replace(/ /g," ");
                fileName1 += fileName.replace("-"," ");  
                //Initialize file format you want csv or xls
                var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
                // Now the little tricky part.           // you can use either>> window.open(uri);   // but this will not work in some browsers
                // or you will not get the correct file extension      //this trick will generate a temp <a /> tag
                var link = document.createElement("a");   
                link.href = uri;
                //set the visibility hidden so it will not effect on your web-layout
                link.style = "visibility:hidden";
                link.download = fileName1 + ".csv";
                //this part will append the anchor tag and remove it after automatic click
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            
        };
    }]);
});
