var app = angular.module('noobSee');

app.controller('CoursesCtrl', function( $scope, $http, $log ){
    $http({
        method: 'GET',
        url:    '/api/courses'
    }).then(function( response ){
        $scope.courses = response.data;
        $log.info(response);
    });

    $scope.rowLimit = 8;
    $scope.newCourseForm = "views/newCourseForm.html";
});

app.controller('NewCourseCtrl', function( $scope, $http ){
    $scope.formData = {};

    $scope.createCourse = function(){
        console.log('Hey im submitted');
        console.log($scope.formData);

        $http.post('/api/courses', $scope.formData)
             .success(function( data ){
                 $scope.formData = {};//Clear form to enter another.
                 $scope.courses = data;
                 console.log(data);
                 alert("Course was successfully created!");
             })
             .error(function( data ){
                 console.log("Error: " + data);
             });
    };
});