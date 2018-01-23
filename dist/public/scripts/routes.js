/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('view', {
                //parent: 'secure',
                url: '/view',
                id: 'view',
                templateUrl: 'views/view.html',
                controller: 'ViewCtrl'
            })
             .state('loginPage', {
		        url: '/loginPage',
		        templateUrl: 'views/loginPage.html',
		        controller: 'loginCtrl'
		    })
            .state('report', {
               
                url: '/report',
                templateUrl: 'views/report.html',
                controller: 'ReportCtrl'
            })
            .state('billingregistry', {
                url: '/billingregistry',
                templateUrl: 'views/billingregistry.html',
                	controller: 'BillingRegistryCtrl'
            })
            
            .state('manageschedules', {
                url: '/manageschedules',
                templateUrl: 'views/manageschedules.html',
                	controller: 'ManageSchedulesCtrl'
            })
            .state('schedules', {
                url: '/schedules',
                templateUrl: 'views/schedules.html',
                controller: 'ScheduleCtrl'
            })
            .state('demo', {
             
                url: '/demo',
                templateUrl: 'views/demo.html'
                
            })
             .state('mreports', {
             
                url: '/mreports',
                templateUrl: 'views/mreports.html'
                
            })
            .state('form', {
                url: '/form',
                templateUrl: 'views/form.html',
                controller: 'FormCtrl'
               
            });
          


       $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            //document.querySelector('px-app-nav').markSelected('/billing');
            $("px-app-nav").hide();
            $state.go('loginPage');
        });
       
      /* $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/blankpage');
            $state.go('blankpage');
        });
       */
        

    }]);
});
