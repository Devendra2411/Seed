define(['angular', '../sample-module/sample-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('AppDataCtrl', ['$scope','$rootScope','$timeout','$window','$state', '$log', 'PredixAssetService', 'PredixViewService','AppDataService', function ($scope,$rootScope,$timeout,$window,$state, $log, PredixAssetService, PredixViewService, AppDataService) {
		
		console.log("inside the appDatacontroller");
		$scope.getAppData = function(){
			AppDataService.getAppData(function(data){
				$scope.appData = data;
				console.log("APP Data: "+JSON.stringify($scope.appData));
				$scope.getModifiedAppData();
				$scope.$apply();
			},function(error){
				console.log("error: "+error);
			});
		}
		$scope.getAppData();
		
		$scope.getModifiedAppData = function(){
			$scope.modifiedAppData = [];
			var imOwnerNames =[];
			var imOwnerIds = [];
			var p1Names = [];
			var p2Names= [];
			var p3Names = [];
			var s1Names = [];
			var s2Names = [];
			var s3Names = [];
			var p1Ids = [];
			var p2Ids = [];
			var p3Ids = [];
			var s1Ids = [];
			var s2Ids = [];
			var s3Ids = [];
			for(var i = 0;i<$scope.appData.length;i++){
				if($scope.appData[i].imOwnerName != null)
					imOwnerNames.push($scope.appData[i].imOwnerName);
				else
					imOwnerNames.push("");
				if($scope.appData[i].imOwnerId != null)
					imOwnerIds.push($scope.appData[i].imOwnerId);
				else
					imOwnerIds.push("");
				
				if($scope.appData[i].p1Name != null)
					p1Names.push($scope.appData[i].p1Name);
				else
					p1Names.push("");
				if($scope.appData[i].p1Id != null)
					p1Ids.push($scope.appData[i].p1Id);
				else
					p1Ids.push("");
				
				if($scope.appData[i].p2Name != null)
					p2Names.push($scope.appData[i].p2Name);
				else
					p2Names.push("");
				if($scope.appData[i].p2Id != null)
					p2Ids.push($scope.appData[i].p2Id);
				else
					p2Ids.push("");
				
				if($scope.appData[i].p3Name != null)
					p3Names.push($scope.appData[i].p3Name);
				else
					p3Names.push("");
				if($scope.appData[i].p3Id != null)
					p3Ids.push($scope.appData[i].p3Id);
				else
					p3Ids.push("");
				
				if($scope.appData[i].s1Name != null)
					s1Names.push($scope.appData[i].s1Name);
				else
					s1Names.push("");
				if($scope.appData[i].s1Id != null)
					s1Ids.push($scope.appData[i].s1Id);
				else
					s1Ids.push("");
				
				if($scope.appData[i].s2Name != null)
					s2Names.push($scope.appData[i].s2Name);
				else
					s2Names.push("");
				if($scope.appData[i].s2Id != null)
					s2Ids.push($scope.appData[i].s2Id);
				else
					s2Ids.push("");
				
				if($scope.appData[i].s3Name != null)
					s3Names.push($scope.appData[i].s3Name);
				else
					s3Names.push("");
				if($scope.appData[i].s3Id != null)
					s3Ids.push($scope.appData[i].s3Id);
				else
					s3Ids.push("");
			}
			$scope.modifiedAppData=$scope.appData;
			for(var i = 0; i<$scope.appData.length;i++){
				if(imOwnerNames[i] != "" && imOwnerIds[i]!= "")
				$scope.modifiedAppData[i].imOwnerName = imOwnerNames[i]+" ("+imOwnerIds[i]+")";
				else
					$scope.modifiedAppData[i].imOwnerName = "";
				
				if(p1Names[i] != "" && p1Ids[i]!= "")
					$scope.modifiedAppData[i].p1Name = p1Names[i]+" ("+p1Ids[i]+")";
					else
						$scope.modifiedAppData[i].p1Name = "";
				
				if(p2Names[i] != "" && p2Ids[i]!= "")
					$scope.modifiedAppData[i].p2Name = p2Names[i]+" ("+p2Ids[i]+")";
					else
						$scope.modifiedAppData[i].p2Name = "";
				
				if(p3Names[i] != "" && p3Ids[i]!= "")
					$scope.modifiedAppData[i].p3Name = p3Names[i]+" ("+p3Ids[i]+")";
					else
						$scope.modifiedAppData[i].p3Name = "";
				
				if(s1Names[i] != "" && s1Ids[i]!= "")
					$scope.modifiedAppData[i].s1Name = s1Names[i]+" ("+s1Ids[i]+")";
					else
						$scope.modifiedAppData[i].s1Name = "";
				
				if(s2Names[i] != "" && s2Ids[i]!= "")
					$scope.modifiedAppData[i].s2Name = s2Names[i]+" ("+s2Ids[i]+")";
					else
						$scope.modifiedAppData[i].s2Name = "";
				
				if(s2Names[i] != "" && s2Ids[i]!= "")
					$scope.modifiedAppData[i].s2Name = s2Names[i]+" ("+s2Ids[i]+")";
					else
						$scope.modifiedAppData[i].s2Name = "";
			}
		}
		
	}]);


});