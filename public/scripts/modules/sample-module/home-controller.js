define(['angular', './sample-module'], function (angular, controllers) {
  //  'use strict';

    // Controller definition
    controllers.controller('HomeCtrl', ['$scope','$http','$location','$rootScope','$state','PredixViewService', function ($scope,$http,$location,$rootScope,$state,PredixViewService) {
		
    	console.log("Hello");
    	
    	   $scope.getPGCData = function(){
    		   $scope.PGCData= [];
    		   $("#spinner").show();
           	PredixViewService.getData(function(data){
           		$scope.PGCData = data;
           		console.log($scope.PGCData);
           	 $scope.PGCDataModified= JSON.parse(JSON.stringify($scope.PGCData));
           		$scope.PGCDataModified.forEach(function(record,index){
                    record.options = '<center><span onclick="editRow('+index+')"><i style="margin-right:5px; cursor:pointer"  class="fa fa-edit modal-trigger"></i></span></center>';
             })
           		$scope.$apply();
           		$("#spinner").hide();
           	},function(error){
           		console.log(error);
           		$("#spinner").hide();
           	});
           }
           $scope.getPGCData();
           var submitNewButton = document.getElementById("submitNew");

           submitNewButton.addEventListener("click", function(e) {
                  debugger;
             var required = document.querySelectorAll("input[required]");
             required.forEach(function(element) {
               if(element.value.trim() == "") {
                 element.style.borderColor = "red";
               } else {
                 element.style.borderColor = "white";
               }
             });
           });

       	
           window.editRow = function(index){
        	$scope.editCMAdj = $scope.PGCData[index].cmAdjustment;
       		$scope.editCMSys = $scope.PGCData[index].cmSystem;
       	    $scope.editContractName = $scope.PGCData[index].contractName;
       		$scope.editConvIndicator = $scope.PGCData[index].convertibleIndicator;
       		$scope.editCostAdj = $scope.PGCData[index].costAdjustment;
       		$scope.editCostSys = $scope.PGCData[index].costSystem;
       		$scope.editCountry = $scope.PGCData[index].country;
       		$scope.editFulfil = $scope.PGCData[index].fulfillment;
       		$scope.editFs = $scope.PGCData[index].fusionScope;
       		$scope.editME = $scope.PGCData[index].me;
       		$scope.editPlf1= $scope.PGCData[index].plfTier1;
       		$scope.editPlf2 = $scope.PGCData[index].plfTier2;
       		$scope.editRegion = $scope.PGCData[index].region;
       		$scope.editSalesAdj = $scope.PGCData[index].salesAdjustment;
       		$scope.editSalesSys = $scope.PGCData[index].salesSystem;
       		$scope.editScopeDesc = $scope.PGCData[index].scopeDescription;
       		$scope.editSt1 = $scope.PGCData[index].segmentTier1;
       		$scope.editSt2 = $scope.PGCData[index].segmentTier2;
       		$scope.editSt3 = $scope.PGCData[index].segmentTier3;
       		$scope.editSiteCustName = $scope.PGCData[index].siteCustomerName;
       		$scope.editSubBusiness = $scope.PGCData[index].subBusiness;
       		$scope.editSubRegion = $scope.PGCData[index].subRegion;
       		$scope.editTurbineTech= $scope.PGCData[index].turbineTech;
       		$scope.recordId = $scope.PGCData[index].recordID;
       		$scope.$apply();
               document.getElementById("editBtn").click();
        }
    	$scope.openModal=function(){
    		document.getElementById('newBtn').click();
    	}
        $scope.createNewRec=function(){
        	var dataList=[];
        	var data={
        			"cmAdjustment":$scope.insertCostAdj-$scope.insertSalesAdj,
        			"cmSystem":"" ,
        			"contractName":$scope.insertContractName ,
        			"convertibleIndicator":$scope.insertConvIndicator ,
        			"costAdjustment":$scope.insertCostAdj ,
        			"costSystem":"" ,
        			"country":$scope.insertCountry ,
        			"fulfillment":$scope.insertFulfil ,
        			"fusionScope":$scope.insertFs ,
        			"me":$scope.insertME ,
        			"plfTier1":$scope.insertPlf1,
        			"plfTier2":$scope.insertPlf2 ,
        			"region":$scope.insertRegion ,
        			"salesAdjustment":$scope.insertSalesAdj ,
        			"salesSystem":"" ,
        			"scopeDescription":$scope.insertScopeDesc ,
        			"segmentTier1":$scope.insertSt1 ,
        			"segmentTier2":$scope.insertSt2 ,
        			"segmentTier3":$scope.insertSt3 ,
        			"siteCustomerName":$scope.insertSiteCustName ,
        			"subBusiness":$scope.insertSubBusiness ,
        			"subRegion":$scope.insertSubRegion ,
        			"turbineTech":$scope.insertTurbineTech,
        			"createdBy":$rootScope.loggedInUser
        	};
        	dataList.push(data);
        	$(".modal.px-modal").css("visibility", "hidden");
        	$("#spinner").show();
			PredixViewService.insertPGCData(dataList,function(response){
				console.log(response);
				
				if(response == "Success"){
				$scope.msg="data Inserted Successfully";
				document.getElementById("successMsg").click();
				$scope.getPGCData();
				$("#spinner").hide();
				}else{
					$scope.msg="data Insertion Failed DB error occured";
					document.getElementById("errorMsg").click();
					$("#spinner").hide();
				}
				
			},function(error){
				$scope.msg="data Insertion Failed";
				$("#spinner").hide();
				document.getElementById("errorMsg").click();
				console.log(error);
			});
        }
           
        $scope.editRec = function(){
        	var dataList=[];
        	var data={
        			"cmAdjustment":$scope.editCostAdj-$scope.editSalesAdj,
        			
        			"costAdjustment":$scope.editCostAdj ,
        			
        			"salesAdjustment":$scope.editSalesAdj ,
        			
        			"recordID":$scope.recordId,
        			"updatedBy":$rootScope.loggedInUser
        	};
        	dataList.push(data);
        	$(".modal.px-modal").css("visibility", "hidden");
			PredixViewService.editPGCData(dataList,function(response){
				console.log(response);
				if(response == "Success"){
				$scope.msg="data edited Successfully";
				$scope.getPGCData();
				$("#spinner").hide();
				document.getElementById("successMsg").click();
				
				}else{
					$scope.msg="data edit Failed DB error occured";
					$scope.getPGCData();
					$("#spinner").hide();
					document.getElementById("errorMsg").click();
				}
				
			},function(error){
				$scope.msg="data edit Failed";
				$("#spinner").hide();
				document.getElementById("errorMsg").click();
				console.log(error);
			});
        }   
           
           
    	$scope.fileName = "Choose File";
    	
		$scope.uploadExcel=function(){
			document.getElementById("excel-popup").click()
		}
			
		$scope.uploadFiles = function(){ //angular $http 
		     debugger;
	               if( document.getElementById("fileUpload").files.length == 0 ){
	            	  $("#errordiv").show();
	            	}
	          
	               else{
	               var file = $scope.uploads;
	               $("#errordiv").hide();
	                    var fd = new FormData($('#filedata')[0]);
	            var uploadUrl =  $rootScope.baseServUrl+"/pgccontrol/dataImport";
	            $(".modal.px-modal").css("visibility", "hidden");
	            $("#spinner").show();
	            PredixViewService.uploadFileToUrl(file, uploadUrl, fd,function(response){
	            	console.log(response.data);
	            	if (response.data == "Uploaded Successfully"){
	            		$scope.msg="File Uploaded Successfully";
	            		$scope.getPGCData();
	            		$("#spinner").hide();
	    				document.getElementById("successMsg").click();
	            	}else if(response.data.includes("Template Mismatch") || response.data.includes("Expecting Numeric Type")){
	            		$("#spinner").hide();
	            		$scope.msg=response.data;
						document.getElementById("errorMsg").click();
	            	}else{
	            		$("#spinner").hide();
	            		$scope.msg="Exception Occured. Template MisMatch";
	            		document.getElementById("errorMsg").click();
	            	}
	            	$("#fileUpload").val('');
	            	$scope.fileName = "Choose File";
	            },function(error){
	            	$("#spinner").hide();
	            	$scope.msg="File Upload Failed";
					console.log(error);
					document.getElementById("errorMsg").click();
					$("#fileUpload").val('');
					$scope.fileName = "Choose File";
	            });
	       }
	     };
	     
	     document.getElementById('fileUpload').onchange = function () {
	    	 
	    	  f = this.value;
	    	  $scope.fileName = f.replace(/.*[\/\\]/, '');
	    	  $scope.$apply();
	    	
	  
	    };
	    $scope.downloadTemplate=function(){
	    	 PredixViewService.downloadTemplate(function(response){
	    		// var resp=JSON.stringify(response)
	    		 download("data:application/excel;base64,"+response, "Template.xlsx", "application/excel");
	    		 console.log(response);
	    	 },function(error){
	    		 console.log(error);
	    	 });
	    }
	    
	    $scope.cancel = function(){
			$(".modal.px-modal").css("visibility", "hidden");
			$("#errordiv").hide();
			$("#fileUpload").val('');
			$scope.fileName = "Choose File";
		}
     
   }]);
});
