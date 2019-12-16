/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function(angular) {
    "use strict";

    angular
        .module('app.authentication')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['AuthService', '$state',  '$rootScope',  'APP_CONSTANTS',  'blockUI', 'AlertService'];

    function LoginFormController( AuthService,  $state, $rootScope,  APP_CONSTANTS, blockUI,AlertService
    ) {
        var vm = this;
        vm.userValidator = {
            usernameMin: 4,
            usernameMax: 20,
            passwordMin: 6
        };

        vm.login = function() {
            var myBlockUI = blockUI.instances.get('loginFormBlockUI');
            myBlockUI.start("Logging in");

            AuthService.login(vm.user).then(
                function(response) {
                    console.log("login user",response);
                    var result = response.data;
                    vm.user = result.user;
                    $rootScope.currentUser = vm.user;
                    $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
                    AuthService.SetCredentials(result);
                    myBlockUI.stop();
                    AuthService.RedirectToAttemptedUrl();
                },
                function(error) {
                    myBlockUI.stop();
                    console.log("error", error);
                    AlertService.showError("Error on Login", "The username or password is incorrect! Please try again.");
                    $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginFailed);
                }
            );


        };
    }
})(window.angular);

