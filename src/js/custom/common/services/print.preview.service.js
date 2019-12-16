(function() {
    angular.module("app.common")
        .factory("PrintPreviewService", printPreviewService);

    printPreviewService.$inject = ["$mdDialog", "$mdMedia", "PrintService", "$rootScope"];

    function printPreviewService($mdDialog, $mdMedia, printService, $rootScope) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')); // && $scope.customFullscreen;
        return {
            show: function(model) {
                $mdDialog.show({
                    controller: function($scope, $mdDialog, $rootScope) {

                        $scope.removeItem = removeItem;

                        $scope.printables = model;
                        $scope.preparedBy = 'super admin';
                        $scope.Name = 'Buusaa Gonofaa Microfinance Share Company';
                        $scope.ShowLogoOnPrintOut = true;
                        $scope.CurrentDate = '30-Mar-2018';
                        $scope.Address = {
                            Location:'Addis Ababa, Ethiopia',
                            Phonenumber:'(255) 555-555555'
                        };

                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                        $scope.print = function(printableDiv) {
                            printService.print(printableDiv);
                            $mdDialog.hide(printableDiv);
                        };

                        function removeItem(list, item) {
                            item.HideRow = true;
                        }
                    },
                    skipHide: true,
                    templateUrl: 'app/views/common/templates/print.preview.tmpl.html',
                    parent: angular.element(document.body),
                    fullscreen: useFullScreen
                });
            },
            close: function(msg) {

            },
            getPreviewContent: function(model) {

            }
        };
    }
})();