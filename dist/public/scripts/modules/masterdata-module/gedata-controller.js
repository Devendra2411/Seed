define(['angular', '../sample-module/sample-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('GEDataCtrl', ['$scope','$rootScope','$timeout','$window','$state', '$log', 'PredixAssetService', 'PredixViewService','GEDataService', function ($scope,$rootScope,$timeout,$window,$state, $log, PredixAssetService, PredixViewService, GEDataService) {
		
		console.log("inside the controller");
		
		/*document.getElementById("getable").addEventListener('change',function(){
			$scope.selectedIndex=document.getElementById("getable").selectedRows[0].row.dataIndex;
		
		});*/
		
		$scope.getGEAssociateData = function(){
			GEDataService.getGEAssociateData(function(data){
				$scope.geAssociateDetails = data;
				$scope.geAssociateDetailsModified= JSON.parse(JSON.stringify($scope.geAssociateDetails));
				$scope.geAssociateDetailsModified.forEach(function(ge,index){
					ge.options = '<center><span onclick="editRow('+index+')"><i style="margin-right:15px; cursor:pointer"  class="fa fa-edit modal-trigger"></i></span><span onclick="deleteRow('+ge.ssoId+')"><i style = "cursor:pointer" class="fa fa-trash"></i></span></center>';
				})
				$scope.$apply();
			},function(error){
				console.log("error: "+error);
			});
		}
		$scope.getGEAssociateData();
		
		
		window.editRow = function(index){
			$scope.editGe(index);
			document.getElementById("editBtn").click();
		}
		window.deleteRow = function(ssoId){
			$scope.deleteSelected(ssoId);
		}
		
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
		
		$scope.insertGeData = function(){
			debugger;
			var mngrId =document.getElementById("insert-mngrid").value;
			var mobile = document.getElementById("insert-mobile").value;
			if(!mngrId){
				mngrId="";
			}
		
			
			var data ={
					"ssoId":document.getElementById("insert-id").value,
					"name":document.getElementById("insert-name").value,
					"location": document.getElementById("insert-loc").value,
					"mobile": mobile ,
					"workPhones": document.getElementById("insert-wrkphone").value,
					"mailId": document.getElementById("insert-mail").value,
					"designation":document.getElementById("insert-desg").value,
					"vendor":document.getElementById("insert-vendor").value ,
					"managerSsoId": mngrId
					
			};
			$(".modal.px-modal").css("visibility", "hidden");
					GEDataService.insertGeDetails(data,function(response){
						console.log("Response:: "+response);
						if(response=="success"){
						$scope.msg="data Inserted Successfully";
						document.getElementById("successMsg").click();
						}else{
							$scope.msg="data Insert Failed DB error occured";
							document.getElementById("errorMsg").click();
						}
						$scope.getGEAssociateData();
					},function(error){
						$scope.msg="Data Insert Failed";
						document.getElementById("errorMsg").click();
						console.log("Error:"+error);
						$scope.getGEAssociateData();
					});
			}
		
		
		$scope.editGe = function(index){
			$scope.selectedIndex=index;
			debugger;
			$scope.editId = $scope.geAssociateDetails[$scope.selectedIndex].ssoId;
			$scope.editName = $scope.geAssociateDetails[$scope.selectedIndex].name;
			$scope.editLocation=$scope.geAssociateDetails[$scope.selectedIndex].location;
			$scope.editMobile=$scope.geAssociateDetails[$scope.selectedIndex].mobile;
			$scope.editWrkPhone=$scope.geAssociateDetails[$scope.selectedIndex].workPhones;
			$scope.editMail=$scope.geAssociateDetails[$scope.selectedIndex].mailId;
			$scope.editDesig=$scope.geAssociateDetails[$scope.selectedIndex].designation;
			$scope.editVendor=$scope.geAssociateDetails[$scope.selectedIndex].vendor;
			$scope.editMngrId=$scope.geAssociateDetails[$scope.selectedIndex].managerSsoId;
			$scope.$apply();
		}
		
		$scope.editGeData = function(){
		
			var mngrId =document.getElementById("edit-mngrid").value;
			var mobile = document.getElementById("edit-mobile").value;
			if(!$scope.editMngrId){
				mngrId="";
			}
		  var data ={
					"ssoId":$scope.editId,
					"name":$scope.editName,
					"location":$scope.editLocation ,
					"mobile":$scope.editMobile ,
					"workPhones":$scope.editWrkPhone ,
					"mailId":$scope.editMail ,
					"designation":$scope.editDesig,
					"vendor": $scope.editVendor,
					"managerSsoId": mngrId
					
			};
		  $(".modal.px-modal").css("visibility", "hidden");
		  GEDataService.editGeDetails(data,function(response){
				console.log("Response:: "+response);
				if(response=="success"){
				$scope.msg="data Edited Successfully";
				document.getElementById("successMsg").click();
				}else{
					$scope.msg="data Edit Failed DB error occured";
					document.getElementById("errorMsg").click();
				}
				$scope.getGEAssociateData();
			},function(error){
				$scope.msg="Data Edit Failed";
				document.getElementById("errorMsg").click();
				console.log("Error:"+error);
				$scope.getGEAssociateData();
			});
		  
		}
		
		$scope.deleteSelected = function(ssoId){
			debugger;
			var ssoCount = false;
			$scope.msgs = [];
			for(var j=0;j<$scope.geAssociateDetails.length;j++){
				if(ssoId == $scope.geAssociateDetails[j].managerSsoId){
					ssoCount = true;
					$scope.msgs.push("GE Associate is Manager for "+$scope.geAssociateDetails[j].ssoId);
				}
			}
			var ssoIds = [];
			ssoIds.push(ssoId);
			if(ssoCount == false){
			GEDataService.deleteGeAssociates(ssoIds,function(response){
				console.log("Response:: "+response);
				if(response == "Success"){
					$scope.msg = "Deleted Successfully";
					document.getElementById("successMsg").click();
					$scope.$apply();
					$scope.getGEAssociateData();
				}else if(response == "GE Associate is mapped with Application"){
					console.log("Response Inside:: "+response);
					$scope.msg = "Cannot Delete";
					$scope.msgs.push(response);
					document.getElementById("errorMsg").click();
					$scope.$apply();
				}
				else if(response == "GE Associate is mapped with TechM Id"){
					$scope.msg = "Cannot Delete";
					$scope.msgs.push(response);
					document.getElementById("errorMsg").click();
					$scope.$apply();
					$scope.getGEAssociateData();
				}
				else if(response == "mapped with both"){
					$scope.msg = "Cannot Delete";
					$scope.msgs.push("GE Associate is mapped with Application");
					$scope.msgs.push("GE Associate is mapped with TechM Id");
					document.getElementById("errorMsg").click();
					$scope.$apply();
				}
			},
			function(error){
				$scope.msg = "Unable to Delete";
				document.getElementById("errorMsg").click();
				$scope.$apply();
			})
		}
			else{
				$scope.msg = "Cannot Delete";
				document.getElementById("errorMsg").click();
				$scope.$apply();
			}
		}
		
		
		$scope.cancel = function(){
			$(".modal.px-modal").css("visibility", "hidden");
		}
		
	}]);


});