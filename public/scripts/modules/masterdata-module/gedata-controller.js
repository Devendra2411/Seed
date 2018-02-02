define(['angular', '../sample-module/sample-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('GEDataCtrl', ['$scope','$rootScope','$timeout','$window','$state', '$log', 'PredixAssetService', 'PredixViewService','GEDataService', function ($scope,$rootScope,$timeout,$window,$state, $log, PredixAssetService, PredixViewService, GEDataService) {
		
		console.log("inside the controller");
		$scope.getGEAssociateData = function(){
			GEDataService.getGEAssociateData(function(data){
				$scope.geAssociateDetails = data;
				console.log("GE Assosciate Details: "+JSON.stringify($scope.geAssociateDetails));
				$scope.getModifiedGEAssociateData();
				$scope.$apply();
			},function(error){
				console.log("error: "+error);
			});
		}
		$scope.getGEAssociateData();
		
		$scope.getModifiedGEAssociateData = function(){
			$scope.geAssociateDetailsModified = [];
		console.log("GE Assosciate Data:"+JSON.stringify($scope.geAssociateDetails));
		var managerNames = [];
		var managerSsoIds = [];
		//adding hyperlink to the reqno column 
		for(var i = 0;i<$scope.geAssociateDetails.length;i++){
			if($scope.geAssociateDetails[i].managerName != null)
			managerNames.push($scope.geAssociateDetails[i].managerName);
			else
				managerNames.push("");
			if($scope.geAssociateDetails[i].managerSsoId != null)
			managerSsoIds.push($scope.geAssociateDetails[i].managerSsoId);
			else
				managerSsoIds.push("");
		}
	   $scope.geAssociateDetailsModified=$scope.geAssociateDetails;
		for(var i = 0; i<$scope.geAssociateDetails.length;i++)
			if(managerNames[i] != "" && managerSsoIds[i]!= "")
			$scope.geAssociateDetailsModified[i].managerName = managerNames[i]+" ("+managerSsoIds[i]+")";
			else
				$scope.geAssociateDetailsModified[i].managerName = "";
		}
		
	}]);


});