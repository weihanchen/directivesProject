/**
 * Created by WillChen on 2014/10/13.
 */
(function(){
    var addressClass =  function (formatted_address,lat,lng) {
        this.formatted_address = formatted_address;
        this.lat = lat;
        this.lng = lng;
    };
    angular.module('jsonParseModule',[])
        .service('jsonParseService',function(){
            var getAddressDatas =  function(collectionJson){
                var datas = new Array();
                angular.forEach(collectionJson.results,function(result){
                    var data = new addressClass(result.formatted_address,result.geometry.location.lat,result.geometry.location.lng);
                    datas.push(data);
                });
                return datas;
            }
            return{
                getAddressDatas: getAddressDatas
            };
        })
})();