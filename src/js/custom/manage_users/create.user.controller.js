/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$mdDialog','ManageUserService','items','AlertService','AuthService','blockUI','$scope','CommonService'];
    function CreateUserController($mdDialog, ManageUserService,items,AlertService,AuthService,blockUI,$scope,CommonService) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveUser = _saveUser;
        vm.onSelectedDefaultBranch = _onSelectedDefaultBranch;
        vm.isEdit = items !== null;
        vm.user = items !== null?items:{};
        vm.user.selected_access_branches = [];
        vm.UserValidationForm = {
            Isfirst_nameValid: true,
            Islast_nameValid: true,
            Isselected_default_branchValid: true,
            Isselected_roleValid: true,
            IsusernameValid: true
        };

        initialize();

        function _saveUser() {
            vm.IsValidData = CommonService.Validation.ValidateForm(vm.UserValidationForm, vm.user);

            if(vm.IsValidData){
                var myBlockUI = blockUI.instances.get('CreateUserForm');
                myBlockUI.start("Storing User");
                var userInfo = {
                    first_name: vm.user.first_name,
                    last_name: vm.user.last_name,
                    grandfather_name:vm.user.grandfather_name,
                    title: vm.user.title,
                    role : vm.user.selected_role._id,
                    hired_date:vm.user.hired_date,
                    default_branch : vm.user.selected_default_branch._id,
                    access_branches:[],
                    multi_branches: vm.user.multi_branches
                };

                _.forEach(vm.user.selected_access_branches,function(accessBranch){

                    var found = userInfo.access_branches.some(function (el) {
                        return el._id === accessBranch._id;
                    });

                    if (!found && !userInfo.multi_branches) {
                        userInfo.access_branches.push(accessBranch._id);
                    }
                });

                if(vm.isEdit){

                    userInfo._id = vm.user.account._id;

                    ManageUserService.UpdateUser( userInfo ).then(function (data) {
                            myBlockUI.stop();
                            console.log("updated successfully", data);
                            $mdDialog.hide();
                            AlertService.showSuccess('Updated Successfully!', 'User Information is Updated');
                        },
                        function (error) {
                            myBlockUI.stop();
                            var message = error.data.error.message;
                            AlertService.showError( 'Oops... Something went wrong', message);
                            console.log("could not be saved", error);
                        });

                }else {

                    userInfo.username = vm.user.username;
                    userInfo.password = vm.user.password;

                    ManageUserService.CreateUser(userInfo).then(
                        function (data) {
                            myBlockUI.stop();
                            AlertService.showSuccess('Saved Successfully!', 'User Information is saved successfully');
                            console.log("saved successfully", data);
                            $mdDialog.hide();
                            //TODO: Alert & fetch user collection
                        },
                        function (error) {
                            myBlockUI.stop();
                            var message = error.data.error.message;
                            AlertService.showError( 'Oops... Something went wrong', message);
                            console.log("could not be saved", error);
                        }
                    );
                }
            }
            else {
                AlertService.showError( 'Oops... Something went wrong', "You haven't provided all required fields.");
            }



        }

        function initialize(){
            if(vm.isEdit){
                var myLoadingBlockUI = blockUI.instances.get('UserFormLoader');
                myLoadingBlockUI.start("Loading User Information");
                angular.extend(vm.user, vm.user.account);
                var dt = new Date(vm.user.hired_date);
                vm.user.hired_date = dt;
            }

            GetRolesAndSetSelectedValue();

            if(AuthService.IsSuperuser()){
                ManageUserService.GetBranches().then(function(response){
                    vm.branches = response.data.docs;
                    if(vm.isEdit){
                        setBranchesSelectedValue(vm.branches);
                        myLoadingBlockUI.stop();
                    }
                },function(error){
                    console.log("error",error);
                });
            }else{
                vm.branches =  AuthService.GetAccessBranches();
                if(vm.isEdit){
                    setBranchesSelectedValue(vm.branches);
                    myLoadingBlockUI.stop();
                }
            }

        }

        function GetRolesAndSetSelectedValue() {
            ManageUserService.GetRoles().then(function(response){
                vm.roles = response.data.docs;
                if(vm.isEdit){
                    //LOAD Role select value
                    angular.forEach(vm.roles,function(role){
                        if(!_.isUndefined(vm.user.account)){
                            if(role._id === vm.user.account.role._id){
                                vm.user.selected_role = role;
                            }}

                    });
                }
            },function(error){
                console.log("error",error);
            });
        }

        function setBranchesSelectedValue(branches) {
            angular.forEach(branches,function(branch){
                //LOAD Default Branch select value
                if(!_.isUndefined(vm.user.default_branch._id)){

                    if(branch._id === vm.user.default_branch._id){
                        vm.user.selected_default_branch = branch;
                    }
                }
                //LOAD access branch select values
                if(vm.user.access_branches.length > 0 && !vm.user.multi_branches)
                {
                    var found = vm.user.access_branches.some(function (accBranch) {
                        return accBranch._id === branch._id;
                    });

                    if (found) {
                        vm.user.selected_access_branches.push(branch);
                    }
                }

            });
        }

        function _onSelectedDefaultBranch() {
            var branchExist = vm.user.selected_access_branches.indexOf(vm.user.selected_default_branch);
            if (branchExist === -1 && !vm.user.multi_branches) {
                vm.user.selected_access_branches.push(vm.user.selected_default_branch);
            }
        }

        $scope.$watch(function() {
            return vm.user.multi_branches;
        }, function(current, original) {
            //if multi_branch is on clear access branch list
            if(current){
                vm.user.selected_access_branches = [];
            }
        });

        function _cancel() {
            $mdDialog.cancel();
        }

        vm.clear = function() {
            vm.dt = null;
        };
        vm.dateOptions = {
            dateDisabled: false,
            formatYear: "yy",
            maxDate: new Date(2020, 5, 22),
            startingDay: 1
        };
        vm.openDatePicker = function() {
            vm.popup1.opened = true;
        };
        vm.format = "dd-MMMM-yyyy";
        vm.altInputFormats = ["d!/M!/yyyy"];
        vm.popup1 = {
            opened: false
        };
    }
})(window.angular);

