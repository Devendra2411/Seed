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
			var status;
			$scope.validate = function(){
			 data ={
						name: $scope.userName,
						password: $scope.password
					};
						
			LogInService.logInService(data,function(response){
			  status=response;
			  if(status == "admin"){
				  console.log("Successful login");
			       $state.go("techm");
			       $("px-app-nav").show();
			       if(status == "UserName or Password is wrong"){
			    	   
			       }
			  }
			  else{
				  $scope.errorMsg = "LogIn Failed";
				  $(errormsg).show();
				   console.log("Login Failed");
			  }
			},function(error){
				$scope.errorMsg = "Error Occured";
				$(errormsg).show();
				console.log(error);
			});
			}

		
			
			
    	
   }]);
});
