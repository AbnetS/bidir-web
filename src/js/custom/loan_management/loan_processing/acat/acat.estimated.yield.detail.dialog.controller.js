(function (angular) {
    "use strict";

    angular.module("app.processing")
        .controller("EstimatedYieldDetailController", EstimatedYieldDetailController);

    EstimatedYieldDetailController.$inject = ['$mdDialog','data'];

    function EstimatedYieldDetailController($mdDialog,data) {
        var vm = this;
        console.log("data",data);

        vm.cancel = _cancel;
        vm.saveProductForMarket = _saveProductForMarket;


        function _cancel() {
            $mdDialog.cancel();
        }

        function _saveProductForMarket() {
            $mdDialog.hide("hello");
        }
    }
})(window.angular);