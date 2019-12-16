(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', 'AuthService'];

    function settingsRun($rootScope, AuthService){


      // User Settings
      // -----------------------------------
      $rootScope.user = {
        name:     'Yonas',
        job:      'System Admin',
        picture:  'app/img/user/02.jpg'
      };

      // Hides/show user avatar on sidebar from any element
      $rootScope.toggleUserBlock = function(){
        $rootScope.$broadcast('toggleUserBlock');
      };
      $rootScope.logoutUser = function (){
            AuthService.Logout();
      };

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'A-CAT Web Management Tool',
        description: 'A-CAT Web Management Tool',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: 'app/css/theme-d.css',
          asideScrollbar: false,
          isCollapsedText: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;
      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();
