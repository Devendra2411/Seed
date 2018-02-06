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
		
	
		    window.navigate = function(id){
		    
			console.log("inside display details func");
			console.log( JSON.stringify($scope.associateDetails));
		    $scope.modelName = $scope.associateDetailsModified[id].empName;
		    $scope.modelId = $scope.associateDetails[id].empId;
		    $scope.modelEmail = $scope.associateDetailsModified[id].emailId;
		    $scope.modelGender = $scope.associateDetailsModified[id].gender;
		    $scope.modelBand = $scope.associateDetailsModified[id].band;
		    $scope.modelExp = $scope.associateDetailsModified[id].totExp;
		    $scope.modelLocation = $scope.associateDetailsModified[id].currentLocation;
		    $scope.modelMngrName = $scope.associateDetailsModified[id].rmName;
		    $scope.modelIbu = $scope.associateDetailsModified[id].employeeIbu;
		    $scope.modelCluster = $scope.associateDetailsModified[id].employeeCluster;
		    $scope.modelMobile = $scope.associateDetailsModified[id].mobile;
		    $scope.modelWrkphone = $scope.associateDetailsModified[id].workPhone;
		    $scope.modelPid = $scope.associateDetailsModified[id].pid;
		    $scope.modelSso = $scope.associateDetailsModified[id].sso;
		    $scope.modelStatus = $scope.associateDetailsModified[id].status;
		    $scope.$apply();
			document.getElementById("getDetails").click();
			
		}
		
	
//Hyperlink for the first Column		
		$scope.getModifiedAssociateData = function(){
			$scope.associateDetailsModified = [];
		console.log("Assosciate Data:"+JSON.stringify($scope.associateDetails));
		var emplids = [];
		for(var i = 0;i<$scope.associateDetails.length;i++){
			emplids.push($scope.associateDetails[i].empId);
		}
	   $scope.associateDetailsModified=JSON.parse(JSON.stringify($scope.associateDetails));
	   
		for(var i = 0; i<$scope.associateDetails.length;i++)
			$scope.associateDetailsModified[i].empId = "<a  style='cursor: pointer;' href = '#' onclick = navigate("+i+")>"+emplids[i]+"</a>";
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
			else
				$scope.associateDetailsModified[i].rmName = "";
		}
		console.log("Assosiate Details:: "+ JSON.stringify($scope.associateDetails));
		   console.log("Modified Details:: "+ JSON.stringify($scope.associateDetailsModified));
		}
		
		
//		Download Excel Report
		$scope.exportExcel = function(){
			$scope.reportTittle="Assosciate Data";
			TechMDataService.JSONToCSVConvertor($scope.associateDetails, $scope.reportTittle, true);
		};
		

    }]);
});