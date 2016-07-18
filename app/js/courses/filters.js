'use strict';

//Converts numbers to words.
app.filter('level', function (){
    return function ( level ){
        switch (level){
            case 1:
                return 'Beginner';
            case 2:
                return 'Intermediate';
            case 3:
                return 'Advanced';
            default:
                return "Not available";
                break;
        }
    }
});
// Converts numbers to larger progress percentages. 
app.filter('progress', function (){
    return function ( progress ){
        switch (progress){
            case 1:
                return '20';
            case 2:
                return '40';
            case 3:
                return '60';
            case 4:
                return '80';
            case 5:
                return '100';
            default:
                return '0';
                break;
        }
    }
});