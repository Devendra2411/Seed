define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';

    sampleModule.directive('appVersion', ['version', function(version) {
        return {
            restrict: 'E',
            link: function(scope, elm) {
                elm.text('Version ' + version);
            },
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                
                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

    return sampleModule;
});

