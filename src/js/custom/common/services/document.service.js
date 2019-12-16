(function(angular) {
    'use strict';

    angular.module('app.common')
        .factory('DocumentService', DocumentService);
    DocumentService.$inject = ['$sce','$http','CommonService'];

    function DocumentService($sce,$http,CommonService) {
        var factory = {
            OpenDocument: _openDocument,
            GetDocument: _getDocument,
            GetGroupDocument: _getGroupDocument
        };

        return factory;

        function _openDocument(data, fileType) {
            var file = new Blob([data], fileType);
            return $sce.trustAsResourceUrl(URL.createObjectURL(file));
        }

        function _getDocument(id) {
            return $http({
                url: CommonService.buildUrlWithParam(API.Service.ACAT, API.Methods.ACAT.Printout, id),
                method: 'GET',
                responseType: 'arraybuffer'
            });
        }

        function _getGroupDocument(id) {
            return $http({
                url: CommonService.buildUrlWithParam(API.Service.GROUPS, API.Methods.Group.Printout, id),
                method: 'GET',
                responseType: 'arraybuffer'
            });
        }
    }

})(window.angular);
