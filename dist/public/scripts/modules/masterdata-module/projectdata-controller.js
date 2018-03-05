define(['angular', '../sample-module/sample-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('ProjectDataCtrl', ['$scope','$rootScope','$timeout','$window','$state', '$log', 'PredixAssetService', 'PredixViewService','ProjectDataService', function ($scope,$rootScope,$timeout,$window,$state, $log, PredixAssetService, PredixViewService, ProjectDataService) {
		
		console.log("inside the Projectcontroller");
		$scope.getprojectData = function(){
			ProjectDataService.getProjectData(function(data){
				$scope.projectData = data;
				$scope.projectDataModified= JSON.parse(JSON.stringify($scope.projectData));
				$scope.projectDataModified.forEach(function(project,index){
					project.options = '<center><span onclick="editRow('+index+')"><i style="margin-right:15px; cursor:pointer"  class="fa fa-edit modal-trigger"></i></span><span onclick="deleteRow('+project.projectId+')"><i style = "cursor:pointer" class="fa fa-trash"></i></span></center>';	
				})
				console.log("Project Data: "+JSON.stringify($scope.projectData));
				$scope.$apply();
			},function(error){
				console.log("error: "+error);
			});
		}
		$scope.getprojectData();
		
		window.editRow = function(index){
			$scope.editProject (index);
			document.getElementById("editBtn").click();
		}
		window.deleteRow = function(projectId){
			$scope.deleteSelected(projectId);
		}
		
		$scope.editProject = function(index){
			$scope.selectedIndex=index;
			debugger;
			$scope.editId = $scope.projectData[$scope.selectedIndex].projectId;
			$scope.editName = $scope.projectData[$scope.selectedIndex].projectName;
			$scope.editPrjManager=$scope.projectData[$scope.selectedIndex].projectMngrId;
			$scope.editPrgManager=$scope.projectData[$scope.selectedIndex].programMngrId;
			$scope.editIbuHead=$scope.projectData[$scope.selectedIndex].ibuHeadId;
			$scope.editClusterHead=$scope.projectData[$scope.selectedIndex].ibuClusterHeadId;
			$scope.editSB=$scope.projectData[$scope.selectedIndex].superBusiness;
			$scope.editBn=$scope.projectData[$scope.selectedIndex].businessName;
			$scope.$apply();
		}
		
		$scope.editProjectData = function(){
			var data ={
					"projectId": $scope.editId ,
					"projectName":$scope.editName ,
					"projectMngrId":$scope.editPrjManager ,
					"programMngrId":$scope.editPrgManager ,
					"ibuHeadId":$scope.editIbuHead ,
					"ibuClusterHeadId":$scope.editClusterHead ,
					"superBusiness":$scope.editSB ,
					"businessName":$scope.editBn
			};
			$(".modal.px-modal").css("visibility", "hidden");
			debugger;
			ProjectDataService.editProjectDetails(data,function(response){
				console.log("Response:: "+response);
				if(response=="success"){
				$scope.msg="Data Edited Successfully";
				document.getElementById("successMsg").click();
				}else{
					$scope.msg="Data Edit Failed DB error occured";
					document.getElementById("errorMsg").click();
				}
				$scope.getprojectData();
			},function(error){
				$scope.msg="Data Edit Failed";
				document.getElementById("errorMsg").click();
				console.log("Error:"+error);
				$scope.getprojectData();
			});
			}
		
		$scope.insertProjectData = function(){
		var data ={
				"projectId": $scope.insertId ,
				"projectName":$scope.insertName ,
				"projectMngrId":$scope.insertPrjManager ,
				"programMngrId":$scope.insertPrgManager ,
				"ibuHeadId":$scope.insertIbuHead ,
				"ibuClusterHeadId":$scope.insertClusterHead ,
				"superBusiness":$scope.insertSB ,
				"businessName":$scope.insertBn
		};
		$(".modal.px-modal").css("visibility", "hidden");
		ProjectDataService.insertProjectDetails(data,function(response){
			console.log("Response:: "+response);
			if(response=="success"){
				$scope.getprojectData();
			$scope.msg="Data Added Successfully";
			document.getElementById("successMsg").click();
			
			}else{
				$scope.getprojectData();
				$scope.msg="Data Add Failed DB error occured";
				document.getElementById("errorMsg").click();
			}
		
		},function(error){
			$scope.getprojectData();
			$scope.msg="Data Add Failed";
			document.getElementById("errorMsg").click();
			console.log("Error:"+error);
			$scope.getprojectData();
		});
		}
		$scope.deleteSelected = function(projectId){
			$scope.msgs = [];
			var projectIds = [];
			projectIds.push(projectId);
			ProjectDataService.deleteProjectData(projectIds,function(response){
				if(response == "Success"){
					$scope.msg = "Deleted Successfully";
					document.getElementById("successMsg").click();
					$scope.getprojectData();
					$scope.$apply();
				}
				else{
				
					$scope.msg = "Cannot Delete";
					$scope.msg = "Cannot Delete";
					$scope.msgs.push(response);
					
					document.getElementById("errorMsg").click();
					$scope.$apply();
				}
				},function(error){
					$scope.msg = "Unable to Delete";
					document.getElementById("errorMsg").click();
					$scope.$apply();
				});
		}
		$scope.cancel = function(){
			$(".modal.px-modal").css("visibility", "hidden");
		}
		
		
	}]);


});