/**
 * Created by WillChen on 2014/10/21.
 */
(function(){
    angular.module('jsonParseModule',[])
        .service('jsonParseService',function(){
            var getReFormatDepartmentJson = function(collectionJson){
                var result = {}
                var members = {}
                var information = {}
                result['department'] = parseDepartment(collectionJson,members,information)
                result['members'] = members
                result['information'] = information
                return result
            }
            var parseDepartment = function(collection,members,information){
                var arr = []
                var associationKey;
                collection.forEach(function(item){
                    for (var key in item){
                        if (angular.isArray(item[key])) {
                            members[associationKey] = parseDepartment(item[key],members,information)
                        }
                        else if (angular.isObject(item[key])){
                            information[associationKey] = [item[key]]
                        }
                        else {
                            var obj = {}
                            obj[key] = item[key]
                            arr.push(obj)
                            associationKey = item[key]
                        }
                    }
                })
                return arr
            }
            return{
                getReFormatDepartmentJson: getReFormatDepartmentJson
            }
        })
})()