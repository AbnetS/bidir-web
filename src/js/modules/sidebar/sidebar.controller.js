/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils','PermissionService'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils,PermissionService) {

        activate();

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          var watchOff1 = $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });
          // Load menu from json file
          // -----------------------------------
          SidebarLoader.getMenu(sidebarReady);

          function sidebarReady(items) {
              $scope.menuItems = items.data;
              SetMenuItemsVisibility($scope.menuItems);
          }

          function SetMenuItemsVisibility(menuItems){
              var isSuper = false;
              if(!_.isUndefined($rootScope.currentUser) && $rootScope.currentUser !== null ){
                  isSuper = $rootScope.currentUser.role === "super";
              }
              _.each(menuItems, function(menuItem) {
                  if(isSuper){
                      menuItem.showMenuItem = true;
                      validateSubMenus(menuItem);
                  }
                  else {
                      menuItem.showMenuItem = PermissionService.hasThisModule(menuItem.module);
                      validateSubMenus(menuItem);
                  }

              });
          }

          function validateSubMenus(menuItem){
              var permissions = PermissionService.validateSubModules();
              if(!_.isUndefined(menuItem.submenu)){
                  _.each(menuItem.submenu,function(sub){
                      var isSuper = false;
                      if(!_.isUndefined($rootScope.currentUser)){
                          isSuper = $rootScope.currentUser.role === "super";
                          if(isSuper){
                              sub.showsubmenu = true;
                          }else{
                              if(!_.isUndefined(sub.permission)){
                                  sub.showsubmenu = _.contains(permissions,sub.permission);
                              }else {
                                  sub.showsubmenu = false;
                              }
                          }
                      }else {
                          sub.showsubmenu = false;
                      }

                  });
              }
          }


          // Handle sidebar and collapse items
          // ----------------------------------
          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }

            $scope.lastEventFromChild = isChild($index);

            return true;

          };

          // Controller helpers
          // -----------------------------------

            // Check item and children active state
            function isActive(item) {
              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

            $scope.$on('$destroy', function() {
                watchOff1();
            });

        } // activate
    }

})();
