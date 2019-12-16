/**
 * Created by Yonas on 7/3/2018.
 */
(function(angular) {
    'use strict';
    var screenings = {
        bindings: { },
        templateUrl: 'app/views/loan_management/loan_processing/tabs/screenings.html',
        controller: 'ScreeningProcessorController',
        controllerAs:'vm'
    };

    angular.module('app.processing')
        .component('screenings', screenings);
})(window.angular);