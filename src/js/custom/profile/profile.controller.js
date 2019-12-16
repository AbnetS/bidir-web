/**
 * Created by Yonas on 8/16/2018.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['ProfileService',   'blockUI', 'AlertService','$state'];

    function ProfileController( ProfileService,   blockUI,AlertService ,$state) {
        var vm = this;
        vm.updateProfile = _updateUserProfile;
        vm.changePassword = _changePassword;
        vm.resetCredentials = _resetCredentials;
        vm.credentials = undefined;

        vm.user = ProfileService.GetUserAccount();


        function _resetCredentials() {
            $state.reload();
        }

        function _updateUserProfile(user) {
            var profile = {
                _id:user._id,
                title:user.title,
                email: user.email,
                first_name : user.first_name,
                last_name:user.last_name,
                grandfather_name:user.grandfather_name,
                phone:user.phone
                // picture:""
            };
            var myBlockUI = blockUI.instances.get('UserProfileBlockUI');
            myBlockUI.stop();
            ProfileService.UpdateProfile(profile,vm.picFile).then(function (response) {
                myBlockUI.start();
                AlertService.showSuccess("Profile Information","User account information successfully updated");
            },function (error) {
                myBlockUI.stop();
                var message = error.data.error.message;
                AlertService.showError("User account information could not be updated",message);
            });
        }


        function _changePassword(user) {
            let profile = {
                _id:user._id,
                old_password:user.old_password,
                new_password: user.new_password
            };
            if(profile.old_password === profile.new_password){
                AlertService.showSuccess ("Change password", "The new password must be different from your previous password.");
            }else{
                var myBlockUI = blockUI.instances.get('credentialFormBlockUI');
                myBlockUI.start();
                ProfileService.ChangePassword(profile).then(function () {
                    myBlockUI.stop();
                    AlertService.showSuccess ("Change password", "Password successfully changed, log in with the new password!");
                //    AUTO LOGOUT
                },function (error) {
                    myBlockUI.stop();
                    var message = error.data.error.message;
                    AlertService.showError ("Unable to change password, please contact administrator", message);
                });
            }
        }
    }
})(window.angular);