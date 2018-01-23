define(['angular', './sample-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('TechMDataCtrl', ['$scope','$rootScope','$timeout','$window','$state', '$log', 'PredixAssetService', 'PredixViewService','TechMDataService', function ($scope,$rootScope,$timeout,$window,$state, $log, PredixAssetService, PredixViewService, TechMDataService) {
		
		
		//$scope.mod = false;
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
		
	/*	$scope.toggleModal = function(){
			$scope.mod = !$scope.mod;
			alert($scope.mod);
		}*/
		
		
//Hyperlink for the first Column		
		$scope.getModifiedAssociateData = function(){
			$scope.associateDetailsModified = [];
		console.log("Assosciate Data:"+JSON.stringify($scope.associateDetails));
		var emplids = [];
		//adding hyperlink to the reqno column 
		for(var i = 0;i<$scope.associateDetails.length;i++){
			emplids.push($scope.associateDetails[i].emplid);
		}
	   $scope.associateDetailsModified=$scope.associateDetails;
		for(var i = 0; i<$scope.associateDetails.length;i++)
			$scope.associateDetailsModified[i].emplid = "<a  style='cursor: pointer;' href = '#'');>"+emplids[i]+"</a>";
		}
		
		
//		Download Excel Report
		$scope.exportExcel = function(){
			$scope.reportTittle="Assosciate Data";
			TechMDataService.JSONToCSVConvertor($scope.associateDetails, $scope.reportTittle, true);
		};
		

    }]);
});