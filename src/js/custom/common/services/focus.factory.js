/**
 * Created by Yoni on 3/9/2018.
 */
(function(angular) {

    'use strict';

    angular.module('app.common')
        .factory('focus', focusService);

    function focusService($timeout, $window) {
        return function(id) {
            // timeout makes sure that is invoked after any other event has been triggered.
            // e.g. click events that need to run before the focus or
            // inputs elements that are in a disabled state but are enabled when those events
            // are triggered.
            $timeout(function() {
                var element = $window.document.getElementById(id);
                if(element)
                    element.focus();
            });
        };
    }

})(window.angular);