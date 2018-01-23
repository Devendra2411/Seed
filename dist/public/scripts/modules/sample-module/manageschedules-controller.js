define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('ManageSchedulesCtrl', ['$scope','$rootScope','$state', '$log', 'PredixAssetService', 'PredixViewService', function ($scope,$rootScope,$state, $log, PredixAssetService, PredixViewService) {
    	
    	
    	
    	
    	
    	
    	
    	$scope.schedulesView = function(){
    		var baseUrl = $rootScope.baseServUrl + "/cots/billingRegistryView";
    		
    		PredixViewService.billingRegistryViewCall(baseUrl,function(data){
    			
    		
    			$scope.schedulesViewData=data;	
    		});
    	}
    	
    	
    	$scope.schedulesView();
    	
    	
    	document.getElementById("schedulesDatatable").addEventListener("px-cell-click", function(e) {
    	   
    		
    		$state.go('schedules');
    	});
    	
    	
    	
    	
    	

    	
    }]);
    


    
    
});
