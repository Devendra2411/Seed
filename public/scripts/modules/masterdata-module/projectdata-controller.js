define(['angular', '../sample-module/sample-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('ProjectDataCtrl', ['$scope','$rootScope','$timeout','$window','$state', '$log', 'PredixAssetService', 'PredixViewService','ProjectDataService', function ($scope,$rootScope,$timeout,$window,$state, $log, PredixAssetService, PredixViewService, ProjectDataService) {
		
		console.log("inside the Projectcontroller");
		$scope.getprojectData = function(){
			ProjectDataService.getProjectData(function(data){
				$scope.projectData = data;
				console.log("Project Data: "+JSON.stringify($scope.projectData));
				$scope.getModifiedprojectData();
				$scope.$apply();
			},function(error){
				console.log("error: "+error);
			});
		}
		$scope.getprojectData();
		
		$scope.getModifiedprojectData = function(){
			$scope.projectDataModified = [];
			console.log("Project Data:"+JSON.stringify($scope.projectData));
			var projectMngrIds = [];
			var projectMngrNames = [];
			var programMngrIds = [];
			var programMngrNames = [];
			var ibuHeadIds = [];
			var ibuHeadNames =[];
			var ibuClusterHeadIds = [];
			var ibuClusterHeadNames = [];
			//adding Ids to Respective manager names columns
			for(var i = 0;i<$scope.projectData.length;i++){
				if($scope.projectData[i].projectMngrId != null)
					projectMngrIds.push($scope.projectData[i].projectMngrId);
				else
					projectMngrIds.push("");
				if($scope.projectData[i].projectMngrName != null)
					projectMngrNames.push($scope.projectData[i].projectMngrName);
				else
					projectMngrNames.push("");
				
				if($scope.projectData[i].programMngrId != null)
					programMngrIds.push($scope.projectData[i].programMngrId);
				else
					projectMngrIds.push("");
				if($scope.projectData[i].programMngrName != null)
					programMngrNames.push($scope.projectData[i].programMngrName);
				else
					programMngrNames.push("");
				
				if($scope.projectData[i].ibuHeadId != null)
					ibuHeadIds.push($scope.projectData[i].ibuHeadId);
				else
					ibuHeadIds.push("");
				if($scope.projectData[i].ibuHeadName != null)
					ibuHeadNames.push($scope.projectData[i].ibuHeadName);
				else
					ibuHeadNames.push("");
				
				if($scope.projectData[i].ibuClusterHeadId != null)
					ibuClusterHeadIds.push($scope.projectData[i].ibuClusterHeadId);
				else
					ibuClusterHeadIds.push("");
				if($scope.projectData[i].ibuClusterHeadName != null)
					ibuClusterHeadNames.push($scope.projectData[i].ibuClusterHeadName);
				else
					ibuClusterHeadNames.push("");
			}
		   $scope.projectDataModified=$scope.projectData;
			for(var i = 0; i<$scope.projectData.length;i++){
				if(projectMngrNames[i] != "" && projectMngrIds[i]!= "")
				$scope.projectDataModified[i].projectMngrName = projectMngrNames[i]+" ("+projectMngrIds[i]+")";
				else
					$scope.projectDataModified[i].projectMngrName = "";
			
				if(programMngrNames[i] != "" && programMngrIds[i]!= "")
					$scope.projectDataModified[i].programMngrName = programMngrNames[i]+" ("+programMngrIds[i]+")";
					else
						$scope.projectDataModified[i].programMngrName = "";
			
				if(ibuHeadNames[i] != "" && ibuHeadIds[i]!= "")
					$scope.projectDataModified[i].ibuHeadName = ibuHeadNames[i]+" ("+ibuHeadIds[i]+")";
					else
						$scope.projectDataModified[i].ibuHeadName = "";
				
				if(ibuClusterHeadNames[i] != "" && ibuClusterHeadIds[i]!= "")
					$scope.projectDataModified[i].ibuClusterHeadName = ibuClusterHeadNames[i]+" ("+ibuClusterHeadIds[i]+")";
					else
						$scope.projectDataModified[i].ibuClusterHeadName = "";
			}
			console.log(JSON.stringify($scope.projectDataModified));
		}
		
	}]);


});