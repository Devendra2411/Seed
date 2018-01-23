define(['angular', './sample-module'], function (angular, controllers) {
  //  'use strict';

    // Controller definition
    controllers.controller('loginCtrl', ['$scope','$http','$location','$rootScope', function ($scope,$http,$location,$rootScope) {
		
    	console.log("Hello Iam Logged in");
    	$rootScope.isLoggedIn = false; 	       
    	$rootScope.userName = "";
    	$("px-app-nav").hide();
    	$scope.submitSSo = function(){
			if($scope.userName == "ADMIN" || $scope.userName == "a" ){
    			$rootScope.userRole = 1;
    			$rootScope.userName = "Admin";
    			$("#loggedInUser").text("Admin");
    		}else if($scope.userName == "GENERAL" || $scope.userName == "g"){
    			$rootScope.userRole = 2;
    			$rootScope.userName = "General User";
    			$("#loggedInUser").text("General User");
    		}else{
    			$scope.errorMsg = "Please Enter Valid UserName";
    			var $errormsg =  $("#errormsg");
    			$errormsg.find('.fade-out, .hidden ').removeClass('fade-out hidden');
   	 			$errormsg.show();
    			return;
    		}
			$rootScope.isLoggedIn = true;
    		document.querySelector('px-app-nav').markSelected('/view');
			
			$("px-app-nav").show();
			
			$location.path("/view");
    	}
    	
    	
    }]);
});
