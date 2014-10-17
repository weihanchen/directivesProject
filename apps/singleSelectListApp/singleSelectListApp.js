/**
 * Created by WillChen on 2014/10/16.
 */
(function(){
    angular.module('singleSelectListAppModule',['l8k.UI.DirectiveModule','jsonMethodModule'])
        .controller('singleSelectListApController',function($scope,jsomMethodService){
            $scope.isAdd = false;
            $scope.listOrderby = 'name';
            $scope.newItem;
            $scope.isLock;
            $scope.init = function(){
                jsomMethodService.getJson('../../json/selectable.json').then(
                    function (data) {//success
                        $scope.datasource = data;
                    }, function (data) {//error

                    }
                );
            };

            $scope.init();
            $scope.doConfirm = function(newName){
                $scope.datasource.push({
                    name: newName,
                    id: '0000000000'
                })
                $scope.isLock = false;
                $scope.isConfirmShow = false;
            }
            $scope.doAdd = function(){
                $scope.isConfirmShow = true;
                $scope.confirmModel = 'Add';
                $scope.isLock = true;
//                var addName = prompt("Please enter your name", "Harry Potter");
//                if (!addName) return
//                var returnItem = {
//                    name: addName,
//                    id: '0000000000'
//                }
//                return  returnItem;
            }
        })
})();