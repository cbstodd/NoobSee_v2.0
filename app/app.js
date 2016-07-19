'use strict';

var app = angular.module('noobSee', ['ngRoute'])
                 .config(function ( $routeProvider, $locationProvider ){
                     $routeProvider
                       .when('/', {
                           templateUrl: 'views/home.html',
                           controller:  'HomeCtrl'
                       })
                       .when('/courses', {
                           templateUrl: 'views/courses.html',
                           controller:  'CoursesCtrl'
                       })
                       .when('/likes', {
                           templateUrl: 'views/likes.html',
                           controller:  'LikesCtrl'
                       });
                    $locationProvider.html5Mode(true);
                 })
                 .controller('HomeCtrl', function ( $scope ){
                     $scope.message = "Home page";
                 });






