(function(angular) {
  "use strict";

  angular.module("app.mfi").controller("MFIController", MFIController);

  MFIController.$inject = ['AlertService', '$scope','MainService','CommonService','blockUI'];

  function MFIController(AlertService,$scope,MainService,CommonService,blockUI)

  {
    var vm = this;
    vm.saveChanges = saveChanges;

    vm.MFISetupForm = {
      IsnameValid: true,
      IslocationValid: true
  };

    init();

    function saveChanges() {

      vm.IsValidData = CommonService.Validation.ValidateForm(vm.MFISetupForm, vm.MFI);

      if (vm.IsValidData) {
          var myBlockUI = blockUI.instances.get('MFIFormBlockUI');
          myBlockUI.start();
        if (_.isUndefined(vm.MFI._id)) {
          MainService.CreateMFI(vm.MFI, vm.picFile).then(function(response) {
              myBlockUI.stop();
              AlertService.showSuccess("Created MFI successfully","MFI Information created successfully");
              console.log("Create MFI", response);
            }, function(error) {
              myBlockUI.stop();
              console.log("Create MFI Error", error);
              var message = error.data.error.message;
            AlertService.showError("Failed to create MFI!", message);

            });
        } else {
          
          MainService.UpdateMFI(vm.MFI, vm.picFile).then(function(response) {
              myBlockUI.stop();
              AlertService.showSuccess("MFI Info updated successfully","MFI Information updated successfully");
              console.log("Update MFI", response);
            }, function(error) {
              myBlockUI.stop();
              console.log("UpdateMFI Error", error);
              var message = error.data.error.message;
              AlertService.showError("MFI Information update failed",message);
            });
        }
      } else {
          AlertService.showWarning("Warning","Please fill the required fields and try again.");
      }
    }

    function init() {
        var myBlockUI = blockUI.instances.get('MFIFormBlockUI');
        myBlockUI.start();
      MainService.GetMFI().then(
        function(response) {
            myBlockUI.stop();
          if (response.data.length > 0) {
            vm.MFI = response.data[0];
            var dt = new Date(vm.MFI.establishment_year);
            vm.MFI.establishment_year = dt;
          }
          console.log("Get MFI", response);
        },
        function(error) {
            myBlockUI.stop();
          console.log("Get MFI Error", error);
        }
      );

      $scope.clear = function() {
        $scope.dt = null;
      };

      $scope.dateOptions = {
        dateDisabled: false,
        formatYear: "yy",
        maxDate: new Date(2020, 5, 22),
        startingDay: 1
      };

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.format = "dd-MMMM-yyyy";
      $scope.altInputFormats = ["M!/d!/yyyy"];

      $scope.popup1 = {
        opened: false
      };
    }
  }
})(window.angular);
