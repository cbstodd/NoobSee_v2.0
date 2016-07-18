'use strict';

var app = angular.module('noobSee');

app.controller('LikesCtrl', function ( $scope, $http ){
    $http({
        method: 'GET',
        url: 'mock/technologies.json'
    }).then(function ( response ){
        $scope.technologies = response.data;
    });

    // TODO: Create service for these.
    $scope.incrementLikes = function ( tech ){
        tech.likes += 1;
    };
    $scope.decrementLikes = function ( tech ){
        tech.likes -= 1;
    };

    // $scope.likesView = 'views/likes.html';
});