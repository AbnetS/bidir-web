/**
 * Created by Yoni on 3/11/2018.
 */

(function(angular) {
    'use strict';
    angular.module('app.forms')

        .service('ACATService', ACATService);

    ACATService.$inject = ['$http','CommonService'];

    function ACATService($http, CommonService) {
        return {
            GetCrops:_getCrops,
            SaveCrop:_createCrop,
            UpdateCrop:_updateCrop,
            GetAllACATList: _getAllACAT,
            GetACATById: _getACATById,
            CreateACAT:_createACAT,
            UpdateACAT:_updateACAT,
            AddCostList:_addCostList,
            UpdateCostList:_updateCostList,
            RemoveCostListLinear:_removeCostListLinear,
            RemoveCostListGroup:_removeCostGroupList,
            RemoveCostGroup:_removeCostGroup,
            UpdateCostGroup:_updateCostGroup,
            ResetCostList:_resetCostList
        };


        function _getCrops() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.ACAT,API.Methods.ACAT.Crop));
        }
        function _createCrop(crop){
            return $http.post(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.CreateCrop), crop);
        }
        function _updateCrop(crop){
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.Crop,crop._id), crop);
        }
        function _getACATById(id) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.ACAT,id));
        }
        function _getAllACAT() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.ACAT,API.Methods.ACAT.ACAT));
        }
        function _addCostList(cost) {
            return $http.post(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.CostList),cost);
        }

        function _updateCostList(cost){
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,cost._id), cost);
        }
        function _createACAT(acat) {
            return $http.post(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.CreateACAT),acat);
        }
        function _updateACAT(acat) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.ACAT,acat._id), acat);
        }

        function _removeCostListLinear(cost_list){
            var item = {  item_id: cost_list.item_id  };
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,cost_list._id) +'/' + ACAT_COST_LIST_TYPE.LINEAR, item);
        }
        function _removeCostGroupList(group_cost_list){
            var item = {  item_id: group_cost_list.item_id  };
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListGroups,group_cost_list._id) +'/items', item);
        }
        function _removeCostGroup(group){
            var item = {  item_id: group.item_id  };
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,group._id) +'/group', item);
        }

        function _updateCostGroup(group) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,'grouped') +'/' +group._id, group);
        }
        function _resetCostList(cost_list) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,cost_list._id) +'/reset', {});
        }
    }


})(window.angular);