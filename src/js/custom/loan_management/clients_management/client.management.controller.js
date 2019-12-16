/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.loan_management")
        .controller("ClientManagementController", ClientManagementController);
    ClientManagementController.$inject = ['LoanManagementService','$state','$scope','AuthService'];

    function ClientManagementController(LoanManagementService,$state,$scope,AuthService) {
        var vm = this;
        vm.currentUser = {selected_access_branch:undefined};
        vm.labelBasedOnStatus = LoanManagementService.StyleLabelByStatus;
        vm.paginate = _paginate;
        vm.clearSearch = _clearSearch;
        //CLIENT RELATED
        vm.clientDetail = _clientDetail;
        vm.onSelectedBranch = _onSelectedBranch;
        vm.onSelectedLoanCycle = _onSelectedLoanCycle;



        initialize();

        function initialize() {
            vm.pageSizes = [10, 25, 50, 100, 250, 500];
            vm.loanCycles = LoanManagementService.loanCycles;
            vm.filter = {show : false};
            vm.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: true,
                decapitate: true,
                largeEditDialog: false,
                boundaryLinks: true,
                limitSelect: true,
                pageSelect: false
            };
            vm.query = {
                search:'',
                page:1,
                per_page:10
            };

            callApi();
            GetBranchFilter();
        }


        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            callApi();
        }
        function _paginate (page, pageSize) {
            console.log('current Page: ' + vm.query.page + ' page size: ' + vm.query.per_page);
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callApi();

        }

        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                LoanManagementService.GetBranches().then(function(response){
                    vm.currentUser.user_access_branches = response.data.docs;
                },function(error){
                    vm.currentUser.user_access_branches = [];
                    console.log("error on GetBranchFilter",error);
                });
            }
            else {
                vm.currentUser.user_access_branches = AuthService.GetAccessBranches();
            }
        }

        function callApi(){
            vm.clientPromise = LoanManagementService.GetClients(vm.query).then(function(response){
                vm.clients = response.data.docs;
                vm.clientsCopy = angular.copy(vm.clients);
                vm.query.total_docs_count =  response.data.total_docs_count;
            },function (error) {
                console.log("error callApi vm.clients",error);
            });
        }

        function SearchApi(SearchText){
            vm.clientPromise = LoanManagementService.SearchClient(SearchText)
                .then(function(response){
                    vm.clients = response.data.docs;
                    vm.clientsCount = response.data.total_docs_count;
                    vm.query.total_docs_count =  response.data.total_docs_count;
                    console.log(response);
                },function (error) {
                    vm.clients = vm.clientsCopy;
                    console.log("error",error);
                });
        }

        function _clientDetail(client,ev) {
            $state.go('app.client_detail',{id:client._id});
        }

        function _onSelectedBranch(){
            vm.clients = vm.clientsCopy;

            vm.clients = _.filter(vm.clients,function(client){
                if(!_.isUndefined(client.branch) && client.branch !== null){
                    return client.branch._id === vm.currentUser.selected_access_branch._id;
                }
            });

        }
        function _onSelectedLoanCycle(){

            vm.clientPromise = LoanManagementService.GetClientByLoanCycle(vm.currentUser.loanCycle)
                .then(function(response){
                    vm.clients = response.data.docs;
                    vm.clientsCount = response.data.total_docs_count;
                    console.log(response);
                },function (error) {
                    vm.clients = vm.clientsCopy;
                    console.log("error",error);
                });
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                //make sure at least two characters are entered
                if(newValue.length > 2){
                    SearchApi(newValue);
                }else{
                    vm.clients = vm.clientsCopy;
                }

            }
        });

    }


})(window.angular);