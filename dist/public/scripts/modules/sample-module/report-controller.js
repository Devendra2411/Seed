define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('ReportCtrl', ['$rootScope','$scope', '$state','$log', 'PredixAssetService', 'PredixViewService', function ($rootScope,$scope,$state, $log, PredixAssetService, PredixViewService){
    
    	$("#descrepencies").show();
    	$("#unpaid").hide();
		$("#nonbilled").hide();
    	
		$scope.goback =function(){
			
			$state.go('view');
			
		}
		
		
    	$scope.billingRegistrySearch = function(){
    		var baseUrl = $rootScope.baseServUrl + "/cots/billingRegistryReports";
    		
    		PredixViewService.billingRegistryReportsCall(baseUrl,function(data){
    			console.log(data);
    		
    			$scope.billingRegistryReports=data;	
    		});
    	}
    	$scope.billingRegistrySearch();	
    	
    	
		document.getElementById("registry").addEventListener('change', function(){

			var registry = document.getElementById('registry').selectedKey;


			if(registry == "1"){


				

				$("#descrepencies").show();
				$("#unpaid").hide();
				$("#nonbilled").hide();

			}
			if(registry == "2"){


				$("#unpaid").show();
			
				$("#descrepencies").hide();

				$("#nonbilled").hide();


			}
			if(registry == "3"){
				
				

				$("#nonbilled").show();
				$("#descrepencies").hide();
				$("#unpaid").hide();


			}




		});
    	
    	
    	
    	
   
}]);
});
