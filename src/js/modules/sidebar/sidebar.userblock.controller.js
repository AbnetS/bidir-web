(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$scope','AuthService'];
    function UserBlockController($scope,AuthService) {
        var vm = this;
        vm.user = AuthService.GetCurrentUser();
        activate();
        ////////////////
        function activate() {

          $scope.userBlockVisible = false;

          var detach = $scope.$on('toggleUserBlock', function(/*event, args*/) {

            $scope.userBlockVisible = ! $scope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);
        }
    }
})();
