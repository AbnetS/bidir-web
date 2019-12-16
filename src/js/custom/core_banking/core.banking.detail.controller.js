(function(angular) {
    "use strict";


    angular
        .module('app.banking')
        .controller('CoreBankingDetailController', CoreBankingDetailController);

    CoreBankingDetailController.$inject = ['CoreBankingService','$scope','$rootScope','blockUI','AlertService','$stateParams'];

    function CoreBankingDetailController(CoreBankingService,$scope,$rootScope,blockUI,AlertService,$stateParams) {
        var vm = this;
        vm.client_id = $stateParams.id;
        vm.titles = CoreBankingService.GetTitles;
        vm.updateClient = _updateClient;
        vm.updateClientAndSendToCBS = _updateClientAndSendToCBS;
        $rootScope.app.layout.isCollapsed = true;

        initialize();

        function initialize() {

            initializeDatePicker();
            vm.civilStatuses = CIVIL_STATUSES;
            vm.months = MONTHS_CONST;
            callAPI();
        }

        function callAPI() {

            CoreBankingService.GetClientById(vm.client_id).then(function (response) {
                vm.client = response.data;
                var clientCopy = angular.copy(vm.client);
                var dt = new Date(clientCopy.date_of_birth);
                vm.client.date_of_birth = dt;
                vm.client.civil_status = clientCopy.civil_status.toLowerCase();
                vm.client.gender = clientCopy.gender.toLowerCase();
            },function (error) {
                console.log("Updated client error",error);

                var message = error.data.error.message;
                AlertService.showError("Failed to update Client",message);

            });




        }

        function _updateClient() {

            var myBlockUI = blockUI.instances.get('CBSClientDetailBlockUI');
            myBlockUI.start();
            var client = vm.client;
            client.branch = vm.client.branch._id;
            client.created_by =  undefined;
            //UPDATE CLIENT INFORMATION
            CoreBankingService.UpdateClient(vm.client).then(function (response) {
                console.log("save client",response);
                myBlockUI.stop();
                AlertService.showSuccess("Updated Successfully","Updated Client information successfully");
            },function (error) {
                console.log("Updated client error",error);
                myBlockUI.stop();
                var message = error.data.error.message;
                AlertService.showError("Failed to update Client",message);

            });



        }

        function _updateClientAndSendToCBS() {
            var myBlockUI = blockUI.instances.get('CBSClientDetailBlockUI');
            myBlockUI.start();
            var client = vm.client;
            client.branch = vm.client.branch._id;
            client.created_by =  undefined;

            //UPDATE and SEND CLIENT INFORMATION TO CBS
            CoreBankingService.UpdateClient(vm.client).then(function (response) {
                console.log("save client",response);
                myBlockUI.stop();

                var clientFormatted = {
                    branchId: client.branchId,
                    title : client.title,
                    client: client._id };

                CoreBankingService.PostClientToCBS(clientFormatted).then(
                    function (response) {
                        AlertService.showSuccess("Updated and Sent to CBS Successfully","Updated Client information and Sent to CBS successfully");
                    }
                    ,function (error) {
                        console.log('error',error);
                        var message = error.data.error.message;
                        AlertService.showWarning( 'Oops... Something went wrong Client Info is updated but its not sent to CBS', message);
                    });


            },function (error) {
                console.log("Updated client error",error);
                myBlockUI.stop();
                var message = error.data.error.message;
                AlertService.showError("Failed to update Client",message);

            });
        }


        function initializeDatePicker() {
            vm.clear = function() {
                vm.dt = null;
            };

            vm.dateOptions = {
                dateDisabled: false,
                formatYear: "yy",
                maxDate: new Date(2020, 5, 22),
                startingDay: 1
            };

            vm.openPopup = function() {
                vm.popup1.opened = true;
            };

            vm.dateFormat = "dd-MMMM-yyyy";
            vm.altInputFormats = ["M!/d!/yyyy"];

            vm.popup1 = {
                opened: false
            };
        }

    }

})(window.angular);