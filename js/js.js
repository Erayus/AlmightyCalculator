/**
 * Created by ImRTee on 26/06/2017.
 */
// Multiple Commit Test
var calApp = angular.module('calApp',[])
    .factory('buttonsFactory',function(){
        var factory = {};
        var buttons = [
            {
                name: 'AC',
                func: 'clear'
            },
            {
                name: 'CE',
                func: 'delete'
            },
            {
               name: '/',
                func: '/'
            },
            {
                name: '7',
                func: '7'
            },
            {
                name: '8',
                func: '8'
            },
            {
                name: '9',
                func: '9'
            },{
                name: '4',
                func: '4'
            },{
                name: '5',
                func: '5'
            },{
                name: '6',
                func: '6'
            },{
                name: '1',
                func: '1'
            },{
                name: '2',
                func: '2'
            },{
                name: '3',
                func: '3'
            },
            {
                name: '0',
                func: '0'
            },

            {
                name: '.',
                func: '.'
            },
            {
                name: '+',
                func: '+'
            },
            {
                name: '-',
                func: '-'
            },
            {
                name: 'x',
                func: '*'
            },
            {
                name: '=',
                func: '='
            }
        ];

        factory.getLeftButtons = function(){
            return buttons.slice(0,14);
        };
        factory.getRightButtons = function(){
            return buttons.slice(14);
        };
        return factory;
    });




 calApp.controller('btnCrl',function($scope,buttonsFactory){
        $scope.leftButtons = buttonsFactory.getLeftButtons();
        $scope.rightButtons =  buttonsFactory.getRightButtons()
        $scope.currentDisplay='0';
        $scope.overallDisplay='0';
        $scope.calStr = '0';
        var isEqualMode = false;
        $scope.displayOnScreen = function(name,func) {
            console.log(isEqualMode);
            var operators = ['+', '-', 'x', '/'];
                if (isEqualMode === false) {
                    if (name === 'AC') {
                        $scope.currentDisplay = '0';
                        $scope.overallDisplay = '0';
                        $scope.calStr = '0';
                    } else if (name === 'CE') {
                        if ($scope.currentDisplay.length === 1) {

                        } else {
                            $scope.currentDisplay = $scope.currentDisplay.substring(0, $scope.currentDisplay.length - 1)
                        }
                    } else if (name === '=') {
                        var result = $scope.calculate($scope.calStr);
                            $scope.currentDisplay = result;
                            $scope.overallDisplay += '=' + $scope.currentDisplay;
                            isEqualMode = true;

                    }
                    else if ($scope.currentDisplay === '0') {
                        if (operators.indexOf(name) === -1 && name !== '.') {
                            $scope.currentDisplay = name;
                            $scope.overallDisplay = name;
                            $scope.calStr = func;
                        }
                        else if (name === '.') {
                            $scope.currentDisplay += name;
                            $scope.overallDisplay += name;
                            $scope.calStr += func;
                        }
                    } else if ((/\d/.test(name) && operators.indexOf($scope.currentDisplay) === -1) || (name === '.' && $scope.currentDisplay.indexOf('.') === -1)) {
                        //check if there are too many numbers to be displayed on the screen
                        if (Number($('.numbers-size').css('width').substring(0, $('.numbers-size').css('width').length - 2)) + 8 > Number($('.screen-size').css('width').substring(0, $('.screen-size').css('width').length - 2))
                            || Number($('.overAllNum-size').css('width').substring(0, $('.overAllNum-size').css('width').length - 2)) + 10 > Number($('.screen-size').css('width').substring(0, $('.screen-size').css('width').length - 2))
                        ) {
                            $scope.currentDisplay = '0';
                            $scope.overallDisplay = 'Digital limited'
                        } else {
                            $scope.currentDisplay += name;
                            $scope.overallDisplay += name;
                            $scope.calStr += func;
                        }
                    }//change currentDisplay, add overallDisplay
                    else if (operators.indexOf(name) !== -1 && operators.indexOf($scope.currentDisplay) == -1 || /\d/.test(name)) {
                        $scope.currentDisplay = name;
                        $scope.overallDisplay += name;
                        $scope.calStr += func;
                    }
                } else {
                    if (name === 'AC') {
                        $scope.currentDisplay = '0';
                        $scope.overallDisplay = '0';
                        $scope.calStr = '0';
                        isEqualMode = false;
                    }else if( name === 'CE'){
                        if ($scope.currentDisplay.length === 1) {
                            $scope.currentDisplay = '0';
                            isEqualMode = false;
                        } else {
                            $scope.currentDisplay = (JSON.stringify($scope.currentDisplay)).substring(0, (JSON.stringify($scope.currentDisplay)).length - 1)
                            isEqualMode = false;
                        }
                    } else if (operators.indexOf(name) !== -1) {
                        $scope.currentDisplay = name;
                        $scope.overallDisplay = eval($scope.calStr) + name;
                        console.log($scope.calStr);
                        $scope.calStr += func;
                        console.log($scope.calStr);
                        isEqualMode = false;
                    } else if (/\d/.test(name)) {
                        $scope.currentDisplay = name;
                        $scope.overallDisplay = name;
                        $scope.calStr = func;
                        isEqualMode = false;
                    } else if (name === '.') {
                        $scope.currentDisplay = '0.';
                        $scope.overallDisplay = '0.';
                        $scope.calStr += '0.';
                        isEqualMode = false;
                    }

                }
                };
     $scope.calculate = function( calStr){
            return eval(calStr);
        }
 });
