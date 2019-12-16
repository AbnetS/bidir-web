/**
 * Created by Yoni on 3/5/2018.
 */

(function (angular) {
    "use strict";

    angular.module("app.acat").controller("LoanProductDialogController", LoanProductDialogController);

    LoanProductDialogController.$inject = ['$mdDialog', 'data', 'AlertService', 'blockUI', 'LoanProductService'];

    function LoanProductDialogController($mdDialog, data, AlertService, blockUI,LoanProductService) {
        var vm = this;
        vm.cancel = _cancel;
        vm.addToDeductibleList = _addToDeductibleList;
        vm.addToCostOfLoanList = _addToCostOfLoanList;
        vm.editDeductibleItem = _editDeductibleItem;
        vm.editCostOfLoanItem = _editCostOfLoanItem;
        vm.cancelEdit = _cancelEdit;
        vm.showCancelForEdit = _showCancelForEdit;
        vm.saveLoanProduct = _saveLoanProduct;
        vm.removeLoanProductCostItem = _removeLoanProductCostItem;
        vm.onLPTypeChange = _onLPTypeChange;


        initialize();

        function initialize() {
            vm.isEdit = data.loan_product !== null;
            vm.isEditCostOfLoan = false;
            vm.isEditDeductible = false;

            if (vm.isEdit) {
                vm.loan_product = data.loan_product;
                LoadDeductibleAndCostOfLoanTypes(vm.loan_product);

                vm.loan_product.deductible = {type: 'fixed_amount'};
                vm.loan_product.costOfLoan = { type: 'fixed_amount'};

            } else {
                vm.loan_product = {
                    deductibles: [],
                    cost_of_loan: [],
                    deductible: {
                        type: 'fixed_amount'
                    },
                    costOfLoan: {
                        type: 'fixed_amount'
                    }
                };
            }
        }


        function LoadDeductibleAndCostOfLoanTypes(loanProd) {

            _.each(loanProd.cost_of_loan, function (cLoan) {
                cLoan.type = cLoan.fixed_amount > 0 ? 'fixed_amount' : cLoan.percent > 0 ? 'percent' : 'fixed_amount';
            });

            _.each(loanProd.deductibles, function (deduct) {
                deduct.type = deduct.fixed_amount > 0 ? 'fixed_amount' : deduct.percent > 0 ? 'percent' : 'fixed_amount';
            });
        }

        function _cancel() {
            $mdDialog.cancel();
        }

        function _addToDeductibleList(item) {
            if (!_.isUndefined(item.item) && item.item !== '' && (_.isUndefined(item.percent) || _.isUndefined(item.fixed_amount) )) {
                console.log("vm.isEditDeductible",vm.isEditDeductible);
                if (!vm.isEditDeductible) {
                    vm.loan_product.deductibles.push(item);
                    vm.loan_product.deductible = {type: 'fixed_amount'};
                } else {
                    console.log("item",item);
                    vm.loan_product.deductibles = _.filter(vm.loan_product.deductibles,function (dedu) {
                        return dedu._id !== item._id;
                    });
                    vm.loan_product.deductibles.push(item);
                    console.log("vm.loan_product.deductibles",vm.loan_product.deductibles);
                    vm.cancelEdit(true);
                }
            }

        }

        function _editDeductibleItem(item) {
            vm.loan_product.deductibleCopy = angular.copy(item);
            vm.loan_product.deductible = item;
            vm.isEditDeductible = true;
        }

        function _addToCostOfLoanList(item) {

            if (!_.isUndefined(item.item) && item.item !== '' &&
                (_.isUndefined(item.percent) || _.isUndefined(item.fixed_amount) )) {
                if (!vm.isEditCostOfLoan) {
                    vm.loan_product.cost_of_loan.push(item);
                    vm.loan_product.costOfLoan = {type: 'fixed_amount'};//reset
                } else {
                    vm.cancelEdit('costOfLoan');
                }

            }

        }

        function _editCostOfLoanItem(item) {
            vm.loan_product.costOfLoanCopy = angular.copy(item);
            vm.loan_product.costOfLoan = item;
            vm.isEditCostOfLoan = true;
        }

        function _removeLoanProductCostItem(cost, isDeductible) {
            AlertService.showConfirmForDelete("You are about to DELETE " + cost.item,
                "Are you sure?", "Yes, Delete it!", "warning", true, function (isConfirm) {
                    if (isConfirm) {
                        var itemIndex = -1;
                        if (isDeductible) {
                            itemIndex = vm.loan_product.deductibles.indexOf(cost);
                            if (itemIndex !== -1) {
                                vm.loan_product.deductibles.splice(itemIndex, 1);
                                console.log("removed item from deductibles");
                            }
                        } else {
                            itemIndex = vm.loan_product.cost_of_loan.indexOf(cost);
                            if (itemIndex !== -1) {
                                vm.loan_product.cost_of_loan.splice(itemIndex, 1);
                                console.log("removed item from cost_of_loan");
                            }
                        }
                    }
                });
        }

        function _showCancelForEdit(cost, isDeductible) {
            if (isDeductible) {
                return vm.isEditDeductible && vm.loan_product.deductible._id === cost._id;
            } else {
                return vm.isEditCostOfLoan && vm.loan_product.costOfLoan._id === cost._id;
            }
        }

        function _cancelEdit(isDeductible) {
            if (isDeductible) {
                var index = vm.loan_product.deductibles.indexOf(vm.loan_product.deductible);
                if (index !== -1) {
                    vm.loan_product.deductibles[index] =  vm.loan_product.deductibleCopy;
                }
                vm.loan_product.deductible = {type: 'fixed_amount'};
                vm.isEditDeductible = false;
                vm.showCancelForEdit(vm.loan_product.deductible, isDeductible);
            } else {

                var index = vm.loan_product.cost_of_loan.indexOf(vm.loan_product.costOfLoan);

                if (index !== -1) {
                    vm.loan_product.cost_of_loan[index] =  vm.loan_product.costOfLoanCopy;
                }
                vm.loan_product.costOfLoan = {type: 'fixed_amount'};
                vm.isEditCostOfLoan = false;
                vm.showCancelForEdit(vm.loan_product.costOfLoan, isDeductible);
            }
        }

        function _saveLoanProduct() {
            var myBlockUI = blockUI.instances.get('LoanProductBlockUI');
            myBlockUI.start();

            if (!vm.isEdit) {
                LoanProductService.CreateLoanProduct(vm.loan_product).then(function (response) {
                    console.log("created loan product", response.data);
                    AlertService.showSuccess("LOAN PRODUCT", "Loan Product Created successfully");
                    $mdDialog.hide();
                    myBlockUI.stop();
                }, function (error) {
                    myBlockUI.stop();
                    var message = error.data.error.message;
                    AlertService.showError("FAILED TO CREATE LOAN PRODUCT", message);
                    console.log("error", error);
                });
            } else {
                LoanProductService.UpdateLoanProduct(vm.loan_product).then(function (response) {
                    console.log("Updated loan product", response.data);
                    AlertService.showSuccess("LOAN PRODUCT", "Loan Product Updated successfully");
                    myBlockUI.stop();
                    $mdDialog.hide();
                }, function (error) {
                    var message = error.data.error.message;
                    AlertService.showError("FAILED TO UPDATE LOAN PRODUCT", message);
                    myBlockUI.stop();
                    console.log("error", error);
                });
            }

        }

        function _onLPTypeChange(isDeductible) {
            if(vm.isEditCostOfLoan || vm.isEditDeductible){
                AlertService.showConfirmForDelete("You are about to change type," +
                    " Which will reset amount/percent field to 0.",
                    "Are you sure?", "YES, CHANGE IT!", "warning", true,function (isConfirm) {
                        if(isConfirm){
                            if(isDeductible) {
                                vm.loan_product.deductible.fixed_amount = 0;
                                vm.loan_product.deductible.percent = 0;
                            }else{
                                vm.loan_product.costOfLoan.fixed_amount = 0;
                                vm.loan_product.costOfLoan.percent = 0;
                            }
                        }else{
                        //    REVERT BACK THE TYPE TO THE FIRST
                        }
                    });
            }else{
                // console.log("type on create",type);
            }

        }
    }


})(window.angular);