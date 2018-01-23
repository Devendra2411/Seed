define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('FormCtrl', ['$scope', '$log', 'PredixAssetService', 'PredixViewService', function ($scope, $log, PredixAssetService, PredixViewService){
    
    	
$scope.Hello=function()

{
	console.log("hai");
    alert("Hello, World");
};



    }]);
});
