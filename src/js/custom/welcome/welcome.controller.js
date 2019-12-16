/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.welcomePage')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['EnvironmentConfig','AuthService'];

    function WelcomeController( EnvironmentConfig ,AuthService) {
        var vm = this;
    }

}(window.angular));