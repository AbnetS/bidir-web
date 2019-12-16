/**
 * Created by Yonas on 7/2/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("ClientsController", ClientsController);

    ClientsController.$inject = ['LoanManagementService','$scope','blockUI','SharedService','AlertService'];

    function ClientsController(LoanManagementService,$scope,blockUI,SharedService,AlertService) {
        var vm = this;
        vm.clientDetailEdit = _clientDetailEdit;
        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearchText;
        vm.saveClient = _saveClient;
        vm.backToClientList = _backToClientList;



        initialize();

        function initialize() {
            initializeDatePicker();
            vm.visibility = { showClientDetail: false };
            vm.civilStatuses = CIVIL_STATUSES;
            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;

            vm.query = { search:'',   page:1,  per_page:10 };
            vm.months = MONTHS_CONST;
            callAPI();
            getBranches();
        }

        function callAPI() {
            var myBlockUI = blockUI.instances.get('clientsBlockUI');
            myBlockUI.start();

            vm.clientsPromise = LoanManagementService.GetClients(vm.query).then(function (response) {
                vm.clients = response.data.docs;
                vm.query.total_pages = response.data.total_pages;
                vm.query.total_docs_count = response.data.total_docs_count;
                myBlockUI.stop();
                console.log("clients",vm.clients);
            });
        }

        function _clientDetailEdit(client,ev) {
            console.log("client detail",client);
            vm.visibility.showClientDetail = true;
            //data set
            vm.selectedClient = client;
            var dt = new Date(client.date_of_birth);
            vm.selectedClient.date_of_birth = dt;
            vm.selectedClient.civil_status = client.civil_status.toLowerCase();
            vm.selectedClient.gender = client.gender.toLowerCase();
            vm.selected_branch = client.branch;
        }

        function _backToClientList() {
            vm.visibility = { showClientDetail: false };
        }
        function _saveClient() {

            if(_.isUndefined(vm.selected_branch)){
                AlertService.showWarning("Warning!","Please Select Branch....");
            }else{
                var myBlockUI = blockUI.instances.get('ClientDetailBlockUI');
                myBlockUI.start();
                var client = vm.selectedClient;
                client.branch = vm.selected_branch._id;
                client.created_by =  undefined;


                if( _.isUndefined(vm.selectedClient._id)){
                    //ADD NEW CLIENT INFORMATION
                    LoanManagementService.SaveClient(client).then(function (response) {
                        console.log("save client",response);
                        myBlockUI.stop();
                        vm.visibility = { showClientDetail: false };
                        AlertService.showSuccess("Saved Successfully","Saved Client information successfully");

                    },function (error) {
                        console.log("save client error",error);
                        myBlockUI.stop();
                        var message = error.data.error.message;
                        AlertService.showError("Failed to save client",message);

                    });
                }else{
                    //UPDATE CLIENT INFORMATION
                    LoanManagementService.UpdateClient(client).then(function (response) {
                        console.log("save client",response);
                        myBlockUI.stop();
                        vm.visibility = { showClientDetail: false };
                        AlertService.showSuccess("Updated Successfully","Updated Client information successfully");
                    },function (error) {
                        console.log("Updated client error",error);
                        myBlockUI.stop();
                        var message = error.data.error.message;
                        AlertService.showError("Failed to update Client",message);

                    });
                }


            }

        }

        function getBranches() {
            SharedService.GetBranches().then(function(response){
                vm.branches = response.data.docs;
                console.log("vm.branches",vm.branches);
            },function(error){
                console.log("error",error);
            });
        }

        /**
         *
         *  Paging parameters and methods
         */
        function _paginate(page, pageSize) {
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callAPI();
        }
        function _clearSearchText() {
            vm.query.search = '';
            vm.filter.show = false;
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
        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("searching clients for ",newValue);
            }
        });

    }

})(window.angular);