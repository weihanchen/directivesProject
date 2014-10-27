/**
 * Created by WillChen on 2014/10/20.
 */
(function () {
    angular.module('singleSelectListMasterDetailModule', ['l8k.UI.DirectiveModule', 'jsonMethodModule','jsonParseModule', 'ui.bootstrap'])
        .controller('singleSelectListMasterDetailController', function ($scope, jsomMethodService,jsonParseService) {
            $scope.departmentSelectedItem
            $scope.memberSelectedItem
            $scope.init = function () {
                jsomMethodService.getJson('../../../json/department.json').then(
                    function (data) {//success
                        $scope.datasource = jsonParseService.getReFormatDepartmentJson(data);
                    }, function (data) {//error

                    }
                )
            };
            $scope.init();

            $scope.departmentDoClick = function(item){
                $scope.departmentSelectedItem = item.name
                $scope.memberSelectedItem = null
            }
            $scope.memberClick = function(item){
                $scope.memberSelectedItem = item.name
            }
        })
})()