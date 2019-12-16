(function(angular) {
    "use strict";


    angular
        .module('app.banking')
        .controller('CoreBankingController', CoreBankingController);

    CoreBankingController.$inject = ['CoreBankingService','$scope','AuthService','$rootScope','AlertService','$state'];

    function CoreBankingController(CoreBankingService,$scope,AuthService,$rootScope,AlertService,$state) {
        var vm = this;
        //GET TITLES LIST
        vm.titles = CoreBankingService.GetTitles;
        //CHECK ALL/UNCHECK ALL OPTIONS
        vm.onAllClientChange = _onAllClientChange;
        vm.CheckUncheckAll = _checkUncheckAll;
        vm.CheckUncheckHeader = _checkUncheckHeader;
        //Filter related
        vm.clearSearch = _clearSearch;
        vm.onSelectedBranch = _onSelectedBranch;
        //Client Related
        vm.saveSingleClient = _saveSingleClient;
        vm.saveAllClients = _saveAllClients;
        vm.cbs_clientDetail = _clientDetail;
        //UI SELECT Option for adding new titles
        vm.refreshResults = refreshResults;

        vm.statusStyle = _statusStyle;

        initialize();

        function initialize() {
            $rootScope.app.layout.isCollapsed = true;
            vm.filter = {show : false , allClient: "false"};
            vm.IsAllChecked = false;
            vm.query = { search: '' };
            vm.currentUser = {selected_access_branch:undefined};

            callCBSReadyApi();
            GetBranchFilter();
        }

        function _onAllClientChange() {
            if(vm.filter.allClient === "true"){
                GetAllClientsApi();
            }else{
                callCBSReadyApi();
            }
        }

        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                CoreBankingService.GetBranches().then(function(response){
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

        function _onSelectedBranch(){
            vm.clients = vm.clientsCopy;

            vm.clients = _.filter(vm.clients,function(client){
                if(!_.isUndefined(client.branch) && client.branch !== null){
                    return client.branch._id === vm.currentUser.selected_access_branch._id;
                }
            });

        }

        function _checkUncheckHeader() {
            vm.IsAllChecked = true;
            for (var i = 0; i < vm.clients.length; i++) {
                if (!vm.clients[i].selected) {
                    vm.IsAllChecked = false;
                    break;
                }
            }
        }

        function _checkUncheckAll() {
            for (var i = 0; i < vm.clients.length; i++) {
                if(vm.clients[i].status === 'loan_granted' ){
                    vm.clients[i].selected = vm.IsAllChecked;
                }else{
                    vm.clients[i].selected = false;
                }

            }
        }

        function _clientDetail(client){
            CoreBankingService.setClientInfo(client);
            $state.go('app.cbs_detail',{id:client._id});
        }

        function _statusStyle(status){
            var style = '';
            switch (status){
                case 'ACCEPTED':
                    style =  'label label-success';
                    break;
                case 'DENIED':
                    style =  'label label-danger';
                    break;
                case 'NO ATTEMPT':
                    style =  'label label-inverse';
                    break;
                default:
                    style =  'label label-warning';
            }
            return style;
        }

        function _saveSingleClient(client){

            var clientFormatted = {
                branchId: client.branchId,
                title : client.title,
                client: client._id };

            CoreBankingService.ConnectToCBS().then(function (value) {
                CoreBankingService.SendClientToCBS(clientFormatted).then(
                    function (response) {
                        AlertService.showSuccess('Client Info sent to CBS!','Client Information sent to Core Banking Solution!');
                        vm.onAllClientChange();
                    }
                    ,function (error) {
                        console.log('error',error);
                        var message = error.data.error.message;
                        AlertService.showError( 'Oops... Something went wrong', message);
                    });
                },function (reason) {
                    AlertService.showError( 'CAN NOT CONNECT TO CBS', reason);
                }
            );


        }

        function _saveAllClients(clients) {
            var clientList = [];
            _.each(clients, function (client) {
                if (client.selected && client.status === 'loan_granted') {
                    clientList.push({
                        branchId: vm.allBranchId,
                        client: client._id,
                        title: client.title ? client.title : " - "
                    });
                }
            });

            CoreBankingService.ConnectToCBS().then(function () {
                    CoreBankingService.SendBulkClientsToCBS(clientList).then(
                        function (response) {
                            AlertService.showSuccess(clientList.length + ' clients sent to CBS!',response);
                            console.log("response",response);
                        }
                        ,function (error) {
                            console.log('error',error);
                            var message = error.data.error.message;
                            AlertService.showError( 'Oops... Something went wrong', message);
                        });
                },function (reason) {
                    AlertService.showError( 'CAN NOT CONNECT TO CBS', reason);
                }
            );



            // AlertService.showInfo('Clients data sent to CBS!', "Total number of clients information sent to CBS is " + vm.clients.length);
        }

        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            callCBSReadyApi();
        }

        function callCBSReadyApi(){
            vm.clientPromise = CoreBankingService.GetClients().then(function(response){
                console.log(" callApi vm.clients",response);
                vm.clients =  response.data.docs;
                vm.clientsCopy = angular.copy(vm.clients);
                vm.CheckUncheckHeader();
            },function (error) {
                console.log("error callApi vm.clients",error);
            });
        }

        function GetAllClientsApi(){
            vm.clientPromise = CoreBankingService.GetAllClients().then(function(response){
                console.log(" callApi vm.clients",response);
                vm.clients = response.data.docs;
                vm.clientsCopy = angular.copy(vm.clients);
                vm.CheckUncheckHeader();
            },function (error) {
                console.log("error callApi vm.clients",error);
            });
        }



        function refreshResults($select){
            var search = $select.search,
                list = angular.copy($select.items),
                FLAG = -1;
            //remove last user input
            list = list.filter(function(item) {
                return item.id !== FLAG;
            });

            if (!search) {
                //use the predefined list
                $select.items = list;
            }
            else {
                //manually add user input and set selection
                var userInputItem = search;
                $select.items = [userInputItem].concat(list);
                $select.selected = userInputItem;
            }
        }

    }

})(window.angular);