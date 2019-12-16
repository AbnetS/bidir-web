/**
 * Created by Yoni on 3/5/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.acat").controller("CropsController", CropsController);

    CropsController.$inject = ['ACATService','$mdDialog','RouteHelpers','$scope'];

    function CropsController(ACATService,$mdDialog,RouteHelpers,$scope) {
        var vm = this;
        vm.addCrop = _addCrop;
        vm.editCrop = _addCrop;
        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearch;

        initialize();

        function initialize() {
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

            callApi();
        }


        function _paginate (page, pageSize) {
            console.log('current Page: ' + vm.query.page + ' page size: ' + vm.query.per_page);
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callApi();

        }

        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            callApi();
        }

       function callApi(){
        vm.promise =   ACATService.GetCrops().then(function (response) {
               vm.crops = response.data.docs;
           });
       }


        function _addCrop(crop,ev) {
            $mdDialog.show({
                locals: {data:{crop:crop}},
                templateUrl: RouteHelpers.basepath('acat/crop/crop.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: cropDialogController,
                controllerAs: 'vm'
            }).then(function (answer) {
                callApi();
            }, function (response) {
                console.log("refresh on response");
            });
        }

        function cropDialogController($mdDialog,data,CommonService,AlertService,blockUI) {
            var vm = this;
            vm.cancel = _cancel;
            vm.saveCrop = _saveCrop;
            vm.isEdit = data.crop !== null;

            vm.cropForm = {
                IsnameValid: true,
                IscategoryValid: true
            };

            if(vm.isEdit){
                vm.crop = data.crop;
            }

            function _saveCrop() {
                vm.IsValidData = CommonService.Validation.ValidateForm(vm.cropForm, vm.crop);
                if (vm.IsValidData) {
                    var myBlockUI = blockUI.instances.get('CropBlockUI');
                    myBlockUI.start();
                    if(vm.isEdit){
                        ACATService.UpdateCrop(vm.crop)
                            .then(function (response) {
                                $mdDialog.hide();
                                AlertService.showSuccess("CROP","CROP UPDATED SUCCESSFULLY!");
                                myBlockUI.stop();
                            },function (error) {
                                console.log("error",error);
                                var message = error.data.error.message;
                                AlertService.showError("FAILED TO UPDATE CROP", message);
                                myBlockUI.stop();
                            });
                    }else{
                        ACATService.SaveCrop(vm.crop)
                            .then(function (response) {
                                $mdDialog.hide();
                                AlertService.showSuccess("CROP","CROP CREATED SUCCESSFULLY!");
                                myBlockUI.stop();
                            },function (error) {
                                console.log("error on crop create",error);
                                var message = error.data.error.message;
                                AlertService.showError("FAILED TO CREATE CROP", message);
                                myBlockUI.stop();
                            });
                    }

                }else {
                    AlertService.showWarning("Warning","Please fill the required fields and try again.");
                }
            }
            function _cancel() {
                $mdDialog.cancel();
            }
        }

    }



})(window.angular);