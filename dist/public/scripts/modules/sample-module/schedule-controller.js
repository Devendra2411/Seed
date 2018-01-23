define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('ScheduleCtrl', ['$scope','$rootScope','$state', '$log', 'PredixAssetService', 'PredixViewService', function ($scope,$rootScope,$state, $log, PredixAssetService, PredixViewService) {
    	
    	
    	
    	
    	$scope.scheduleView = function(){
    		var baseUrl = $rootScope.baseServUrl + "/cots/scheduleView";
    		
    		PredixViewService.scheduleViewCall(baseUrl,function(data){
    			
    		
    			$scope.schedulesData=data;	
    		});
    	}
    	$scope.scheduleView();
    	
    }]);
    


    
    
});