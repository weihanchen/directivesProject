/**
 * Created by WillChen on 2014/10/16.
 */
(function () {
    angular.module('singleSelectListAppModalModule', ['l8k.UI.DirectiveModule', 'jsonMethodModule', 'ui.bootstrap'])
        .controller('singleSelectListAppModalController', function ($scope, $modal, jsomMethodService) {
            $scope.listOrderby = 'name';
            $scope.isLock;
            $scope.singleSelectListModalDataSource = [];
            $scope.totalToShow = 10
            $scope.init = function () {
                jsomMethodService.getJson('../../../json/selectable.json').then(
                    function (data) {//success
                        $scope.datasource = data;
                        $scope.singleSelectListModalDataSource.push.apply($scope.singleSelectListModalDataSource,$scope.datasource.splice(0, $scope.totalToShow))
                    }, function (data) {//error

                    }
                );
            };
            $scope.init();
            $scope.doLoadMore = function(){
                $scope.singleSelectListModalDataSource.push.apply($scope.singleSelectListModalDataSource,$scope.datasource.splice(0, $scope.totalToShow))
            }
            $scope.startAdd = function () {
                $scope.isLock = true
                $scope.open('', '是否新增?', '確定新增', '取消', '', false, $scope.endAdd)
            }
            $scope.endAdd = function (oldItem, newItem) {
                $scope.datasource.push(newItem)
            }
            $scope.startRemove = function (item) {
                $scope.isLock = true
                $scope.open('', '是否刪除?', '確定刪除', '取消', item, true, $scope.endRemove)
            }
            $scope.endRemove = function (oldItem, newItem) {
                var index = $scope.datasource.indexOf(oldItem)
                if (index != -1) $scope.datasource.splice(index, 1)
            }
            $scope.startEdit = function (item) {
                $scope.isLock = true
                $scope.open('', '是否修改?', '確定修改', '取消', item, false, $scope.endEdit)
            }

            $scope.endEdit = function (oldItem, newItem) {
                var index = $scope.datasource.indexOf(oldItem)
                if (index != -1) $scope.datasource.splice(index, 1, newItem)
            }
            $scope.doExtend = function(){

            }
            $scope.open = function (size, modalTitle, okText, cancelText, item, isRemove, doFn) {
                var modalInstance = $modal.open({
                    templateUrl: 'singleSelectListModalTemplate.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        sourceCollection: function () {
                            return {
                                modalTitle: modalTitle,
                                okText: okText,
                                cancelText: cancelText,
                                item: item,
                                isRemove: isRemove,
                                doFn: doFn
                            }
                        }

                    }
                });
                modalInstance.result.then(function () {
                    $scope.isLock = false
                }, function () {
                    $scope.isLock = false
                });
            };

        })
        .controller('ModalInstanceCtrl', function ($scope, $modalInstance, sourceCollection) {
            $scope.modalTitle = sourceCollection.modalTitle
            $scope.okText = sourceCollection.okText
            $scope.cancelText = sourceCollection.cancelText
            $scope.oldItem = sourceCollection.item
            $scope.inputName = sourceCollection.item.name
            $scope.inputId = sourceCollection.item.id
            $scope.isRemove = sourceCollection.isRemove
            $scope.doFn = sourceCollection.doFn;
            $scope.okClick = function () {
                var newItem = {
                    name: $scope.inputName,
                    id: $scope.inputId
                }
                $scope.doFn($scope.oldItem, newItem)
                $modalInstance.close()
            }
            $scope.cancelClick = function () {
                $modalInstance.close()
            }
            $scope.getFormGroupClass = function (groupControls) {
                if (!groupControls.$dirty) return;//若該Controls未修過值則不動作
                return groupControls.$invalid ? 'form-group has-error has-feedback' : 'form-group has-success has-feedback';//回傳驗證過與未驗證過的樣板
            }
            $scope.getGlyphIconClass = function (groupControls) {
                return groupControls.$valid ? 'glyphicon glyphicon-ok form-control-feedback' : 'glyphicon glyphicon-remove form-control-feedback';//回傳驗證過與未驗證過的小圖示
            }
            $scope.isRequired = function (groupControls) {
                return groupControls.$error.required && groupControls.$dirty;//判斷是否符合必填限制
            }
        })
})();