define(['angular', '../sample-module/sample-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('TechMDataCtrl', ['$scope','$rootScope','$timeout','$window','$state', '$log', 'PredixAssetService', 'PredixViewService','TechMDataService', function ($scope,$rootScope,$timeout,$window,$state, $log, PredixAssetService, PredixViewService, TechMDataService) {
		
		
		
		console.log("inside the controller");
		$scope.getAssociateData = function(){
			TechMDataService.getAssociateData(function(data){
				$scope.associateDetails = data;
				//console.log("Assosciate Details: "+JSON.stringify($scope.associateDetails));
				$scope.getModifiedAssociateData();
				$scope.$apply();
			},function(error){
				console.log("error: "+error);
			});
		}
		$scope.getAssociateData();
		
	
		
		
//Hyperlink for the first Column		
		$scope.getModifiedAssociateData = function(){
			$scope.associateDetailsModified = [];
		console.log("Assosciate Data:"+JSON.stringify($scope.associateDetails));
		var emplids = [];
		//adding hyperlink to the reqno column 
		for(var i = 0;i<$scope.associateDetails.length;i++){
			emplids.push($scope.associateDetails[i].empId);
		}
	   $scope.associateDetailsModified=$scope.associateDetails;
		for(var i = 0; i<$scope.associateDetails.length;i++)
			$scope.associateDetailsModified[i].empId = "<a  style='cursor: pointer;' href = '#'');>"+emplids[i]+"</a>";
		var rmNames = [];
		var rmIds = [];
		for(var i = 0;i<$scope.associateDetails.length;i++){
			if($scope.associateDetails[i].rmName != null)
				rmNames.push($scope.associateDetails[i].rmName);
			else
				rmNames.push("");
		}
		for(var i = 0;i<$scope.associateDetails.length;i++){
			if($scope.associateDetails[i].rmId != null)
				rmIds.push($scope.associateDetails[i].rmId);
			else
				rmIds.push("");
		}
		for(var i = 0; i<$scope.associateDetails.length;i++){
			if(rmNames[i] != "" && rmIds[i]!= "")
			$scope.associateDetailsModified[i].rmName = rmNames[i]+" ("+rmIds[i]+")";
		}
		}
		
		
//		Download Excel Report
		$scope.exportExcel = function(){
			$scope.reportTittle="Assosciate Data";
			TechMDataService.JSONToCSVConvertor($scope.associateDetails, $scope.reportTittle, true);
		};
		

    }]);
});