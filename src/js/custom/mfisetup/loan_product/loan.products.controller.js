/**
 * Created by Yoni on 3/5/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.acat").controller("LoanProductsController", LoanProductsController);

    LoanProductsController.$inject = ['$mdDialog','RouteHelpers','LoanProductService'];

    function LoanProductsController($mdDialog,RouteHelpers,LoanProductService) {
        var vm = this;
        vm.addLoanProduct = _addLoanProduct;
        vm.editLoanProduct = _editLoanProduct;
        callAPI();

        function callAPI() {
            LoanProductService.GetAllLoanProducts().then(function (response) {
                vm.loanProducts = response.data.docs;
            });
        }

        function _addLoanProduct(loan_product,ev) {
            $mdDialog.show({
                locals: {data:{loan_product:loan_product}},
                templateUrl: RouteHelpers.basepath('mfisetup/loanproduct/loan.product.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'LoanProductDialogController',
                controllerAs: 'vm'
            }).then(function (answer) {
                callAPI();
            }, function (response) {
                console.log("refresh on response");
                callAPI();
            });
        }
        function _editLoanProduct(loan_product,ev) {
            $mdDialog.show({
                locals: {data:{loan_product:loan_product}},
                templateUrl: RouteHelpers.basepath('mfisetup/loanproduct/loan.product.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'LoanProductDialogController',
                controllerAs: 'vm'
            }).then(function (answer) {
                callAPI();
            }, function (response) {
                console.log("refresh on response");
                callAPI();
            });
        }


    }



})(window.angular);