(function(angular) {
  "use strict";

    angular.module("app.mfi").controller("BranchController", BranchController);

    BranchController.$inject = ['RouteHelpers','$mdDialog','MainService','AlertService','blockUI'];

  function BranchController(RouteHelpers, $mdDialog, MainService,AlertService,blockUI) {
    var vm = this;

    vm.addBranch = addBranch;
    vm.editBranch = _editBranch;
    vm.changeStatus = _changeStatus;

     getBranches();

    function getBranches() {
      MainService.GetBranches().then(
        function(response) {
          vm.branches = response.data.docs;
        },
        function(error) {
          console.log("error", error);
        }
      );

    }

    function addBranch(ev) {
        $mdDialog.show({
            locals: {items: null},
            templateUrl: RouteHelpers.basepath('mfisetup/branches/create.branch.dialog.html'),
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            hasBackdrop: false,
            escapeToClose: true,
            controller: 'CreateBranchController',
            controllerAs: 'vm'
        }).then(function (answer) {
            getBranches();
        }, function () {
        });

    }

    function _editBranch(selectedBranch,ev) {
        $mdDialog.show({
            locals: {items: selectedBranch},
            templateUrl: RouteHelpers.basepath('mfisetup/branches/create.branch.dialog.html'),
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            hasBackdrop: false,
            escapeToClose: true,
            controller: 'CreateBranchController',
            controllerAs: 'vm'
        }).then(function (answer) {
            getBranches();
        }, function () {
        });
    }

    function _changeStatus(ChangeStatus) {
      ChangeStatus.status = ChangeStatus.status === "active" ? "inactive" : "active";
      MainService.UpdateBranch(ChangeStatus).then(
        function(response) {

          AlertService.showSuccess(
              "Updated branch status",
              "Updated Status successfully."
          );
          // console.log("updated successfully", response);

        },
        function(error) {
          // console.log("could not be updated", error);
          AlertService.showError(
            "Status not changed. Please try again.",
            "ERROR"
          );
        }
      );

    }

  }
})(window.angular);
