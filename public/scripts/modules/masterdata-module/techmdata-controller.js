define(['angular', '../sample-module/sample-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('TechMDataCtrl', ['$scope','$rootScope','$timeout','$window','$state', '$log', 'PredixAssetService', 'PredixViewService','TechMDataService', function ($scope,$rootScope,$timeout,$window,$state, $log, PredixAssetService, PredixViewService, TechMDataService) {
		
		
		
		console.log("inside the controller");
		document.getElementById("techmdata").addEventListener('change',function(){
			$scope.selectedIndex=document.getElementById("techmdata").selectedRows[0].row.dataIndex;
		
		});
		
		$scope.getAssociateData = function(){
            $scope.spinner=true;
            TechMDataService.getAssociateData(function(data){
                  $scope.associateDetails = data;
                  $scope.associateDetailsModified= JSON.parse(JSON.stringify($scope.associateDetails));
                  $scope.associateDetailsModified.forEach(function(associate,index){
                         associate.options = '<center><span onclick="editRow('+index+')"><i style="margin-right:15px; cursor:pointer"  class="fa fa-edit modal-trigger"></i></span><span onclick="deleteRow('+associate.empId+','+associate.ssoId+')"><i style = "cursor:pointer" class="fa fa-trash"></i></span></center>';
                         associate.empId = "<a  style='cursor: pointer;' href = '#'>"+associate.empId+"</a>";
                  })
                  console.log("ASSOCIATE DETAILS MODIFIED:"+JSON.stringify($scope.associateDetailsModified));
                  $scope.spinner=false;
                  //$scope.getModifiedAssociateData();
                  $scope.$apply();
            },function(error){
                  $scope.spinner=false;
                  console.log("error: "+error);
            });
     }

		$scope.getAssociateData();
		
		window.editRow = function(index){
			$scope.editDetails(index);
            document.getElementById("editBtn").click();
     }
     window.deleteRow = function(empId,ssoId){
            $scope.deleteSelected(empId,ssoId);
     }
     

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
		    $scope.modelPid = $scope.associateDetailsModified[id].projectId;
		    $scope.modelSso = $scope.associateDetailsModified[id].ssoId;
		    $scope.modelStatus = $scope.associateDetailsModified[id].status;
		    $scope.$apply();
			document.getElementById("getDetails").click();
			
		}
		
		
		//Edit Associate Details
		$scope.editDetails =  function(index){
			debugger
			$scope.selectedIndex = index;
			$scope.editName = $scope.associateDetailsModified[$scope.selectedIndex].empName;
			$scope.editId = $scope.associateDetails[$scope.selectedIndex].empId;
			$scope.editEmail = $scope.associateDetailsModified[$scope.selectedIndex].emailId;
		    $scope.editGender = $scope.associateDetailsModified[$scope.selectedIndex].gender;
		    console.log($scope.editGender);
		    console.log($scope.associateDetailsModified[$scope.selectedIndex].band);
		    var desiredValue = $scope.associateDetailsModified[$scope.selectedIndex].band;
		    $('#edit-band option[value="'+desiredValue+'"]').attr("selected", "selected");
		    $("input[name=gender][value="+$scope.editGender+"]").prop('checked', true);
		    $scope.editExp = $scope.associateDetailsModified[$scope.selectedIndex].totExp;
		    $scope.editLocation = $scope.associateDetailsModified[$scope.selectedIndex].currentLocation;
		    $scope.editMngrId = $scope.associateDetailsModified[$scope.selectedIndex].rmId;
		    $scope.editIbu = $scope.associateDetailsModified[$scope.selectedIndex].employeeIbu;
		    $scope.editCluster = $scope.associateDetailsModified[$scope.selectedIndex].employeeCluster;
		    $scope.editMobile = $scope.associateDetailsModified[$scope.selectedIndex].mobile;
		    $scope.editWrkphone = $scope.associateDetailsModified[$scope.selectedIndex].workPhone;
		    $scope.editPid = $scope.associateDetailsModified[$scope.selectedIndex].projectId;
		    $scope.editSso = $scope.associateDetailsModified[$scope.selectedIndex].ssoId;
		    $scope.editStatus = $scope.associateDetailsModified[$scope.selectedIndex].status;
		    $scope.$apply();
		}
		$scope.editData = function(){
			var dd = document.getElementById("edit-band");
			var selGender = $('input[name=gender]:checked').val();
			var selBand = dd.options[dd.selectedIndex].value;
			debugger;
			if(!$scope.editExp){
				$scope.editExp = "";
				console.log($scope.editExp);
			}
			if(!$scope.editMngrId){
				$scope.editMngrId = "";
			}
			if(!$scope.editSso){
				$scope.editSso = "";
			}
			if(!$scope.editMobile){
				$scope.editMobile = "";
			}
			if(!$scope.editPid){
				$scope.editPid ="";
			}
			var data = {"empId": $scope.editId, 
					"empName": $scope.editName, 
					"emailId":$scope.editEmail,
			"gender":selGender ,
			"band":selBand ,
			"totExp":$scope.editExp ,
			"currentLocation":$scope.editLocation ,
			"rmId": $scope.editMngrId,
			"employeeIbu":$scope.editIbu  ,
			"employeeCluster": $scope.editCluster,
			"mobile": $scope.editMobile,
			"workPhone":$scope.editWrkphone  ,
			"projectId": $scope.editPid,
			"ssoId":$scope.editSso ,
			"status": $scope.editStatus,
			"dept": $scope.insertDept
 			}
			$(".modal.px-modal").css("visibility", "hidden");
			TechMDataService.editAssociateData(data,function(response){
				console.log(response);
				if(response == "success"){
				$scope.msg="data Edited Successfully";
				document.getElementById("successMsg").click();
				$scope.getAssociateData();
				}else{
					$scope.msg="data Edit Failed DB error occured";
					document.getElementById("errorMsg").click();
					$scope.getAssociateData();
				}
				
			},function(error){
				$scope.msg="data Edit Failed";
				document.getElementById("errorMsg").click();
				$scope.getAssociateData();
				console.log(error);
			});
		}
		
		
		$scope.insertData = function(){
			var dd = document.getElementById("insert_band");
			var insertGender = $('input[name=gender]:checked').val();
			console.log(insertGender);
			var insertBand = dd.options[dd.selectedIndex].value;
			console.log(insertBand);
			debugger;
			if(!$scope.editExp){
				$scope.editExp = "";
				console.log($scope.editExp);
			}
			if(!$scope.editMngrId){
				$scope.editMngrId = "";
			}
			if(!$scope.editSso){
				$scope.editSso = "";
			}
			if(!$scope.editMobile){
				$scope.editMobile = "";
			}
			if(!$scope.editPid){
				$scope.editPid ="";
			}
			var data = {"empId": $scope.insertId, 
					"empName": $scope.insertName, 
					"emailId":$scope.insertEmail,
			"gender":insertGender ,
			"band":insertBand ,
			"totExp":$scope.insertExp ,
			"currentLocation":$scope.insertLocation ,
			"rmId": $scope.insertMngrId,
			"employeeIbu":$scope.insertIbu  ,
			"employeeCluster": $scope.insertCluster,
			"mobile": $scope.insertMobile,
			"workPhone":$scope.insertWrkphone  ,
			"projectId": $scope.insertPid,
			"ssoId":$scope.insertSso ,
			"status": $scope.insertStatus,
			"dept": $scope.insertDept
 			}
			$(".modal.px-modal").css("visibility", "hidden");
			TechMDataService.insertAssociateData(data,function(response){
				console.log(response);
				if(response == "Success"){
				$scope.msg="data Inserted Successfully";
				document.getElementById("successMsg").click();
				$scope.getAssociateData();
				}else{
					$scope.msg="data Insertion Failed DB error occured";
					document.getElementById("errorMsg").click();
					$scope.getAssociateData();
				}
				
			},function(error){
				$scope.msg="data Insertion Failed";
				document.getElementById("errorMsg").click();
				$scope.getAssociateData();
				console.log(error);
			});
		}
		
		$scope.deleteSelected = function(empId,ssoId){
            debugger;
            $scope.spinner=true;
            $scope.msgs = [];
            var rmCount = false;
            var ssoCount = false;
            if(ssoId != null){
                  ssoCount = true;
                  $scope.msgs.push("This TechM Associate is mapped with GE SSO");
            }
            for(var i=0;i<$scope.associateDetails.length;i++){
                  if(empId == $scope.associateDetails[i].rmId){
                         rmCount = true;
                         $scope.msgs.push("This TechM Associate is manager for "+$scope.associateDetails[i].empId);
                         break;
                  }
            }
            if(rmCount == false && ssoCount == false){
                  var empIds = [];
                  empIds.push(empId)
                  TechMDataService.deleteAssociates(empIds,function(response){
                         $scope.spinner=true;
                         if(response == "Success"){
                              /*  $scope.successMsg="Deleted Successfully";
                                $scope.successMsgShow=true;*/
                         $scope.msg = "Deleted Successfully";
                         document.getElementById("successMsg").click();
                         $scope.$apply();
                         $scope.getAssociateData();
                         }
                         else{
                               /* $scope.errorMsg="Unable to delete";
                                $scope.errorMsgShow=true;*/
                                $scope.msg = "Unable to delete";
                                document.getElementById("errorMsg").click();
                                $scope.$apply();
                                $scope.getAssociateData();
                         }
                         
                  },function(error){
                         $scope.spinner=true;
                         $scope.msg = "Unable to delete";
                         document.getElementById("errorMsg").click();
                         $scope.$apply();
                  })
            }
            else{
                  $scope.msg = "Unable to Delete";
                  document.getElementById("errorMsg").click();
                  $scope.$apply();
                  $scope.spinner=true;
            }
     }

		
		$scope.editCancel = function(){
			$(".modal.px-modal").css("visibility", "hidden");
		}
		
//		Download Excel Report
		$scope.exportExcel = function(){
			$scope.reportTittle="Assosciate Data";
			TechMDataService.JSONToCSVConvertor($scope.associateDetails, $scope.reportTittle, true);
			$scope.$apply();
		};
		

    }]);
});