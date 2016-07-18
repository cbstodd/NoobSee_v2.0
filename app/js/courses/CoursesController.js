var app = angular.module('noobSee');

app.controller('CoursesCtrl', function ( $scope, $http ){
    $http({
        method: 'GET',
        url: 'mock/courses.json'
    }).then(function ( response ){
        $scope.courses = response.data;
    });

    $scope.rowLimit = 5;
    // $scope.coursesView = "views/courses.html";
});