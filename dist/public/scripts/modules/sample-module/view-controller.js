define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('ViewCtrl', ['$scope','$rootScope','$state', '$log', 'PredixAssetService', 'PredixViewService', function ($scope,$rootScope,$state, $log, PredixAssetService, PredixViewService) {
    	
    	window.onload = function () { alert("It's loaded!") }
    	$scope.billingRegistryitemdata = [{"shoporder":"12","item":"10","reqNo":"11","en":"111","customerName":"Arjun","customerPo":"112","drno":"12"},{"shoporder":"12","item":"10","reqNo":"11","en":"111","customerName":"Arjun","customerPo":"112","drno":"12"}];
    	
    	
    	
    	document.getElementById("prompt").addEventListener('prom', function(e){
    		
    		$scope.deleteRegister();
    		
    	});
    	
    	window.navigate = function(value){
    	
    		$rootScope.allbyreqno = value;
    		
    		$state.go('billingregistry');
    		
    	}
    	$scope.view = function(){
    	      
            $state.go("view");
        }
       
      	$scope.billingRegistryView1 = function(){
    		var baseUrl = $rootScope.baseServUrl + "/cots/billingRegistryView";
    		
    		PredixViewService.billingRegistryViewCall(baseUrl,function(data){
    			
    			
    			
    		
    			
    			$scope.billingRegistryViewOriginalData = data;
    			console.log($scope.billingRegistryViewOriginalData);
    		
    	});
    	}
      	
      	
      	$scope.billingRegistryView1();	
      	
    	$scope.billingRegistryView = function(){
    		var baseUrl = $rootScope.baseServUrl + "/cots/billingRegistryView";
    		
    		PredixViewService.billingRegistryViewCall(baseUrl,function(data){
    			
    			
    			
    		
    			
    		/*	$scope.billingRegistryViewOriginalData = data;
    			console.log(data);*/
    			$scope.billingRegistryViewdata = data;
    			
    			var reqnos = [];
    			//adding hyperlink to the reqno column 
    			for(var i = 0;i<data.length;i++){
    				reqnos.push(data[i].reqNo);
    			}
    			
    			
    			
    			
    		$scope.billingRegistryViewdata=data;
    			for(var i = 0;i<data.length;i++){
    				
   // $scope.billingRegistryViewdata[i].reqNo = "<span style='border-bottom-style: solid;     cursor: pointer;    border-bottom-color: blue;    border-bottom-width: 2px;' onclick = navigate("+reqnos[i]+")>"+reqnos[i]+"</span>";
    			
    				$scope.billingRegistryViewdata[i].reqNo = "<a  style='cursor: pointer;color:black;' href = '#' onclick = navigate('"+reqnos[i]+"');>"+reqnos[i]+"</a>";
    				
    			}
    			
    		
    		
    		
    		});
    	}
    	
    	
    	
    	
    	
    	$scope.billingRegistryView();	
    	
    	
    	/*document.getElementById("viewDatatable").addEventListener("px-cell-click", function(e) {
    	   
    		
    		
    		$state.go('billingregistry');
    	});
    	*/
    	

    	
    	$scope.deleteRegister = function(){


    		 var baseUrl = $rootScope.baseServUrl + "/cots/deleteRegister";
    		 var shoporder = [];
    		 var reqnos = [];
    		 $scope.rowData = document.getElementById("viewDatatable").selectedRows;
    		 
    		 
    		 console.log(JSON.stringify($scope.rowData));
    		 var dataIndexes = [];
    		
    		 for(var i =0;i<$scope.rowData.length;i++ ){
    			 //shoporder.push( $scope.rowData[i].row.shoporder.value);
    			 dataIndexes.push($scope.rowData[i].row.dataIndex);
    		 }
    		 
    		 for(var i =0;i<dataIndexes.length;i++){
    		
    		reqnos.push($scope.billingRegistryViewOriginalData[dataIndexes[i]].reqNo);
    		 }
    		 
    		 
    		var data = JSON.stringify(reqnos);
    		console.log(data);
    		
    		 
    		 PredixViewService.deleteRegisterCall(baseUrl, data, function(data){
    			
    		 });
    		
    		 $state.go($state.current, {}, {reload: true});
    	 
    	 
    		
    		
    		
    	};
    	
    	$scope.deleteAlert = function(){
    		 $scope.rowData = document.getElementById("viewDatatable").selectedRows;
    		if($scope.rowData.length==0){
   			
   			$scope.errorMsg = "Select the row(s) you want to delete";
             var $errormsg =  $("#errormsg");
             $errormsg.find('.fade-out, .hidden ').removeClass('fade-out hidden');
             $errormsg.show();
   		 }else{
    		
    		document.getElementById("hide").click();
   		 }
    		
    	};
    	
    	
  
    	
    	
    	
    	
    }]);
    


    
    
});
