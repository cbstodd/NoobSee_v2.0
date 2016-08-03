var app = angular.module('noobSee');

app.controller('CoursesCtrl', function ( $scope, $http ){
    $http({
        method: 'GET',
        url:    '/api/courses'
    }).then(function ( response ){
        $scope.courses = response.data;
    });

    $scope.rowLimit = 5;
    // $scope.newCourseForm = "views/newCourseForm.html";
});

app.controller('NewCourseCtrl', function ( $scope, $http ){
    $scope.newCourseModel = {};

    $scope.newCourse = function (){
        console.log('Hey im submitted');
        console.log($scope.newCourseModel);
    };
    $http.post('/courses', $scope.newCourseModel)
         .success(function ( data ){
             console.log('Inside http');
         })
         .error(function ( data ){
             console.log("im the error in the https");
         })
});