/**
 * Created by WillChen on 2014/10/16.
 */
(function(){
    angular.module('singleSelectListAppModule',['l8k.UI.DirectiveModule','jsonMethodModule'])
        .controller('singleSelectListApController',function($scope,jsomMethodService){
            $scope.isAdd = false;
            $scope.init = function(){
                jsomMethodService.getJson('../../json/selectable.json').then(
                    function (data) {//success
                        $scope.datasource = data;
                    }, function (data) {//error

                    }
                );

            };
            $scope.init();
            $scope.doConfirm = function(){
                return 'myName';
            }
            $scope.addItem = function(){
                $scope.isAdd = true;
                var addName = prompt("Please enter your name", "Harry Potter");
                var returnItem = {
                    name: addName,
                    id: '0000000000'
                }

                return  returnItem;
            }
        })
})();