/**
 * Created by Yoni on 12/10/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('CreateRoleController', CreateRoleController);

    CreateRoleController.$inject = ['$mdDialog','ManageRoleService','items','AlertService','blockUI'];
    function CreateRoleController($mdDialog, ManageRoleService,items,AlertService,blockUI) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveRole = _saveRole;
        vm.changeModuleStyle = _modulesStyle;
        vm.showFilterDialog = _showFilterDialog;
        vm.showFilter = false;
        vm.isEdit = items !== null;
        vm.role = items !== null?items:null;

        initialize();

        function setPermissions() {
            _.each(vm.role.permissions, function(oldPermission){
                _.each(vm.permissions, function(permission) {
                    if(permission.name === oldPermission.name && !permission.checked){
                        permission.checked = permission.name === oldPermission.name;
                    }
                });
            });
        }
        function preparePermissions() {
            vm.role.permissions = _.filter(vm.permissions,function(permission){
                return permission.checked? permission._id : null;
            });
        }
        function initialize(){
            var permissionFromStore = ManageRoleService.GetPermissionsFromStore();
            if(permissionFromStore !== null){
                vm.permissions = permissionFromStore;
                if(vm.isEdit){
                    setPermissions();
                }
            }else {
                var myLoadingBlockUI = blockUI.instances.get('RoleLoadingBlockUI');
                myLoadingBlockUI.start("Loading Role and Permissions");
                ManageRoleService.GetPermissions().then(function(response){
                    myLoadingBlockUI.stop();
                    vm.permissions = response.data.docs;
                    ManageRoleService.StorePermissions(vm.permissions);
                    if(vm.isEdit){
                        setPermissions();
                    }
                },function(){
                    myLoadingBlockUI.stop();
                });
            }
        }
        function _saveRole() {
            var myBlockUI = blockUI.instances.get('RoleBlockUI');
            myBlockUI.start();
            preparePermissions();
            if(vm.isEdit){
                ManageRoleService.UpdateRole(vm.role ).then(function () {
                        myBlockUI.stop();
                        $mdDialog.hide();
                        AlertService.showSuccess("updated successfully","Role and Permissions updated successfully");
                    },
                    function (error) {
                        myBlockUI.stop();
                        var message = error.data.error.message;
                        AlertService.showError("Failed to update Role",message);
                    });
            }else {
                ManageRoleService.SaveRole( vm.role).then(function () {
                        myBlockUI.stop();
                        AlertService.showSuccess("Saved successfully","Role and Permissions saved successfully");
                        $mdDialog.hide();
                    },
                    function (error) {
                        myBlockUI.stop();
                        var message = error.data.error.message;
                        AlertService.showError("Failed to Save Role",message);
                    });
            }
        }
        function _showFilterDialog() {}
        function _modulesStyle(module){
            var style = '';
            switch (module){
                case 'SCREENING':
                    style =  'label label-primary';
                    break;
                case 'SCREENING_MODULE':
                    style =  'label label-primary';
                    break;
                case 'FORM_BUILDER':
                    style =  'label label-danger';
                    break;
                case 'USER_MANAGEMENT':
                    style =  'label label-green';
                    break;
                case 'CLIENT_MANAGEMENT':
                    style =  'label label-warning';
                    break;
                case 'LOAN_MODULE':
                    style =  'label label-purple';
                    break;
                default:
                    style =  'label label-default';
            }
            return style;
        }
        function _cancel() {
            $mdDialog.cancel();
        }
    }
})(window.angular);

