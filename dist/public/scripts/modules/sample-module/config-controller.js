define(['angular', './sample-module'], function (angular, controllers) {
  //  'use strict';

    // Controller definition
    controllers.controller('ConfigCtrl', ['$scope','$http','$location','$rootScope','$state','PredixViewService', function ($scope,$http,$location,$rootScope,$state,PredixViewService) {	
    	//$rootScope.tenantId="";
		//$rootScope.assetUrl="";
    	alert("Configuration Loaded");
    	$scope.getToken=function(){
    		alert("Token Generated");

    		
    		var data={
    				"uaa_token_url": $scope.uaaUrl,
    				"grant_type":$scope.grantType ,
    				"username": $scope.userName,
    				"password": $scope.pwd
    			};
    		$http.post("https://apm-asset-data.run.aws-usw02-pr.ice.predix.io/get_token", data, { headers: {'Content-Type' : 'application/json'}})
            .then(function(resp){
            	$rootScope.accessToken="";
            	$rootScope.accessToken=resp.data.access_token;
            	sessionStorage.setItem('access_token',resp.data.access_token);
                console.log("token"+sessionStorage.getItem('access_token'));
         },function(error){
        	 console.log("error"+error);
         });
    		
    	};
    	
    	$scope.saveAssetDet=function(){
    		sessionStorage.setItem('tenantId',$scope.tenantId);
    		sessionStorage.setItem('assetUrl',$scope.assetUrl);
    		$rootScope.tenantId=$scope.tenantId;
    		$rootScope.assetUrl=$scope.assetUrl;
    		alert("tenant Id:"+sessionStorage.getItem('tenantId')+"::assetUrl :"+sessionStorage.getItem('assetUrl'));
    		}
    }]);
});
