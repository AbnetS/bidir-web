(function () {
    'use strict';
    angular.module('app.common').factory('NotifyService', NotifyService);

    NotifyService.$inject = ['toaster'];

    function NotifyService(toaster) {
        var toasterType = {
            error: 'error',
            info: 'info',
            warning: 'warning',
            success: 'success'
        };
        return {
            showError: error,
            showInfo: info,
            showWarning: warning,
            showSuccess: success
        };

        function error(title, message) {
            toaster.pop(toasterType.error, title, message);
        }

        function info(title, message) {
            toaster.pop(toasterType.info, title, message);
        }

        function warning(title, message) {
            toaster.pop(toasterType.warning, title, message);
        }

        function success(title, message) {
            toaster.pop(toasterType.success, title, message);
        }
    }
})();