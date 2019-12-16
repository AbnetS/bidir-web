/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('ManageRoleController', ManageRoleController);

    ManageRoleController.$inject = ['ManageRoleService', '$mdDialog', 'RouteHelpers'];

    function ManageRoleController( ManageRoleService, $mdDialog, RouteHelpers)
    {
        let vm = this;
        vm.addRole = _addRole;
        vm.editRole = _editRole;
        vm.visibility = {
            loading: true,
            noData: false,
        };

        fetchRoles();

        function fetchRoles() {
           ManageRoleService.GetRoles().then(function(response){
               vm.roles = response.data.docs;
               vm.visibility = {
                   loading: false,
                   noData: false,
               };
           },function () {
               vm.visibility = {
                   loading: false,
                   noData: true,
               };
           });
       }
        function _addRole(ev){

            $mdDialog.show({
                locals: {
                    items: null
                },
                templateUrl: RouteHelpers.basepath('manageroles/create.role.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateRoleController',
                controllerAs: 'vm'
            }).then(function () {
                    fetchRoles();
                }, function () {
                });
        }
        function _editRole(role,ev) {
            $mdDialog.show({
                locals: {
                    items: role
                },
                templateUrl: RouteHelpers.basepath('manageroles/create.role.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateRoleController',
                controllerAs: 'vm'
            }).then(function () {
                    fetchRoles();
                }, function () {
                });
        }
    }
})(window.angular);

