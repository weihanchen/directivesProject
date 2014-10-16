/**
 * Created by WillChen on 2014/10/13.
 */
(function(){

    angular.module('jsonMethodModule',[])
        .service('jsomMethodService',function($q,$http){
            var getJson = function(url){
                var deferred = $q.defer();
                $http.get(url).success(function(data,status, headers, config){
                    deferred.resolve(data);
                }).error(function (data, status, headers, config){
                    deferred.reject(data);
                });
                return deferred.promise;
            }
            return{
                getJson: getJson
            };
        })
})();