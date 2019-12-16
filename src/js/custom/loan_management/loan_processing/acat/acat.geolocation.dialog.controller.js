(function (angular) {
    "use strict";

    angular.module("app.processing")
        .controller("GeoLocationController", GeoLocationController);

    GeoLocationController.$inject = ['$mdDialog','data'];

    function GeoLocationController($mdDialog,data) {
        var vm = this;
        vm.gps_location = { polygon: [],single_point:{}};
        console.log("data",data);

        vm.cancel = _cancel;
        vm.updateGeoLocation = _updateGeoLocation;
        vm.addEditGeoLocation = _addEditGeoLocation;


        function _cancel() {
            $mdDialog.cancel();
        }

        function _updateGeoLocation(geolocation) {
            $mdDialog.hide("hello");
        }

        function _addEditGeoLocation(geolocation) {
            vm.gps_location.polygon.push(angular.copy(geolocation));
            // $mdDialog.hide("hello");
        }
    }
})(window.angular);