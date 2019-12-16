/**
 * Created by Yoni on 1/9/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientDetailController", ClientDetailController);

    ClientDetailController.$inject = ['LoanManagementService','$stateParams','blockUI','DocumentService','APP_CONSTANTS'];

    function ClientDetailController(LoanManagementService,$stateParams,blockUI,DocumentService,APP_CONSTANTS) {
        var vm = this;
        vm.clientId =  $stateParams.id;
        vm.visibility = {showMoreClientDetail: false};
        vm.labelBasedOnStatus = LoanManagementService.StyleLabelByStatus;

        vm.tabsList = [
            { index: 1, heading:"Screening", code: 'screening', templateUrl:"app/views/loan_management/client_management/tabs/screening.partial.html" },
            { index: 2, heading:"Loan Application", code: 'loan', templateUrl:"app/views/loan_management/client_management/tabs/loan.partial.html" },
            { index: 3, heading:"A-CAT", code: 'acat', templateUrl:"app/views/loan_management/client_management/tabs/acat.partial.html" }
        ];
        vm.activeTab = vm.tabsList[0]; //initially screening tab is active
        vm.activeTabIndex = vm.activeTab.index;

        vm.onSelectedLoanCycle = _onSelectedLoanCycle;

        vm.onTabSelected = _onTabSelected;
        vm.printLoanProcess = LoanManagementService.printLoanProcess;

        vm.ACATGroupOnClick = _aCATGroupOnClick;
        vm.onLoanProposalClick = _onLoanProposalClick;
        vm.downloadDocument = _downloadDocument;

        function _onSelectedLoanCycle(){
            _onTabSelected();
        }

        function getLoanCycles(){
            //filter loan cycles by max loan cycle number
            vm.loanCycles = [];
            _.each(LoanManagementService.loanCycles,function (cycle) {
                if(cycle.id <= vm.client.loan_cycle_number){
                    vm.loanCycles.push(cycle);
                }
                if(cycle.id === vm.client.loan_cycle_number){
                    vm.loanCycle = cycle.id.toString();
                }

            });
        }

        initialize();

        function initialize() {
            vm.FILE_TYPE = APP_CONSTANTS.FILE_TYPE;
            vm.visibility = {
                showCropPanel:false,
                showSummaryPanel:false,
                showWarningForLoanCycle: false
            };
            vm.query = {
                search:'',
                page:1,
                per_page:10
            };

            var myBlockUI = blockUI.instances.get('ClientBlockUI');
            myBlockUI.start();

            LoanManagementService.GetClientDetail(vm.clientId)
                .then(function(response){
                    myBlockUI.stop();
                    vm.client = response.data;
                    vm.loanCycle =  vm.client.loan_cycle_number;
                    getLoanCycles();
                    _onTabSelected();

                },function(error){
                    myBlockUI.stop();
                    console.log("error getting client detail",error);
                });
        }


        function CallClientScreeningAPI() {
            var blockUIName =  'screeningTabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            LoanManagementService.GetClientScreening(vm.clientId).then(function (response) {
                myBlockUI.stop();
                vm.clientScreening = response.data;
            },function (error) {
                myBlockUI.stop();
                console.log("error fetching screening",error);
            });
        }

        function GetClientApplicationByLoanCycle(application) {
            var blockUIName =  application + 'TabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            vm.clientScreening = undefined; // reset on every load
            vm.client.loan_application = undefined;// reset on every load
            vm.clientACATs = undefined;// reset on every load
            LoanManagementService.GetClientApplicationByLoanCycle(vm.clientId,application,vm.loanCycle).then(function (response) {
                myBlockUI.stop();

                if(application ==='screening'){
                    vm.clientScreening = response.data;
                } else if(application ==='loan'){
                    vm.client.loan_application = response.data;
                } else if(application ==='acat'){
                    vm.clientACATs = response.data;
                }

            },function (error) {
                myBlockUI.stop();
                console.log("error fetching data by loan cycle",error);
            });
        }

        function CallClientLoanApplicationAPI() {
            var blockUIName =  'loanTabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            vm.client.loan_application = undefined; // reset on every load
            LoanManagementService.GetClientLoanApplication(vm.clientId)
                .then(function (response) {
                    myBlockUI.stop();
                    vm.client.loan_application = response.data;
                },function (error) {
                    myBlockUI.stop();
                    console.log(" error .loan_application",error);
                });
        }

        function CallClientACAT() {
            var blockUIName =  'acatTabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            vm.clientACATs = undefined; // reset on every load
            LoanManagementService.GetClientACAT(vm.clientId)
                .then(function(response){
                    myBlockUI.stop();
                    vm.clientACATs = response.data;
                },function(error){
                    myBlockUI.stop();
                });

        }
        function setActiveTabObj() {
            vm.activeTab = {};
            vm.activeTab = _.find(vm.tabsList,function (tab) {
                return tab.index === vm.activeTabIndex;
            });
            vm.visibility.showWarningForLoanCycle = vm.loanCycle !==  vm.client.loan_cycle_number.toString();
        }
        function _onTabSelected() {
            setActiveTabObj();
            switch (vm.activeTab.code){
                case 'screening':
                    if(_.isUndefined(vm.loanCycle)){
                        CallClientScreeningAPI();
                    }else{
                        GetClientApplicationByLoanCycle(vm.activeTab.code);
                    }
                    break;
                case 'loan':
                    if(_.isUndefined(vm.loanCycle)){
                        CallClientLoanApplicationAPI();
                    }else{
                        GetClientApplicationByLoanCycle(vm.activeTab.code);
                    }
                    break;
                case 'acat':
                    if(_.isUndefined(vm.loanCycle)){
                        CallClientACAT();
                    }else{
                        GetClientApplicationByLoanCycle(vm.activeTab.code);
                    }
                    break;
                default:
                    break;
            }
        }

        function getLoanProposals() {
            LoanManagementService.GetClientLoanProposals(vm.clientACATs._id)
                .then(function(response){
                    vm.clientLoanProposals = response.data;
                },function(error){
                    console.log("error getting  clientLoanProposals ",error);
                });
        }

        function _aCATGroupOnClick(selectedClientACAT,index) {
            vm.selectedClientACAT = selectedClientACAT;
            // vm.selectedClientACAT.estimated.net_cash_flow

            sortMonths();

            ShowCropPanel();
        }

        function sortMonths() {

            // let net_cash_flow = [];
            // let firstExpenseMonth = MONTHS_CONST.find( mon => mon.name === vm.selectedClientACAT.first_expense_month);
            // let loop = true;
            // let index = firstExpenseMonth.number;
            // net_cash_flow.push(MONTHS_CONST[index]);
            // if(index === 11) index = 0; else index++;
            // while (loop) {
            //     if(index === firstExpenseMonth) loop = false;
            //     else {
            //         net_cash_flow.push(MONTHS_CONST[index]);
            //         if(index === 11) index = 0; else index++;
            //     }
            // }
            // return net_cash_flow;
        }



        function _onLoanProposalClick(loanProduct) {
            getLoanProposals();
            ShowSummaryPanel();
            vm.selectedLoanProduct = loanProduct;
            vm.list = { settingActive: 10 };

        }
        function _downloadDocument(selectedClientACAT) {
            var client_ACAT_id = selectedClientACAT._id;
            var myBlockUI = blockUI.instances.get('acatTabBlockUI');
            myBlockUI.start('Downloading...');
            DocumentService.GetDocument(client_ACAT_id).then(function (response) {
                window.open(DocumentService.OpenDocument(response.data,vm.FILE_TYPE.EXCEL), '_self', '');
                myBlockUI.stop();
            },function () { myBlockUI.stop(); });
        }

        function ShowCropPanel() {
            vm.visibility.showCropPanel = true;
            vm.visibility.showSummaryPanel = false;
        }
        function ShowSummaryPanel() {
            vm.visibility.showCropPanel = false;
            vm.visibility.showSummaryPanel = true;
        }
    }


})(window.angular);