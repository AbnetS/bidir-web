(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ngSanitize',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngResource',
            'ui.utils',
            'ngAria',
            'ngMessages',
            'angularMoment'
        ]);
})();