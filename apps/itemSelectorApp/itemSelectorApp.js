/**
 * Created by Administrator on 2014/9/6.
 */
(function () {

    angular.module('listAppModule', ['ngSanitize', 'kendo.directives', 'jsonMethodModule', 'l8k.UI.DirectiveModule'])
        .controller('listAppController', function ($scope, jsomMethodService) {
            $scope.selectableItems = []
            $scope.selectedItems = [];
            $scope.title = 'This is title.';
            $scope.searchColumns = ['name'];
            $scope.showReturnCollection = [];
            $scope.selectableorderby = ['id'];//selectableorderby can use string for sigle column and array for multiple columns and function(item) to implement return boolean
            $scope.init = function(){
                jsomMethodService.getJson('../../json/selectable.json').then(
                    function (data) {//success
                        $scope.selectableItems = data;
                    }, function (data) {//error

                    }
                );
                jsomMethodService.getJson('../../json/selected.json').then(
                    function (data) {//success
                        $scope.selectedItems = data;
                    }, function (data) {//error

                    }
                );
            };
            $scope.init();
//            $scope.openItemSelector = function(){
//                $scope.init();
//                $scope.modal.open();
//            }
            $scope.okHandler = function (collectionJson) {
                $scope.showReturnCollection = collectionJson;
//                $scope.modal.close();
            };
            $scope.cancelHandler = function () {
//                $scope.modal.close();
            }
            $scope.searchFilter = function (searchWords) {
                return function (item) {
                    if (searchWords == null) return true;
                    var isFind = false;
                    $scope.searchColumns.forEach(function (title) {
                        if (item[title].match(new RegExp(searchWords, "i"))) {
                            isFind = true;
                            return;
                        }
                    })
                    return isFind;
                };
            }
            $scope.isEqual = function (datasourceItem, selectedItem) {
                return datasourceItem.name == selectedItem.name;
            }

        });

})();