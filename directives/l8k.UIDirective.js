/**
 * Created by Administrator on 2014/9/6.
 */
(function () {
    function IsSelfAttrsEqObjX(self, ObjX) {//比較共同欄位
        var isequal = false;
        for (var thisKey in self) {
            if (!ObjX[thisKey] || thisKey == '$$hashKey') continue;
            if (self[thisKey] != ObjX[thisKey]) {
                isequal = false;
                break;
            }
            isequal = true;
        }
        return isequal;
    };

    function setArrayValues(array, start, end, value) {
        for (var i = start; i <= end; i++) {
            array[i] = value;
        }
    }

    function pushArrayValues(from, fromStart, fromEnd, to) {
        for (var i = fromStart; i <= fromEnd; i++) {
            to.push(from[i]);
        }
    }

    angular.module('l8k.UI.DirectiveModule', ['kendo.directives', 'ngSanitize'])
        .directive('itemSelector', function () {
            return{
                restrict: 'E',
                scope: {
                    title: '=',
                    datasource: '=',
                    selectedItems: '=',
                    okEventhandler: '=',
                    cancelEventhandler: '=',
                    isEqual: '=',
                    searchFilter: '=',
                    selectableOrderby: '='
                },
                templateUrl: "/directivesProject/directives/itemSelector/itemSelector.html",
                transclude: true,
                link: function (scope, element, attrs, parentctrl, transcludeFn) {
                    scope.sortableOptions = {
                        cursor: "move",
                        hint: function (element) {
                            return element.clone().addClass("hint").text(element.text());
                        },
                        placeholder: function (element) {
                            return element.clone().addClass("placeholder").text("drop here");
                        }
                    };
                    scope.selectableMoveItems = [];
                    scope.selectedMoveItems = [];
                    scope.isColorSelectableArr = [];
                    scope.isColorSelectedArr = [];
                    scope.preSelectedIndex = 0;
                    scope.$watchGroup(['datasource', 'selectedItems'], function (newSource) {
                        scope.selectableItems = [];
                        scope.datasource.forEach(function (item) {
                            var canSelectable = true;
                            scope.selectedItems.forEach(function (selectedItem) {
                                if (scope.getCurrentIsEqual(item, selectedItem)) {
                                    canSelectable = false;
                                    return;
                                }
                            })
                            if (canSelectable) scope.selectableItems.push(item);
                        });
                    });

                    scope.move = function (src, desc, tmpSelectedItems, tmpColorSelectedArr, isMoveAll) {
                        tmpColorSelectedArr.splice(0, tmpColorSelectedArr.length);//remove all color selection
                        if (isMoveAll) desc.push.apply(desc, src.splice(0, src.length));//remove all from src and push to desc
                        while (tmpSelectedItems.length > 0) {//move and clear tmpSelectedItems
                            var item = tmpSelectedItems.shift();//shift() like dequeue();
                            var index = src.indexOf(item);
                            if (index == -1) continue;
                            desc.push(item);
                            src.splice(index, 1);
                        }
                        scope.selectableSearchText = "";
                    };
                    //拖拉後觸發change，利用splice移除掉items[oldIndex]後加到item[newIndex]
                    scope.change = function (e, items, tmpColorSelectedArr) {
                        items.splice(e.newIndex, 0, items.splice(e.oldIndex, 1)[0]);
                        tmpColorSelectedArr.splice(e.newIndex, 0, tmpColorSelectedArr.splice(e.oldIndex, 1)[0]);
                        scope.preSelectedIndex = e.newIndex;
                    };
                    scope.toggleSelection = function toggleSelection(totalItems, tmpSelectedItems, tmpColorSelectedArr, item, event, selectionIndex) {//待整理
                        var tmpIndex = tmpSelectedItems.indexOf(item);
                        if (event.shiftKey) {//清除已選擇的區段後再從起點選到終點
                            setArrayValues(tmpColorSelectedArr, 0, tmpColorSelectedArr.length - 1, false);
                            tmpSelectedItems.splice(0, tmpSelectedItems.length);
                            var start = scope.preSelectedIndex, end = selectionIndex;
                            if (start > end) {
                                var tmp = start;
                                start = end;
                                end = tmp;
                            }
                            pushArrayValues(totalItems, start, end, tmpSelectedItems);
                            setArrayValues(tmpColorSelectedArr, start, end, true);
                        }
                        else if (event.ctrlKey) {//若點選的選項在tmpSelectedItems已存在則移除，其餘則push
                            if (tmpIndex != -1) tmpSelectedItems.splice(tmpIndex, 1);
                            else tmpSelectedItems.push(item);
                            tmpColorSelectedArr[selectionIndex] = !tmpColorSelectedArr[selectionIndex];
                        } else {//單選，清除已選的選項，存放目前所點選的選項
                            tmpSelectedItems.splice(0, tmpSelectedItems.length);
                            setArrayValues(tmpColorSelectedArr, 0, tmpColorSelectedArr.length - 1, false);
                            tmpSelectedItems.push(item);
                            tmpColorSelectedArr[selectionIndex] = !tmpColorSelectedArr[selectionIndex];
                        }
                        scope.preSelectedIndex = selectionIndex;
                    };
                    scope.getCurrentFilter = function () {
                        return (!scope.searchFilter) ? scope.selectableSearchText : scope.searchFilter(scope.selectableSearchText)
                    };
                    scope.getCurrentIsEqual = function (datasourceItem, selectedItem) {
                        return (scope.isEqual) ? scope.isEqual(datasourceItem, selectedItem) : IsSelfAttrsEqObjX(datasourceItem, selectedItem);
                    };
                    scope.okClick = function () {
                        if (scope.okEventhandler) scope.okEventhandler(scope.selectedItems);
                    };
                    scope.cancelClick = function () {
                        if (scope.cancelEventhandler) scope.cancelEventhandler();
                    };
                }
            }
        })
        .directive('singleSelectList',function(){
            return{
                restrict: 'E',
                scope: {
                    listItems: '='
                },
                templateUrl: '/directivesProject/directives/singleSelectList/singleSelectList.html',
                link: function(scope,element,attrs,parCtrl,transcludeFn){
                    scope.showTrash = [];
                    scope.mouseHover = function(index){

                        scope.showTrash[index] = !scope.showTrash[index]
                    }
                }
            }
        })
        .directive('itemTemplate', function ($compile) {
            return {
                restrict: "E",
                transclude: true,
                scope: {},
                template: '<div ng-transclude ></div>',
                link: function (scope, iElement, iAttr, ctrl, transcludeFn) {
                    var transcludetHtml = iElement.children().html();
                    var injectHtml = transcludetHtml.replace(/<([a-z].*?)>/g, '<$1  unselectable="on">');
                    var linkFn = $compile(injectHtml);
                    var compileContent = linkFn(scope.$parent);
                    iElement.empty();
                    iElement.append(compileContent);
                }
            };
        })
        .directive('inject', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs, ctrl, transcludeFn) {//目的使transclude的內容使用到isolate-scope,e.g{{item}}
                    if (!transcludeFn) return;
                    transcludeFn(scope, function (clone) {
                        element.empty();
                        element.append(clone);
                    });
                }
            };
        });
})();