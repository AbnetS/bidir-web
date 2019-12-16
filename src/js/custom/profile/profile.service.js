/**
 * Created by Yonas on 8/17/2018.
 */
(function(angular) {
    'use strict';
    angular.module('app.profile')

        .service('ProfileService', ProfileService);

    ProfileService.$inject = ['$http','CommonService','AuthService'];

    function ProfileService($http, CommonService,AuthService) {
        return {
            GetUserAccount: _getUserAccount,
            UpdateProfile: _updateProfile,
            ChangePassword: _changePassword
        };
        function _getUserAccount(){
            var user = AuthService.GetCurrentUser();
            return _.isUndefined(user.account)? user.admin:user.account;
        }

        function _updateProfile(account,picture){
            let userFormData = new FormData();
            userFormData.append('first_name', account.first_name);
            userFormData.append('last_name', account.last_name);
            userFormData.append('grandfather_name', account.grandfather_name);
            userFormData.append('title', account.title);
            userFormData.append('email', account.email);
            userFormData.append('phone', account.phone);

            if(!_.isUndefined(picture)){
                userFormData.append('picture', picture);
            }

            return $http({
                url: CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.Account,account._id) + '/profile',
                method: 'PUT',
                data: userFormData,
                headers: { 'Content-Type': undefined},
                transformRequest: angular.identity
            });
        }
        function _changePassword(userInfo){
            var user = AuthService.GetCurrentUser();
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.UserUpdate,user._id) + '/passwords',
                {old_password: userInfo.old_password, new_password:userInfo.new_password});
        }
    }

})(window.angular);