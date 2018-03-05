define(['angular', '../sample-module/sample-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('AppDataCtrl', ['$scope','$rootScope','$timeout','$window','$state', '$log', 'PredixAssetService', 'PredixViewService','AppDataService', function ($scope,$rootScope,$timeout,$window,$state, $log, PredixAssetService, PredixViewService, AppDataService) {
		
		console.log("inside the appDatacontroller");
		console.log("Logged In::"+$rootScope.userId+"    role"+$rootScope.role);
		$scope.getAppData = function(){
			AppDataService.getAppData(function(data){
				$scope.appData = data;
				$scope.appDataModified= JSON.parse(JSON.stringify($scope.appData));
				$scope.appDataModified.forEach(function(app,index){
					app.options = '<center><span onclick="editRow('+index+')"><i style="margin-right:15px; cursor:pointer"  class="fa fa-edit modal-trigger"></i></span><span onclick="deleteRow('+index+')"><i style = "cursor:pointer" class="fa fa-trash"></i></span></center>';
				})
				console.log("APP Data: "+JSON.stringify($scope.appDataModified));
				$scope.$apply();
			},function(error){
				console.log("error: "+error);
			});
		}
		$scope.getAppData();
		
		window.editRow = function(index){
			$scope.editApp(index);
			document.getElementById("editBtn").click();
		}
		window.deleteRow = function(index){
			$scope.deleteSelected(index);
		}
		
		$scope.editApp = function(index){
			$scope.selectedIndex=index;
			debugger;
			$scope.editBsn = $scope.appData[$scope.selectedIndex].baseLineName;
			$scope.editBln = $scope.appData[$scope.selectedIndex].baseLineId;
			$scope.editBus=$scope.appData[$scope.selectedIndex].business;
			$scope.editSc=$scope.appData[$scope.selectedIndex].searchCode;
			$scope.editIm=$scope.appData[$scope.selectedIndex].imOwnerId;
			$scope.editSupp=$scope.appData[$scope.selectedIndex].supportCoverage;
			$scope.editWg=$scope.appData[$scope.selectedIndex].workgroup;
			$scope.editSt=$scope.appData[$scope.selectedIndex].supportTime;
			$scope.editCi=$scope.appData[$scope.selectedIndex].configItem;
			$scope.editP1=$scope.appData[$scope.selectedIndex].p1Id;
			$scope.editTech=$scope.appData[$scope.selectedIndex].technology;
			$scope.editP2=$scope.appData[$scope.selectedIndex].p2Id;
			$scope.editTier=$scope.appData[$scope.selectedIndex].tier;
			$scope.editP3=$scope.appData[$scope.selectedIndex].p3Id;
			$scope.editS1=$scope.appData[$scope.selectedIndex].s1Id;
			$scope.editS2=$scope.appData[$scope.selectedIndex].s2Id;
			$scope.editS3=$scope.appData[$scope.selectedIndex].s3Id;
			$scope.editStatus=$scope.appData[$scope.selectedIndex].status;
			$scope.editProjId=$scope.appData[$scope.selectedIndex].projectId;
			$scope.$apply();
		}
		
		$scope.editAppData = function(){
			
			
		  var data ={
					"baseLineName":$scope.editBsn,
					"baseLineId":$scope.editBln,
					"business":$scope.editBus ,
					"searchCode":$scope.editSc ,
					"imOwnerId":$scope.editIm ,
					"supportCoverage":$scope.editSupp ,
					"workgroup":$scope.editWg,
					"supportTime": $scope.editSt,
					"configItem": $scope.editCi,
					"p1Id":$scope.editP1,
					"technology":$scope.editTech,
					"p2Id":$scope.editP2,
					"tier":$scope.editTier ,
					"p3Id":$scope.editP3 ,
					"s1Id":$scope.editS1 ,
					"s2Id":$scope.editS2 ,
					"s3Id":$scope.editS3,
					"status": $scope.editStatus,
					"projectId": $scope.editProjId
			};
		  $(".modal.px-modal").css("visibility", "hidden");
		  AppDataService.editAppDetails(data,function(response){
				console.log("Response:: "+response);
				if(response=="success"){
				$scope.msg="data Edited Successfully";
				document.getElementById("successMsg").click();
				}else{
					$scope.msg="data Edit Failed DB error occured";
					document.getElementById("errorMsg").click();
				}
				$scope.getAppData();
			},function(error){
				$scope.msg="Data Edit Failed";
				document.getElementById("errorMsg").click();
				console.log("Error:"+error);
				$scope.getAppData();
			});
		  
		}
		
		$scope.insertAppData = function(){
			debugger;
			
			  var data ={
						"baseLineName":$scope.insertBsn,
						"baseLineId":$scope.insertBln,
						"business":$scope.insertBus ,
						"searchCode":$scope.insertSc ,
						"imOwnerId":$scope.insertIm ,
						"supportCoverage":$scope.insertSupp ,
						"workgroup":$scope.insertWg,
						"supportTime": $scope.insertSt,
						"configItem": $scope.insertCi,
						"p1Id":$scope.insertP1,
						"technology":$scope.insertTech,
						"p2Id":$scope.insertP2,
						"tier":$scope.insertTier ,
						"p3Id":$scope.insertP3 ,
						"s1Id":$scope.insertS1 ,
						"s2Id":$scope.insertS2 ,
						"s3Id":$scope.insertS3,
						"status": $scope.insertStatus,
						"projectId": $scope.insertProjId
				};
			  $(".modal.px-modal").css("visibility", "hidden");
			  AppDataService.insertAppDetails(data,function(response){
					console.log("Response:: "+response);
					if(response=="success"){
					$scope.msg="Data Added Successfully";
					document.getElementById("successMsg").click();
					}else{
						$scope.msg="Data Add Failed DB error occured";
						document.getElementById("errorMsg").click();
					}
					$scope.getAppData();
				},function(error){
					$scope.msg="Data Add Failed";
					document.getElementById("errorMsg").click();
					console.log("Error:"+error);
					$scope.getAppData();
				});
			  
			}
		
		$scope.deleteSelected = function(index){
			var baseLineNames = [];
			baseLineNames.push($scope.appData[index].baseLineName);
			AppDataService.deleteApps(baseLineNames,function(response){
				if(response == "Success"){
					$scope.msg = "Deleted Successfully";
					document.getElementById("successMsg").click();
					$scope.getAppData();	
				}
				else{
					$scope.msg = "Unable to delete";
					document.getElementById("errorMsg").click();
				}
			},function(error){
				$scope.msg = "Unable to delete";
				document.getElementById("errorMsg").click();
			}
			)
		}
		$scope.cancel = function(){
			$(".modal.px-modal").css("visibility", "hidden");
		}
		
	}]);


});