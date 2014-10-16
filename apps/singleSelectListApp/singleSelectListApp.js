/**
 * Created by WillChen on 2014/10/16.
 */
(function(){
    angular.module('singleSelectListAppModule',['l8k.UI.DirectiveModule','jsonMethodModule'])
        .controller('singleSelectListApController',function($scope,jsomMethodService){
            $scope.init = function(){
                jsomMethodService.getJson('../../json/selectable.json').then(
                    function (data) {//success
                        $scope.datasource = data;
                    }, function (data) {//error

                    }
                );

            };
            $scope.init();
        })
})();