/**
 * Created by Yoni on 3/19/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.acat").controller("ACATListController", ACATListController);

    ACATListController.$inject = ['ACATService','$state'];

    function ACATListController(ACATService,$state) {
        var vm = this;
        vm.addACAT = _addACAT;
        vm.editACAT = _editACAT;
        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearch;

        function _addACAT() {
            $state.go('app.acatbuilder',{id:0});
        }

        function _editACAT(acat) {
            $state.go('app.acatbuilder',{id:acat._id});
        }

        initialize();

        function initialize() {

            callApi();

            vm.pageSizes = [10, 25, 50, 100, 250, 500];
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

        }
        function _paginate (page, pageSize) {
            console.log('current Page: ' + vm.query.page + ' page size: ' + vm.query.per_page);
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callApi();

        }

        function callApi() {
            vm.promise =   ACATService.GetAllACATList().then(function (response) {
                vm.acat_list = response.data.docs;
                console.log("vm.acat_list",response);
            });
        }

        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            callApi();
        }



    }



})(window.angular);