/**
 * Created by Yoni on 12/11/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.manage_roles')

        .service('ManageRoleService', ManageRoleService);
    ManageRoleService.$inject = ['$http', 'CommonService','AuthService','StorageService','APP_CONSTANTS'];

    function ManageRoleService($http, CommonService,AuthService,StorageService,APP_CONSTANTS) {
        return {
            GetRoles: _getRoles,
            GetPermissions: _getPermissions,
            GetPermissionsbyGroup:_getPermissionsbyGroup,
            SaveRole: _saveRole,
            UpdateRole:_updateRole,
            StorePermissions:_storePermissions,
            GetPermissionsFromStore:_getPermissionsFromStorage
        };

        function _getRoles(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.Roles));
        }

        function _getPermissions(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Roles.Permissions));
        }
        function _getPermissionsbyGroup(){
            return $http.get(CommonService.buildUrl(API.Service.Users,API.Methods.Roles.PermissionByGroup));
        }

        function _saveRole(role) {
            return $http.post(CommonService.buildUrl(API.Service.Users,API.Methods.Roles.Create), role);
        }

        function _updateRole(role) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Roles.GetAll,role._id), role);
        }

        function _storePermissions(permissions) {
            return StorageService.Set(APP_CONSTANTS.StorageKey.PERMISSIONS, permissions);
        }
        function _getPermissionsFromStorage() {
            return !_.isUndefined(StorageService.Get(APP_CONSTANTS.StorageKey.PERMISSIONS)) ? StorageService.Get(APP_CONSTANTS.StorageKey.PERMISSIONS) : null;
        }

    }

})(window.angular);
