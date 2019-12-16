/**
 * Created by Yonas on 20/2/2019.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("GroupLoanDetailController", GroupLoanDetailController);

    GroupLoanDetailController.$inject = ['LoanManagementService','$scope','$stateParams','$state','blockUI','DocumentService','APP_CONSTANTS'];

    function GroupLoanDetailController(LoanManagementService,$scope,$stateParams,$state,blockUI,DocumentService,APP_CONSTANTS) {
        var vm = this;
        vm.StyleLabelByStatus = LoanManagementService.StyleLabelByStatus;
        vm.onTabSelected = _onTabSelected;
        vm.loanProcessDetail = _loanProcessDetail;
        vm.backToList = _backToList;
        vm.printLoanProcess  = LoanManagementService.printLoanProcess;

        vm.downloadMemberListDocument = _downloadMemberListDocument;
        vm.downloadACATDocument = _downloadACATDocument;

        vm.ACATGroupOnClick = _aCATGroupOnClick;
        vm.onLoanProposalClick = _onLoanProposalClick;

        initialize();


        function _downloadMemberListDocument(group) {
            var group_id = group._id;
            var myBlockUI = blockUI.instances.get('groupMembersBlockUI');
            myBlockUI.start('Downloading...');
            DocumentService.GetGroupDocument(group_id).then(function (response) {
                window.open(DocumentService.OpenDocument(response.data,vm.FILE_TYPE.EXCEL), '_self', '');
                myBlockUI.stop();
            },function () { myBlockUI.stop(); });
        }
        function _downloadACATDocument(selectedClientACAT) {
            var client_ACAT_id = selectedClientACAT._id;
            var myBlockUI = blockUI.instances.get('acatTabBlockUI');
            myBlockUI.start('Downloading...');
            DocumentService.GetDocument(client_ACAT_id).then(function (response) {
                window.open(DocumentService.OpenDocument(response.data,vm.FILE_TYPE.EXCEL), '_self', '');
                myBlockUI.stop();
            },function () { myBlockUI.stop(); });
        }


        function initialize() {
            vm.tabsList = [
                { id:0,  heading:"Members",  code: 'members', route: 'app.group_loan_detail.members' },
                { id:1,  heading:"Screening", code: 'screening', route: 'app.group_loan_detail.screenings' },
                { id:2,  heading:"Loan Application", code: 'loan', route: 'app.group_loan_detail.loan' },
                { id:3,  heading:"A-CAT", code: 'acat', route: 'app.group_loan_detail.acat'  }
            ];
            ResetVisibility();
            vm.FILE_TYPE = APP_CONSTANTS.FILE_TYPE;

            vm.groupLoan = {};
            vm.groupLoanId = $stateParams.id;
            _.each(vm.tabsList,function (selectedTab) {
                if($state.current.name === selectedTab.route){
                    vm.selectedTab = selectedTab.id;
                    vm.selectedTabObj = selectedTab;
                }
            });

            callAPI();
        }
        function ResetVisibility() {
            vm.visibility = {
                showScreeningDetail: false,
                showLoanDetail: false,
                showACATDetail: false
            };
        }
        function callAPI() {
            vm.groupPromise = LoanManagementService.GetGroupLoan(vm.groupLoanId).then(function (response) {
                vm.groupLoan.group = response.data;
                GetData(vm.selectedTabObj.code);
            },function (error) {  });
        }

        function GetData(tabCode) {
            switch (tabCode) {
                case 'screening':
                    vm.groupScreeningPromise = LoanManagementService.GetGroupDataByLoanProcessStage('screenings',vm.groupLoanId).then(function (response) {
                        vm.groupLoan.screenings = response.data.screenings;
                        vm.groupScreening =  {
                            status: response.data.status,
                            last_modified: response.data.last_modified
                        };

                    },function (error) {});
                    break;
                case 'loan':
                    vm.groupLoanPromise = LoanManagementService.GetGroupDataByLoanProcessStage('loans',vm.groupLoanId).then(function (response) {
                        vm.groupLoan.loans = response.data.loans;
                        vm.groupLoanInfo =  {
                            status: response.data.status,
                            last_modified: response.data.last_modified
                        };
                    },function (error) {});
                    break;
                case 'acat':
                    vm.groupAcatPromise = LoanManagementService.GetGroupDataByLoanProcessStage('acats',vm.groupLoanId).then(function (response) {
                        vm.groupLoan.acats = response.data.acats;
                        vm.groupACAT =  {
                            status: response.data.status,
                            last_modified: response.data.last_modified
                        };
                    },function (error) {});
                    break;
                default:
                    break;
            }
        }


        function _onTabSelected(tab,index) {
            vm.selectedTab = index; //SET ACTIVE TAB
            vm.selectedTabObj = tab;
            ResetVisibility();
            GetData(tab.code); // get data for selected tab
            $state.go(tab.route); //REDIRECT TO CHILD VIEW
        }

        function _loanProcessDetail(stageData,tabCode,event) {
            switch (tabCode) {
                case 'screening':
                    vm.clientScreening = stageData;
                    vm.visibility.showScreeningDetail = true;
                    break;
                case 'loan':
                    vm.loanApplication = stageData;
                    vm.visibility.showLoanDetail = true;
                    break;
                case 'acat':
                    vm.selectedClientACAT = undefined; // reset on every load
                    vm.clientACATs = stageData;
                    vm.visibility.showACATDetail = true;
                    break;
                default:
                    break;
            }
        }

        function _backToList(tabCode) {
            switch(tabCode){
                case 'screening':
                    vm.visibility.showScreeningDetail = false;
                    break;
                case 'loan':
                    vm.visibility.showLoanDetail = false;
                    break;
                case 'acat':
                    vm.visibility.showACATDetail = false;
                    break;
            }
        }
        function _aCATGroupOnClick(selectedClientACAT,index) {
            vm.selectedClientACAT = selectedClientACAT;
            ShowCropPanel();
        }
        function _onLoanProposalClick(loanProduct) {
            ShowSummaryPanel();
            vm.selectedLoanProduct = loanProduct;
            vm.list = { settingActive: 10 };
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