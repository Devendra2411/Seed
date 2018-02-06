define(['angular', './sample-module'], function (angular, controllers) {
  //  'use strict';

    // Controller definition
    controllers.controller('loginCtrl', ['$scope','$http','$location','$rootScope','$state','LogInService', function ($scope,$http,$location,$rootScope,$state,LogInService) {
		
    	console.log("Hello Iam Logged in");
    	$rootScope.isLoggedIn = false; 	       
    	$scope.userName;
		$scope.password;
    	$("px-app-nav").hide();
		var data ={
			name: $scope.userName,
			password: $scope.password
		};
			$rootScope.role;
			$scope.validate = function(){
			 data ={
						name: $scope.userName,
						password: $scope.password
					};
						
			LogInService.logInService(data,function(response){
				$rootScope.role=response;
			  if($rootScope.role == "2" || $rootScope.role == "1"){
				  console.log("Successful login");
			       $state.go("techm");
			       $("px-app-nav").show();
			       $rootScope.userId = $scope.userName;
			  }
			  else{
				  alert("LogIn failed");
				/*  $scope.errorMsg = "LogIn Failed";
				  $(errormsg).show();
				   console.log("Login Failed");*/
			  }
			},function(error){
				$scope.errorMsg = "Error Occured";
				$(errormsg).show();
				console.log(error);
			});
			}

		
			
			
    	
   }]);
});
