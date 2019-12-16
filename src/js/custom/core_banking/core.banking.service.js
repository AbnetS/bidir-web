(function(angular) {
    'use strict';
    angular.module('app.banking')

        .service('CoreBankingService', CoreBankingService);

    CoreBankingService.$inject = ['$http','CommonService','AuthService'];

    function CoreBankingService($http, CommonService, AuthService) {
        var Client = {};
        return {
            GetClients: _getClients,
            GetAllClients: _getAllClients,
            GetTitles: ["Obo","Ato","W/rt","W/ro","Mr","Mrs","Miss","Dr."],
            SearchClient:_searchClient,
            ConnectToCBS:_connectToCBS,
            SendClientToCBS:_postClientToCBS,
            SendBulkClientsToCBS:_postBulkClientsToCBS,
            setClientInfo: _setClientInfo,
            getClientInfo: _getClientInfo,
            UpdateClient: _updateClient,
            GetClientById:_getClientById,
            GetBranches:_getBranches
        };

        function _setClientInfo(client) {
            Client = client;
        }
        function _getClientInfo() {
            return Client;
        }

        function _getClients(parameters){
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.CBS.Clients));
        }
        function _getAllClients(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients));
        }

        function _postClientToCBS(client){
            return $http.post(CommonService.buildUrl(API.Service.SCREENING,API.Methods.CBS.CBS),client);
        }

        function _postBulkClientsToCBS(clients){
            return $http.post(CommonService.buildUrl(API.Service.SCREENING,API.Methods.CBS.CBSBulk),clients);
        }
        function _connectToCBS(){
            return $http.post(CommonService.buildUrl(API.Service.SCREENING,API.Methods.CBS.Connect));
        }

        function _searchClient(searchText) {
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients) + '/search=' + searchText);
        }

        function _updateClient(client) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.SCREENING.Clients,client._id),client);
        }
        function _getClientById(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.Clients.Client,id));
        }

        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }


    }

})(window.angular);