/**
 * Created by WillChen on 2014/10/13.
 */
(function(){
    angular.module('cacheMethodModule',[])
        .service('cacheMethodService',function($cacheFactory){
            var cache = $cacheFactory('myCache');
            var saveCache = function(key,values){
                cache.put( key, values );
            }
            var getCache = function(key){
                var result =  cache.get(key);
                return !result?"":result;
            }
            return{
                saveCache: saveCache,
                getCache: getCache
            }
        })
})();