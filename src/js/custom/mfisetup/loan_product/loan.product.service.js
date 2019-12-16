/**
 * Created by Yoni on 3/30/2018.
 */


(function(angular) {
    'use strict';
    angular.module('app.mfi')

        .service('LoanProductService', LoanProductService);

    LoanProductService.$inject = ['$http','CommonService'];

    function LoanProductService($http, CommonService) {
        return {
            GetAllLoanProducts:_getAllLoanProducts,
            CreateLoanProduct:_createLoanProduct,
            UpdateLoanProduct:_updateLoanProduct,
            RemoveLoanProduct:_removeLoanProduct
        };

        function _getAllLoanProducts() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.ACAT,API.Methods.ACAT.LoanProducts));
        }
        function _removeLoanProduct(loanProduct) {

        }
        function _createLoanProduct(loanProduct) {
            return $http.post(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.CreateLoanProducts),loanProduct);
        }
        function _updateLoanProduct(loanProduct) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.LoanProducts,loanProduct._id),loanProduct);
        }
    }


})(window.angular);