
// APP START
// ----------------------------------- 

(function() {
    'use strict';

    appRun.$inject = ["$rootScope", "AuthService", "$http", "$location"];
    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.maps',
            'app.utils',
            'app.material'
        ]).run(appRun);

    function appRun($rootScope, AuthService, $http,$location){

    }
        
})();


(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ngSanitize',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngResource',
            'ui.utils',
            'ngAria',
            'ngMessages',
            'angularMoment'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.maps', []);
})();
(function() {
    'use strict';

    angular
        .module('app.material', [
            'ngMaterial'
          ]);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#3F51B5',
          'success':                '#4CAF50',
          'info':                   '#2196F3',
          'warning':                '#FF9800',
          'danger':                 '#F44336',
          'inverse':                '#607D8B',
          'green':                  '#009688',
          'pink':                   '#E91E63',
          'purple':                 '#673AB7',
          'dark':                   '#263238',
          'yellow':                 '#FFEB3B',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

      // Improve performance disabling debugging features
      // $compileProvider.debugInfoEnabled(false);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'whirl': ['vendor/whirl/dist/whirl.css'],
                'ngmap': ['vendor/ngmap/build/scripts/ng-map.min.js'],
                'animo': ['vendor/animo.js/animo.js'],
                'fastclick': ['vendor/fastclick/lib/fastclick.js'],
                'modernizr': ['vendor/modernizr/modernizr.custom.js'],
                'animate': ['vendor/animate.css/animate.min.css'],
                'skycons': ['vendor/skycons/skycons.js'],
                'icons': ['vendor/fontawesome/css/font-awesome.min.css',
                    'vendor/simple-line-icons/css/simple-line-icons.css'],
                'weather-icons': ['vendor/weather-icons/css/weather-icons.min.css',
                    'vendor/weather-icons/css/weather-icons-wind.min.css'],
                'sparklines': ['vendor/sparkline/index.js'],
                'wysiwyg': ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
                'slimscroll': ['vendor/slimScroll/jquery.slimscroll.min.js'],
                'screenfull': ['vendor/screenfull/dist/screenfull.js'],
                'vector-map': ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                    'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
                'vector-map-maps': ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                    'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
                'loadGoogleMapsJS': ['vendor/load-google-maps/load-google-maps.js'],
                'flot-chart': ['vendor/flot/jquery.flot.js'],
                'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'vendor/flot/jquery.flot.resize.js',
                    'vendor/flot/jquery.flot.pie.js',
                    'vendor/flot/jquery.flot.time.js',
                    'vendor/flot/jquery.flot.categories.js',
                    'vendor/flot-spline/js/jquery.flot.spline.min.js'],
                'moment': ['vendor/moment/min/moment-with-locales.min.js',
                    'vendor/angular-moment/angular-moment.min.js'],
                'inputmask': ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
                'flatdoc': ['vendor/flatdoc/flatdoc.js'],
                'codemirror': ['vendor/codemirror/lib/codemirror.js',
                    'vendor/codemirror/lib/codemirror.css'],
                // modes for common web files
                'codemirror-modes-web': ['vendor/codemirror/mode/javascript/javascript.js',
                    'vendor/codemirror/mode/xml/xml.js',
                    'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
                    'vendor/codemirror/mode/css/css.js'],
                'taginput': ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                    'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
                'filestyle': ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
                'morris': ['vendor/raphael/raphael.js',
                    'vendor/morris.js/morris.js',
                    'vendor/morris.js/morris.css'],
                'loaders.css': ['vendor/loaders.css/loaders.css'],
                'spinkit': ['vendor/spinkit/css/spinkit.css'],
                'underscore': ['vendor/underscore/underscore.js'],
                'selectize': ['vendor/selectize/dist/css/selectize.default.css']
            },
            // Angular based script (use the right module name)
            modules: [
                {
                    name: 'md.data.table',
                    files: ['vendor/angular-material-data-table/dist/md-data-table.min.css',
                        'vendor/angular-material-data-table/dist/md-data-table.min.js']
                },
                {
                    name: 'blockUI',
                    files: ["vendor/angular-block-ui/dist/angular-block-ui.css",
                        "vendor/angular-block-ui/dist/angular-block-ui.js"]
                },
                {
                    name: 'ngFileUpload',
                    files: ['vendor/ng-file-upload/ng-file-upload.min.js',
                        'vendor/ng-file-upload-shim/ng-file-upload-shim.min.js']
                },
                {
                    name: 'toaster', files: ['vendor/angularjs-toaster/toaster.min.js',
                                            'vendor/angularjs-toaster/toaster.min.css']
                },
                {
                    name: 'localytics.directives', files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                        'vendor/chosen_v1.2.0/chosen.min.css',
                        'vendor/angular-chosen-localytics/dist/angular-chosen.js'],
                    serie: true
                },
                {
                    name: 'ngDialog', files: ['vendor/ngDialog/js/ngDialog.min.js',
                        'vendor/ngDialog/css/ngDialog.min.css',
                        'vendor/ngDialog/css/ngDialog-theme-default.min.css']
                },
                {name: 'ngWig', files: ['vendor/ngWig/dist/ng-wig.min.js']},
                {
                    name: 'ngTable', files: ['vendor/ng-table/dist/ng-table.min.js',
                        'vendor/ng-table/dist/ng-table.min.css']
                },
                {name: 'ngTableExport', files: ['vendor/ng-table-export/ng-table-export.js']},
                {
                    name: 'angularBootstrapNavTree',
                    files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                        'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']
                },
                {
                    name: 'xeditable', files: ['vendor/angular-xeditable/dist/js/xeditable.js',
                        'vendor/angular-xeditable/dist/css/xeditable.css']
                },
                {name: 'angularFileUpload', files: ['vendor/angular-file-upload/dist/angular-file-upload.js']},
                {
                    name: 'ngImgCrop', files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                        'vendor/ng-img-crop/compile/unminified/ng-img-crop.css']
                },
                {
                    name: 'ui.select', files: ['vendor/angular-ui-select/dist/select.js',
                        'vendor/angular-ui-select/dist/select.css']
                },
                {name: 'ui.codemirror', files: ['vendor/angular-ui-codemirror/ui-codemirror.js']},
                {
                    name: 'angular-carousel', files: ['vendor/angular-carousel/dist/angular-carousel.css',
                        'vendor/angular-carousel/dist/angular-carousel.js']
                },
                {name: 'infinite-scroll', files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']},
                {
                    name: 'ui.bootstrap-slider', files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                        'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                        'vendor/angular-bootstrap-slider/slider.js'], serie: true
                },
                {
                    name: 'ui.grid', files: ['vendor/angular-ui-grid/ui-grid.min.css',
                        'vendor/angular-ui-grid/ui-grid.min.js']
                },
                {
                    name: 'summernote', files: ['vendor/bootstrap/js/modal.js',
                        'vendor/bootstrap/js/dropdown.js',
                        'vendor/bootstrap/js/tooltip.js',
                        'vendor/summernote/dist/summernote.css',
                        'vendor/summernote/dist/summernote.js',
                        'vendor/angular-summernote/dist/angular-summernote.js'
                    ], serie: true
                },
                {
                    name: 'angular-rickshaw', files: ['vendor/d3/d3.min.js',
                        'vendor/rickshaw/rickshaw.js',
                        'vendor/rickshaw/rickshaw.min.css',
                        'vendor/angular-rickshaw/rickshaw.js'], serie: true
                },
                {
                    name: 'angular-chartist', files: ['vendor/chartist/dist/chartist.min.css',
                        'vendor/chartist/dist/chartist.js',
                        'vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true
                },
                {name: 'ui.map', files: ['vendor/angular-ui-map/ui-map.js']},
                {
                    name: 'datatables', files: ['vendor/datatables/media/css/jquery.dataTables.css',
                        'vendor/datatables/media/js/jquery.dataTables.js',
                        'vendor/datatables-buttons/js/dataTables.buttons.js',
                        //'vendor/datatables-buttons/css/buttons.bootstrap.css',
                        'vendor/datatables-buttons/js/buttons.bootstrap.js',
                        'vendor/datatables-buttons/js/buttons.colVis.js',
                        'vendor/datatables-buttons/js/buttons.flash.js',
                        'vendor/datatables-buttons/js/buttons.html5.js',
                        'vendor/datatables-buttons/js/buttons.print.js',
                        'vendor/angular-datatables/dist/angular-datatables.js',
                        'vendor/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js'],
                    serie: true
                },
                {
                    name: 'angular-jqcloud', files: ['vendor/jqcloud2/dist/jqcloud.css',
                        'vendor/jqcloud2/dist/jqcloud.js',
                        'vendor/angular-jqcloud/angular-jqcloud.js']
                },
                {
                    name: 'angularGrid', files: ['vendor/ag-grid/dist/styles/ag-grid.css',
                        'vendor/ag-grid/dist/ag-grid.js',
                        'vendor/ag-grid/dist/styles/theme-dark.css',
                        'vendor/ag-grid/dist/styles/theme-fresh.css']
                },
                {
                    name: 'ng-nestable', files: ['vendor/ng-nestable/src/angular-nestable.js',
                        'vendor/nestable/jquery.nestable.js']
                },
                {name: 'akoenig.deckgrid', files: ['vendor/angular-deckgrid/angular-deckgrid.js']},
                {
                    name: 'oitozero.ngSweetAlert', files: ['vendor/sweetalert/dist/sweetalert.css',
                        'vendor/sweetalert/dist/sweetalert.min.js',
                        'vendor/angular-sweetalert/SweetAlert.js'], serie: true
                },
                {
                    name: 'bm.bsTour', files: ['vendor/bootstrap-tour/build/css/bootstrap-tour.css',
                        'vendor/bootstrap-tour/build/js/bootstrap-tour-standalone.js',
                        'vendor/angular-bootstrap-tour/dist/angular-bootstrap-tour.js'], serie: true
                },
                {
                    name: 'ui.knob', files: ['vendor/angular-knob/src/angular-knob.js',
                        'vendor/jquery-knob/dist/jquery.knob.min.js']
                },
                {name: 'easypiechart', files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']},
                {
                    name: 'colorpicker.module', files: ['vendor/angular-bootstrap-colorpicker/css/colorpicker.css',
                        'vendor/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js']
                },
                {
                    name: 'ui.sortable', files: ['vendor/jquery-ui/jquery-ui.min.js',
                        'vendor/angular-ui-sortable/sortable.js'], serie: true
                },
                {
                    name: 'ui.calendar', files: ['vendor/jquery-ui/jquery-ui.min.js',
                        'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
                        'vendor/fullcalendar/dist/fullcalendar.min.js',
                        'vendor/fullcalendar/dist/gcal.js',
                        'vendor/fullcalendar/dist/fullcalendar.css',
                        'vendor/angular-ui-calendar/src/calendar.js'], serie: true
                },
                {
                    name: 'chart.js', files: ['vendor/chart.js/dist/Chart.min.js',
                        'vendor/angular-chart.js/dist/angular-chart.min.js'], serie: true
                },
                {
                    name: 'ui-leaflet', files: ['vendor/leaflet/dist/leaflet.js',
                        'vendor/angular-simple-logger/dist/angular-simple-logger.js',
                        'vendor/ui-leaflet/dist/ui-leaflet.js',
                        'vendor/leaflet/dist/leaflet.css'], serie: true
                }
            ]
        })
    ;

})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('ModalGmapController', ModalGmapController);

    ModalGmapController.$inject = ['$uibModal'];
    function ModalGmapController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.open = function (size) {

            //var modalInstance =
            $uibModal.open({
              templateUrl: '/myModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };

          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout'];
          function ModalInstanceCtrl($scope, $uibModalInstance, $timeout) {

            $uibModalInstance.opened.then(function () {
              var position = new google.maps.LatLng(33.790807, -117.835734);

              $scope.mapOptionsModal = {
                zoom: 14,
                center: position,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };

              // we use timeout to wait maps to be ready before add a markers
              $timeout(function(){
                // 1. Add a marker at the position it was initialized
                new google.maps.Marker({
                  map: $scope.myMapModal,
                  position: position
                });
                // 2. Trigger a resize so the map is redrawed
                google.maps.event.trigger($scope.myMapModal, 'resize');
                // 3. Move to the center if it is misaligned
                $scope.myMapModal.panTo(position);
              });

            });

            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };

          }

        }
    }

})();


(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('GMapController', GMapController);

    GMapController.$inject = ['$timeout'];
    function GMapController($timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          var position = [
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.787453, -117.835858)
            ];
          
          vm.addMarker = addMarker;
          // we use timeout to wait maps to be ready before add a markers
          $timeout(function(){
            addMarker(vm.myMap1, position[0]);
            addMarker(vm.myMap2, position[1]);
            addMarker(vm.myMap3, position[2]);
            addMarker(vm.myMap5, position[3]);
          });

          vm.mapOptions1 = {
            zoom: 14,
            center: position[0],
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          vm.mapOptions2 = {
            zoom: 19,
            center: position[1],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          vm.mapOptions3 = {
            zoom: 14,
            center: position[2],
            mapTypeId: google.maps.MapTypeId.SATELLITE
          };

          vm.mapOptions4 = {
            zoom: 14,
            center: position[3],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          // for multiple markers
          $timeout(function(){
            addMarker(vm.myMap4, position[3]);
            addMarker(vm.myMap4, position[4]);
          });

          // custom map style
          var MapStyles = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#bdd1f9'}]},{'featureType':'all','elementType':'labels.text.fill','stylers':[{'color':'#334165'}]},{featureType:'landscape',stylers:[{color:'#e9ebf1'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#c5c6c6'}]},{featureType:'road.arterial',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'road.local',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#d8dbe0'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#cfd5e0'}]},{featureType:'administrative',stylers:[{visibility:'on'},{lightness:33}]},{featureType:'poi.park',elementType:'labels',stylers:[{visibility:'on'},{lightness:20}]},{featureType:'road',stylers:[{color:'#d8dbe0',lightness:20}]}];
          vm.mapOptions5 = {
            zoom: 14,
            center: position[3],
            styles: MapStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          ///////////////
          
          function addMarker(map, position) {
            return new google.maps.Marker({
              map: map,
              position: position
            });
          }

        }
    }
})();


(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .config(materialConfig)
        ;
    materialConfig.$inject = ['$mdIconProvider'];
    function materialConfig($mdIconProvider){
      $mdIconProvider
        .icon('share-arrow', 'app/img/icons/share-arrow.svg', 24)
        .icon('upload', 'app/img/icons/upload.svg', 24)
        .icon('copy', 'app/img/icons/copy.svg', 24)
        .icon('print', 'app/img/icons/print.svg', 24)
        .icon('hangout', 'app/img/icons/hangout.svg', 24)
        .icon('mail', 'app/img/icons/mail.svg', 24)
        .icon('message', 'app/img/icons/message.svg', 24)
        .icon('copy2', 'app/img/icons/copy2.svg', 24)
        .icon('facebook', 'app/img/icons/facebook.svg', 24)
        .icon('twitter', 'app/img/icons/twitter.svg', 24);
    }
})();


(function() {
    'use strict';

    angular
        .module('app.material')
        .controller('MDAutocompleteCtrl', MDAutocompleteCtrl)
        .controller('MDBottomSheetCtrl', MDBottomSheetCtrl)
        .controller('MDListBottomSheetCtrl', MDListBottomSheetCtrl)
        .controller('MDGridBottomSheetCtrl', MDGridBottomSheetCtrl)
        .controller('MDCheckboxCtrl', MDCheckboxCtrl)
        .controller('MDRadioCtrl', MDRadioCtrl)
        .controller('MDSwitchCtrl', MDSwitchCtrl)
        .controller('MDDialogCtrl', MDDialogCtrl)
        .controller('MDSliderCtrl', MDSliderCtrl)
        .controller('MDSelectCtrl', MDSelectCtrl)
        .controller('MDInputCtrl', MDInputCtrl)
        .controller('MDProgressCtrl', MDProgressCtrl)
        .controller('MDSidenavCtrl', MDSidenavCtrl)
        .controller('MDSubheaderCtrl', MDSubheaderCtrl)
        .controller('MDToastCtrl', MDToastCtrl)
          .controller('ToastCtrl', ToastCtrl)
        .controller('MDTooltipCtrl', MDTooltipCtrl)
        .controller('BottomSheetExample', BottomSheetExample)
          .controller('ListBottomSheetCtrl', ListBottomSheetCtrl)
          .controller('GridBottomSheetCtrl', GridBottomSheetCtrl)
        ;

    /*
      MDAutocompleteCtrl
     */
    MDAutocompleteCtrl.$inject = ['$scope', '$timeout', '$q'];
    function MDAutocompleteCtrl($scope, $timeout, $q) {
      var self = this;

      self.states        = loadAll();
      self.selectedItem  = null;
      self.searchText    = null;
      self.querySearch   = querySearch;
      self.simulateQuery = false;
      self.isDisabled    = false;

      // use $timeout to simulate remote dataservice call
      function querySearch (query) {
        var results = query ? self.states.filter( createFilterFor(query) ) : [],
            deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
      }

      function loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming';

        return allStates.split(/, +/g).map( function (state) {
          return {
            value: state.toLowerCase(),
            display: state
          };
        });
      }

          /**
           * Create filter function for a query string
           */
          function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
              return (state.value.indexOf(lowercaseQuery) === 0);
            };

          }
        }

    /*
    MDBottomSheetCtrl
     */
    MDBottomSheetCtrl.$inject = ['$scope', '$timeout', '$mdBottomSheet'];
    function MDBottomSheetCtrl($scope, $timeout, $mdBottomSheet) {
      $scope.alert = '';

      $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-list-template.html',
          controller: 'ListBottomSheetCtrl',
          targetEvent: $event,
          disableParentScroll: false
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };

      $scope.showGridBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-grid-template.html',
          controller: 'GridBottomSheetCtrl',
          targetEvent: $event,
          disableParentScroll: false
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };
    }
    /*
    MDListBottomSheetCtrl
     */
    MDListBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function MDListBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Share', icon: 'share' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    MDGridBottomSheetCtrl
     */
    MDGridBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function MDGridBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Hangout', icon: 'hangout' },
        { name: 'Mail', icon: 'mail' },
        { name: 'Message', icon: 'message' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Facebook', icon: 'facebook' },
        { name: 'Twitter', icon: 'twitter' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    MDCheckboxCtrl
     */
    MDCheckboxCtrl.$inject = ['$scope'];
    function MDCheckboxCtrl($scope) {

      $scope.data = {};
      $scope.data.cb1 = true;
      $scope.data.cb2 = false;
      $scope.data.cb3 = false;
      $scope.data.cb4 = false;
      $scope.data.cb5 = false;
    }
    /*
    MDRadioCtrl
     */
    MDRadioCtrl.$inject = ['$scope'];
    function MDRadioCtrl($scope) {

        $scope.data = {
          group1 : 'Banana',
          group2 : '2',
          group3 : 'avatar-1'
        };

        $scope.avatarData = [{
            id: 'svg-1',
            title: 'avatar 1',
            value: 'avatar-1'
          },{
            id: 'svg-2',
            title: 'avatar 2',
            value: 'avatar-2'
          },{
            id: 'svg-3',
            title: 'avatar 3',
            value: 'avatar-3'
        }];

        $scope.radioData = [
          { label: 'Apple', value: 1 },
          { label: 'Banana', value: 2 },
          { label: 'Mango', value: '3', isDisabled: true }
        ];


        $scope.submit = function() {
          alert('submit');
        };

        var vals = ['Apple', 'Banana', 'Mango', 'Grape', 'Melon', 'Strawberry', 'Kiwi'];
        $scope.addItem = function() {
          var rval = vals[Math.floor(Math.random() * vals.length)];
          $scope.radioData.push({ label: rval, value: rval });
        };

        $scope.removeItem = function() {
          $scope.radioData.pop();
        };
    }
    /*
    MDSwitchCtrl
     */
    MDSwitchCtrl.$inject = ['$scope'];
    function MDSwitchCtrl($scope) {
      $scope.data = {
        cb1: true,
        cb4: true
      };
      
      $scope.onChange = function(cbState){
         $scope.message = 'The switch is now: ' + cbState;
      };
    }
    /*
    MDDialogCtrl
     */
    MDDialogCtrl.$inject = ['$scope', '$mdDialog'];
    function MDDialogCtrl($scope, $mdDialog) {
      $scope.alert = '';

      $scope.showAlert = function(ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .title('This is an alert title')
            .content('You can specify some description text in here.')
            .ariaLabel('Password notification')
            .ok('Got it!')
            .targetEvent(ev)
        );
      };

      $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .content('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .ok('Please do it!')
          .cancel('Sounds like a scam')
          .targetEvent(ev);

        $mdDialog.show(confirm).then(function() {
          $scope.alert = 'You decided to get rid of your debt.';
        }, function() {
          $scope.alert = 'You decided to keep your debt.';
        });
      };

      $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'dialog1.tmpl.html',
          targetEvent: ev,
        })
        .then(function(answer) {
          $scope.alert = 'You said the information was \'' + answer + '\'.';
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
      };
      DialogController.$inject = ['$scope', '$mdDialog'];
      function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
    }
    /*
    MDSliderCtrl
     */
    MDSliderCtrl.$inject = ['$scope'];
    function MDSliderCtrl($scope) {

      $scope.color = {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      };

      $scope.rating1 = 3;
      $scope.rating2 = 2;
      $scope.rating3 = 4;

      $scope.disabled1 = 0;
      $scope.disabled2 = 70;
    }
    /*
    MDSelectCtrl
     */
    function MDSelectCtrl() {
      
      var vm = this;
      
      vm.userState = '';
      vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
          'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
          'WY').split(' ').map(function (state) { return { abbrev: state }; });

      vm.sizes = [
          'small (12-inch)',
          'medium (14-inch)',
          'large (16-inch)',
          'insane (42-inch)'
      ];
      vm.toppings = [
        { category: 'meat', name: 'Pepperoni' },
        { category: 'meat', name: 'Sausage' },
        { category: 'meat', name: 'Ground Beef' },
        { category: 'meat', name: 'Bacon' },
        { category: 'veg', name: 'Mushrooms' },
        { category: 'veg', name: 'Onion' },
        { category: 'veg', name: 'Green Pepper' },
        { category: 'veg', name: 'Green Olives' }
      ];
    }
    /*
    MDInputCtrl
     */
    MDInputCtrl.$inject = ['$scope'];
    function MDInputCtrl($scope) {
      $scope.user = {
        title: 'Developer',
        email: 'ipsum@lorem.com',
        firstName: '',
        lastName: '' ,
        company: 'Google' ,
        address: '1600 Amphitheatre Pkwy' ,
        city: 'Mountain View' ,
        state: 'CA' ,
        biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
        postalCode : '94043'
      };
      $scope.project = {
        description: 'Nuclear Missile Defense System',
        clientName: 'Bill Clinton',
        rate: 500
      };
    }
    /*
    MDProgressCtrl
     */
    MDProgressCtrl.$inject = ['$scope', '$interval'];
    function MDProgressCtrl($scope, $interval) {
        $scope.mode = 'query';
        $scope.determinateValue = 30;
        $scope.determinateValue2 = 30;

        $interval(function() {
          $scope.determinateValue += 1;
          $scope.determinateValue2 += 1.5;
          if ($scope.determinateValue > 100) {
            $scope.determinateValue = 30;
            $scope.determinateValue2 = 30;
          }
        }, 100, 0, true);

        $interval(function() {
          $scope.mode = ($scope.mode === 'query' ? 'determinate' : 'query');
        }, 7200, 0, true);
    }
    /*
    MDSidenavCtrl
     */
    MDSidenavCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];
    function MDSidenavCtrl($scope, $timeout, $mdSidenav, $log) {
      $scope.toggleLeft = function() {
        $mdSidenav('left').toggle()
                          .then(function(){
                              $log.debug('toggle left is done');
                          });
      };
      $scope.toggleRight = function() {
        $mdSidenav('right').toggle()
                            .then(function(){
                              $log.debug('toggle RIGHT is done');
                            });
      };
      $scope.closeLeft = function() {
        $mdSidenav('left').close()
                          .then(function(){
                            $log.debug('close LEFT is done');
                          });

      };
      $scope.closeRight = function() {
        $mdSidenav('right').close()
                            .then(function(){
                              $log.debug('close RIGHT is done');
                            });
      };
    }
    /*
    MDSubheaderCtrl
     */
    MDSubheaderCtrl.$inject = ['$scope'];
    function MDSubheaderCtrl($scope) {
        $scope.messages = [
          {
            face : 'app/img/user/10.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/01.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/02.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/03.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/04.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/05.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/06.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/07.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/08.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/09.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
          {
            face : 'app/img/user/11.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: 'I\'ll be in your neighborhood doing errands'
          },
        ];
    }
    /*
    MDToastCtrl
     */
    MDToastCtrl.$inject = ['$scope', '$mdToast'];
    function MDToastCtrl($scope, $mdToast) {

      $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };

      $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
      };

      $scope.showCustomToast = function() {
        $mdToast.show({
          controller: 'ToastCtrl',
          templateUrl: 'toast-template.html',
          hideDelay: 60000,
          parent:'#toastcontainer',
          position: $scope.getToastPosition()
        });
      };

      $scope.showSimpleToast = function() {
        $mdToast.show(
          $mdToast.simple()
            .content('Simple Toast!')
            .position($scope.getToastPosition())
            .hideDelay(30000)
        );
      };

      $scope.showActionToast = function() {
        var toast = $mdToast.simple()
              .content('Action Toast!')
              .action('OK')
              .highlightAction(false)
              .position($scope.getToastPosition());

        $mdToast.show(toast).then(function() {
          alert('You clicked \'OK\'.');
        });
      };
    }
    /*
    ToastCtrl
     */
    ToastCtrl.$inject = ['$scope', '$mdToast'];
    function ToastCtrl($scope, $mdToast) {
      $scope.closeToast = function() {
        $mdToast.hide();
      };
    }
    /*
    MDTooltipCtrl
     */
    MDTooltipCtrl.$inject = ['$scope'];
    function MDTooltipCtrl($scope) {
      $scope.demo = {};
    }
    /*
    BottomSheetExample
     */
    BottomSheetExample.$inject = ['$scope', '$timeout', '$mdBottomSheet'];
    function BottomSheetExample($scope, $timeout, $mdBottomSheet) {
      $scope.alert = '';

      $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-list-template.html',
          controller: 'ListBottomSheetCtrl',
          targetEvent: $event,
          parent: '#bottomsheetcontainer',
          disableParentScroll: false
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };

      $scope.showGridBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'bottom-sheet-grid-template.html',
          controller: 'GridBottomSheetCtrl',
          targetEvent: $event,
          parent: '#bottomsheetcontainer',
          disableParentScroll: false
        }).then(function(clickedItem) {
          $scope.alert = clickedItem.name + ' clicked!';
        });
      };
    }
    /*
    ListBottomSheetCtrl
     */
    ListBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function ListBottomSheetCtrl($scope, $mdBottomSheet) {

      $scope.items = [
        { name: 'Share', icon: 'share-arrow' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
    /*
    GridBottomSheetCtrl
     */
    GridBottomSheetCtrl.$inject = ['$scope', '$mdBottomSheet'];
    function GridBottomSheetCtrl($scope, $mdBottomSheet) {
      $scope.items = [
        { name: 'Hangout', icon: 'hangout' },
        { name: 'Mail', icon: 'mail' },
        { name: 'Message', icon: 'message' },
        { name: 'Copy', icon: 'copy2' },
        { name: 'Facebook', icon: 'facebook' },
        { name: 'Twitter', icon: 'twitter' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }


})();

(function() {
    'use strict';
    // Used only for the BottomSheetExample
    angular
        .module('app.material')
        .run(materialRun)
        ;
    materialRun.$inject = ['$http', '$templateCache'];
    function materialRun($http, $templateCache){
      var urls = [
        'app/img/icons/share-arrow.svg',
        'app/img/icons/upload.svg',
        'app/img/icons/copy.svg',
        'app/img/icons/print.svg',
        'app/img/icons/hangout.svg',
        'app/img/icons/mail.svg',
        'app/img/icons/message.svg',
        'app/img/icons/copy2.svg',
        'app/img/icons/facebook.svg',
        'app/img/icons/twitter.svg'
      ];

      angular.forEach(urls, function(url) {
        $http.get(url, {cache: $templateCache});
      });

    }

})();

(function() {
    'use strict';

    angular
        .module('app.material')
        .controller('MaterialWidgetsController', MaterialWidgetsController);

    MaterialWidgetsController.$inject = ['Colors'];
    function MaterialWidgetsController(Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.sparkOption1 = {
            type : 'line',
            width : '100%',
            height : '140px',
            tooltipOffsetX : -20,
            tooltipOffsetY : 20,
            lineColor : Colors.byName('success'),
            fillColor : Colors.byName('success'),
            spotColor : 'rgba(0,0,0,.26)',
            minSpotColor : 'rgba(0,0,0,.26)',
            maxSpotColor : 'rgba(0,0,0,.26)',
            highlightSpotColor : 'rgba(0,0,0,.26)',
            highlightLineColor : 'rgba(0,0,0,.26)',
            spotRadius : 2,
            tooltipPrefix : '',
            tooltipSuffix : ' Visits',
            tooltipFormat : '{{prefix}}{{y}}{{suffix}}',
            chartRangeMin: 0,
            resize: true
          };

          vm.sparkOptionPie = {
            type: 'pie',
            width : '2em',
            height : '2em',
            sliceColors: [ Colors.byName('success'), Colors.byName('gray-light')]
          };
        
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template:
                '<div class="preloader-progress">' +
                '<div class="preloader-progress-bar" ' +
                'ng-style="{width: loadCounter + \'%\'}"></div>' +
                '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

            scope.loadCounter = 0;

            var counter  = 0,
                timeout;

            // disables scrollbar
            angular.element('body').css('overflow', 'hidden');
            // ensure class is present for styling
            el.addClass('preloader');

            appReady().then(endCounter);

            timeout = $timeout(startCounter);

            ///////

            function startCounter() {

                var remaining = 100 - counter;
                counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

                scope.loadCounter = parseInt(counter, 10);

                timeout = $timeout(startCounter, 20);
            }

            function endCounter() {

                $timeout.cancel(timeout);

                scope.loadCounter = 100;

                $timeout(function(){
                    // animate preloader hiding
                    $animate.addClass(el, 'preloader-hidden');
                    // retore scrollbar
                    angular.element('body').css('overflow', '');
                }, 300);
            }

            function appReady() {
                var deferred = $q.defer();
                var viewsLoaded = 0;
                // if this doesn't sync with the real app ready
                // a custom event must be used instead
                var off = scope.$on('$viewContentLoaded', function () {
                    viewsLoaded ++;
                    // we know there are at least two views to be loaded
                    // before the app is ready (1-index.html 2-app*.html)
                    if ( viewsLoaded === 2) {
                        // with resolve this fires only once
                        $timeout(function(){
                            deferred.resolve();
                        }, 3000);

                        off();
                    }

                });

                return deferred.promise;
            }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){
        
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to login
        $urlRouterProvider.otherwise('/app/welcome');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor('fastclick','modernizr','sparklines', 'icons','animo','underscore',
                        'sparklines','slimscroll','oitozero.ngSweetAlert','toaster','blockUI'),
              data: {
                  authenticate: true
              }
          })
          .state('app.welcome', {
              url: '/welcome',
              title: 'Welcome',
              templateUrl: helper.basepath('welcome.html'),
              controller: 'WelcomeController',
              controllerAs: 'vm',
              data: {
                  authenticate: true
              }
          })
            .state('app.profile', {
                url: '/profile',
                title: 'Profile',
                templateUrl: helper.basepath('profile.html'),
                resolve:helper.resolveFor('ngFileUpload'),
                controller: 'ProfileController',
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
           .state('app.manage_user', {
                url: '/manage_user',
                title: 'manage users',
                templateUrl: helper.basepath('manageusers/manage.users.html'),
               resolve: angular.extend(helper.resolveFor('datatables','ui.select'),{}),
               controller: 'ManageUsersController',
               controllerAs: 'vm',
               data: {
                   authenticate: true
               }
            })
            .state('app.manage_role', {
                url: '/manage_role',
                title: 'manage roles',
                templateUrl: helper.basepath('manageroles/manage.roles.html'),
                resolve:helper.resolveFor('datatables','ui.select'),
                controller: 'ManageRoleController',
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state('app.mfi_setting', {
                url: '/mfi_setup',
                title: 'MFI Setting',
                templateUrl:helper.basepath('mfisetup/mfi.html'),
                resolve:helper.resolveFor('datatables','ui.select','moment','inputmask','ngFileUpload'),
                controller: 'MFIController',
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })

            .state("app.manage_branch", {
                url: "/branches",
                title: "branches",
                templateUrl:helper.basepath('mfisetup/branches/branches.html'),
                resolve:helper.resolveFor('ui.select'),
                controller: "BranchController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.forms", {
                url: "/forms",
                title: "forms",
                templateUrl:helper.basepath('forms/forms.list.html'),
                resolve:helper.resolveFor('md.data.table','ui.select'),
                controller: "FormsController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.builder", {
                url: "/forms/builder/:id",
                title: 'Form Builder',
                templateUrl:helper.basepath('forms/builder.html'),
                resolve:helper.resolveFor('md.data.table','ui.select','ui.sortable'),
                controller: 'FormBuilderController',
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.acat", {
                url: "/acat",
                title: "acat",
                templateUrl:helper.basepath('acat/builder/acat.list.html'),
                resolve:helper.resolveFor('md.data.table'),
                controller: "ACATListController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.acatbuilder", {
                url: "/acat/builder/:id",
                title: 'ACAT Builder',
                templateUrl:helper.basepath('acat/builder/acat.builder.html'),
                controller: 'ACATController',
                resolve:helper.resolveFor('md.data.table','ui.select'),
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.crop", {
                url: "/crops",
                title: "crops",
                templateUrl:helper.basepath('acat/crop/crops.html'),
                resolve:helper.resolveFor('md.data.table'),
                controller: "CropsController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.loanproduct", {
                url: "/loanproducts",
                title: "loan product",
                templateUrl:helper.basepath('mfisetup/loanproduct/loan.products.html'),
                resolve:helper.resolveFor('md.data.table','ui.select'),
                controller: "LoanProductsController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.clients", {
                url: "/clients",
                title: "Client Management",
                templateUrl:helper.basepath('loan_management/client_management/client.management.html'),
                resolve:helper.resolveFor('md.data.table','ui.select'),
                controller: "ClientManagementController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.client_detail", {
                url: "/clients/:id",
                title: "clients detail",
                templateUrl:helper.basepath('loan_management/client_management/client.detail.html'),
                resolve:helper.resolveFor('ui.select'),
                controller: "ClientDetailController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })

            .state("app.loan_processing", {
                url: "/loan_processing",
                title: "Loan Processing",
                templateUrl:helper.basepath('loan_management/loan_processing/loan.processing.html'),
                resolve:helper.resolveFor('md.data.table','ui.select','moment','filestyle'),
                controller: "LoanProcessingController",
                controllerAs: 'vm',
                abstract: true,
                data: {
                    authenticate: true
                }
            })
            .state("app.loan_processing.clients", {
                url: "/clients",
                views: {
                    "tabContent": {
                        templateUrl: helper.basepath('loan_management/loan_processing/tabs/clients.html'),
                        controller: "ClientsController",
                        controllerAs: "vm"
                    }
                }})
            .state("app.loan_processing.screenings", {
                url: "/screenings",
                 views: {
                     "tabContent": {
                         templateUrl: helper.basepath('loan_management/loan_processing/tabs/screenings.html'),
                         controller: 'ScreeningProcessorController',
                         controllerAs:'vm'
                     }
                 }
                }
                )
            .state("app.loan_processing.loan_applications", {
                url: "/loan_application",
                views: {
                    "tabContent": {
                        templateUrl: helper.basepath('loan_management/loan_processing/tabs/loan_applications.html'),
                        controller: 'LoanApplicationProcessorController',
                        controllerAs:'vm'
                    }
                }

            })
            .state("app.loan_processing.acat", {
                url: "/acat_processor",
                views: {
                    "tabContent": {
                        templateUrl: helper.basepath('loan_management/loan_processing/tabs/acat.processor.html'),
                        controller: 'ACATProcessorController',
                        controllerAs:'vm'
                    }
                }

            })

            .state("app.group_loan", {
                url: "/group_loan",
                title: "Group Loan",
                templateUrl:helper.basepath('loan_management/group_loan/group.loan.html'),
                resolve:helper.resolveFor('md.data.table','ui.select','moment'),
                controller: "GroupLoanController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.group_loan_detail", {
                url: "/group_loan/:id",
                title: "Group Loan Detail",
                templateUrl:helper.basepath('loan_management/group_loan/group.loan.detail.html'),
                resolve:helper.resolveFor('md.data.table','ui.select','moment'),
                controller: "GroupLoanDetailController",
                controllerAs: 'vm',
                redirectTo: 'app.group_loan_detail.members',
                data: {
                    authenticate: true
                }
            })
            .state("app.group_loan_detail.members", {
                url: "/members",
                views: {
                    "groupTabContent": {
                        templateUrl: helper.basepath('loan_management/group_loan/tabs/members.partial.html'),
                        controllerAs: "vm"
                    }
                }})
            .state("app.group_loan_detail.screenings", {
                url: "/screenings",
                views: {
                    "groupTabContent": {
                        templateUrl: helper.basepath('loan_management/group_loan/tabs/screenings.partial.html'),
                        controllerAs: "vm"
                    }
                }})
            .state("app.group_loan_detail.loan", {
                url: "/loan",
                views: {
                    "groupTabContent": {
                        templateUrl: helper.basepath('loan_management/group_loan/tabs/loan.partial.html'),
                        controllerAs: "vm"
                    }
                }})
            .state("app.group_loan_detail.acat", {
                url: "/a-cat",
                views: {
                    "groupTabContent": {
                        templateUrl: helper.basepath('loan_management/group_loan/tabs/acat.partial.html'),
                        controllerAs: "vm"
                    }
                }})


            .state("app.report", {
                url: "/report",
                title: "Report",
                templateUrl:helper.basepath('report/report.html'),
                resolve:helper.resolveFor('md.data.table','ui.select','moment'),
                controller: "ReportController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }

            })
            .state("app.dashboard", {
                url: "/dashboard",
                title: "Dashboard",
                templateUrl:helper.basepath('report/dashboard.html'),
                resolve:helper.resolveFor('ui.select','moment','chart.js'),
                controller: "DashboardController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.branch-report", {
                url: "/branch-report",
                title: "Branch",
                templateUrl:helper.basepath('geospatial/branch.geospatial.html'),
                resolve:helper.resolveFor('md.data.table','ui.select'),
                controller: "GeospatialController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.plot-report", {
                url: "/plot-report",
                title: "Plot Report",
                templateUrl:helper.basepath('geospatial/plot.geospatial.html'),
                resolve:helper.resolveFor('ui-leaflet','ui.select'),
                controller: "PlotReportController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.cbs", {
                url: "/cbs",
                title: "Core Banking Solution",
                templateUrl:helper.basepath('core_banking/core.banking.html'),
                resolve:helper.resolveFor('md.data.table','moment','ui.select'),
                controller: "CoreBankingController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })
            .state("app.cbs_detail", {
                url: "/cbs/:id",
                title: "Core Banking Solution",
                templateUrl:helper.basepath('core_banking/core.banking.detail.html'),
                resolve:helper.resolveFor('moment','ui.select'),
                controller: "CoreBankingDetailController",
                controllerAs: 'vm',
                data: {
                    authenticate: true
                }
            })

          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // -----------------------------------
            .state('page', {
                url: '/page',
                templateUrl: 'app/pages/page.html',
                resolve: helper.resolveFor('modernizr', 'icons','oitozero.ngSweetAlert','toaster','blockUI'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.isBoxed = false;
                }],
                data: {
                    authenticate: false
                }
            })
            .state('page.login', {
                url: '/login',
                title: 'Login',
                templateUrl: 'app/pages/login.html',
                controller: 'LoginFormController',
                controllerAs: 'login',
                data: {
                    authenticate: false
                }
            })
            .state('page.404', {
                url: '/404',
                title: 'Not Found',
                templateUrl: 'app/pages/404.html',
                data: {
                    authenticate: false
                }
            })
            .state('page.500', {
                url: '/500',
                title: 'Server error',
                templateUrl: 'app/pages/500.html',
                data: {
                    authenticate: false
                }
            })
            .state('page.maintenance', {
                url: '/maintenance',
                title: 'Maintenance',
                templateUrl: 'app/pages/maintenance.html',
                data: {
                    authenticate: false
                }
            })
          ;

    } // routesConfig

})();


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
                  isSuper = $rootScope.currentUser.role === "admin";
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
                          isSuper = $rootScope.currentUser.role === "admin";
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

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar
              sidebarAddBackdrop();

            }

          });

          var eventOff1 = scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize.sidebar', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          var eventOff2 = $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';

            var watchOff1 = $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }

          scope.$on('$destroy', function() {
            // detach scope events
            eventOff1();
            eventOff2();
            watchOff1();
            // detach dom events
            $sidebar.off(eventName);
            $win.off('resize.sidebar');
            wrapper.off(sbclickEvent);
          });

        }

        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // -----------------------------------
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');

          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );

          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache

          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .then(onReady, onError);
        }
    }
})();
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

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_AR':    'Español'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            }, attributes.triggerResize || 300);
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },

          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

/**
 * Created by Yoni on 1/8/2018.
 */
(function() {
    "use strict";

    angular.module("app.clients", [
    ]).run(runBlock);

    function runBlock() {
        // console.log("client app run");
    }


})();

/**
 * Created by Yonas on 5/7/2018.
 */
(function() {
    'use strict';

    angular.module('app.processing', [
    ]);

})();
(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            'app.common',
            'app.authentication',
            'app.profile',
            'app.mfi',
            'app.manage_roles',
            'app.manage_users',
            'app.welcomePage',
            'app.clients',
            'app.forms',
            'app.acat',
            'app.loan_management',
            'app.report',
            'app.geospatial',
            'app.banking'

        ]).config(customConfig)
        .run(customRun);

    customRun.$inject = [ '$rootScope', 'AuthService', '$http','$location'];

    function customRun($rootScope, AuthService, $http,$location){
        //TODO: redirect them to an access denied state if they do not have authorization to access it.

        //Angular UI router state changes
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

            if(!AuthService.IsAuthenticated()){
                //WHEN USER IS LOGGED OUT
                console.log("USER IS LOGGED OUT");
                AuthService.SaveAttemptUrl();
                $location.path('/page/login');

            }else{
                $rootScope.currentUser = AuthService.GetCurrentUser();
                // console.log("currentUser",$rootScope.currentUser);
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + AuthService.GetToken();
            }
        });
    }

    customConfig.$inject = [ '$mdAriaProvider', '$mdThemingProvider'];
    function customConfig($mdAriaProvider,$mdThemingProvider) {
        $mdAriaProvider.disableWarnings();
        $mdThemingProvider.theme('default')
            .primaryPalette('blue');
    }
})();
/**
 * Created by Yoni on 3/5/2018.
 */

(function() {
    "use strict";

    angular.module("app.acat", [
    ]).run(runBlock).config(config);

    function runBlock() {}
    function config() {
    }

})();

(function() {
    'use strict';

    angular
        .module('app.authentication', []);

})();
(function(angular) {
  "use strict";

  angular
    .module("app.common", [])
      .config(routeConfig)
      .run(runBlock);

  function runBlock() {}
  function routeConfig() {}

})(window.angular);


(function() {
    'use strict';

    angular
        .module('app.banking', []);

})();
/**
 * Created by Yoni on 1/29/2018.
 */
(function() {
    "use strict";

    config.$inject = ["$mdIconProvider"];
    angular.module("app.forms", [
    ]).run(runBlock).config(config);

    function runBlock() {}
    function config($mdIconProvider) {
        $mdIconProvider.iconSet("avatars", 'app/img/icons/avatar-icons.svg',128);
    }

})();

(function() {
    'use strict';

    angular
        .module('app.geospatial', ['ngSanitize'])
        .config(["$sceDelegateProvider", function($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist(['**']);
            // $sceDelegateProvider.resourceUrlWhitelist([
            //     // Allow same origin resource loads.
            //     'self',
            //     // Allow loading from our assets domain. **.
            //     'http://ergast.com/**'
            // ]);
        }]);

})();
/**
 * Created by Yonas on 4/27/2018.
 */
(function() {
    'use strict';

    angular.module('app.loan_management', [
        'app.clients',
        'app.processing'
    ]);

})();
/**
 * Created by Yoni on 11/30/2017.
 */
(function() {
    'use strict';

    angular
        .module('app.manage_roles', [])
        .run(runBlock)
        .config(routeConfig);

    function runBlock() {  }

    function routeConfig() {}

})();
/**
 * Created by Yoni on 11/30/2017.
 */
(function() {
    'use strict';

    angular
        .module('app.manage_users', []).config(configUM).run(runUM);

    function runUM() {}
    function configUM() {}



})();
(function() {
  "use strict";

  angular.module("app.mfi", [
  ]).run(runBlock);

function runBlock() {
}

})();

/**
 * Created by Yonas on 8/16/2018.
 */
(function() {
    'use strict';

    angular
        .module('app.profile', []);

})();

(function() {
    'use strict';

    angular
        .module('app.report', []);

})();
/**
 * Created by Yoni on 12/3/2017.
 */

(function() {
    'use strict';

    angular
        .module('app.welcomePage', []);

})();

// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('Controller', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();

/**
 * Created by Yonas on 7/4/2018.
 */
(function(angular) {
    'use strict';
    angular.module('custom')

        .service('SharedService', SharedService);
    SharedService.$inject = ['$http', 'CommonService','$sce'];

    function SharedService($http, CommonService,$sce) {
        return {
            GetBranches: _getBranches,
            GetWoredas:_getWoredas,
            GetUsers:_getUsers,
            GetClients:_getClients
        };

        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }
        function _getWoredas(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.GEOSPATIAL,API.Methods.GeoSpatial.Woredas));
        }
        function _getUsers(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.GetAll));
        }
        function _getClients(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients));
        }

    }

})(window.angular);
/**
 * Created by Yoni on 3/11/2018.
 */

(function(angular) {
    'use strict';
    angular.module('app.forms')

        .service('ACATService', ACATService);

    ACATService.$inject = ['$http','CommonService'];

    function ACATService($http, CommonService) {
        return {
            GetCrops:_getCrops,
            SaveCrop:_createCrop,
            UpdateCrop:_updateCrop,
            GetAllACATList: _getAllACAT,
            GetACATById: _getACATById,
            CreateACAT:_createACAT,
            UpdateACAT:_updateACAT,
            AddCostList:_addCostList,
            UpdateCostList:_updateCostList,
            RemoveCostListLinear:_removeCostListLinear,
            RemoveCostListGroup:_removeCostGroupList,
            RemoveCostGroup:_removeCostGroup,
            UpdateCostGroup:_updateCostGroup,
            ResetCostList:_resetCostList
        };


        function _getCrops() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.ACAT,API.Methods.ACAT.Crop));
        }
        function _createCrop(crop){
            return $http.post(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.CreateCrop), crop);
        }
        function _updateCrop(crop){
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.Crop,crop._id), crop);
        }
        function _getACATById(id) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.ACAT,id));
        }
        function _getAllACAT() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.ACAT,API.Methods.ACAT.ACAT));
        }
        function _addCostList(cost) {
            return $http.post(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.CostList),cost);
        }

        function _updateCostList(cost){
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,cost._id), cost);
        }
        function _createACAT(acat) {
            return $http.post(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.CreateACAT),acat);
        }
        function _updateACAT(acat) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.ACAT,acat._id), acat);
        }

        function _removeCostListLinear(cost_list){
            var item = {  item_id: cost_list.item_id  };
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,cost_list._id) +'/' + ACAT_COST_LIST_TYPE.LINEAR, item);
        }
        function _removeCostGroupList(group_cost_list){
            var item = {  item_id: group_cost_list.item_id  };
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListGroups,group_cost_list._id) +'/items', item);
        }
        function _removeCostGroup(group){
            var item = {  item_id: group.item_id  };
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,group._id) +'/group', item);
        }

        function _updateCostGroup(group) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,'grouped') +'/' +group._id, group);
        }
        function _resetCostList(cost_list) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.CostListUpdate,cost_list._id) +'/reset', {});
        }
    }


})(window.angular);
(function(angular) {
    'use strict';
    angular.module('app.authentication')

    .service('AuthService', AuthService);

     AuthService.$inject = ['$http', 'StorageService', 'CommonService', 'APP_CONSTANTS', '$rootScope', '$state','$location'];

    function AuthService($http, StorageService, CommonService, APP_CONSTANTS, $rootScope, $state,$location) {
        this.authorized = false;

        return {
            login: _login,
            Logout: logout,
            GetCredentials: getCredentials,
            SetCredentials: setCredentials,
            GetToken: getToken,
            GetCurrentUser:_getCurrentUser,
            GetAccessBranches:_getAccessBranches,
            IsSuperuser:isSuper,
            SaveAttemptUrl: _saveAttemptUrl,
            RedirectToAttemptedUrl:_redirectToAttemptedUrl,
            IsAuthenticated: _isAuthenticated
        };


        function _saveAttemptUrl() {

            if($location.path().toLowerCase() !== '/page/login') {
                StorageService.Set(APP_CONSTANTS.REDIRECT_TO_URL,$location.path());
            }
            else {
                StorageService.Set(APP_CONSTANTS.REDIRECT_TO_URL,'/');
            }
        }
        function _redirectToAttemptedUrl() {
            var url = StorageService.Get(APP_CONSTANTS.REDIRECT_TO_URL);
            $location.path(url);
        }

        function getCredentials() {
            return !angular.isUndefined(StorageService.Get(APP_CONSTANTS.StorageKey.SESSION)) ? StorageService.Get(APP_CONSTANTS.StorageKey.SESSION) : null;
        }
        function _isAuthenticated() {
            return StorageService.Get(APP_CONSTANTS.StorageKey.SESSION) !== null;
        }
        function setCredentials(session) {
            StorageService.Set(APP_CONSTANTS.StorageKey.SESSION, session);
        }

        function getToken() {
            return StorageService.Get(APP_CONSTANTS.StorageKey.SESSION).token;
        }


        function _getCurrentUser(){
          var credential = getCredentials();
          return credential !== null? credential.user: null;
        }
        function _getAccessBranches() {
            var credential = getCredentials();
            return credential !== null ?  !isSuper()? credential.user.account.access_branches : [] :null;
        }

        function isSuper() {
            var credential = getCredentials();
            return credential !== null && credential.user.username === 'super@bidir.com';
        }

        function _login(user) {
          return $http.post(CommonService.buildUrl(API.Service.Auth,API.Methods.Auth.Login), user);
        }

        function logout() {
            StorageService.Reset();
            $rootScope.currentUser = null;
            $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.logoutSuccess);
            $state.go('page.login');
        }

    }

})(window.angular);

/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function(angular) {
    "use strict";

    angular
        .module('app.authentication')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['AuthService', '$state',  '$rootScope',  'APP_CONSTANTS',  'blockUI', 'AlertService'];

    function LoginFormController( AuthService,  $state, $rootScope,  APP_CONSTANTS, blockUI,AlertService
    ) {
        var vm = this;
        vm.userValidator = {
            usernameMin: 4,
            usernameMax: 20,
            passwordMin: 6
        };

        vm.login = function() {
            var myBlockUI = blockUI.instances.get('loginFormBlockUI');
            myBlockUI.start("Logging in");

            AuthService.login(vm.user).then(
                function(response) {
                    console.log("login user",response);
                    var result = response.data;
                    vm.user = result.user;
                    $rootScope.currentUser = vm.user;
                    $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginSuccess);
                    AuthService.SetCredentials(result);
                    myBlockUI.stop();
                    AuthService.RedirectToAttemptedUrl();
                },
                function(error) {
                    myBlockUI.stop();
                    console.log("error", error);
                    AlertService.showError("Error on Login", "The username or password is incorrect! Please try again.");
                    $rootScope.$broadcast(APP_CONSTANTS.AUTH_EVENTS.loginFailed);
                }
            );


        };
    }
})(window.angular);


(function (angular) {
    "use strict";

    angular
        .module('app.common')
        .constant("_", window._)
        .constant("APP_CONSTANTS", {
            USER_ROLES: {
                ALL: "*",
                ADMIN: "admin"
            },
            StorageKey: {
                TOKEN: "token",
                SESSION: "SESSION",
                PERMISSIONS: "PERMISSIONS",
                ACCESS_BRANCHES: "ACCESS_BRANCHES"
            },
            AUTH_EVENTS: {
                loginSuccess: "auth-login-success",
                loginFailed: "auth-login-failed",
                logoutSuccess: "auth-logout-success",
                logoutUser: "auth-logout-user",
                sessionTimeout: "auth-session-timeout",
                notAuthenticated: "auth-not-authenticated",
                notAuthorized: "auth-not-authorized"
            },
            REDIRECT_TO_URL: "redirectToUrlAfterLogin",
            FILE_TYPE: {
                PDF: {type: 'application/pdf'},
                DOC: {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
                EXCEL: {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
            }
        })
        .constant('API_DEFINITION',{
        Service: {
            NONE:'',
            MFI: 'MFI',
            Auth: 'auth',
            Users: 'users',
            SCREENING:'screenings',
            LOANS:'loans',
            FORM:'forms',
            ACAT:'acat',
            GEOSPATIAL: 'geospatial',
            REPORT:'reports',
            GROUPS: 'groups',
            FETCH: 'fetch'
        },
        Methods: {
            Auth: {
                Login: 'login'
            },
            MFI: {
                MFIUpdate:'',
                MFI:'create',
                GetAll:'all',
                Branches: 'branches',
                CreateBranch: 'branches/create',
                FetchBranches: 'branches',
                Zones: 'zones'
            },
            Users: {
                Account:'accounts',
                UserUpdate:'',
                User:'create',
                GetAll: '',
                Roles: 'roles',
                Role: 'roles/create'
            },
            Roles:{
                GetAll: 'roles',
                Create: 'roles/create',
                Permissions: 'permissions',
                PermissionByGroup: 'permissions/groups'
            },
            Tasks: {
                Task:'tasks',
                GetAll: 'tasks/paginate?page=1&per_page=100'
            },
            Clients:{
                All:'clients/paginate?source=web',
                Client:'clients',
                SearchClient:''
            },
            Form:{
                All: '',
                Create: 'create',
                Question:'questions',
                Create_Question:'questions/create',
                Section:'sections',
                Create_Section:'sections/create'
            },
            ACAT:{
                Empty: '',
                ACAT:'forms',
                Crop:'crops',
                Clients:'clients',
                CreateCrop:'crops/create',
                LoanProducts:'loanProducts',
                CreateLoanProducts:'loanProducts/create',
                CostListUpdate: 'costLists',
                CostListGroups: 'costLists/groups',
                CostList: 'costLists/add',
                CreateACAT:'forms/initialize',
                LoanProposals:'loanProposals/acat',
                Printout:'printout'
            },
            SCREENING:{
                Screening:'',
                Clients:'clients',
                Histories: 'histories/search?'
            },
            LOANS:{
                Loans:'',
                Clients:'clients'
            },
            CBS:{
                Clients: 'clients/search?cbs_status=NO ATTEMPT&&cbs_status=DENIED&loan_cycle_number=1&status=loan_granted',
                CBS:    'clients/cbs',
                CBSBulk:'clients/cbs/bulk',
                Connect: 'cbs/connect'
            },
            GeoSpatial:{
                SaveConfig: 'configs/create',
                Config: 'configs',
                UserConfig: 'configs/search?user=',
                Woredas: 'weredas',
                Request: 'requests/create',
                Search: 'requests/search?'
            },
            Report:{
                Report: '',
                AllReport: 'all'
            },
            Group:{
                Group: '',
                Printout:'printout'
            }
        }
    });
})(window.angular);

/**
 * Created by Yoni on 12/30/2017.
 */
//Directive

(function(angular) {

    'use strict';

    angular.module('app.common')
        .directive('userpermission', ["PermissionService", function(PermissionService) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    scope.$watch(attrs.userpermission, function(value) {
                        var permission = value;
                        var hasPermission = false;
                        if (_.isString(permission)) {
                            hasPermission = PermissionService.hasThisPermission(permission);
                        } else if (_.isArray(permission)) {
                            hasPermission = PermissionService.hasThesePermissions(permission); //multiple permissions
                        }

                        toggleVisibility(hasPermission);
                    });

                    function toggleVisibility(hasPermission) {
                        if (hasPermission) {
                            element.show();
                        } else {
                            element.hide();
                        }
                    }
                }
            };
        }])
        // Text Editor template directive
        .directive('editor', function() {
            return {
                restrict: 'E',
                template: "<div ng-show='vm.editorEnabledForElement === (radioOption);'>" +
                    "<input class='editableTextInput' type='text' ng-model='vm.text' ng-required='true' " +
                    "show-focus='vm.editorEnabledForElement === (radioOption);' " +
                    "keypress-enter='vm.saveOption(radioOption, vm.text)' " +
                    "ng-blur='vm.saveOption(radioOption, vm.text)'" +
                    " show-focus select-on-click >" +
                    "</div>"
            };
        })
        .directive('keypressEnter', function() {
            return function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        scope.$apply(function() {
                            scope.$eval(attrs.keypressEnter);
                        });
                        console.log("Pressed enter.");
                        event.preventDefault();
                    }
                });
            };
        })
        // Put focus on element when event is triggered.
        // https://coderwall.com/p/a41lwa/angularjs-auto-focus-into-input-field-when-ng-show-event-is-triggered

        .directive('eventFocus', ["focus", function(focus) {
            return function(scope, elem, attr) {
                elem.on(attr.eventFocus, function() {
                    focus(attr.eventFocusId);
                });

                // // Removes bound events in the element itself
                // // when the scope is destroyed
                // scope.$on('$destroy', function() {
                //     element.off(attr.eventFocus);
                // });
            };
        }])
        // Select text on focus.
        // http://stackoverflow.com/questions/14995884/select-text-on-input-focus
        .directive('selectOnClick', ['$window', function($window) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('focus', function() {
                        if (!$window.getSelection().toString()) {
                            // Required for mobile Safari
                            this.setSelectionRange(0, this.value.length)
                        }
                    });
                }
            };
        }])

        .directive('questionRow', ["$timeout", "$compile", "$filter", function($timeout, $compile, $filter) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    questionRowData: '=questionRowData',
                    layoutData: '=layoutData',
                    parentRowNo: '=parentRowNo',
                    rowNo: '=rowNo',
                    isSubquestion: '=isSubquestion',
                    isReadonly: '=isReadonly',
                    valueChanged: '='
                },
                link: function($scope, element, attrs) {
                    $scope.$watch('questionRowData.values', function(newValue) {
                        if (!_.isEmpty(newValue) && $scope.questionRowData.type !== QUESTION_TYPE.FILL_IN_BLANK && !_.isUndefined($scope.valueChanged)) {
                            $scope.valueChanged($scope.questionRowData);
                        }
                    }, true);
                },
                templateUrl: 'app/views/common/directives/templates/question_row.tmpl.html'
            };
        }])
        .directive('questionRowWithAnswer', ["$timeout", "$compile", "$filter", function($timeout, $compile, $filter) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    questionRowData: '=questionRowData',
                    layoutData: '=layoutData',
                    parentRowNo: '=parentRowNo',
                    rowNo: '=rowNo',
                    isSubquestion: '=isSubquestion'
                },
                link: function($scope, element, attrs) {},
                templateUrl: 'app/views/common/directives/templates/question_row_with_answer.tmpl.html'
            };
        }])
        .directive('question', ["$timeout", "$compile", "$filter", function($timeout, $compile, $filter) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    questionData: '=questionData',
                    isReadonly: '=isReadonly'
                },
                link: function($scope, element, attrs) {

                    $scope.$watch('questionData', function(questionData) {
                        if (questionData) {
                            var questionType = questionData.type.toLowerCase();


                            switch (questionType) {
                                case "fill_in_blank":
                                {
                                    break;
                                }
                                case "yes_no":
                                {
                                    questionType = "single_choice";
                                    break;
                                }
                            }

                            //Parse values
                            if (questionData.validation_factor === 'NUMERIC' || questionData.validation_factor === 'ALPHANUMERIC') {
                                questionData.values = _.map(questionData.values, function(val) {
                                    return parseFloat(val);
                                });
                            }

                            $scope.dynamicTemplateUrl = 'app/views/common/directives/templates/' + questionType + '.tmpl.html';
                        }
                    });

                    //Helping function
                    //Multi-select
                    $scope.toggle = function(item, list) {
                        var idx = list.indexOf(item);
                        if (idx > -1) {
                            list.splice(idx, 1);
                        } else {
                            list.push(item);
                        }
                    };

                    $scope.exists = function(item, list) {
                        return list.indexOf(item) > -1;
                    };
                },

                template: '<ng-include src="dynamicTemplateUrl"></ng-include>'
            };
        }])
        .directive('costList', ["$timeout", "$compile", "$filter", function($timeout, $compile, $filter) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    costListData: '=costListData'
                },
                link: function($scope, element, attrs) {

                    $scope.$watch(watchExpected, function(oldvalue) {
                        $scope.costListData.estimated.total_price = $scope.costListData.estimated.value * $scope.costListData.estimated.unit_price;
                    }, true);

                    $scope.$watch(watchActual, function(oldvalue) {
                        $scope.costListData.achieved.total_price = $scope.costListData.achieved.value * $scope.costListData.achieved.unit_price;
                    }, true);

                    function watchExpected() {
                        return watchProperties($scope.costListData.estimated, ['cash_flow', 'total_price']);
                    }

                    function watchActual() {
                        return watchProperties($scope.costListData.achieved, ['cash_flow', 'total_price']);
                    }

                    function watchProperties(obj, keys) {
                        return Object.keys(obj).filter(function(key) {
                            return keys.indexOf(key) === -1;
                        }).reduce(function(result, key) {
                            result[key] = obj[key];
                            return result;
                        }, {});
                    }

                    $scope.monthes = [{
                        "name": "January",
                        "short": "jan"
                    }, {
                        "name": "February",
                        "short": "feb"
                    }, {
                        "name": "March",
                        "short": "mar"
                    }, {
                        "name": "April",
                        "short": "apr"
                    }, {
                        "name": "May",
                        "short": "may"
                    }, {
                        "name": "June",
                        "short": "june"
                    }, {
                        "name": "July",
                        "short": "july"
                    }, {
                        "name": "August",
                        "short": "aug"
                    }, {
                        "name": "September",
                        "short": "sep"
                    }, {
                        "name": "October",
                        "short": "oct"
                    }, {
                        "name": "November",
                        "short": "nov"
                    }, {
                        "name": "December",
                        "short": "dec",
                    }];
                },
                templateUrl: 'app/views/common/directives/templates/cost_list.tmpl.html'
            };
        }])
        .directive('reportParameter',["$timeout", "$compile", "$filter", "$http", function($timeout, $compile, $filter,$http) {
            var baseUrl = 'http://api.test.bidir.gebeya.co/';
            return {
                restrict: 'E',
                scope: {
                    parameters: '=parameters'
                },
                link: function($scope, element, attrs) {

                    $scope.searchParameters = function(parameter,searchTerm){
                        if(parameter.type === 'SEARCH' && searchTerm !== ""){
                            console.log("searching....",searchTerm);

                            if(searchTerm.length >= 3){
                                let url = baseUrl+'reports/'+parameter.get_from + '?search=' + searchTerm;
                                $http.get(url).then(function (response) {
                                    parameter.values = response.data;
                                });
                            }

                        }
                    };

                },
                templateUrl: 'app/views/common/directives/templates/report.parameter.tmpl.html'
            };
        }])
        .directive('formWizard', formWizard)

         formWizard.$inject = ['$parse'];

         function formWizard ($parse) {
                var directive = {
                    link: link,
                    controller:  function ($scope) {
                        $scope.wizardValidate = function(formName) {
                            if(angular.isDefined($scope[formName] )) {
                                // Set submitted to perform validation
                                $scope[formName].$setSubmitted(true);
                                // return valid status of the subform
                                return $scope[formName].$valid;
                            }
                        }
                    },
                    restrict: 'A',
                    scope: true
                };
                return directive;

                function link(scope, element, attrs) {
                    var validate = $parse(attrs.validateSteps)(scope),
                        wiz = new Wizard(attrs.steps, !!validate, element);
                    scope.wizard = wiz.init();
                }

                function Wizard (quantity, validate, element) {

                    var self = this;
                    self.quantity = parseInt(quantity,10);
                    self.validate = validate;
                    self.element = element;

                    self.init = function() {
                        self.createsteps(self.quantity);
                        self.go(1); // always start at fist step
                        return self;
                    };

                    self.go = function(step) {

                        if ( angular.isDefined(self.steps[step]) ) {
                            if(self.validate && step !== 1) { // no need to validate when move to first state
                                var scope = self.element.scope();
                                if(typeof scope.wizardValidate === 'function') {
                                    var form = $(self.element).children().children('div').eq(step - 2).children('[ng-form]');
                                    if ( ! scope.wizardValidate(form.attr('ng-form')))
                                        return false;
                                }
                            }

                            self.cleanall();
                            self.steps[step] = true;
                        }
                    };

                    self.active = function(step) {
                        return !!self.steps[step];
                    };

                    self.cleanall = function() {
                        for(var i in self.steps){
                            self.steps[i] = false;
                        }
                    };

                    self.createsteps = function(q) {
                        self.steps = [];
                        for(var i = 1; i <= q; i++) self.steps[i] = false;
                    };

                }

            }



})(window.angular);

(function () { 
 return angular.module("app.common")
.constant("EnvironmentConfig", {"BaseUrl":"http://api.test.bidir.gebeya.co/","SeasonalMonitoringBaseUrl":"http://seasmon.wenr.wur.nl/cgi-bin/register.py?","SeasmonBaseUrl":"http://seasmon.wenr.wur.nl/html/"})
.constant("app_version", "1.0");

})();

/**
 * Created by Yoni on 12/14/2017.
 */
(function (angular) {
    'use strict';
    angular.module('app.common')
        .filter('ReplaceUnderscore', function () {
            return function (input) {
                return typeof input === "string" ? input.replace(/_/g, ' ') : input;
            };
        })
        .filter('trusted', ['$sce', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }])
        .filter('ordinal', function(){
            return function(numb){
                const number = Number(numb);
                if(isNaN(number) || number < 1 ){
                    return number;
                } else {
                    let lastDigit = number % 10;
                    if(lastDigit === 1){
                        return number + 'st'
                    } else if(lastDigit === 2){
                        return number + 'nd'
                    } else if (lastDigit === 3){
                        return number + 'rd'
                    } else if (lastDigit > 3){
                        return number + 'th'
                    }
                }
            }
        })
        .filter('titleCase', function () {
        return function (input) {
            input = input || '';
            return input.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };
    });

})(window.angular);
var API = {
    Service: {
        NONE:'',
        MFI: 'MFI',
        Auth: 'auth',
        Users: 'users',
        SCREENING:'screenings',
        LOANS:'loans',
        FORM:'forms',
        ACAT:'acat',
        GEOSPATIAL: 'geospatial',
        REPORT:'reports',
        GROUPS: 'groups',
        FETCH: 'fetch'
    },
    Methods: {
        Auth: {
            Login: 'login'
        },
        MFI: {
            MFIUpdate:'',
            MFI:'create',
            GetAll:'all',
            Branches: 'branches',
            CreateBranch: 'branches/create',
            FetchBranches: 'branches',
            Zones: 'zones'
        },
        Users: {
            Account:'accounts',
            UserUpdate:'',
            User:'create',
            GetAll: '',
            Roles: 'roles',
            Role: 'roles/create'
        },
        Roles:{
            GetAll: 'roles',
            Create: 'roles/create',
            Permissions: 'permissions',
            PermissionByGroup: 'permissions/groups'
        },
        Tasks: {
            Task:'tasks',
            GetAll: 'tasks/paginate?page=1&per_page=100'
        },
        Clients:{
            All:'clients/paginate?source=web',
            Client:'clients',
            SearchClient:''
        },
        Form:{
            All: '',
            Create: 'create',
            Question:'questions',
            Create_Question:'questions/create',
            Section:'sections',
            Create_Section:'sections/create'
        },
        ACAT:{
            Empty: '',
            ACAT:'forms',
            Crop:'crops',
            Clients:'clients',
            CreateCrop:'crops/create',
            LoanProducts:'loanProducts',
            CreateLoanProducts:'loanProducts/create',
            CostListUpdate: 'costLists',
            CostListGroups: 'costLists/groups',
            CostList: 'costLists/add',
            CreateACAT:'forms/initialize',
            LoanProposals:'loanProposals/acat',
            Printout:'printout'
        },
        SCREENING:{
            Screening:'',
            Clients:'clients',
            Histories: 'histories/search?'
        },
        LOANS:{
            Loans:'',
            Clients:'clients'
        },
        CBS:{
            Clients: 'clients/search?cbs_status=NO ATTEMPT&&cbs_status=DENIED&loan_cycle_number=1&status=loan_granted',
            CBS:    'clients/cbs',
            CBSBulk:'clients/cbs/bulk',
            Connect: 'cbs/connect'
        },
        GeoSpatial:{
            SaveConfig: 'configs/create',
            Config: 'configs',
            UserConfig: 'configs/search?user=',
            Woredas: 'weredas',
            Request: 'requests/create',
            Search: 'requests/search?'
        },
        Report:{
            Report: '',
            Dashboard: 'dashboard',
            AllReport: 'all'
        },
        Group:{
            Group: '',
            Printout:'printout'
        }
    }
};

var MONTHS_CONST = [
    {
        "name": "January",
        "short": "Jan",
        "number": 1,
        "days": 31
    },
    {
        "name": "February",
        "short": "Feb",
        "number": 2,
        "days": 28
    },
    {
        "name": "March",
        "short": "Mar",
        "number": 3,
        "days": 31
    },
    {
        "name": "April",
        "short": "Apr",
        "number": 4,
        "days": 30
    },
    {
        "name": "May",
        "short": "May",
        "number": 5,
        "days": 31
    },
    {
        "name": "June",
        "short": "Jun",
        "number": 6,
        "days": 30
    },
    {
        "name": "July",
        "short": "Jul",
        "number": 7,
        "days": 31
    },
    {
        "name": "August",
        "short": "Aug",
        "number": 8,
        "days": 31
    },
    {
        "name": "September",
        "short": "Sep",
        "number": 9,
        "days": 30
    },
    {
        "name": "October",
        "short": "Oct",
        "number": 10,
        "days": 31
    },
    {
        "name": "November",
        "short": "Nov",
        "number": 11,
        "days": 30
    },
    {
        "name": "December",
        "short": "Dec",
        "number": 12,
        "days": 31
    }
];

var QUESTION_TYPE = {
    FILL_IN_BLANK: "FILL_IN_BLANK",
    YES_NO: "YES_NO",
    MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
    SINGLE_CHOICE: "SINGLE_CHOICE",
    GROUPED: "GROUPED"
};
var ACAT_GROUP_CONSTANT = {
    SEED: "SEED",
    FERTILIZER: "FERTILIZER",
    CHEMICALS: "CHEMICALS",
    LABOUR_COST:"LABOUR_COST",
    OTHER_COST:"OTHER_COST"
};
var ACAT_COST_LIST_TYPE = {
    LINEAR: "linear",
    GROUPED: "grouped"
};

var SCREENING_STATUS = {
    IN_PROGRESS:{code:'screening_inprogress',name:'In Progress'},
    SUBMITTED:{code:'submitted',name:'Submitted'},
    APPROVED:{code:'approved',name:'Approved'},
    DECLINED_FINAL:{code:'declined_final',name:'Declined Final'},
    DECLINED_UNDER_REVIEW:{code:'declined_under_review',name:'Declined Under Review'}
};

var MD_TABLE_GLOBAL_SETTINGS = {
    PAGE_SIZES : [10, 25, 50, 100, 250, 500],
    OPTIONS:  {
        rowSelection: false,
        multiSelect: false,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: false
    }
};
var CIVIL_STATUSES  = ["single","married","widowed","other"];

var INDICATOR = {
    VI: 'VI',
    RAINFALL: 'PRECIP'
};
/**=========================================================
 * Collapse panels * [panel-collapse]
 =========================================================*/
(function() {
    'use strict';

    angular.module('app.common')
        .directive('panelCollapse', panelCollapse);

    function panelCollapse () {
        var directive = {
            controller: Controller,
            restrict: 'A',
            scope: false
        };
        return directive;
    }

    Controller.$inject = ['$scope', '$element', '$timeout', '$localStorage'];
    function Controller ($scope, $element, $timeout, $localStorage) {
      var storageKeyName = 'panelState';

      // Prepare the panel to be collapsible
      var $elem   = $($element),
          parent  = $elem.closest('.panel'), // find the first parent panel
          panelId = parent.attr('id');

      // Load the saved state if exists
      var currentState = loadPanelState( panelId );
      if ( typeof currentState !== 'undefined') {
        $timeout(function(){
            $scope[panelId] = currentState; },
          10);
      }

      // bind events to switch icons
      $element.bind('click', function(e) {
        e.preventDefault();
        savePanelState( panelId, !$scope[panelId] );

      });
  
      // Controller helpers
      function savePanelState(id, state) {
        if(!id) return false;
        var data = angular.fromJson($localStorage[storageKeyName]);
        if(!data) { data = {}; }
        data[id] = state;
        $localStorage[storageKeyName] = angular.toJson(data);
      }
      function loadPanelState(id) {
        if(!id) return false;
        var data = angular.fromJson($localStorage[storageKeyName]);
        if(data) {
          return data[id];
        }
      }
    }

})();

/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels.
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

(function() {
    'use strict';

    angular.module('app.common')
        .directive('paneltool', paneltool);

    paneltool.$inject = ['$compile', '$timeout'];
    function paneltool ($compile, $timeout) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: false
        };
        return directive;

        function link(scope, element, attrs) {

          var templates = {
            /* jshint multistr: true */
            collapse:'<a href="#" panel-collapse="" uib-tooltip="Collapse Panel" ng-click="{{panelId}} = !{{panelId}}"> \
                        <em ng-show="{{panelId}}" class="fa fa-plus ng-no-animation"></em> \
                        <em ng-show="!{{panelId}}" class="fa fa-minus ng-no-animation"></em> \
                      </a>',
            dismiss: '<a href="#" panel-dismiss="" uib-tooltip="Close Panel">\
                       <em class="fa fa-times"></em>\
                     </a>',
            refresh: '<a href="#" panel-refresh="" data-spinner="{{spinner}}" uib-tooltip="Refresh Panel">\
                       <em class="fa fa-refresh"></em>\
                     </a>'
          };

          var tools = scope.panelTools || attrs;

          $timeout(function() {
            element.html(getTemplate(element, tools )).show();
            $compile(element.contents())(scope);

            element.addClass('pull-right');
          });

          function getTemplate( elem, attrs ){
            var temp = '';
            attrs = attrs || {};
            if(attrs.toolCollapse)
              temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
            if(attrs.toolDismiss)
              temp += templates.dismiss;
            if(attrs.toolRefresh)
              temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
            return temp;
          }
        }// link
    }

})();

(function(angular) {
    "use strict";


    angular
        .module('app.banking')
        .controller('CoreBankingController', CoreBankingController);

    CoreBankingController.$inject = ['CoreBankingService','$scope','AuthService','$rootScope','AlertService','$state'];

    function CoreBankingController(CoreBankingService,$scope,AuthService,$rootScope,AlertService,$state) {
        var vm = this;
        //GET TITLES LIST
        vm.titles = CoreBankingService.GetTitles;
        //CHECK ALL/UNCHECK ALL OPTIONS
        vm.onAllClientChange = _onAllClientChange;
        vm.CheckUncheckAll = _checkUncheckAll;
        vm.CheckUncheckHeader = _checkUncheckHeader;
        //Filter related
        vm.clearSearch = _clearSearch;
        vm.onSelectedBranch = _onSelectedBranch;
        //Client Related
        vm.saveSingleClient = _saveSingleClient;
        vm.saveAllClients = _saveAllClients;
        vm.cbs_clientDetail = _clientDetail;
        //UI SELECT Option for adding new titles
        vm.refreshResults = refreshResults;

        vm.statusStyle = _statusStyle;

        initialize();

        function initialize() {
            $rootScope.app.layout.isCollapsed = true;
            vm.filter = {show : false , allClient: "false"};
            vm.IsAllChecked = false;
            vm.query = { search: '' };
            vm.currentUser = {selected_access_branch:undefined};

            callCBSReadyApi();
            GetBranchFilter();
        }

        function _onAllClientChange() {
            if(vm.filter.allClient === "true"){
                GetAllClientsApi();
            }else{
                callCBSReadyApi();
            }
        }

        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                CoreBankingService.GetBranches().then(function(response){
                    vm.currentUser.user_access_branches = response.data.docs;
                },function(error){
                    vm.currentUser.user_access_branches = [];
                    console.log("error on GetBranchFilter",error);
                });
            }
            else {
                vm.currentUser.user_access_branches = AuthService.GetAccessBranches();
            }
        }

        function _onSelectedBranch(){
            vm.clients = vm.clientsCopy;

            vm.clients = _.filter(vm.clients,function(client){
                if(!_.isUndefined(client.branch) && client.branch !== null){
                    return client.branch._id === vm.currentUser.selected_access_branch._id;
                }
            });

        }

        function _checkUncheckHeader() {
            vm.IsAllChecked = true;
            for (var i = 0; i < vm.clients.length; i++) {
                if (!vm.clients[i].selected) {
                    vm.IsAllChecked = false;
                    break;
                }
            }
        }

        function _checkUncheckAll() {
            for (var i = 0; i < vm.clients.length; i++) {
                if(vm.clients[i].status === 'loan_granted' ){
                    vm.clients[i].selected = vm.IsAllChecked;
                }else{
                    vm.clients[i].selected = false;
                }

            }
        }

        function _clientDetail(client){
            CoreBankingService.setClientInfo(client);
            $state.go('app.cbs_detail',{id:client._id});
        }

        function _statusStyle(status){
            var style = '';
            switch (status){
                case 'ACCEPTED':
                    style =  'label label-success';
                    break;
                case 'DENIED':
                    style =  'label label-danger';
                    break;
                case 'NO ATTEMPT':
                    style =  'label label-inverse';
                    break;
                default:
                    style =  'label label-warning';
            }
            return style;
        }

        function _saveSingleClient(client){

            var clientFormatted = {
                branchId: client.branchId,
                title : client.title,
                client: client._id };

            CoreBankingService.ConnectToCBS().then(function (value) {
                CoreBankingService.SendClientToCBS(clientFormatted).then(
                    function (response) {
                        AlertService.showSuccess('Client Info sent to CBS!','Client Information sent to Core Banking Solution!');
                        vm.onAllClientChange();
                    }
                    ,function (error) {
                        console.log('error',error);
                        var message = error.data.error.message;
                        AlertService.showError( 'Oops... Something went wrong', message);
                    });
                },function (reason) {
                    AlertService.showError( 'CAN NOT CONNECT TO CBS', reason);
                }
            );


        }

        function _saveAllClients(clients) {
            var clientList = [];
            _.each(clients, function (client) {
                if (client.selected && client.status === 'loan_granted') {
                    clientList.push({
                        branchId: vm.allBranchId,
                        client: client._id,
                        title: client.title ? client.title : " - "
                    });
                }
            });

            CoreBankingService.ConnectToCBS().then(function () {
                    CoreBankingService.SendBulkClientsToCBS(clientList).then(
                        function (response) {
                            AlertService.showSuccess(clientList.length + ' clients sent to CBS!',response);
                            console.log("response",response);
                        }
                        ,function (error) {
                            console.log('error',error);
                            var message = error.data.error.message;
                            AlertService.showError( 'Oops... Something went wrong', message);
                        });
                },function (reason) {
                    AlertService.showError( 'CAN NOT CONNECT TO CBS', reason);
                }
            );



            // AlertService.showInfo('Clients data sent to CBS!', "Total number of clients information sent to CBS is " + vm.clients.length);
        }

        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            callCBSReadyApi();
        }

        function callCBSReadyApi(){
            vm.clientPromise = CoreBankingService.GetClients().then(function(response){
                console.log(" callApi vm.clients",response);
                vm.clients =  response.data.docs;
                vm.clientsCopy = angular.copy(vm.clients);
                vm.CheckUncheckHeader();
            },function (error) {
                console.log("error callApi vm.clients",error);
            });
        }

        function GetAllClientsApi(){
            vm.clientPromise = CoreBankingService.GetAllClients().then(function(response){
                console.log(" callApi vm.clients",response);
                vm.clients = response.data.docs;
                vm.clientsCopy = angular.copy(vm.clients);
                vm.CheckUncheckHeader();
            },function (error) {
                console.log("error callApi vm.clients",error);
            });
        }



        function refreshResults($select){
            var search = $select.search,
                list = angular.copy($select.items),
                FLAG = -1;
            //remove last user input
            list = list.filter(function(item) {
                return item.id !== FLAG;
            });

            if (!search) {
                //use the predefined list
                $select.items = list;
            }
            else {
                //manually add user input and set selection
                var userInputItem = search;
                $select.items = [userInputItem].concat(list);
                $select.selected = userInputItem;
            }
        }

    }

})(window.angular);
(function(angular) {
    "use strict";


    angular
        .module('app.banking')
        .controller('CoreBankingDetailController', CoreBankingDetailController);

    CoreBankingDetailController.$inject = ['CoreBankingService','$scope','$rootScope','blockUI','AlertService','$stateParams'];

    function CoreBankingDetailController(CoreBankingService,$scope,$rootScope,blockUI,AlertService,$stateParams) {
        var vm = this;
        vm.client_id = $stateParams.id;
        vm.titles = CoreBankingService.GetTitles;
        vm.updateClient = _updateClient;
        vm.updateClientAndSendToCBS = _updateClientAndSendToCBS;
        $rootScope.app.layout.isCollapsed = true;

        initialize();

        function initialize() {

            initializeDatePicker();
            vm.civilStatuses = CIVIL_STATUSES;
            vm.months = MONTHS_CONST;
            callAPI();
        }

        function callAPI() {

            CoreBankingService.GetClientById(vm.client_id).then(function (response) {
                vm.client = response.data;
                var clientCopy = angular.copy(vm.client);
                var dt = new Date(clientCopy.date_of_birth);
                vm.client.date_of_birth = dt;
                vm.client.civil_status = clientCopy.civil_status.toLowerCase();
                vm.client.gender = clientCopy.gender.toLowerCase();
            },function (error) {
                console.log("Updated client error",error);

                var message = error.data.error.message;
                AlertService.showError("Failed to update Client",message);

            });




        }

        function _updateClient() {

            var myBlockUI = blockUI.instances.get('CBSClientDetailBlockUI');
            myBlockUI.start();
            var client = vm.client;
            client.branch = vm.client.branch._id;
            client.created_by =  undefined;
            //UPDATE CLIENT INFORMATION
            CoreBankingService.UpdateClient(vm.client).then(function (response) {
                console.log("save client",response);
                myBlockUI.stop();
                AlertService.showSuccess("Updated Successfully","Updated Client information successfully");
            },function (error) {
                console.log("Updated client error",error);
                myBlockUI.stop();
                var message = error.data.error.message;
                AlertService.showError("Failed to update Client",message);

            });



        }

        function _updateClientAndSendToCBS() {
            var myBlockUI = blockUI.instances.get('CBSClientDetailBlockUI');
            myBlockUI.start();
            var client = vm.client;
            client.branch = vm.client.branch._id;
            client.created_by =  undefined;

            //UPDATE and SEND CLIENT INFORMATION TO CBS
            CoreBankingService.UpdateClient(vm.client).then(function (response) {
                console.log("save client",response);
                myBlockUI.stop();

                var clientFormatted = {
                    branchId: client.branchId,
                    title : client.title,
                    client: client._id };

                CoreBankingService.PostClientToCBS(clientFormatted).then(
                    function (response) {
                        AlertService.showSuccess("Updated and Sent to CBS Successfully","Updated Client information and Sent to CBS successfully");
                    }
                    ,function (error) {
                        console.log('error',error);
                        var message = error.data.error.message;
                        AlertService.showWarning( 'Oops... Something went wrong Client Info is updated but its not sent to CBS', message);
                    });


            },function (error) {
                console.log("Updated client error",error);
                myBlockUI.stop();
                var message = error.data.error.message;
                AlertService.showError("Failed to update Client",message);

            });
        }


        function initializeDatePicker() {
            vm.clear = function() {
                vm.dt = null;
            };

            vm.dateOptions = {
                dateDisabled: false,
                formatYear: "yy",
                maxDate: new Date(2020, 5, 22),
                startingDay: 1
            };

            vm.openPopup = function() {
                vm.popup1.opened = true;
            };

            vm.dateFormat = "dd-MMMM-yyyy";
            vm.altInputFormats = ["M!/d!/yyyy"];

            vm.popup1 = {
                opened: false
            };
        }

    }

})(window.angular);
(function(angular) {
    'use strict';
    angular.module('app.banking')

        .service('CoreBankingService', CoreBankingService);

    CoreBankingService.$inject = ['$http','CommonService','AuthService'];

    function CoreBankingService($http, CommonService, AuthService) {
        var Client = {};
        return {
            GetClients: _getClients,
            GetAllClients: _getAllClients,
            GetTitles: ["Obo","Ato","W/rt","W/ro","Mr","Mrs","Miss","Dr."],
            SearchClient:_searchClient,
            ConnectToCBS:_connectToCBS,
            SendClientToCBS:_postClientToCBS,
            SendBulkClientsToCBS:_postBulkClientsToCBS,
            setClientInfo: _setClientInfo,
            getClientInfo: _getClientInfo,
            UpdateClient: _updateClient,
            GetClientById:_getClientById,
            GetBranches:_getBranches
        };

        function _setClientInfo(client) {
            Client = client;
        }
        function _getClientInfo() {
            return Client;
        }

        function _getClients(parameters){
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.CBS.Clients));
        }
        function _getAllClients(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients));
        }

        function _postClientToCBS(client){
            return $http.post(CommonService.buildUrl(API.Service.SCREENING,API.Methods.CBS.CBS),client);
        }

        function _postBulkClientsToCBS(clients){
            return $http.post(CommonService.buildUrl(API.Service.SCREENING,API.Methods.CBS.CBSBulk),clients);
        }
        function _connectToCBS(){
            return $http.post(CommonService.buildUrl(API.Service.SCREENING,API.Methods.CBS.Connect));
        }

        function _searchClient(searchText) {
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients) + '/search=' + searchText);
        }

        function _updateClient(client) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.SCREENING.Clients,client._id),client);
        }
        function _getClientById(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.Clients.Client,id));
        }

        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }


    }

})(window.angular);
/**
 * Created by Yoni on 2/9/2018.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.forms')
        .constant('MW_QUESTION_TYPES', [
            {name:'Fill In Blank',url:'fib',code:'FILL_IN_BLANK',type:'text'},
            {name:'Yes/No Question',code:'YES_NO',url:'yn',type:'yn',options:['Yes','No']},
            {name:'Multiple Choice',url:'mc',code:'MULTIPLE_CHOICE',options:[],type:'checkbox'},
            {name:'Single Choice',url:'sc',code:'SINGLE_CHOICE',options:[],type:'select'},
            {name:'Grouped Question',url:'GROUPED',code:'GROUPED',type:'grouped'}])
        .constant('MW_FORM_TYPES', [
            {name:'ACAT',code:'ACAT'},
            {name:'Loan Application',code:'LOAN_APPLICATION'},
            {name:'Screening',code:'SCREENING'},
            {name:'Group Application',code:'GROUP_APPLICATION'},
            {name:'Test',code:'TEST'}]);
})(window.angular);
/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.forms").controller("FormsController", FormsController);

    FormsController.$inject = ['FormService','$state'];

    function FormsController(FormService,$state) {
        var vm = this;
        vm.forms = [];
        vm.paginate = _paginate;
        vm.editForm = _editForm;
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
            callApi();//fetch first page data initially
        }

        function _paginate (page, pageSize) {
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callApi();

        }
        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            callApi();
        }

        function callApi() {
             vm.promise = FormService.GetFormsPerPage(vm.query).then(function (response) {
                vm.forms = response.data.docs;
                _.forEach(vm.forms,function (form) {
                    if(form.has_sections){
                        form.sectionCount = form.sections.length;
                        var questionCount = 0;
                        _.forEach(form.sections,function (sec) {
                            questionCount = questionCount + sec.questions.length;
                        });
                        form.questionCount = questionCount;
                    }else{
                        form.questionCount = form.questions.length;
                    }
                })
            },function (error) {
                console.log(error);
            })
        }

        function _editForm(form, ev) {
            $state.go('app.builder',{id:form._id});
            console.log("edit Form",form);
        }
    }


})(window.angular);
/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    'use strict';
    angular.module('app.forms')

        .service('FormService', FormService);

    FormService.$inject = ['$http','CommonService','MW_QUESTION_TYPES','MW_FORM_TYPES'];

    function FormService($http, CommonService,MW_QUESTION_TYPES,MW_FORM_TYPES) {
        return {
            GetFormsPerPage: _getFormsPerPage,
            CreateForm:_createForm,
            GetForm:_getForm,
            UpdateForm:_updateForm,
            GetQuestion:_getQuestion,
            CreateQuestion:_createQuestion,
            UpdateQuestion:_updateQuestion,
            DeleteQuestion:_deleteQuestion,
            CreateSection:_createSection,
            UpdateSection:_updateSection,
            RemoveSection:_removeSection,
            QuestionTypes: MW_QUESTION_TYPES,
            FormTypes: MW_FORM_TYPES
        };
        function _getFormsPerPage(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.FORM, API.Methods.Form.All, parameters));
        }
        function _getForm(id) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.FORM, API.Methods.Form.All, id));
        }
        function _updateForm(form) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.FORM,API.Methods.Form.All,form._id), form);
        }
        function _createForm(form){
            return $http.post(CommonService.buildUrl(API.Service.FORM,API.Methods.Form.Create), form);
        }
        //------QUESTION-----------
        function _getQuestion(id) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.FORM,API.Methods.Form.Question,id));
        }
        function _createQuestion(question,type){
            return $http.post(CommonService.buildUrl(API.Service.FORM,API.Methods.Form.Create_Question) + '/' + type, question);
        }
        function _updateQuestion(question) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.FORM,API.Methods.Form.Question,question._id), question);
        }
        function _deleteQuestion(question) {
          return $http.delete(CommonService.buildUrlWithParam(API.Service.FORM,API.Methods.Form.Question,question._id + '?form=' + question.form));
        }


        //    ------SECTION--------
        function _createSection(section){
            return $http.post(CommonService.buildUrl(API.Service.FORM,API.Methods.Form.Create_Section), section);
        }
        function _updateSection(section) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.FORM,API.Methods.Form.Section,section._id), section);
        }
        function _removeSection(section) {
            return $http.delete(CommonService.buildUrlWithParam(API.Service.FORM,API.Methods.Form.Section,section._id + '?form=' + section.form));
        }
    }


})(window.angular);
(function (angular) {
    "use strict";
    angular
        .module('app.geospatial')
        .controller('GeospatialController', GeoSpatialController);

    GeoSpatialController.$inject = ['GeoSpatialService', 'blockUI', 'SharedService', 'CommonService', 'AlertService','$scope','$templateCache'];

    function GeoSpatialController(GeoSpatialService, blockUI, SharedService, CommonService, AlertService,$scope,$templateCache) {
        var vm = this;
        vm.INDICATOR = INDICATOR;
        vm.currentUser = GeoSpatialService.CurrentUser;
        vm.saveUserConfig = _saveUserConfig;
        vm.resetConfig = _resetConfig;

        init();

        // // We can use panel id name for the boolean flag to [un]collapse the panel
        // $scope.$watch('panelDemo1',function(newVal){
        //     console.log('panelDemo1 collapsed: ' + newVal);
        // });

        function _resetConfig() {
            //reset fields only for update case
            if(vm.visibility.ConfigExists){
                var id = vm.config._id;
                vm.config = undefined;
                vm.config = {_id:id};

            }else {
                vm.config = undefined;
            }
            vm.disableConfig = false;
        }

        function _saveUserConfig() {

            vm.IsValidData = CommonService.Validation.ValidateForm(vm.seasonalFilterForm, vm.config);

            if (vm.IsValidData) {
                vm.config.user = vm.currentUser._id;
                vm.config.from_date = vm.config.fromDate;
                vm.config.to_date = vm.config.toDate;

                vm.visibility.showSmiley = true;
                vm.visibility.showInfoText = false;
                vm.visibility.showWarning = false;

                if(vm.config._id){
                    GeoSpatialService.UpdateConfig(vm.config).then(function (response) {
                            AlertService.showSuccess('Configuration Information', "User Configuration Updated Successfully");
                            vm.config = response.data;
                            vm.config.fromDate = new Date(vm.config.from_date);
                            vm.config.toDate = new Date(vm.config.to_date);
                            vm.visibility.ConfigExists = true;
                            vm.disableConfig = true;
                            GetHumanizedGeoSpatialStatus();
                        }
                        , function (error) {
                            console.log('error', error);
                            var message = error.data.error.message;
                            AlertService.showError('Oops... Something went wrong', message);
                        });
                }else{
                    GeoSpatialService.SaveUserConfig(vm.config).then(function (response) {
                            AlertService.showSuccess('Configuration Information', "User Configuration Updated Successfully");
                            vm.config = response.data;
                            vm.config.fromDate = new Date(vm.config.from_date);
                            vm.config.toDate = new Date(vm.config.to_date);
                            vm.visibility.ConfigExists = true;
                            GetHumanizedGeoSpatialStatus();
                        }
                        , function (error) {
                            console.log('error', error);
                            var message = error.data.error.message;
                            AlertService.showError('Oops... Something went wrong', message);
                        });
                }

            } else {
                vm.visibility.showWarning = true;
                vm.visibility.showInfoText = false;
            }

        }

        function init() {
            vm.config = {};
            vm.visibility = {
                showSmiley: true,
                showInfoText: true,
                ConfigExists: false };
            vm.seasonalFilterForm = {
                IsfromDateValid: true,
                IstoDateValid: true,
                IsnameValid: true
            };
            vm.editMode = false;

            //DATE OPTION
            vm.dtOption = GeoSpatialService.DateOptionDefault();
            GetUserConfig();

        }
        function GetUserConfig() {
            GeoSpatialService.GetUserConfig().then(function (response) {
                if (response.data.length > 0) {
                    vm.config = response.data[0];
                    vm.config.fromDate = new Date(vm.config.from_date);
                    vm.config.toDate = new Date(vm.config.to_date);
                    vm.visibility.ConfigExists = true;
                    vm.disableConfig = true;
                    prepareBranchesData();
                }else {
                    vm.visibility.ConfigExists = false;
                }
            }, function (reason) {
                console.log(reason)
            });
        }

        function prepareBranchesData() {

            SharedService.GetBranches()
                .then( function (response) {
                        vm.branches = response.data.docs;
                        _.each(vm.branches,function (branch) {
                            branch.regions = _.map(branch.weredas,function (woreda) {
                                return woreda.w_code;
                            }).join(":");
                            ConstructGeoSpatialUrls(branch);
                        });
                    },
                    function (error) {
                        console.log("error fetching branches", error);
                    });

        }


        function ConstructGeoSpatialUrls(branch) {

            //GET REQUEST(branch,config) FROM API TO GET UID SID
            GeoSpatialService.SearchRequest(vm.config._id,branch._id).then(function (response) {
                var allRequest = response.data;
                if(allRequest.length > 0){
                    _.each(allRequest,function (request) {
                        var sUID =request.UID;

                        if(request.indicator === vm.INDICATOR.VI){
                            branch.vegitationIndex = {
                                image_url:  API.Config.SeasmonBaseUrl + 'info_' + sUID + '_VI_latest.png',
                                chart_url: API.Config.SeasmonBaseUrl + 'chart_' + sUID + '_VI_latest.html'
                            };
                        }
                        else {
                            branch.rainfall = {
                                image_url:  API.Config.SeasmonBaseUrl + 'info_' + sUID + '_PRECIP_latest.png',
                                chart_url:  API.Config.SeasmonBaseUrl + 'chart_' + sUID + '_PRECIP_latest.html'
                            };
                        }

                    });
                }

            }, function (error) { console.log('error', error); });

        }

        function GetHumanizedGeoSpatialStatus() {

            SharedService.GetBranches()
                .then( function (response) {
                        vm.branches = response.data.docs;
                        _.each(vm.branches,function (branch) {
                            branch.regions = _.map(branch.weredas,function (woreda) {
                                return woreda.w_code;
                            }).join(":");
                            RequestGeoSpatialByBranch(branch);
                        });
                    },
                    function (error) {
                        console.log("error fetching branches", error);
                    });

        }

       function RequestGeoSpatialByBranch(branch) {
            var configVI = {
                indicator: vm.INDICATOR.VI,
                start_date: GeoSpatialService.formatDateForRequest(vm.config.from_date),
                end_date:  GeoSpatialService.formatDateForRequest(vm.config.to_date),
                regions: branch.regions
            };
            //GET VI DATA
            branch.vegitationIndexPromise =  GeoSpatialService.getSeasonalMonitorData(configVI)
                .then(function (response) {
                    branch.vegitationIndex = response.data;
                    // branch.vegitationIndex.chart_url =  _.isUndefined(branch.vegitationIndex.image_url)? '': branch.vegitationIndex.image_url.replace('info','chart');
                    if(!_.isUndefined(branch.vegitationIndex.is_registered) && branch.vegitationIndex.is_registered){
                        SaveRequest({
                            config: vm.config._id,
                            branch: branch._id,
                            indicator: configVI.indicator,
                            UID: branch.vegitationIndex.suid});
                    }

                }, function (error) { console.log("error", error);});

            var configRainfall = angular.copy(configVI);
            configRainfall.indicator = vm.INDICATOR.RAINFALL;
            //GET RAINFALL DATA
            branch.rainfallPromise = GeoSpatialService.getSeasonalMonitorData(configRainfall)
                .then(function (response) {
                    branch.rainfall = response.data;
                    // branch.rainfall.chart_url = _.isUndefined(branch.rainfall.image_url)? '': branch.rainfall.image_url.replace('info','chart');
                    if(!_.isUndefined(branch.rainfall.is_registered) && branch.rainfall.is_registered){
                        SaveRequest({
                            config: vm.config._id,
                            branch: branch._id,
                            indicator: configRainfall.indicator,
                            UID: branch.rainfall.suid});
                    }

                }, function (error) { console.log("error", error);});
        }

       function SaveRequest(request) {
           GeoSpatialService.SaveRequest(request).then(function (response) {
               console.log('response', response);
               }, function (error) { console.log('error', error); });
       }
    }

})(window.angular);
(function (angular) {
    "use strict";


    angular
        .module('app.geospatial')
        .controller('PlotReportController', PlotReportController);

    PlotReportController.$inject = ['$scope', 'GeoSpatialService', 'SharedService','blockUI','NotifyService'];

    function PlotReportController($scope, GeoSpatialService, SharedService,blockUI,NotifyService) {
        var vm = this;
        vm.onSelectedBranch = _onSelectedBranch;

        init();

        function init() {
            angular.extend($scope, {
                center: {
                    autoDiscover: true
                }
            });
            GetBranches();
        }

        function callAPI() {
            var myBlockUI = blockUI.instances.get('BlockUIMap');
            myBlockUI.start('looking up geo locations on branch [' + vm.selectedBranch.name + ']' );
            GeoSpatialService.GetPlotAreaData(vm.selectedBranch._id).then(function (response) {
                console.log('GetPlotAreaData', response);

                var allData = response.data.docs;
                var markers = {};
                //dynamically set markers
                for (var index = 0; index < allData.length; index++) {
                    var data = allData[index];
                    if(data.gps_location.single_point.status !==  "NO ATTEMPT"){
                        markers['m' + index] = {
                            lat: data.gps_location.single_point.latitude,
                            lng: data.gps_location.single_point.longitude,
                            message: data.crop.name
                        };
                    }
                }

                NotifyService.showInfo("GeoLocation",_.keys(markers).length + " locations found on " + vm.selectedBranch.name);

                myBlockUI.stop();
                angular.extend($scope, {
                    markers: markers,
                    center: {
                        //autoDiscover: true
                        lat: 9.1274179,
                        lng: 41.0462439,
                        zoom: 6
                    }
                });

            }, function (error) {
                myBlockUI.stop();
                console.log('error', error);
            });
        }

        function _onSelectedBranch() {
            callAPI();
        }

        function GetBranches() {
            SharedService.GetBranches()
                .then(function (response) {
                        vm.branches = response.data.docs;
                        vm.selectedBranch = vm.branches[0];
                        callAPI();
                    },
                    function (error) {
                        console.log("error fetching branches", error);
                    });
        }

    }

})(window.angular);
(function(angular) {
    'use strict';
    angular.module('app.geospatial')

        .service('GeoSpatialService', GeoSpatialService);

    GeoSpatialService.$inject = ['$http','CommonService','AuthService','$rootScope'];

    function GeoSpatialService($http, CommonService, AuthService,$rootScope) {
        return {
            formatDateForRequest:_formatDateForRequest,
            getSeasonalMonitorData:_getSeasonalMonitorData,
            SaveUserConfig : _saveConfig,
            UpdateConfig:_updateConfig,
            GetUserConfig:_getUserConfig,
            DateOptionDefault:_dateOptionDefault,
            SaveRequest:_saveRequest,
            SearchRequest:_searchRequest,
            CurrentUser: _getUser(),
            AccessBranches:  AuthService.GetAccessBranches(),
            GetPlotAreaData:_getPlotAreaData
        };

        function _getUser() {
            return  AuthService.GetCurrentUser();
        }

        function _getUserConfig(){
            var user = $rootScope.currentUser._id;// AuthService.GetCurrentUser();
            return $http.get(CommonService.buildUrlWithParam(API.Service.GEOSPATIAL,API.Methods.GeoSpatial.Config, 'search?user=' + user));
        }

        function _saveConfig(config){
            return $http.post(CommonService.buildUrl(API.Service.GEOSPATIAL,API.Methods.GeoSpatial.SaveConfig),config);
        }
        function _updateConfig(config){
            return $http.put(CommonService.buildUrlWithParam(API.Service.GEOSPATIAL,API.Methods.GeoSpatial.Config,config._id),{
                name : config.name,
                user : config.user,
                from_date : config.from_date,
                to_date : config.to_date});
        }

        function _getSeasonalMonitorData(config) {
            var request = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': undefined
                },
                url: API.Config.SeasonalMonitoringBaseUrl +  'indicator='+config.indicator+'&start_date='+config.start_date+'&end_date='+config.end_date+'&regions=' +config.regions};
            return $http(request);
        }

        function _formatDateForRequest(date) {
            var d = new Date(date),
                month = '-' +  ("0" + (d.getMonth() + 1)).slice(-2) ,
                day = '-' + ("0" + d.getDate()).slice(-2),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('');
        }

        function _dateOptionDefault() {
            var vm = this;
            vm.dtOption = {};
            vm.dtOption.dateOptions = {
                dateDisabled: false, formatYear: "yy",
                maxDate: new Date(2020, 5, 22), startingDay: 1
            };
            vm.dtOption.format = "shortDate";
            vm.dtOption.altInputFormats = ["M!/d!/yyyy"];
            vm.dtOption.popup = {opened: false};
            vm.dtOption.fromPopup = {opened: false};
            vm.dtOption.open = function () {
                vm.dtOption.popup.opened = true;
            };
            vm.dtOption.fromOpen = function () {
                vm.dtOption.fromPopup.opened = true;
            };
            vm.dtOption.clear = function () {
                vm.dtOption.dt = null;
            };

            return vm.dtOption;
        }

        function _saveRequest(request) {
            return $http.post(CommonService.buildUrl(API.Service.GEOSPATIAL,API.Methods.GeoSpatial.Request),request);
        }
        function _searchRequest(config_id,branch_id) {
            return $http.get(CommonService.buildUrl(API.Service.GEOSPATIAL,API.Methods.GeoSpatial.Search) + 'config='+config_id+'&branch=' + branch_id);
        }

        function _getPlotAreaData(branch) {
            return $http.get(CommonService.buildUrl(API.Service.ACAT,API.Methods.ACAT.Empty) + 'search?branch='+branch+'&fields=crop,client,gps_location');
        }

    }


})(window.angular);
/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    'use strict';
    angular.module('app.loan_management')

        .service('LoanManagementService', LoanManagementService);

    LoanManagementService.$inject = ['$http', 'CommonService','$filter','PrintPreviewService'];

    function LoanManagementService($http, CommonService,$filter,PrintPreviewService) {
        return {
            GetLoanApplications: _getLoanApplications,
            GetClientLoanApplication:_getClientLoanApplication,
            SaveClientLoanApplication:_saveClientLoanApplication,

            GetScreenings: _getScreenings,
            GetClientScreening:_getClientScreening,
            GetClientApplicationByLoanCycle:_getClientApplicationByLoanCycle,

            SaveClientScreening:_saveClientScreening,
            //CLIENT MANAGEMENT RELATED SERVICES DECLARATION
            GetClients: _getClients,
            SaveClient: _saveClient,
            UpdateClient: _updateClient,
            GetClientDetail:_getClientDetail,
            SearchClient:_searchClient,
            GetClientByLoanCycle:_getClientByLoanCycle,
            GetBranches: _getBranches,

            GetACATCollections: _getACATCollections,
            GetClientACAT:_getClientACAT,
            GetClientLoanProposals:_getClientLoanProposals,
            GetCrops:_getCrops,

            StyleLabelByStatus: _styleLabelByStatus,
            loanCycles: [{id:1,name:'1st Loan Cycle'},{id:2,name:'2nd Loan Cycle'},{id:3,name:'3rd Loan Cycle'},{id:4,name:'4th Loan Cycle'},{id:5,name:'5th Loan Cycle'},{id:6,name:'6th Loan Cycle'},{id:7,name:'7th Loan Cycle'},{id:8,name:'8th Loan Cycle'},{id:9,name:'9th Loan Cycle'},{id:10,name:'10th Loan Cycle'}],
            //GROUP LOAN
            GetGroupLoans:_getGroupLoans,
            GetGroupLoan:_getGroupLoan,
            GetGroupDataByLoanProcessStage:_getGroupDataByLoanProcessStage,
            printLoanProcess:_print

        };

        function _getScreenings(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.SCREENING,API.Methods.SCREENING.Screening,parameters));
        }

        function _saveClientScreening(screening,id) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.SCREENING.Screening,id),screening);
        }


        function _getClientScreening(clientId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.SCREENING.Clients,clientId) + '/screenings');
        }
        function _getClientApplicationByLoanCycle(clientId,application,loanCycle) {
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.SCREENING.Histories) + 'application='+application+'&client='+clientId+'&loanCycle='+loanCycle);
        }
        function _getLoanApplications(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.LOANS,API.Methods.LOANS.Loans,parameters));
        }
        function _getClientLoanApplication(clientId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.LOANS,API.Methods.LOANS.Clients,clientId));
        }
        function _saveClientLoanApplication(loan_application,id) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.LOANS,API.Methods.LOANS.Loans,id),loan_application);
        }

        //CLIENT MANAGEMENT RELATED SERVICES
        function _searchClient(searchText) {
            return $http.get(CommonService.buildUrlForSearch(API.Service.SCREENING,API.Methods.Clients.Client,searchText));
        }
        function _getClientByLoanCycle(loanCycle) {
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.Clients.Client) + '/search?loan_cycle_number=' + loanCycle);
        }

        function _getClientDetail(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.Clients.Client,id));
        }
        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }
        function _getClients(parameters){
            return $http.get(CommonService.buildPerPageUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients,parameters) + '&for_group=false');
        }
        function _saveClient(client) {
            return $http.post(CommonService.buildUrl(API.Service.SCREENING,API.Methods.SCREENING.Clients + '/create'),client);
        }
        function _updateClient(client) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.SCREENING.Clients,client._id),client);
        }

        function _getACATCollections(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.ACAT,API.Methods.ACAT.Clients,parameters));
        }
        function _getClientACAT(clientId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.Clients,clientId));
        }
        function _getClientLoanProposals(acatId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.ACAT,API.Methods.ACAT.LoanProposals,acatId));
        }

        function _getCrops() {
            return $http.get(CommonService.buildPaginatedUrl(API.Service.ACAT,API.Methods.ACAT.Crop));
        }
        function _getGroupLoans(parameters) {
            return $http.get(CommonService.buildPerPageUrl(API.Service.GROUPS,API.Methods.Group.Group,parameters));
        }

        function _getGroupLoan(id) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.GROUPS,API.Methods.Group.Group,id));
        }

        function _getGroupDataByLoanProcessStage(type,groupId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.GROUPS,API.Methods.Group.Group,groupId) + '/' + type);
        }

        function _print(vm,type) {
            var preview = [];
            if(type === 'SCREENING'){
                preview = [{
                    Name: "Screening",
                    TemplateUrl: "app/views/loan_management/client_management/printables/client.screening.html",
                    IsCommon: false,
                    IsSelected: false,
                    Data: angular.extend({ Title: "Screening Form",
                        loanNumber:  $filter('ordinal')( vm.loanCycle),
                        clientName: vm.clientScreening.client.first_name + " " +
                            vm.clientScreening.client.last_name + " " +
                            vm.clientScreening.client.grandfather_name}, vm.clientScreening)
                }];
                PrintPreviewService.show(preview);
            }else if(type === 'ACAT_CROP'){
                preview = [{
                    Name: "ACAT Summary",
                    TemplateUrl: "app/views/loan_management/client_management/printables/client.acat.summary.html",
                    IsCommon: false,
                    IsSelected: false,
                    Data: angular.extend({ Title: "ACAT SUMMARY" ,
                        loanNumber:  $filter('ordinal')( vm.loanCycle),
                        clientName: vm.clientACATs.client.first_name + " " +
                            vm.clientACATs.client.last_name + " " +
                            vm.clientACATs.client.grandfather_name}, vm.selectedClientACAT)
                }];
                PrintPreviewService.show(preview);
            }else if(type === 'ACAT_TOTAL'){
                preview = [{
                    Name: "ACAT Total Summary",
                    TemplateUrl: "app/views/loan_management/client_management/printables/client.acat.total.html",
                    IsCommon: false,
                    IsSelected: false,
                    Data: angular.extend({ Title: "ACAT And Loan Proposal Summary",
                        loanNumber:  $filter('ordinal')( vm.loanCycle),
                        clientName: vm.clientACATs.client.first_name + " " +
                            vm.clientACATs.client.last_name + " " +
                            vm.clientACATs.client.grandfather_name}, vm.clientACATs,{loanProposals: vm.clientLoanProposals})
                }];
                PrintPreviewService.show(preview);
            } else{
                preview = [{
                    Name: "Loan Application",
                    TemplateUrl: "app/views/loan_management/client_management/printables/client.screening.html",
                    IsCommon: false,
                    IsSelected: false,
                    Data: angular.extend({ Title: "Loan Application Form", loanNumber:  $filter('ordinal')( vm.loanCycle),
                        clientName: vm.client.loan_application.client.first_name + " " +
                            vm.client.loan_application.client.last_name + " " +
                            vm.client.loan_application.client.grandfather_name}, vm.client.loan_application)
                }];
                PrintPreviewService.show(preview);
            }


        }

        function _styleLabelByStatus(clientStatus) {
            var style = '';
            if(_.isUndefined(clientStatus))
                return '';
            switch (clientStatus.toLowerCase()){
                case  'new':
                    style =  'label bg-gray';
                    break;
                case  'submitted':
                    style =  'label bg-primary-dark';
                    break;
                case  'approved':
                    style =  'label bg-green-dark';
                    break;
                case 'screening_inprogress':
                case 'declined_under_review':
                    style =  'label label-warning';
                    break;
                case 'loan_application_accepted':
                    style =  'label bg-info-dark';
                    break;
                case 'eligible':
                    style =  'label label-success';
                    break;
                case 'ineligible':
                case 'declined_final':
                    style =  'label label-danger';
                    break;
                case 'loan_application_new':
                    style =  'label bg-purple-dark';
                    break;
                default:
                    style =  'label label-inverse';
            }
            return style;
        }


    }


})(window.angular);
/**
 * Created by Yoni on 12/10/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('CreateRoleController', CreateRoleController);

    CreateRoleController.$inject = ['$mdDialog','ManageRoleService','items','AlertService','blockUI'];
    function CreateRoleController($mdDialog, ManageRoleService,items,AlertService,blockUI) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveRole = _saveRole;
        vm.changeModuleStyle = _modulesStyle;
        vm.showFilterDialog = _showFilterDialog;
        vm.showFilter = false;
        vm.isEdit = items !== null;
        vm.role = items !== null?items:null;

        initialize();

        function setPermissions() {
            _.each(vm.role.permissions, function(oldPermission){
                _.each(vm.permissions, function(permission) {
                    if(permission.name === oldPermission.name && !permission.checked){
                        permission.checked = permission.name === oldPermission.name;
                    }
                });
            });
        }
        function preparePermissions() {
            vm.role.permissions = _.filter(vm.permissions,function(permission){
                return permission.checked? permission._id : null;
            });
        }
        function initialize(){
            var permissionFromStore = ManageRoleService.GetPermissionsFromStore();
            if(permissionFromStore !== null){
                vm.permissions = permissionFromStore;
                if(vm.isEdit){
                    setPermissions();
                }
            }else {
                var myLoadingBlockUI = blockUI.instances.get('RoleLoadingBlockUI');
                myLoadingBlockUI.start("Loading Role and Permissions");
                ManageRoleService.GetPermissions().then(function(response){
                    myLoadingBlockUI.stop();
                    vm.permissions = response.data.docs;
                    ManageRoleService.StorePermissions(vm.permissions);
                    if(vm.isEdit){
                        setPermissions();
                    }
                },function(){
                    myLoadingBlockUI.stop();
                });
            }
        }
        function _saveRole() {
            var myBlockUI = blockUI.instances.get('RoleBlockUI');
            myBlockUI.start();
            preparePermissions();
            if(vm.isEdit){
                ManageRoleService.UpdateRole(vm.role ).then(function () {
                        myBlockUI.stop();
                        $mdDialog.hide();
                        AlertService.showSuccess("updated successfully","Role and Permissions updated successfully");
                    },
                    function (error) {
                        myBlockUI.stop();
                        var message = error.data.error.message;
                        AlertService.showError("Failed to update Role",message);
                    });
            }else {
                ManageRoleService.SaveRole( vm.role).then(function () {
                        myBlockUI.stop();
                        AlertService.showSuccess("Saved successfully","Role and Permissions saved successfully");
                        $mdDialog.hide();
                    },
                    function (error) {
                        myBlockUI.stop();
                        var message = error.data.error.message;
                        AlertService.showError("Failed to Save Role",message);
                    });
            }
        }
        function _showFilterDialog() {}
        function _modulesStyle(module){
            var style = '';
            switch (module){
                case 'SCREENING':
                    style =  'label label-primary';
                    break;
                case 'SCREENING_MODULE':
                    style =  'label label-primary';
                    break;
                case 'FORM_BUILDER':
                    style =  'label label-danger';
                    break;
                case 'USER_MANAGEMENT':
                    style =  'label label-green';
                    break;
                case 'CLIENT_MANAGEMENT':
                    style =  'label label-warning';
                    break;
                case 'LOAN_MODULE':
                    style =  'label label-purple';
                    break;
                default:
                    style =  'label label-default';
            }
            return style;
        }
        function _cancel() {
            $mdDialog.cancel();
        }
    }
})(window.angular);


/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_roles')
        .controller('ManageRoleController', ManageRoleController);

    ManageRoleController.$inject = ['ManageRoleService', '$mdDialog', 'RouteHelpers'];

    function ManageRoleController( ManageRoleService, $mdDialog, RouteHelpers)
    {
        let vm = this;
        vm.addRole = _addRole;
        vm.editRole = _editRole;
        vm.visibility = {
            loading: true,
            noData: false,
        };

        fetchRoles();

        function fetchRoles() {
           ManageRoleService.GetRoles().then(function(response){
               vm.roles = response.data.docs;
               vm.visibility = {
                   loading: false,
                   noData: false,
               };
           },function () {
               vm.visibility = {
                   loading: false,
                   noData: true,
               };
           });
       }
        function _addRole(ev){

            $mdDialog.show({
                locals: {
                    items: null
                },
                templateUrl: RouteHelpers.basepath('manageroles/create.role.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateRoleController',
                controllerAs: 'vm'
            }).then(function () {
                    fetchRoles();
                }, function () {
                });
        }
        function _editRole(role,ev) {
            $mdDialog.show({
                locals: {
                    items: role
                },
                templateUrl: RouteHelpers.basepath('manageroles/create.role.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateRoleController',
                controllerAs: 'vm'
            }).then(function () {
                    fetchRoles();
                }, function () {
                });
        }
    }
})(window.angular);


/**
 * Created by Yoni on 12/11/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.manage_roles')

        .service('ManageRoleService', ManageRoleService);
    ManageRoleService.$inject = ['$http', 'CommonService','AuthService','StorageService','APP_CONSTANTS'];

    function ManageRoleService($http, CommonService,AuthService,StorageService,APP_CONSTANTS) {
        return {
            GetRoles: _getRoles,
            GetPermissions: _getPermissions,
            GetPermissionsbyGroup:_getPermissionsbyGroup,
            SaveRole: _saveRole,
            UpdateRole:_updateRole,
            StorePermissions:_storePermissions,
            GetPermissionsFromStore:_getPermissionsFromStorage
        };

        function _getRoles(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.Roles));
        }

        function _getPermissions(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Roles.Permissions));
        }
        function _getPermissionsbyGroup(){
            return $http.get(CommonService.buildUrl(API.Service.Users,API.Methods.Roles.PermissionByGroup));
        }

        function _saveRole(role) {
            return $http.post(CommonService.buildUrl(API.Service.Users,API.Methods.Roles.Create), role);
        }

        function _updateRole(role) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Roles.GetAll,role._id), role);
        }

        function _storePermissions(permissions) {
            return StorageService.Set(APP_CONSTANTS.StorageKey.PERMISSIONS, permissions);
        }
        function _getPermissionsFromStorage() {
            return !_.isUndefined(StorageService.Get(APP_CONSTANTS.StorageKey.PERMISSIONS)) ? StorageService.Get(APP_CONSTANTS.StorageKey.PERMISSIONS) : null;
        }

    }

})(window.angular);

/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$mdDialog','ManageUserService','items','AlertService','AuthService','blockUI','$scope','CommonService'];
    function CreateUserController($mdDialog, ManageUserService,items,AlertService,AuthService,blockUI,$scope,CommonService) {
        var vm = this;
        vm.cancel = _cancel;
        vm.saveUser = _saveUser;
        vm.onSelectedDefaultBranch = _onSelectedDefaultBranch;
        vm.isEdit = items !== null;
        vm.user = items !== null?items:{};
        vm.user.selected_access_branches = [];
        vm.UserValidationForm = {
            Isfirst_nameValid: true,
            Islast_nameValid: true,
            Isselected_default_branchValid: true,
            Isselected_roleValid: true,
            IsusernameValid: true
        };

        initialize();

        function _saveUser() {
            vm.IsValidData = CommonService.Validation.ValidateForm(vm.UserValidationForm, vm.user);

            if(vm.IsValidData){
                var myBlockUI = blockUI.instances.get('CreateUserForm');
                myBlockUI.start("Storing User");
                var userInfo = {
                    first_name: vm.user.first_name,
                    last_name: vm.user.last_name,
                    grandfather_name:vm.user.grandfather_name,
                    title: vm.user.title,
                    role : vm.user.selected_role._id,
                    hired_date:vm.user.hired_date,
                    default_branch : vm.user.selected_default_branch._id,
                    access_branches:[],
                    multi_branches: vm.user.multi_branches
                };

                _.forEach(vm.user.selected_access_branches,function(accessBranch){

                    var found = userInfo.access_branches.some(function (el) {
                        return el._id === accessBranch._id;
                    });

                    if (!found && !userInfo.multi_branches) {
                        userInfo.access_branches.push(accessBranch._id);
                    }
                });

                if(vm.isEdit){

                    userInfo._id = vm.user.account._id;

                    ManageUserService.UpdateUser( userInfo ).then(function (data) {
                            myBlockUI.stop();
                            console.log("updated successfully", data);
                            $mdDialog.hide();
                            AlertService.showSuccess('Updated Successfully!', 'User Information is Updated');
                        },
                        function (error) {
                            myBlockUI.stop();
                            var message = error.data.error.message;
                            AlertService.showError( 'Oops... Something went wrong', message);
                            console.log("could not be saved", error);
                        });

                }else {

                    userInfo.username = vm.user.username;
                    userInfo.password = vm.user.password;

                    ManageUserService.CreateUser(userInfo).then(
                        function (data) {
                            myBlockUI.stop();
                            AlertService.showSuccess('Saved Successfully!', 'User Information is saved successfully');
                            console.log("saved successfully", data);
                            $mdDialog.hide();
                            //TODO: Alert & fetch user collection
                        },
                        function (error) {
                            myBlockUI.stop();
                            var message = error.data.error.message;
                            AlertService.showError( 'Oops... Something went wrong', message);
                            console.log("could not be saved", error);
                        }
                    );
                }
            }
            else {
                AlertService.showError( 'Oops... Something went wrong', "You haven't provided all required fields.");
            }



        }

        function initialize(){
            if(vm.isEdit){
                var myLoadingBlockUI = blockUI.instances.get('UserFormLoader');
                myLoadingBlockUI.start("Loading User Information");
                angular.extend(vm.user, vm.user.account);
                var dt = new Date(vm.user.hired_date);
                vm.user.hired_date = dt;
            }

            GetRolesAndSetSelectedValue();

            if(AuthService.IsSuperuser()){
                ManageUserService.GetBranches().then(function(response){
                    vm.branches = response.data.docs;
                    if(vm.isEdit){
                        setBranchesSelectedValue(vm.branches);
                        myLoadingBlockUI.stop();
                    }
                },function(error){
                    console.log("error",error);
                });
            }else{
                vm.branches =  AuthService.GetAccessBranches();
                if(vm.isEdit){
                    setBranchesSelectedValue(vm.branches);
                    myLoadingBlockUI.stop();
                }
            }

        }

        function GetRolesAndSetSelectedValue() {
            ManageUserService.GetRoles().then(function(response){
                vm.roles = response.data.docs;
                if(vm.isEdit){
                    //LOAD Role select value
                    angular.forEach(vm.roles,function(role){
                        if(!_.isUndefined(vm.user.account)){
                            if(role._id === vm.user.account.role._id){
                                vm.user.selected_role = role;
                            }}

                    });
                }
            },function(error){
                console.log("error",error);
            });
        }

        function setBranchesSelectedValue(branches) {
            angular.forEach(branches,function(branch){
                //LOAD Default Branch select value
                if(!_.isUndefined(vm.user.default_branch._id)){

                    if(branch._id === vm.user.default_branch._id){
                        vm.user.selected_default_branch = branch;
                    }
                }
                //LOAD access branch select values
                if(vm.user.access_branches.length > 0 && !vm.user.multi_branches)
                {
                    var found = vm.user.access_branches.some(function (accBranch) {
                        return accBranch._id === branch._id;
                    });

                    if (found) {
                        vm.user.selected_access_branches.push(branch);
                    }
                }

            });
        }

        function _onSelectedDefaultBranch() {
            var branchExist = vm.user.selected_access_branches.indexOf(vm.user.selected_default_branch);
            if (branchExist === -1 && !vm.user.multi_branches) {
                vm.user.selected_access_branches.push(vm.user.selected_default_branch);
            }
        }

        $scope.$watch(function() {
            return vm.user.multi_branches;
        }, function(current, original) {
            //if multi_branch is on clear access branch list
            if(current){
                vm.user.selected_access_branches = [];
            }
        });

        function _cancel() {
            $mdDialog.cancel();
        }

        vm.clear = function() {
            vm.dt = null;
        };
        vm.dateOptions = {
            dateDisabled: false,
            formatYear: "yy",
            maxDate: new Date(2020, 5, 22),
            startingDay: 1
        };
        vm.openDatePicker = function() {
            vm.popup1.opened = true;
        };
        vm.format = "dd-MMMM-yyyy";
        vm.altInputFormats = ["d!/M!/yyyy"];
        vm.popup1 = {
            opened: false
        };
    }
})(window.angular);


/**
 * Created by Yoni on 11/30/2017.
 */

(function(angular,document) {
    "use strict";

    angular
        .module('app.manage_users')
        .controller('ManageUsersController', ManageUsersController);

    ManageUsersController.$inject = ['RouteHelpers', 'DTOptionsBuilder', 'ManageUserService','$mdDialog','AlertService','AuthService'];
    function ManageUsersController(RouteHelpers, DTOptionsBuilder, ManageUserService,$mdDialog,AlertService,AuthService) {
        var vm = this;
        vm.currentUser = {
            selected_access_branch:undefined
        };
        vm.addUser = _addUser;
        vm.editUser = _editUser;
        vm.changeStatus = _changeStatus;
        vm.statusStyle = _statusStyle;
        vm.onSelectedBranch = _onSelectedBranch;
        vm.onresetUserPassword = _onresetUserPassword;

        activate();


        ////////////////
        function activate() {

            vm.isSuperAdmin = false;
            vm.visibility = {
                loading: true,
                noData: false,
            };

            fetchUserData();

            GetBranchFilter();

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('<"html5buttons"B>lTfgitp')
                .withOption('processing', true)
                .withOption('scrollY', 430);

        }

        function fetchUserData() {
            vm.usersPromise = ManageUserService.GetUsers().then(function(response){
                vm.visibility = {
                    loading: false,
                    noData: false,
                };
                // console.log("users list",response);
                vm.users = response.data.docs;
                vm.usersCopy = angular.copy(vm.users);
            },function(){
                vm.visibility = {
                    loading: false,
                    noData: true
                };
            });
        }

        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                vm.isSuperAdmin = true;
                ManageUserService.GetBranches().then(function(response){
                    vm.currentUser.user_access_branches = response.data.docs;
                },function(){
                    vm.currentUser.user_access_branches = [];
                });
            }
            else {
                vm.currentUser.user_access_branches = AuthService.GetAccessBranches();
            }
        }
        function _changeStatus(user) {
            vm.toaster = {
                type:  'success',
                title: 'Title',
                text:  'Message'
            };

            var userAccount = {};
            userAccount._id = user._id;
            if(user.status === 'active'){
                userAccount.status = 'suspended';
                user.status = 'suspended';
            }else{
                userAccount.status = 'active';
                user.status = 'active';
            }
        
            ManageUserService.UpdateUserStatus(userAccount).then(function(response){
                var message =   userAccount.status==='active'?'activated':userAccount.status;
                AlertService.showSuccess('Updated User Status!', 'User is ' + message  + '.');
                // toaster.pop(vm.toaster.type, vm.toaster.title, vm.toaster.text);
            },function(error){
                var message = error.data.error.message;
                AlertService.showError( 'Oops... Something went wrong', message);
                // toaster.pop(vm.toaster.type, vm.toaster.title, vm.toaster.text);
            });
        }

        function _addUser(ev){

            $mdDialog.show({
                locals: {
                    items: null
                },
                templateUrl: RouteHelpers.basepath('manageusers/create.user.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateUserController',
                controllerAs: 'vm'
            })
                .then(function () {
                    fetchUserData();
                }, function () {
                });
        }

        function _editUser(user,ev){
            $mdDialog.show({
                locals: {items: user},
                templateUrl: RouteHelpers.basepath('manageusers/create.user.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'CreateUserController',
                controllerAs: 'vm'
            }).then(function () {
                fetchUserData();
                }, function () {
                });
        }

        function _onSelectedBranch(){
         vm.users = vm.usersCopy;

         vm.users = _.filter(vm.users,function(user){
                 if(!_.isUndefined(user.account)){
                     if(user.account.default_branch !== null){
                         return user.account.default_branch._id === vm.currentUser.selected_access_branch._id;
                     }
                 }
            });

        }

        function _statusStyle(status){
            var style = '';
            switch (status){
                case 'active' || 'active ':
                    style =  'label label-success';
                    break;
                case 'inactive':
                    style =  'label label-default';
                    break;
                case 'suspended':
                    style =  'label label-danger';
                    break;
                default:
                    style =  'label label-default';
            }
            return style;
        }

        function _onresetUserPassword(user) {
            AlertService.showConfirmation("You are about to reset the user password",
                "Are you sure?", "Yes, Reset!", "warning", true,function (isConfirm) {

                    if(isConfirm){
                        ManageUserService.ResetUserPassword(user).then(function (response) {
                            AlertService.showSuccess('Password Reset Successful!',  "Reset Successful");
                        });
                    }

                });

        }



    }
})(window.angular,window.document);


/**
 * Created by Yoni on 11/30/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.manage_users')

        .service('ManageUserService', ManageUserService);
    ManageUserService.$inject = ['$http', 'CommonService'];

    function ManageUserService($http, CommonService) {
        return {
            GetUsers: _getUsers,
            GetRoles: _getRoles,
            GetBranches: _getBranches,
            CreateUser: _saveUser,
            UpdateUser: _updateUser,
            UpdateUserStatus: _updateUserStatus,
            ResetUserPassword:_resetUserPassword
        };

        function _getUsers(params){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.GetAll,params));
        }
        function _getRoles(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.Users,API.Methods.Users.Roles));
        }
        function _getBranches(){
            return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
        }
        function _saveUser(user) {
            return $http.post(CommonService.buildUrl(API.Service.Users,API.Methods.Users.User), user);
        }
        function _updateUser(account) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.Account,account._id), account);
        }
        function _updateUserStatus(user) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.UserUpdate,user._id), user);
        }
        function _resetUserPassword(user) {
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.UserUpdate,user._id) + '/reset',{});
        }
        
    }

})(window.angular);

(function(angular) {
  'use strict';
  angular.module('app.mfi')

  .service('MainService', MainService);

  MainService.$inject = ['$http','CommonService','AuthService'];

  function MainService($http, CommonService,AuthService) {

      return {
        GetMFI: _getMFI,
        UpdateMFI: _updateMFI,
        CreateMFI:_createMFI,
        UpdateBranch: _updateBranch,
        GetBranches: _getBranches,
        CreateBranch:_createBranch
      };

      function _getBranches(){
          return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
      }
      function _createBranch(branch){
        return $http.post(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI.CreateBranch), branch);
      }
      function _updateBranch(updated_branch){
          return $http.put(CommonService.buildUrlWithParam(API.Service.MFI,API.Methods.MFI.Branches,updated_branch._id), updated_branch);
      }

      function _getMFI(){
        return $http.get(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI.GetAll));
      }
      function _updateMFI(data,logo){
        var updatedMFI = setAttribute(data,logo);

        return $http({
          url: CommonService.buildUrlWithParam(API.Service.MFI,API.Methods.MFI.MFIUpdate,data._id),
          method: 'PUT',
          data: updatedMFI,
          //assigning content-type as undefined,let the browser
          //assign the correct boundary for us
          headers: {
                  'Content-Type': undefined},
          //prevents serializing payload.  don't do it.
          transformRequest: angular.identity
      });
      }

      function _createMFI(data,logo){
        var mfiData = setAttribute(data,logo);
        return $http({
          url: CommonService.buildUrl(API.Service.MFI,API.Methods.MFI.MFI),
          method: 'POST',
          data: mfiData,
          //assigning content-type as undefined,let the browser handle it
          headers: {
            'Authorization': 'Bearer ' + AuthService.GetToken(),
            'Content-Type': undefined},
          //prevents serializing data.  don't do it.
          transformRequest: angular.identity
      });

      }

      function setAttribute(mfi,picFile){
          var mfiData = new FormData();
          mfiData.append("name", mfi.name);
          mfiData.append("location", mfi.location);
          mfiData.append("establishment_year", mfi.establishment_year);
          mfiData.append("contact_person", _.isUndefined(mfi.contact_person)?'':mfi.contact_person);
          mfiData.append("phone", _.isUndefined(mfi.phone)?'':mfi.phone);
          mfiData.append("email", _.isUndefined(mfi.email)?'':mfi.email);
          mfiData.append("website_link", _.isUndefined(mfi.website_link)?'':mfi.website_link);
          if(!_.isUndefined(picFile)){
              mfiData.append("logo", picFile);
          }

          return mfiData;
      }
  }

})(window.angular);

/**
 * Created by Yonas on 8/16/2018.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['ProfileService',   'blockUI', 'AlertService','$state'];

    function ProfileController( ProfileService,   blockUI,AlertService ,$state) {
        var vm = this;
        vm.updateProfile = _updateUserProfile;
        vm.changePassword = _changePassword;
        vm.resetCredentials = _resetCredentials;
        vm.credentials = undefined;

        vm.user = ProfileService.GetUserAccount();


        function _resetCredentials() {
            $state.reload();
        }

        function _updateUserProfile(user) {
            var profile = {
                _id:user._id,
                title:user.title,
                email: user.email,
                first_name : user.first_name,
                last_name:user.last_name,
                grandfather_name:user.grandfather_name,
                phone:user.phone
                // picture:""
            };
            var myBlockUI = blockUI.instances.get('UserProfileBlockUI');
            myBlockUI.stop();
            ProfileService.UpdateProfile(profile,vm.picFile).then(function (response) {
                myBlockUI.start();
                AlertService.showSuccess("Profile Information","User account information successfully updated");
            },function (error) {
                myBlockUI.stop();
                var message = error.data.error.message;
                AlertService.showError("User account information could not be updated",message);
            });
        }


        function _changePassword(user) {
            let profile = {
                _id:user._id,
                old_password:user.old_password,
                new_password: user.new_password
            };
            if(profile.old_password === profile.new_password){
                AlertService.showSuccess("Changer le mot de passe","Le nouveau mot de passe doit être différent de votre mot de passe précédent." );
            }else{
                var myBlockUI = blockUI.instances.get('credentialFormBlockUI');
                myBlockUI.start();
                ProfileService.ChangePassword(profile).then(function () {
                    myBlockUI.stop();
                    AlertService.showSuccess("Changer le mot de passe","Mot de passe modifié avec succès, connectez-vous avec le nouveau mot de passe!" );
                //    AUTO LOGOUT
                },function (error) {
                    myBlockUI.stop();
                    var message = error.data.error.message;
                    AlertService.showError("Impossible de changer le mot de passe, veuillez contacter l'administrateur",message);
                });
            }
        }
    }
})(window.angular);
/**
 * Created by Yonas on 8/17/2018.
 */
(function(angular) {
    'use strict';
    angular.module('app.profile')

        .service('ProfileService', ProfileService);

    ProfileService.$inject = ['$http','CommonService','AuthService'];

    function ProfileService($http, CommonService,AuthService) {
        return {
            GetUserAccount: _getUserAccount,
            UpdateProfile: _updateProfile,
            ChangePassword: _changePassword
        };
        function _getUserAccount(){
            var user = AuthService.GetCurrentUser();
            return _.isUndefined(user.account)? user.admin:user.account;
        }

        function _updateProfile(account,picture){
            let userFormData = new FormData();
            userFormData.append('first_name', account.first_name);
            userFormData.append('last_name', account.last_name);
            userFormData.append('grandfather_name', account.grandfather_name);
            userFormData.append('title', account.title);
            userFormData.append('email', account.email);
            userFormData.append('phone', account.phone);

            if(!_.isUndefined(picture)){
                userFormData.append('picture', picture);
            }

            return $http({
                url: CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.Account,account._id) + '/profile',
                method: 'PUT',
                data: userFormData,
                headers: { 'Content-Type': undefined},
                transformRequest: angular.identity
            });
        }
        function _changePassword(userInfo){
            var user = AuthService.GetCurrentUser();
            return $http.put(CommonService.buildUrlWithParam(API.Service.Users,API.Methods.Users.UserUpdate,user._id) + '/passwords',
                {old_password: userInfo.old_password, new_password:userInfo.new_password});
        }
    }

})(window.angular);
(function(angular) {
    "use strict";


    angular
        .module('app.report')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['ReportService', 'SharedService','Colors','$rootScope','$scope'];

    function DashboardController( ReportService,SharedService,Colors,$rootScope,$scope )
    {
        var vm = this;
        $rootScope.app.layout.isCollapsed = true;
        var REPORT_TYPE = {
           CHARTS: 'charts',
           COUNTS: 'counts'
        };
        vm.visibility = {
            chartLoading: true,
            countLoading: true,
        };

        $scope.options = {
            legend: {
                display: true,
                position: 'bottom'
            },
            showTooltips: true,
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10
                }
            }
        };


        callApi();



        init();


        function callApi(){




            ReportService.GetDashboardReport(REPORT_TYPE.CHARTS).then(function (response) {
                console.log(response);
                vm.visibility.chartLoading = false;
                vm.reports = response.data;


                _.each(vm.reports,function (report) {
                     if(report.type === 'BAR'){
                         report.series = [report.name];
                     }
                });


            });
        }

        function init() {
            vm.count = {
                branch: 0,
                client: 0,
                user: 0};

            getAllCounts();


        }

        function getAllCounts() {

            ReportService.GetDashboardReport(REPORT_TYPE.COUNTS).then(function (response) {
                vm.visibility.countLoading = false;
                vm.counts = response.data;

            });
        }

    }

})(window.angular);
(function(angular) {
    "use strict";
    angular
        .module('app.report')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['ReportService', 'blockUI','PrintPreviewService','$sce','$scope','$filter','_'];

    function ReportController( ReportService,blockUI,PrintPreviewService,$sce,$scope,$filter,_)
    {
        var vm = this;
        vm.FILE_TYPE ={
            PDF: {type: 'application/pdf'},
            DOC: { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
        };


        vm.onSelectedReport = _onSelectedReport;
        vm.printReport = _printReport;
        vm.generateReport = _generateReport;
        vm.downloadDocFile = _downloadDocFile;

        init();


        function _generateReport() {
            let myBlockUI = blockUI.instances.get('reportDownload');

            prepareParameters();
            myBlockUI.start('Downloading...');
            vm.report.reportPromise =  ReportService.FilterReport(vm.report._id,'pdf',vm.filters).then(function (response) {
                myBlockUI.stop();
                vm.showDownloadDocBtn = true; //show download doc file button
                vm.pdfFile = openPDF(response.data,vm.FILE_TYPE.PDF);
                window.open(vm.pdfFile);
            },function () { myBlockUI.stop();});

        }

        function prepareParameters() {
            vm.report.parameters.map(
                (parameter)=> {
                    if(_.isEmpty(parameter.selected) && _.isUndefined(parameter.selected)) return;

                    if (parameter.type === 'DATE') {
                        vm.filters[parameter.code] =  { send: $filter('date')( parameter.selected, 'dd-MM-yyyy'),display: $filter('date')( parameter.selected, 'longDate')};
                    }else if (parameter.type === 'TEXT') {
                        vm.filters[parameter.code] =  { send: parameter.selected,display: $filter('ordinal')( parameter.selected)};
                    }else {
                        vm.filters[parameter.code]  = parameter.selected;
                    }
                }
            );
        }

        function _onSelectedReport() {
            vm.filters = {}; //Reset when new report is selected
            if (!(angular.isUndefined(vm.report.has_parameters) || (vm.report.has_parameters === false && vm.report.parameters.length === 0))) {
                _.each(vm.report.parameters, function (param) {
                    if (!param.is_constant && param.get_from) {
                        ReportService.GetReportParameter(param.get_from).then(function (response) {
                            param.values = response.data;
                        });
                    } else {
                        param.values = param.constants;
                    }
                });
            }
        }


        function _printReport(report) {
            let preview = [{
                Name: report.title,
                TemplateUrl: report.templateUrl,//.replace("template.html","printable.html"),
                IsCommon: false,
                IsSelected: false,
                Data: angular.extend({ Title: report.title}, {report: vm.report,reportData: vm.reportData} )
            }];
            PrintPreviewService.show(preview);
        }

        function init() {
            vm.filters = {}; // selected parameters
            vm.showDownloadDocBtn = false;
            dateSettings();
            ReportService.GetAllReports().then(function (response) {
                vm.reportsList = response.data;
            });
        }

        function dateSettings() {
            vm.startDateConfig = {
                // open: false,
                minDate: new Date(Date.now())
            };
            vm.endDateConfig = {
                // open: false,
                minDate: new Date(vm.dateStart)
            };
            //watching to see what date is set in the start date
            //field and setting that date as the minimum for end date
            $scope.$watch("vm.dateStart", function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                vm.endDateConfig.minDate = newValue;
            });

        }


        function openPDF(data,fileType) {
            let file = new Blob([data], fileType);
            let fileURL = URL.createObjectURL(file);
            return $sce.trustAsResourceUrl(fileURL);
        }

        function _downloadDocFile() {
            vm.report.isLoading = true;
            ReportService.FilterReport(vm.report._id,'docx',vm.filters).then(function (response) {
                vm.report.isLoading = false;
                let docFile = openPDF(response.data,vm.FILE_TYPE.DOC);
                window.open(docFile, '_parent', '');

            },function () {vm.report.isLoading = false;});
        }

    }

})(window.angular);
(function(angular) {
    'use strict';
    angular.module('app.report')

        .service('ReportService', ReportService);

    ReportService.$inject = ['$http','CommonService','Colors'];

    function ReportService($http, CommonService, Colors) {
        return {
            barColors: barColors(),
            GetDashboardReport:_getDashboardReport,
            GetReportById:_getReportById,
            GetAllReports:_getAllReports,
            GetReportParameter:_getReportParameter,
            FilterReport:_filterReport,
            GetReportPDF:_getReportPDF,
            SearchReportParameter: _searchReportParameter
        };

        function barColors() {
            return [{backgroundColor: Colors.byName('success'), borderColor: Colors.byName('success')}, {backgroundColor: Colors.byName('info'),  borderColor: Colors.byName('info') }];
        }

        function _getReportById(id){
            return $http.get(CommonService.buildUrlWithParam(API.Service.REPORT,API.Methods.Report.Report,id));
        }
        function _getDashboardReport(type){
            return $http.get(CommonService.buildUrlWithParam(API.Service.REPORT,API.Methods.Report.Dashboard,type));
        }
        function _getAllReports(){
            return $http.get(CommonService.buildUrl(API.Service.REPORT,API.Methods.Report.AllReport));
        }
        function _getReportPDF(id,format){
            return $http({
                url: CommonService.buildUrlWithParam(API.Service.REPORT,API.Methods.Report.Report,id) + '/' + format,
                method: 'GET',
                responseType: 'arraybuffer'
            });
        }
        function _getReportParameter(getFrom){
            return $http.get(CommonService.buildUrl(API.Service.REPORT,getFrom));
        }

        function _searchReportParameter(getFrom,parameter){
            return $http.post(CommonService.buildUrlWithParam(API.Service.REPORT,getFrom,parameter));
        }
        function _filterReport(id,format,params){
            return $http({
                url: CommonService.buildUrlWithParam(API.Service.REPORT,API.Methods.Report.Report,id) + '/' + format,
                method: 'POST',
                responseType: 'arraybuffer',
                data: params
            });
        }


    }

})(window.angular);
/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.welcomePage')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['EnvironmentConfig','AuthService'];

    function WelcomeController( EnvironmentConfig ,AuthService) {
        var vm = this;
    }

}(window.angular));
/**
 * Created by Yoni on 12/3/2017.
 */
(function(angular) {
    'use strict';
    angular.module('app.welcomePage')

        .service('WelcomeService', WelcomeService);
    WelcomeService.$inject = ['$http', 'CommonService','AuthService'];

    function WelcomeService($http, CommonService,AuthService) {
        return {
            GetUserAccount:_getUserAccount
        };

        function _getUserAccount(id){
            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + AuthService.GetToken(),
                    'Accept': 'application/json'
                }
            };
            return $http.get(CommonService.buildUrl(API.Service.Users,API.Methods.Users.Account) + '/' + id,httpConfig);
        }
    }

})(window.angular);
/**
 * Created by Yoni on 3/5/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.acat").controller("ACATController", ACATController);

    ACATController.$inject = ['ACATService','$stateParams','blockUI','$state','AlertService'];

    function ACATController(ACATService,$stateParams,blockUI,$state,AlertService) {
        var vm = this;
        vm.isEdit = $stateParams.id !== "0";
        vm.ACATId = $stateParams.id;


        vm.addToCostList = _addToCostList;
        vm.addGroupedCostList = _addGroupedCostList;
        vm.editCostItem = _editCostItem;
        vm.editGroupCostItem = _editGroupCostItem;
        vm.removeCostItem = _removeCostItem;
        vm.removeCostItemGrouped =_removeCostItemGrouped;

        vm.cancelCostItem = _cancelCostItem;
        vm.cropSelectChanged = _cropSelectChanged;
        vm.onCostListTypeChange = _onCostListTypeChange;
        //GROUP RELATED
        vm.addGroupOnSection = _addGroupOnSection;
        vm.editGroupSection = _editGroupSection;
        vm.removeGroupSection = _removeGroupSection;

        vm.onToggleExistingGroup = _onToggleExistingGroup;



        initialize();

        function initialize() {

            callApiForCrops();

            vm.acat = {
                fertilizer:{
                    list_type :'linear'
                },
                chemicals:{
                    list_type : 'linear'
                },
                input:{
                    seedCostList:[]
                },
                labour_cost:{
                    list_type : 'linear'
                },
                other_cost:{
                    list_type : 'linear'
                }
            };
            vm.isEditCostGroup = false;

            vm.isEditSeedCost = false; //edit seed cost list
            if(vm.isEdit){
                callAPI();
            }

        }


        function callAPI() {
            var myBlockUIOnStart = blockUI.instances.get('ACATBuilderBlockUI');
            myBlockUIOnStart.start();

            ACATService.GetACATById(vm.ACATId).then(function (response) {
                vm.acat.selected_crop = response.data.crop;
                var subSections = response.data.sections[0].sub_sections;
                setSubSectionCostFromResponse(subSections);

                myBlockUIOnStart.stop();

            },function (error) {
                myBlockUIOnStart.stop();
                console.log("error",error);
            });
        }
        function setSubSectionCostFromResponse(subSections) {
            vm.acat.input = subSections[0];
            vm.acat.labour_costs = subSections[1].cost_list;
            vm.acat.other_costs =  subSections[2].cost_list;
            
            vm.acat.seed_costs = vm.acat.input.sub_sections[0].cost_list;
            vm.acat.fertilizer_costs = vm.acat.input.sub_sections[1].cost_list;
            vm.acat.chemicals_costs = vm.acat.input.sub_sections[2].cost_list;

            SetListType();

        }
        function SetListType() {

            vm.acat.fertilizer.list_type = vm.acat.fertilizer_costs.grouped.length > 0 ?
                ACAT_COST_LIST_TYPE.GROUPED :vm.acat.fertilizer_costs.linear.length > 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';

            vm.acat.chemicals.list_type = vm.acat.chemicals_costs.grouped.length > 0 ?
                ACAT_COST_LIST_TYPE.GROUPED :  vm.acat.chemicals_costs.linear.length > 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';

            vm.acat.labour_cost.list_type = vm.acat.labour_costs.grouped.length > 0 ?
                ACAT_COST_LIST_TYPE.GROUPED : vm.acat.labour_costs.grouped.length > 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';

            vm.acat.other_cost.list_type = vm.acat.other_costs.grouped.length > 0 ?
                ACAT_COST_LIST_TYPE.GROUPED :vm.acat.other_costs.grouped.length > 0 ? ACAT_COST_LIST_TYPE.LINEAR:'NA';

        }

        function callApiForCrops(){
            ACATService.GetCrops().then(function (response) {
                vm.crops = _.filter(response.data.docs,function (crop) {
                    return !crop.has_acat;
                });
            });
        }

        function _addToCostList(cost,type) {
                if(!_.isUndefined(cost) && !_.isUndefined(cost.item)){
                    var items = [];
                    switch (type){
                        case ACAT_GROUP_CONSTANT.SEED:
                            items = vm.acat.seed_costs.linear;
                            var costItem = {
                                type: ACAT_COST_LIST_TYPE.LINEAR,
                                parent_cost_list: vm.acat.input.sub_sections[0].cost_list._id,
                                item:cost.item,
                                unit:cost.unit
                            };
                            if(vm.isEditSeedCost){
                                costItem._id = cost._id;
                                updateCostListAPI(costItem,type);
                            }else{
                                if(!DoesItemExistInCostList(cost,items)){
                                    AddCostListAPI(costItem,type);
                                }
                            }
                            vm.acat.input.seed = {};//reset cost item
                            break;
                        case ACAT_GROUP_CONSTANT.FERTILIZER:
                            items = vm.acat.fertilizer.list_type === ACAT_COST_LIST_TYPE.GROUPED ?
                                vm.acat.fertilizer_costs.grouped : vm.acat.fertilizer_costs.linear;
                                cost.type = vm.acat.fertilizer.list_type;
                            if(vm.isEditFertilizerCost){
                                updateCostListAPI(cost,type);
                            }else{
                                if(!DoesItemExistInCostList(cost,items)){
                                   var itemUnit = {
                                        parent_cost_list: vm.acat.fertilizer_costs._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit,
                                        type:vm.acat.fertilizer.list_type
                                    };
                                    AddCostListAPI(itemUnit,type);
                                }
                            }
                            var resetFertilizerObj = _.pick(vm.acat.fertilizer, 'list_type');
                            vm.acat.fertilizer = resetFertilizerObj;//reset cost item
                            break;
                        case ACAT_GROUP_CONSTANT.CHEMICALS:
                            items = vm.acat.chemicals.list_type === ACAT_COST_LIST_TYPE.GROUPED ?
                                vm.acat.chemicals_costs.grouped : vm.acat.chemicals_costs.linear;
                            if(vm.isEditFertilizerCost){
                                updateCostListAPI(cost,type);
                            }else{
                                if(!DoesItemExistInCostList(cost,items)){
                                    var itemUnit = {
                                        parent_cost_list: vm.acat.chemicals_costs._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit,
                                        type:vm.acat.chemicals.list_type
                                    };
                                    AddCostListAPI(itemUnit,type);
                                }
                            }
                            var resetFertilizerObj = _.pick(vm.acat.chemicals, 'list_type');
                            vm.acat.chemicals = resetFertilizerObj;//reset cost item
                            break;
                        case ACAT_GROUP_CONSTANT.LABOUR_COST:
                            items = vm.acat.labour_cost.list_type === ACAT_COST_LIST_TYPE.GROUPED ?
                                vm.acat.labour_costs.grouped : vm.acat.labour_costs.linear;
                            if(vm.isEditLabourCost){
                                updateCostListAPI(cost,type);
                            }else{
                                if(!DoesItemExistInCostList(cost,items)){
                                    var itemUnit = {
                                        parent_cost_list: vm.acat.labour_costs._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit,
                                        type:vm.acat.labour_cost.list_type
                                    };
                                    AddCostListAPI(itemUnit,type);
                                }
                            }
                            var resetFertilizerObj = _.pick(vm.acat.labour_cost, 'list_type');
                            vm.acat.labour_cost = resetFertilizerObj;//reset cost item
                            break;
                        case ACAT_GROUP_CONSTANT.OTHER_COST:
                            items = vm.acat.other_cost.list_type === ACAT_COST_LIST_TYPE.GROUPED ?
                                vm.acat.other_costs.grouped : vm.acat.other_costs.linear;
                            if(vm.isEditOtherCost){
                                updateCostListAPI(cost,type);
                            }else{
                                if(!DoesItemExistInCostList(cost,items)){
                                    var itemUnit = {
                                        parent_cost_list: vm.acat.other_costs._id,//Fertilizer cost list
                                        item:cost.item,
                                        unit:cost.unit,
                                        type:vm.acat.other_cost.list_type
                                    };
                                    AddCostListAPI(itemUnit,type);
                                }
                            }
                            var resetFertilizerObj = _.pick(vm.acat.other_cost, 'list_type');
                            vm.acat.other_cost = resetFertilizerObj;//reset cost item
                            break;
                        default:
                            items = [];
                            break;
                    }

                }else{
                    console.log("Cost is undefined",!_.isUndefined(cost) && !_.isUndefined(cost.item));
                    AlertService.showWarning("Cost List on " + type,"Item is not filled, Please fill all required fields");
                }

        }
        function _addGroupedCostList(groupInfo, type) {

            if(!_.isUndefined(groupInfo)){
                    if(groupInfo.existing_group){
                        if(!_.isUndefined(groupInfo._id)){
                            var costItem = {
                                parent_grouped_list:groupInfo.selected_group._id,
                                item: groupInfo.item,
                                unit: groupInfo.unit,
                                _id:groupInfo._id
                            };

                            updateCostListAPI(costItem,type);
                        }else{

                            AddCostItemToGroup({
                                parent_grouped_list:groupInfo.selected_group._id,
                                item: groupInfo.item,
                                unit: groupInfo.unit
                            },type);
                        }


                    }
            }
        }
        function PrepareGroupCostListForAdd(groupInfo,type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    return  {
                        _id: vm.acat.fertilizer_costs._id,
                        type: 'grouped',
                        parent_cost_list: vm.acat.fertilizer_costs._id,
                        title:groupInfo.title
                    };
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    return  {
                        _id: vm.acat.chemicals_costs._id,
                        type: 'grouped',
                        parent_cost_list: vm.acat.chemicals_costs._id,
                        title:groupInfo.title
                    };
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    return  {
                        _id: vm.acat.labour_costs._id,
                        type: 'grouped',
                        parent_cost_list: vm.acat.labour_costs._id,
                        title:groupInfo.title
                    };
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    return  {
                        _id: vm.acat.other_costs._id,
                        type: 'grouped',
                        parent_cost_list: vm.acat.other_costs._id,
                        title:groupInfo.title
                    };
                    break;
                default:
                    break;
            }
        }
        function AddCostItemToGroup(costItem,type) {
            ACATService.AddCostList(costItem).then(function (response) {
                console.log("adding cost item on group",response);
                resetCostItem(type);
                callAPI();
            },function (error) {
                var message = error.data.error.message;
                AlertService.showError("Error on adding cost item",message);
                console.log("error while adding cost item on group",error);
            });
        }
        function DoesItemExistInCostList(item, items) {
            return _.some(items,function (costItem) {
                return costItem.item === item.item && costItem.unit === item.unit;
            });
        }

        function AddCostListAPI(cost,type) {
            var myBlockUIOnStart = blockUI.instances.get('ACATBuilderBlockUI');
            myBlockUIOnStart.start();
            ACATService.AddCostList(cost).then(function (response) {
                myBlockUIOnStart.stop();
                console.log("COST LIST ADDED FOR " + type,response);
                callAPI();
            },function (error) {
                myBlockUIOnStart.stop();
                console.log("error while adding cost item for " + type,error);
                var message = error.data.error.message;
                AlertService.showError("Error when adding cost item on " + type,message);
            });
        }
        function updateCostListAPI(cost,type) {
            var myBlockUIOnStart = blockUI.instances.get('ACATBuilderBlockUI');
            myBlockUIOnStart.start();
            var prepareCost = {
                _id: cost._id,
                item:cost.item,
                unit:cost.unit
            };

            ACATService.UpdateCostList(prepareCost).then(function (response) {
                console.log("UPDATED COST ITEM", response.data);
                myBlockUIOnStart.stop();
                callAPI();
                resetCostItem(type);

            },function (error) {
                myBlockUIOnStart.stop();
                var message = error.data.error.message;
                AlertService.showError("error when updating cost list",message);
                console.log("error updating cost list",error);
            });
        }
        function _editCostItem(cost,type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.SEED:
                    vm.isEditSeedCost =  true;
                    vm.acat.input.seed = cost;
                    vm.acat.input.seedCopy = angular.copy(cost);
                    break;
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.isEditFertilizerCost =  true;
                    angular.extend(vm.acat.fertilizer,cost);
                    vm.acat.input.fertilizerCopy = angular.copy(cost);
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.isEditChemicalsCost = true;
                    angular.extend(vm.acat.chemicals,cost);
                    vm.acat.input.chemicalsCopy = angular.copy(cost);
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.isEditLabourCost = true;
                    angular.extend(vm.acat.labour_cost,cost);
                    vm.acat.input.labour_costCopy = angular.copy(cost);
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    vm.isEditOtherCost = true;
                    angular.extend(vm.acat.other_cost,cost);
                    vm.acat.input.other_costCopy = angular.copy(cost);
                    break;
                default:
                    break;
            }

        }

        function _editGroupCostItem(cost,type,group) {
            switch (type){
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.isEditFertilizerCost =  true;
                    vm.acat.fertilizer.selected_group = group;
                    vm.acat.fertilizer.existing_group = true;
                    angular.extend(vm.acat.fertilizer,cost);
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.isEditChemicalsCost = true;
                    vm.acat.chemicals.selected_group = group;
                    vm.acat.chemicals.existing_group = true;
                    angular.extend(vm.acat.chemicals,cost);
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.isEditLabourCost = true;
                    vm.acat.labour_cost.selected_group = group;
                    vm.acat.labour_cost.existing_group = true;
                    angular.extend(vm.acat.labour_cost,cost);
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    vm.isEditOtherCost = true;
                    vm.acat.other_cost.selected_group = group;
                    vm.acat.other_cost.existing_group = true;
                    angular.extend(vm.acat.other_cost,cost);
                    break;
                default:
                    break;
            }
        }

        function resetCostItem(type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.SEED:
                    vm.isEditSeedCost =  false;
                    vm.acat.input.seed = undefined;
                    break;
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.isEditFertilizerCost =  false;
                    vm.acat.fertilizer.item = undefined;
                    vm.acat.fertilizer.unit = undefined;
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.isEditChemicalsCost =  false;
                    vm.acat.chemicals.item = undefined;
                    vm.acat.chemicals.unit = undefined;
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.isEditLabourCost =  false;
                    vm.acat.labour_cost.item = undefined;
                    vm.acat.labour_cost.unit = undefined;
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    vm.isEditOtherCost =  false;
                    vm.acat.other_cost.item = undefined;
                    vm.acat.other_cost.unit = undefined;
                    break;
                default:
                    break;
            }
        }
        function _onToggleExistingGroup(value,type) {

            switch (type){
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.acat.fertilizer.selected_group = undefined;
                    vm.acat.fertilizer.title =  undefined;
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.acat.chemicals.selected_group = undefined;
                    vm.acat.chemicals.title =  undefined;
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.acat.labour_cost.selected_group = undefined;
                    vm.acat.labour_cost.title =  undefined;
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    vm.acat.other_cost.selected_group = undefined;
                    vm.acat.other_cost.title =  undefined;
                    break;
                default:
                    break;
            }
        }

        function _cancelCostItem(type) {
           resetCostItem(type);
            callAPI();
        }

        function prepareCostListForRemoval(cost,type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.SEED:
                    return {
                        _id:vm.acat.seed_costs._id,
                        list_type:ACAT_COST_LIST_TYPE.LINEAR,
                        item_id:cost._id
                    };
                    break;
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    return {
                        _id:vm.acat.fertilizer_costs._id,
                        list_type:vm.acat.fertilizer.list_type,
                        item_id:cost._id
                    };
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    return {
                        _id:vm.acat.chemicals_costs._id,
                        list_type:vm.acat.chemicals.list_type,
                        item_id:cost._id
                    };
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    return {
                        _id:vm.acat.labour_costs._id,
                        list_type:vm.acat.labour_cost.list_type,
                        item_id:cost._id
                    };
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    return {
                        _id:vm.acat.other_costs._id,
                        list_type:vm.acat.other_cost.list_type,
                        item_id:cost._id
                    };
                    break;
                default:
                    break;
            }
        }

        function _removeCostItem(cost,type) {
            AlertService.showConfirmForDelete("You are about to DELETE COST LIST",
                "Are you sure?", "Yes, Remove It!", "warning", true,function (isConfirm) {

                    if(isConfirm){
                        var removableCost = prepareCostListForRemoval(cost,type);

                        ACATService.RemoveCostListLinear(removableCost,removableCost.list_type).then(function (response) {
                            console.log("Removed Cost Item.........",response);
                            //refresh view
                            callAPI();

                        },function (error) {
                            var message = error.data.error.message;
                            AlertService.showError("error when removing cost list",message);
                            console.log("error when removing cost list",error);
                        });
                    }

                });

        }

        function _removeCostItemGrouped(cost,type,groupInfo) {

            AlertService.showConfirmForDelete("You are about to DELETE Cost List From Group",
                "Are you sure?", "Yes, Remove It!", "warning", true,function (isConfirm) {

                    if(isConfirm){
                        var removableCost = {
                            _id:groupInfo._id,
                            group:groupInfo,
                            list_type:vm.acat.fertilizer.list_type,
                            item_id:cost._id
                        };

                        ACATService.RemoveCostListGroup(removableCost)
                            .then(function (response) {
                            console.log("Removed Cost group item Item.........",response);
                            callAPI();
                        },function (error) {
                            var message = error.data.error.message;
                            AlertService.showError("Error removing cost group item",message);
                            console.log("error when removing cost list",error);
                        });
                    }

                });
        }


        //UPDATE CROP FOR CROP OR CREATE NEW ACAT FOR A CROP
        function _cropSelectChanged() {
            if(vm.isEdit){
                AlertService.showConfirmForDelete("You are about to change CROP for the ACAT",
                    "Are you sure?", "Yes, Change It!", "warning", true,function (isConfirm) {
                        if(isConfirm){
                            //    UPDATE ACAT CROP
                            var UpdatedACAT =   {
                                _id:$stateParams.id,
                                title: vm.acat.selected_crop.name +  '-CAT',
                                crop: vm.acat.selected_crop._id
                            };
                            ACATService.UpdateACAT(UpdatedACAT).then(function (response) {
                                console.log("Updated acat ",response);
                                var acatData = response.data;
                                $state.go('app.acatbuilder',{id:acatData._id},{inherit:true});
                            },function (error) {
                                console.log("error on updating acat",error);
                            })
                        }else{
                           callAPI();
                        }
                    });

            }else {
                // Initialize ACAT with this crop
                var acatCrop =   {
                    title: vm.acat.selected_crop.name +  '-CAT',
                    description: vm.acat.selected_crop.name +  '-CAT desc',
                    crop: vm.acat.selected_crop._id
                };

                ACATService.CreateACAT(acatCrop).then(function (response) {
                    console.log("ACAT ",response);
                    var acatData = response.data;
                    $state.go('app.acatbuilder',{id:acatData._id},{inherit:true});
                },function (error) {
                    console.log("error on initializeing acat",error);
                })
            }
        }

        function _onCostListTypeChange(type,cost_list) {

            if(cost_list.linear.length === 0 && cost_list.grouped.length === 0){
                console.log("cost_list is empty",cost_list);
            }else{
                AlertService.showConfirmForDelete("You are about to change Cost List type " +
                    "Which will clear the previous type data",
                    "Are you sure?", "Yes, Change It!", "warning", true,function (isConfirm) {
                        if(isConfirm){
                            ACATService.ResetCostList(cost_list).then(function(response){
                                switch (type){
                                    case ACAT_GROUP_CONSTANT.FERTILIZER:
                                        vm.acat.fertilizer_costs.linear = [];
                                        vm.acat.fertilizer_costs.grouped = [];
                                        break;
                                    case ACAT_GROUP_CONSTANT.CHEMICALS:
                                        vm.acat.chemicals_costs.linear = [];
                                        vm.acat.chemicals_costs.grouped = [];
                                        break;
                                    case ACAT_GROUP_CONSTANT.LABOUR_COST:
                                        vm.acat.labour_costs.linear = [];
                                        vm.acat.labour_costs.grouped = [];
                                        break;
                                    case ACAT_GROUP_CONSTANT.OTHER_COST:
                                        vm.acat.other_costs.linear = [];
                                        vm.acat.other_costs.grouped = [];
                                        break;
                                    default:
                                        break;
                                }
                            },function (error) {
                                console.log("error",error);
                            });
                        }else{
                            switch (type){
                                case ACAT_GROUP_CONSTANT.FERTILIZER:

                                    if(vm.acat.fertilizer.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                                        vm.acat.fertilizer.list_type = ACAT_COST_LIST_TYPE.LINEAR;
                                    } else{
                                        vm.acat.fertilizer.list_type = ACAT_COST_LIST_TYPE.GROUPED;
                                    }
                                    break;
                                case ACAT_GROUP_CONSTANT.CHEMICALS:
                                    if(vm.acat.chemicals.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                                        vm.acat.chemicals.list_type = ACAT_COST_LIST_TYPE.LINEAR;
                                    } else{
                                        vm.acat.chemicals.list_type = ACAT_COST_LIST_TYPE.GROUPED;
                                    }
                                    break;
                                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                                    if(vm.acat.labour_cost.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                                        vm.acat.labour_cost.list_type = ACAT_COST_LIST_TYPE.LINEAR;
                                    } else{
                                        vm.acat.labour_cost.list_type = ACAT_COST_LIST_TYPE.GROUPED;
                                    }
                                    break;
                                case ACAT_GROUP_CONSTANT.OTHER_COST:
                                    if(vm.acat.other_cost.list_type === ACAT_COST_LIST_TYPE.GROUPED){
                                        vm.acat.other_cost.list_type = ACAT_COST_LIST_TYPE.LINEAR;
                                    } else{
                                        vm.acat.other_cost.list_type = ACAT_COST_LIST_TYPE.GROUPED;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
            }

        }


        function _addGroupOnSection(groupInfo,type) {
            if (vm.isEditCostGroup) {
                ACATService.UpdateCostGroup(groupInfo).then(function (response) {
                    console.log("group updated successfully",response.data);
                    var newGroup = response.data;
                    callAPI();
                    groupInfo.existing_group = false;
                    groupInfo.selected_group = newGroup;
                    groupInfo.title = '';
                    vm.isEditCostGroup = false;

                },function (error) {
                    console.log("error on group update",error);
                    var message = error.data.error.message;
                    AlertService.showError("Error on updating group title",message);
                    callAPI();
                });
            } else {
                    var groupCost = PrepareGroupCostListForAdd(groupInfo, type);
                    //ADD THE NEW GROUP TO COST LIST PARENT
                    groupCost._id = undefined;
                    ACATService.AddCostList(groupCost).then(function (response) {
                        console.log("group created", response.data);
                        var newGroup = response.data;
                        callAPI();
                        groupInfo.existing_group = true;
                        groupInfo.selected_group = newGroup;

                    }, function (error) {
                        console.log("error on group creation", error);
                        var message = error.data.error.message;
                        AlertService.showError("Error on creating group",message);

                    });
            }
        }

        function _removeGroupSection(groupInfo, type) {

            AlertService.showConfirmForDelete("Group: " + groupInfo.title + " including " + groupInfo.items.length + " cost items",
                "Are you sure? You are about to DELETE group", "Yes, Change It!", "warning", true,function (isConfirm) {
                    if(isConfirm){
                        var groupCost = PrepareGroupCostListForAdd(groupInfo, type);
                        groupCost.item_id = groupInfo._id;

                        ACATService.RemoveCostGroup(groupCost).then(function (response) {
                            console.log("group removed successfully",response.data);
                            callAPI();
                        },function (error) {
                            var message = error.data.error.message;
                            AlertService.showError("Error on removing group",message);
                            console.log("error on group remove",error);
                        });
                    }
                });

        }

        function _editGroupSection(group, type) {
            switch (type){
                case ACAT_GROUP_CONSTANT.FERTILIZER:
                    vm.isEditCostGroup = true;
                    vm.acat.fertilizer.title = group.title;
                    vm.acat.fertilizer._id = group._id;
                    vm.acat.fertilizer.existing_group = true;
                    break;
                case ACAT_GROUP_CONSTANT.CHEMICALS:
                    vm.isEditCostGroup = true;
                    vm.acat.chemicals.title = group.title;
                    vm.acat.chemicals._id = group._id;
                    vm.acat.chemicals.existing_group = true;
                    break;
                case ACAT_GROUP_CONSTANT.LABOUR_COST:
                    vm.isEditCostGroup = true;
                    vm.acat.labour_cost.title = group.title;
                    vm.acat.labour_cost._id = group._id;
                    vm.acat.labour_cost.existing_group = true;
                    break;
                case ACAT_GROUP_CONSTANT.OTHER_COST:
                    vm.isEditCostGroup = true;
                    vm.acat.other_cost.title = group.title;
                    vm.acat.other_cost._id = group._id;
                    vm.acat.other_cost.existing_group = true;
                    break;
                default:
                    vm.isEditCostGroup = false;
                    break;
            }


        }

    }



})(window.angular);
/**
 * Created by Yoni on 3/19/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.acat").controller("ACATListController", ACATListController);

    ACATListController.$inject = ['ACATService','$state'];

    function ACATListController(ACATService,$state) {
        var vm = this;
        vm.addACAT = _addACAT;
        vm.editACAT = _editACAT;
        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearch;

        function _addACAT() {
            $state.go('app.acatbuilder',{id:0});
        }

        function _editACAT(acat) {
            $state.go('app.acatbuilder',{id:acat._id});
        }

        initialize();

        function initialize() {

            callApi();

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

        }
        function _paginate (page, pageSize) {
            console.log('current Page: ' + vm.query.page + ' page size: ' + vm.query.per_page);
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callApi();

        }

        function callApi() {
            vm.promise =   ACATService.GetAllACATList().then(function (response) {
                vm.acat_list = response.data.docs;
                console.log("vm.acat_list",response);
            });
        }

        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            callApi();
        }



    }



})(window.angular);
/**
 * Created by Yoni on 3/5/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.acat").controller("CropsController", CropsController);

    CropsController.$inject = ['ACATService','$mdDialog','RouteHelpers','$scope'];

    function CropsController(ACATService,$mdDialog,RouteHelpers,$scope) {
        cropDialogController.$inject = ["$mdDialog", "data", "CommonService", "AlertService", "blockUI"];
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
/**
 * Created by Yoni on 12/3/2017.
 */
(function () {
    'use strict';
    angular.module('app.common').factory('AlertService', AlertService);

    AlertService.$inject = ['SweetAlert']
    function AlertService(SweetAlert) {
        // init();
        return {
            showError: error,
            showInfo: info,
            showWarning: warning,
            showSuccess: success,
            errorHandler: errorHandler,
            showConfirm: showConfirm,
            showConfirmForDelete: _showConfirmForDelete,
            showConfirmation:_showConfirmation
        };
        function error(title,message) {
            SweetAlert.swal(title,message, "error");
        }
        function info(title,message) {
            SweetAlert.swal(title,message, "info");
        }
        function warning(title,message) {
            SweetAlert.swal({title: title, text: message, type: "warning", confirmButtonText: "Ok"});
        }
        function showConfirm(message, title, confirmText, confirmationType, closeOnConfirm) {
            closeOnConfirm = typeof closeOnConfirm === "undefined" || typeof closeOnConfirm !== "boolean" ? true : closeOnConfirm;
            confirmationType = typeof confirmationType === "undefined" || typeof confirmationType !== "string" ? "warning" : confirmationType;
            return SweetAlert.swal({
                title: title,
                text: message,
                type: confirmationType,
                showCancelButton: true,
                confirmButtonColor: "#009688",
                confirmButtonText: confirmText,
                closeOnConfirm: closeOnConfirm,
                showLoaderOnConfirm: true
            });
        }
        function _showConfirmForDelete(message, title, confirmText, confirmationType, closeOnConfirm,responseHandler) {
            closeOnConfirm = typeof closeOnConfirm === "undefined" || typeof closeOnConfirm !== "boolean" ? true : closeOnConfirm;
            confirmationType = typeof confirmationType === "undefined" || typeof confirmationType !== "string" ? "warning" : confirmationType;
            return SweetAlert.swal({
                title: title,
                text: message,
                type: confirmationType,
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: confirmText,
                closeOnConfirm: closeOnConfirm,
                showLoaderOnConfirm: true
            },responseHandler);
        }
        function success(title,message) {
            SweetAlert.swal(title,message, "success");
        }
        function errorHandler(response) {
            var msg = 'Server was unable to process the request';
            var exMsg = '';
            if (response.data && response.data.Message)
                msg = response.data.Message;
            if (response.ExceptionMessage)
                msg = response.ExceptionMessage;
            if (response.data && response.data.ExceptionMessage)
                exMsg = response.data.ExceptionMessage;
            error(msg + ' ' + exMsg, "Error");
        }

        function init() {
            SweetAlert.setDefaults({confirmButtonColor: '#0096884'});
        }
        function _showConfirmation(message, title, confirmText, confirmationType, closeOnConfirm,responseHandler) {
            closeOnConfirm = typeof closeOnConfirm === "undefined" || typeof closeOnConfirm !== "boolean" ? true : closeOnConfirm;
            confirmationType = typeof confirmationType === "undefined" || typeof confirmationType !== "string" ? "warning" : confirmationType;
            return SweetAlert.swal({
                title: title,
                text: message,
                type: confirmationType,
                showCancelButton: true,
                confirmButtonColor: "#009688",
                confirmButtonText: confirmText,
                closeOnConfirm: closeOnConfirm,
                showLoaderOnConfirm: true
            },responseHandler);
        }
    }
})();
(function(angular) {
    'use strict';

    angular.module('app.common')
        .factory('CommonService', CommonService);
    CommonService.$inject = ['EnvironmentConfig'];

    function CommonService(EnvironmentConfig) {
        var BaseUrl = EnvironmentConfig.BaseUrl;
        var factory = {
            buildUrl: _buildUrl,
            buildPaginatedUrl:_buildPaginatedUrl,
            buildPerPageUrl:_buildPerPageUrl,
            buildUrlWithParam: _buildUrlWithParam,
            buildUrlForSearch: _buildUrlForSearch,
            Validation: {
              ComputeValidation: function (validationObject) {
                  var isValid = true;
                  var properties = _.allKeys(validationObject);
                  _.each(properties, function (property) {
                      isValid = isValid && validationObject[property];
                  });
                  return isValid;
              },
              ResetValidationObject: function (validationObject) {
                  var properties = _.allKeys(validationObject);
                  _.each(properties, function (property) {
                      validationObject[property] = true;
                  });
              },
              ValidateForm: function (validationObject, referenceObject) {
                  var isValid = true;
                  var properties = _.allKeys(validationObject);
                  var validateSingleObject= function (objValue) {
                      if(_.isString(objValue)){
                          return !_.isUndefined(objValue) && !_.isNull(objValue) && objValue.length > 0;
                      }

                      if(_.isNumber(objValue)){
                          return !_.isUndefined(objValue) && !_.isNull(objValue) && !_.isNaN(objValue);
                      }

                      if(_.isDate(objValue)){
                          return !_.isUndefined(objValue) && !_.isNull(objValue);
                      }

                      if(_.isObject(objValue)){

                          return !_.isUndefined(objValue) && !_.isNull(objValue)&& !_.isEmpty(objValue);
                      }

                      return !_.isUndefined(objValue) && !_.isNull(objValue);
                  };

                  _.each(properties, function (property) {
                      var index = property.indexOf('Valid');
                      if(index != -1) {
                          var objProperty = property.substring(2, index);
                      }
                      if (_.has(referenceObject, objProperty)) {
                          var objValue = referenceObject[objProperty];
                          validationObject[property] = validateSingleObject(objValue);
                      }else{
                          // console.log('Validation failed for: ',objProperty);
                          validationObject[property] = false;
                          isValid = false;
                      }
                      isValid = isValid && validationObject[property];
                  });
                  return isValid;
              }
          }
        };

        return factory;


        function _buildUrl(service,url) {
          return BaseUrl + service +'/' + url;
        }
        function _buildPaginatedUrl(service,url) {
            var parameters = {start:1,limit:100};
            return url===''?BaseUrl + service + '/paginate?page='+parameters.start+'&per_page=' + parameters.limit:
                BaseUrl + service +'/' + url + '/paginate?page='+parameters.start+'&per_page=' + parameters.limit;
        }
        function _buildPerPageUrl(service,url,parameters) {
            return url === '' ? BaseUrl + service + '/paginate?page=' + parameters.page + '&per_page=' + parameters.per_page : BaseUrl + service + '/' + url + '/paginate?page=' + parameters.page + '&per_page=' + parameters.per_page;
        }
        function _buildUrlWithParam(service,url, id) {
            return url===''?BaseUrl + service + '/' + id : BaseUrl + service +'/'+ url + '/' + id;
        }
        function _buildUrlForSearch(service,url, searchText) {
            return BaseUrl + service +'/'+ url + '/search?search=' + searchText;
        }
    }

})(window.angular);

(function(angular) {
    'use strict';

    angular.module('app.common')
        .factory('DocumentService', DocumentService);
    DocumentService.$inject = ['$sce','$http','CommonService'];

    function DocumentService($sce,$http,CommonService) {
        var factory = {
            OpenDocument: _openDocument,
            GetDocument: _getDocument,
            GetGroupDocument: _getGroupDocument
        };

        return factory;

        function _openDocument(data, fileType) {
            var file = new Blob([data], fileType);
            return $sce.trustAsResourceUrl(URL.createObjectURL(file));
        }

        function _getDocument(id) {
            return $http({
                url: CommonService.buildUrlWithParam(API.Service.ACAT, API.Methods.ACAT.Printout, id),
                method: 'GET',
                responseType: 'arraybuffer'
            });
        }

        function _getGroupDocument(id) {
            return $http({
                url: CommonService.buildUrlWithParam(API.Service.GROUPS, API.Methods.Group.Printout, id),
                method: 'GET',
                responseType: 'arraybuffer'
            });
        }
    }

})(window.angular);

/**
 * Created by Yoni on 3/9/2018.
 */
(function(angular) {

    'use strict';

    focusService.$inject = ["$timeout", "$window"];
    angular.module('app.common')
        .factory('focus', focusService);

    function focusService($timeout, $window) {
        return function(id) {
            // timeout makes sure that is invoked after any other event has been triggered.
            // e.g. click events that need to run before the focus or
            // inputs elements that are in a disabled state but are enabled when those events
            // are triggered.
            $timeout(function() {
                var element = $window.document.getElementById(id);
                if(element)
                    element.focus();
            });
        };
    }

})(window.angular);
(function () {
    'use strict';
    angular.module('app.common').factory('NotifyService', NotifyService);

    NotifyService.$inject = ['toaster'];

    function NotifyService(toaster) {
        var toasterType = {
            error: 'error',
            info: 'info',
            warning: 'warning',
            success: 'success'
        };
        return {
            showError: error,
            showInfo: info,
            showWarning: warning,
            showSuccess: success
        };

        function error(title, message) {
            toaster.pop(toasterType.error, title, message);
        }

        function info(title, message) {
            toaster.pop(toasterType.info, title, message);
        }

        function warning(title, message) {
            toaster.pop(toasterType.warning, title, message);
        }

        function success(title, message) {
            toaster.pop(toasterType.success, title, message);
        }
    }
})();
/**
 * Created by Yoni on 12/30/2017.
 */


(function(angular) {

    'use strict';

    angular.module('app.common')
        .factory('PermissionService', PermissionService);

    PermissionService.$inject = ['AuthService'];

    function PermissionService(AuthService) {
        var factory = {
            hasThisPermission:_hasThisPermission,
            hasThesePermissions:_hasThesePermissions,
            permissions:_permissions,
            permittedModules:_permittedModules,
            hasThisModule:_hasThisModule,
            validateSubModules:_validateSubModules
        };

        return factory;


        function _permissions() {
            var user =  AuthService.GetCurrentUser();
            var response = {
                isSuper: false,
                permissions:[]
            };

            if(!_.isUndefined(user) && user !== null){
                if(!_.isUndefined(user.account)){
                    response.isSuper = false;
                    response.permissions =  user.account.role.permissions;
                    return response;
                }
                else if (!_.isUndefined(user.admin)) {
                    response  = {
                        isSuper: true,//superadmin
                        permissions:[]
                    };
                    return response;
                } else {
                    return response;
                }
            }else{
                return null;
            }

        }

        function _permittedModules(){

            var permissions = _permissions().permissions;
            var moduleObj = _.uniq(permissions,function(permi){
                return permi.module;
            });

            return _.pluck(moduleObj, 'module');
        }

        function _validateSubModules(){
            var permissions = _permissions().permissions;
            var moduleObj = _.uniq(permissions,function(permi){
                permi.entityPermission =_.isUndefined(permi.entity)? '': permi.module + '_' + permi.entity;
                return permi.entityPermission;
            });
            return _.pluck(moduleObj, 'entityPermission');
        }

        function _hasThisPermission(permission) {
            var allPermissions = _permissions();
            var hasPermission = false;
            
            if(allPermissions.isSuper){
                hasPermission = true;
            }else{
                var permissions = _.map(allPermissions.permissions, function(perm) {
                    return perm.module + '_' + perm.entity + '_'+ perm.operation;
                });
            hasPermission = _.contains(permissions, permission);
            }
            return hasPermission;
        }

        function _hasThisModule(module) {
            var allModules = _permittedModules();
            var hasModule = module === 'all'? true:_.contains(allModules, module);
            return hasModule;
        }

        function _hasThesePermissions(permissions) {
            var hasPermission = false;
            _.each(permissions, function(permission) {
                //return true if user has access to one of the permissions
                hasPermission = hasPermission || _hasThisPermission(permission);
            });
            return hasPermission;
        }



    }

})(window.angular);
(function() {
    angular.module("app.common")
        .factory("PrintPreviewService", printPreviewService);

    printPreviewService.$inject = ["$mdDialog", "$mdMedia", "PrintService", "$rootScope"];

    function printPreviewService($mdDialog, $mdMedia, printService, $rootScope) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')); // && $scope.customFullscreen;
        return {
            show: function(model) {
                $mdDialog.show({
                    controller: ["$scope", "$mdDialog", "$rootScope", function($scope, $mdDialog, $rootScope) {

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
                    }],
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
(function() {
    angular.module("app.common").factory("PrintService", printService);

    printService.$inject = ["$rootScope"];

    function printService($rootScope) {

        function closePrint() {
            document.body.removeChild(this.__container__);
        }

        function setPrint() {
            this.contentWindow.__container__ = this;
            this.contentWindow.onbeforeunload = closePrint;
            this.contentWindow.onafterprint = closePrint;
            this.contentWindow.focus(); // Required for IE
            this.contentWindow.print();
        }

        return {
            print: function(printableDiv) {

                var printContents = document.getElementById(printableDiv).innerHTML;
                var oHiddFrame = document.createElement("iframe");

                oHiddFrame.style.visibility = "hidden";
                oHiddFrame.style.position = "fixed";
                oHiddFrame.style.right = "0";
                oHiddFrame.style.bottom = "0";
                document.body.appendChild(oHiddFrame);
                oHiddFrame.onload = setPrint;

                var frameDoc = oHiddFrame.document;
                if (oHiddFrame.contentWindow)
                    frameDoc = oHiddFrame.contentWindow.document; // IE

                $.ajax({
                    url: "app/views/common/templates/print.container.tmpl.html",
                    success: function(result) {
                        if (!_.isNull(result) || !_.isUndefined(result)) {
                            var content = result.replace('@PrintContent', printContents);
                            // Write into iframe
                            frameDoc.open();
                            frameDoc.writeln(content);
                            frameDoc.close();
                        }
                    }
                });


            }
        };
    }
})();
(function(angular) {
    'use strict';

    angular.module('app.common')
        .service('StorageService', StorageService);

    StorageService.$inject = ['$localStorage'];

    function StorageService($localStorage) {
        var servce = {
            Get: get,
            Set: set,
            Remove: remove,
            Reset: reset
        };

        return servce;

        function get(key) {
            var val = $localStorage[key];

            if (!angular.isUndefined(val)) {
                return JSON.parse(val);
            } else return null;

        }

        function set(key, value) {
            $localStorage[key] = JSON.stringify(value);
        }

        function remove(key) {
            delete $localStorage[key];
        }

        function reset() {
            $localStorage.$reset();
        }
    }

})(window.angular);

/**
 * Created by Yoni on 1/29/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.forms").controller("FormBuilderController", FormBuilderController);

    FormBuilderController.$inject = ['FormService','$mdDialog','RouteHelpers','$stateParams','AlertService','blockUI','$scope','$state'];

    function FormBuilderController(FormService,$mdDialog,RouteHelpers,$stateParams,AlertService,blockUI,$scope,$state) {
        var vm = this;
        vm.isEdit = $stateParams.id !== "0";
        vm.formId = $stateParams.id;
        vm.formTypes = FormService.FormTypes;

        //QUESTION RELATED
        vm.addQuestion = _addQuestion;
        vm.editQuestion = _editQuestion;

        vm.saveForm = _saveForm;
        vm.typeStyle = _typeStyle;

        //Section related
        vm.selectSection = _selectSection;
        vm.addSection = _addSection;
        vm.saveSection = _saveSection;
        vm.editSection = _editSection;
        vm.removeSection = _removeSection;
        vm.cancelSection = _cancelSection;

        //QUESTION ORDERING RELATED
        $scope.sortableOptions = {
            placeholder: 'ui-state-highlight',
            update: function(e, ui) {
            },
            stop: function(e, ui) {
                vm.selected_section.questions.map(function(question,index){
                    question.number = index;
                    UpdateQuestionOrder(question);
                });
            }
        };
        $scope.sectionSortableOptions = {
            placeholder: 'ui-state-highlight',
            stop: function(e, ui) {
                vm.formData.questions.map(function(question,index){
                    question.number = index;
                    UpdateQuestionOrder(question);
                });
            }
        };

        function UpdateQuestionOrder(question) {
            FormService.UpdateQuestion(question).then(
                function (response) {
                },function (error) {
                    console.log("error saving order question [" + question.question_text + "] ",error);
                }
            );
        }

        initialize();

        function _saveForm() {
            var myBlockUI = blockUI.instances.get('formBuilderBlockUI');
            myBlockUI.start();

            if(vm.isEdit){

                var editForm = {
                    _id:vm.formData._id,
                    title:vm.formData.title,
                    subtitle:vm.formData.subtitle,
                    purpose:vm.formData.purpose,
                    layout:vm.formData.layout,
                    has_sections:vm.formData.has_sections
                };

                FormService.UpdateForm(editForm).then(function (response) {
                    myBlockUI.stop();
                    vm.formData = response.data;
                    vm.formData.selected_formType = getFormTypeObj(vm.formData.type);
                    AlertService.showSuccess("FORM UPDATED","Form updated successfully");
                    $state.go('app.builder',{id:vm.formData._id},{inherit:true});
                },function (error) {
                    myBlockUI.stop();
                    var message = error.data.error.message;
                    AlertService.showError("Failed to Save Form",message);
                    console.log("error",error);
                });

            }else
                {

                var preparedForm = {
                    title:vm.formData.title,
                    subtitle:vm.formData.subtitle,
                    purpose:vm.formData.purpose,
                    layout:vm.formData.layout,
                    has_sections:vm.formData.has_sections,
                    type: vm.formData.selected_formType.code,
                    questions: []
                };

                FormService.CreateForm(preparedForm).then(function (response) {
                    myBlockUI.stop();
                    vm.formData = response.data;
                    vm.formData.selected_formType = getFormTypeObj(vm.formData.type);
                    AlertService.showSuccess("FORM CREATED","Form created successfully");
                    $state.go('app.builder',{id:vm.formData._id},{inherit:true});
                },function (error) {
                    myBlockUI.stop();
                    var message = error.data.error.message;
                    AlertService.showError("Failed to Save Form",message);
                    console.log("error",error);
                });

            }

        }


        function _addQuestion(sectionData,ev) {
            $mdDialog.show({
                locals: {data: {question:null,form: {_id: vm.formData._id,questions:vm.formData.has_sections?vm.selected_section.questions:vm.formData.questions},section:sectionData,number:vm.maxOrderNumber}},
                templateUrl: RouteHelpers.basepath('forms/question.builder.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'QuestionBuilderController',
                controllerAs: 'vm'
            }).then(function (answer) {
                callAPI();
            }, function (response) {
                console.log("refresh on response");
            });

        }
        function _editQuestion(question,ev) {
            $mdDialog.show({
                locals: {data: {question:question,form: {_id: vm.formData._id,questions:vm.formData.has_sections?vm.selected_section.questions:vm.formData.questions},number:vm.maxOrderNumber}},
                templateUrl: RouteHelpers.basepath('forms/question.builder.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'QuestionBuilderController',
                controllerAs: 'vm'
            }).then(function (answer) {
                callAPI();
            }, function () {
            });
        }

        function initialize() {

            if(vm.isEdit){
                callAPI();
            }else{
                vm.formData = {
                    has_sections:0,
                    layout:'TWO_COLUMNS'
                };
            }
        }

        function callAPI() {
            var myBlockUIOnStart = blockUI.instances.get('formBuilderBlockUI');
            myBlockUIOnStart.start();
            FormService.GetForm(vm.formId).then(function (response) {
                vm.formData = response.data;
                //REFRESH SELECTED SECTION
                if(vm.formData.sections.length > 0 && !_.isUndefined(vm.selected_section)){
                    vm.selected_section = _.first(_.filter(vm.formData.sections,function (section) {
                        return section._id === vm.selected_section._id;
                    }));
                }

                if(vm.formData.has_sections){
                    GetMaximumOrderNumberForSection();
                }else{

                    if(vm.formData.questions.length > 0){
                        vm.maxOrderNumber = _.max(vm.formData.questions,function (qn) {
                            return qn.number;
                        }).number;
                    }else{
                        vm.maxOrderNumber = 0;
                    }
                }

                vm.formData.selected_formType = getFormTypeObj(vm.formData.type);

                myBlockUIOnStart.stop();

            },function (error) {
                myBlockUIOnStart.stop();
                console.log("error",error);
            });
        }

        function GetMaximumOrderNumberForSection() {
            if(!_.isUndefined(vm.selected_section)){

                if(vm.selected_section.questions.length > 0){
                    vm.maxOrderNumber =  _.max(vm.selected_section.questions,function (qn) {
                        return qn.number;
                    }).number;
                }else {
                    vm.maxOrderNumber = 0;
                }

            }else{
                vm.maxOrderNumber = 0;
            }
        }
        function getFormTypeObj(code) {
            return _.first(_.filter(vm.formTypes,function (type) {
                return type.code === code;
            }));
        }

        function _typeStyle(type){
            var style = '';
            switch (type.trim()){
                case 'Fill In Blank':
                case 'FILL_IN_BLANK':
                    style =  'label bg-green-dark';
                    break;
                case 'Yes/No':
                case 'YES_NO':
                    style =  'label bg-info';
                    break;
                case 'GROUPED':
                    style =  'label bg-warning-dark';
                    break;
                case 'SINGLE_CHOICE':
                    style =  'label bg-primary';
                    break;
                case 'MULTIPLE_CHOICE':
                    style =  'label bg-pink-dark';
                    break;
                default:
                    style =  'label bg-inverse';
            }
            return style;
        }

        //------SECTION RELATED---------

        function _addSection() {
            vm.selected_section = {};
            vm.showSectionForm = true;
        }
        function _selectSection(selectedSection) {
            vm.showSectionForm = false;
            vm.selected_section = selectedSection;
            vm.selected_section.form = vm.formId; //This is important for remove section
            GetMaximumOrderNumberForSection();
        }

        function _saveSection(section) {
            section.form = vm.formId;
            if( _.isUndefined(section._id)){

            FormService.CreateSection(section).then(function (response) {
                vm.selected_section = response.data;
                vm.selected_section.form = vm.formId; //set to which form it belongs
                vm.showSectionForm = false;
                AlertService.showSuccess("SECTION","Section Created successfully");
                callAPI();//REFRESH FORM DATA
            },function (error) {
                console.log("error when saving section",error);
            });

            }else {
                FormService.UpdateSection(section).then(function (response) {
                    vm.selected_section = response.data;
                    vm.selected_section.form = vm.formId; //set to which form it belongs
                    vm.showSectionForm = false;
                    callAPI();//REFRESH FORM DATA
                    AlertService.showSuccess("SECTION","Section Updated successfully");
                },function (error) {
                    console.log("error when saving section",error);
                });
            }
        }
        function _editSection(section) {
            vm.selected_section = section;
            vm.selected_section.form = vm.formId;
            vm.showSectionForm = true;
        }
        function _cancelSection() {
            vm.showSectionForm = false;
        }

        function _removeSection(section) {
            AlertService.showConfirmForDelete("You are about to DELETE SECTION, All Questions under this section will be removed",
                "Are you sure?", "Yes, Delete it!", "warning", true,function (isConfirm) {
                    if(isConfirm){
                        vm.selected_section.form = vm.formId; //set to which form it belongs
                        FormService.RemoveSection(section).then(function(response){
                            vm.showSectionForm = false;
                            callAPI();
                            AlertService.showSuccess("SECTION","Section Deleted successfully");
                            vm.selected_section = undefined;
                        },function(error){
                            console.log("Section deleting error",error);
                            var message = error.data.error.message;
                            AlertService.showError("Failed to DELETE Section",message);
                        });
                    }

                });
        }
    }


})(window.angular);
/**
 * Created by Yoni on 2/9/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.forms").controller("QuestionBuilderController", QuestionBuilderController);

    QuestionBuilderController.$inject = ['FormService','$mdDialog','data','AlertService','$scope'];

    function QuestionBuilderController(FormService,$mdDialog,data,AlertService,$scope) {
        var vm = this;
        vm.questionTypes = FormService.QuestionTypes;
        vm.readOnly = false;

        vm.saveQuestion = _saveQuestion;
        vm.cancel = _cancel;
        vm.addAnother = _addAnother;
        vm.showQuestionOn = _showQuestionOn;
        vm.removeQuestion = _removeQuestion;

        vm.questionTypeChanged = _questionTypeChanged;

        //Sub Question related
        vm.showSubQuestion = false;//used for grouped questions
        vm.toggleAddSubQuestion = _toggleAddSubQuestion;
        vm.addToSubQuestion = _addToSubQuestion;
        vm.editSubQuestion = _editSubQuestion;
        vm.removeSubQuestion = _removeSubQuestion;
        vm.cancelSubQuestion = _cancelSubQuestion;
        vm.subQuestionValidationSelected = _subQuestionValidationSelected;


        //SC & MC related
        vm.addRadio = _addRadio;
        vm.removeOption = _removeOption;
        vm.editOption = _editOption;

        //SUB QUESTION ORDERING RELATED
        $scope.sortableSubQuestions = {
            placeholder: 'ui-state-highlight',
            update: function(e, ui) {
            },
            stop: function(e, ui) {
                vm.sub_question_list.map(function(question,index){
                    question.number = index;
                    FormService.UpdateQuestion(question).then(
                        function (response) {
                        },function (error) {
                            console.log("error saving order question [" + question.question_text + "] ",error);
                        }
                    )
                });
            }
        };

        initialize();

        function initialize() {
            vm.sub_question_list = [];
            vm.fibvalidation = [{name:'NONE',code:'text'},{name:'ALPHANUMERIC',code:'text'},{name:'NUMERIC',code:'number'},{name:'ALPHABETIC',code:'text'}];
            vm.isEdit = data.question !== null;
            vm.form = data.form;
            vm.maxOrderNumber = data.number;
            vm.isSubEdit = false;
            vm.sub_question = {};
            vm.sub_question.selected_validation = _.first(_.filter(vm.fibvalidation,function(val){
                return val.name === 'NONE'; //set sub question validation default to NONE
            }));
            vm.questionList = _.filter(data.form.questions,function (question) {
                return question.options.length > 0 && (question.type === QUESTION_TYPE.YES_NO || question.type === QUESTION_TYPE.SINGLE_CHOICE);
               //question list used for WHEN is selected
            });

            if(vm.isEdit){
                vm.question = data.question;
                if(!_.isUndefined(vm.question.sub_questions)){
                    vm.sub_question_list = vm.question.sub_questions;
                }
                if(vm.question.prerequisites.length === 1){
                    var prereq = vm.question.prerequisites[0];
                    FormService.GetQuestion(prereq.question).then(function (response) {
                        vm.selected_question = response.data;
                        vm.selected_question.selected_value =  prereq.answer;
                    })
                }
                vm.question.form = data.form._id;
                vm.question.selected_type = getQuestionTypeObj(vm.question.type);
                SetValidationObj(false);
            }else {
                vm.question = {
                    show: 1,
                    required:0,
                    options:[]
                };

                vm.question.selected_validation = _.first(_.filter(vm.fibvalidation,function(val){
                    return val.name === 'NONE'; //set question validation default to NONE
                }));

                if(data.section.has_section){
                    vm.question.section = data.section.sectionId;
                }

            }
        }

        function _saveQuestion() {
            var preparedQn = {
                question_text:vm.question.question_text,
                remark:vm.question.remark,
                required: vm.question.required,
                show:vm.question.show,
                measurement_unit: !_.isUndefined(vm.question.measurement_unit)? vm.question.measurement_unit:null,
                form:vm.form._id
            };
            if(vm.question.selected_type.code === QUESTION_TYPE.FILL_IN_BLANK){
                preparedQn.validation_factor = vm.question.selected_validation.name;
            }
            else if(vm.question.selected_type.code === QUESTION_TYPE.YES_NO){
                preparedQn.options = vm.question.selected_type.options;
            }
            if(!_.isUndefined(vm.question.options) && vm.question.options.length > 0 ){
                preparedQn.options = vm.question.options;
            }
            //SET PREREQUISITE IF SHOW IS FALSE
            if(vm.question.show === "0" || !vm.question.show){
                if(!_.isUndefined(vm.selected_question) &&
                    !_.isUndefined(vm.selected_question.selected_value)){
                    var prerequisite = {
                        question:vm.selected_question._id,
                        answer:vm.selected_question.selected_value
                    };
                    preparedQn.prerequisites = [];
                    preparedQn.prerequisites.push(prerequisite);
                }
            }else{
                preparedQn.prerequisites = [];
            }

            if(!vm.isEdit){
                preparedQn.section = vm.question.section;
                preparedQn.number = GetNextQuestionOrderNumber();
                FormService.CreateQuestion(preparedQn,vm.question.selected_type.url).then(function (response) {
                    vm.maxOrderNumber = preparedQn.number;
                    vm.question = response.data;
                    vm.showSubQuestion = true;
                    if(vm.question.type === QUESTION_TYPE.GROUPED){
                        saveSubQuestionList();
                    }
                    $mdDialog.hide();
                    AlertService.showSuccess("Question Created","Question Created successfully");
                },function (error) {
                    console.log("Question create error",error);
                    var message = error.data.error.message;
                    AlertService.showError("Failed to Save Question",message);
                });

            }else
                {
                preparedQn._id = vm.question._id;

                FormService.UpdateQuestion(preparedQn).then(function (response) {
                    if(vm.question.selected_type.code === QUESTION_TYPE.GROUPED){
                        saveSubQuestionList();
                    }
                    $mdDialog.hide();
                    AlertService.showSuccess("Question Updated","Question Updated successfully");
                },function (error) {
                    console.log("qn update error",error);
                    var message = error.data.error.message;
                    AlertService.showError("Failed to Update Question",message);

                });
            }
        }
        function _removeQuestion(question,$event) {
            AlertService.showConfirmForDelete("You are about to DELETE this Question?",
                "Are you sure?", "Yes, Delete it!", "warning", true,function (isConfirm) {
                    question.form = vm.form._id;

                if(isConfirm){
                    FormService.DeleteQuestion(question).then(function(response){
                        AlertService.showSuccess("Question","Question Deleted successfully");
                        $mdDialog.hide();
                    },function(error){
                        console.log("qn deleting error",error);
                        var message = error.data.error.message;
                        AlertService.showError("Failed to DELETE Question",message);
                    })
                }

                });

        }

        //SC AND MC OPTIONS RELATED
        function _addRadio(newValue) {
            // If value is undefined, cancel.
            if (newValue === undefined || newValue === '') {
                return;
            }
            // Push it to radioOptions
            if(!_.isUndefined(vm.oldOption)){
                var oldOptionIndex =  vm.question.options.indexOf(vm.oldOption);
                if(oldOptionIndex !== -1 ){
                    vm.question.options.splice(oldOptionIndex, 1);
                }
                vm.isOptionEdit = false;
            }

            var index =  vm.question.options.indexOf(newValue);
            if(index === -1) {
                vm.question.options.push(newValue);
            }
            // Clear input contents
            vm.newRadioValue = '';
        }
        function _removeOption(option) {
            var index = vm.question.options.indexOf(option);
            if(index !== -1){
                vm.question.options.splice(index,1);
            }
        }
        function _editOption(option) {
            vm.isOptionEdit = true;
            vm.newRadioValue = option;
            vm.oldOption = option;
        }

        //SUB QUESTIONS RELATED
        function _toggleAddSubQuestion() {
            vm.showSubQuestion = true;
            if(vm.isSubEdit){
                vm.sub_question = {};
                vm.isSubEdit = false
            }
        }
        function _addToSubQuestion() {

            var subQuestion = {
                question_text:vm.sub_question.question_text,
                parent_question:vm.question._id,
                required:vm.question.required,
                show:true,
                measurement_unit: !_.isUndefined(vm.sub_question.measurement_unit)? vm.sub_question.measurement_unit:null,
                validation_factor: vm.sub_question.selected_validation.name,
                sub_question_type: 'fib',
                form:vm.form._id
            };
            //TODO check obj b4 adding
            vm.sub_question_list.push(subQuestion);
            vm.vallidationCopy = vm.sub_question.selected_validation;
            vm.sub_question = {};
            vm.sub_question.selected_validation = vm.vallidationCopy;
            vm.showSubQuestion = false;
        }
        function _cancelSubQuestion() {
            vm.sub_question = {};
            vm.sub_question.selected_validation = _.first(_.filter(vm.fibvalidation,function(val){
                return val.name === 'NONE'; //set sub question validation default to NONE
            }));
            vm.showSubQuestion = false;
        }
        function saveSubQuestionList() {
            _.forEach(vm.sub_question_list,function (subQn) {
                if(!_.isUndefined(subQn._id)){
                    FormService.UpdateQuestion(subQn).then(function (response) {},function (error) {
                        var message = error.data.error.message;
                        AlertService.showError("Failed to Save Sub Question",message);
                    });
                }else {
                    subQn.number = setSubQuestionOrderNumber();
                    subQn.parent_question = vm.question._id;
                    vm.maxSubOrderNumber = subQn.number;
                    FormService.CreateQuestion(subQn,subQn.sub_question_type).then(function (response) {
                    },function (error) {
                        console.log("sub question error create",error);
                    });
                }
            });
        }
        function _editSubQuestion(question,ev) {
            vm.isSubEdit = true;
            vm.showSubQuestion = true;
            vm.sub_question = question;
            SetValidationObj(true);
        }

        function spliceQuestionFromList(question) {
            var subQuestionIndex =  vm.sub_question_list.indexOf(question);
            if(subQuestionIndex !== -1 ){
                vm.sub_question_list.splice(subQuestionIndex, 1);
            }
        }

        function _removeSubQuestion(question, ev) {
            AlertService.showConfirmForDelete("You are about to REMOVE this Question?",
                "Are you sure?", "Yes, REMOVE it!", "warning", true,function (isConfirm) {

                    if(isConfirm){
                        if(_.isUndefined(question._id)){
                            // vm.sub_question
                            if(_.isUndefined(vm.question.sub_questions)){
                                spliceQuestionFromList(question);
                            }else{
                                var subIndex =  vm.question.sub_questions.indexOf(question);
                                if(subIndex !== -1 ){
                                    vm.question.sub_questions.splice(subIndex, 1);
                                }
                            }

                        }else{
                            question.form = vm.form._id;
                            FormService.DeleteQuestion(question).then(function(response){
                                spliceQuestionFromList(question);
                                AlertService.showSuccess("SUB QUESTION","Sub Question Deleted successfully");
                            },function(error){
                                console.log("qn deleting error",error);
                                var message = error.data.error.message;
                                AlertService.showError("Failed to DELETE Question",message);
                            })
                        }
                    }

                });

        }

        function _subQuestionValidationSelected() {}
        function _addAnother() { }
        function _showQuestionOn() { }
        function _cancel() {
            $mdDialog.cancel();
        }
        function _questionTypeChanged() {
            // if(vm.question.selected_type.code === QUESTION_TYPE.GROUPED && !vm.isEdit){
            //     vm.showSubQuestion = true;
            // }
        }
        function getQuestionTypeObj(typeName) {
            return _.first(_.filter(vm.questionTypes,function (type) {
                return type.name === typeName || type.code === typeName;
            }));
        }
        function SetValidationObj(isSubQuestion) {
            if(isSubQuestion){
                vm.sub_question.selected_validation = _.first(_.filter(vm.fibvalidation,function (val) {
                    return val.name === vm.sub_question.validation_factor;
                }));
            }else{
                if(vm.question.selected_type.code === QUESTION_TYPE.FILL_IN_BLANK){
                    vm.question.selected_validation = _.first(_.filter(vm.fibvalidation,function (val) {
                        return val.name === vm.question.validation_factor;
                    }));
                }
            }

        }

        function setSubQuestionOrderNumber() {
            var maxNo = _.max(vm.question.sub_questions,function(sub){
                return sub.number;
            });
            vm.maxSubOrderNumber = _.isUndefined(vm.maxSubOrderNumber)?maxNo.number: vm.maxSubOrderNumber;
            var number =  _.isEmpty(vm.maxSubOrderNumber)? 0 :  parseInt(vm.maxSubOrderNumber) + 1;
            return _.isUndefined(number)? 0 : number;
        }
        function GetNextQuestionOrderNumber() {
            return vm.maxOrderNumber + 1;
        }

    }


})(window.angular);
/**
 * Created by Yoni on 1/9/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.clients").controller("ClientDetailController", ClientDetailController);

    ClientDetailController.$inject = ['LoanManagementService','$stateParams','blockUI','DocumentService','APP_CONSTANTS'];

    function ClientDetailController(LoanManagementService,$stateParams,blockUI,DocumentService,APP_CONSTANTS) {
        var vm = this;
        vm.clientId =  $stateParams.id;
        vm.visibility = {showMoreClientDetail: false};
        vm.labelBasedOnStatus = LoanManagementService.StyleLabelByStatus;

        vm.tabsList = [
            { index: 1, heading:"Screening", code: 'screening', templateUrl:"app/views/loan_management/client_management/tabs/screening.partial.html" },
            { index: 2, heading:"Loan Application", code: 'loan', templateUrl:"app/views/loan_management/client_management/tabs/loan.partial.html" },
            { index: 3, heading:"A-CAT", code: 'acat', templateUrl:"app/views/loan_management/client_management/tabs/acat.partial.html" }
        ];
        vm.activeTab = vm.tabsList[0]; //initially screening tab is active
        vm.activeTabIndex = vm.activeTab.index;

        vm.onSelectedLoanCycle = _onSelectedLoanCycle;

        vm.onTabSelected = _onTabSelected;
        vm.printLoanProcess = LoanManagementService.printLoanProcess;

        vm.ACATGroupOnClick = _aCATGroupOnClick;
        vm.onLoanProposalClick = _onLoanProposalClick;
        vm.downloadDocument = _downloadDocument;

        function _onSelectedLoanCycle(){
            _onTabSelected();
        }

        function getLoanCycles(){
            //filter loan cycles by max loan cycle number
            vm.loanCycles = [];
            _.each(LoanManagementService.loanCycles,function (cycle) {
                if(cycle.id <= vm.client.loan_cycle_number){
                    vm.loanCycles.push(cycle);
                }
                if(cycle.id === vm.client.loan_cycle_number){
                    vm.loanCycle = cycle.id.toString();
                }

            });
        }

        initialize();

        function initialize() {
            vm.FILE_TYPE = APP_CONSTANTS.FILE_TYPE;
            vm.visibility = {
                showCropPanel:false,
                showSummaryPanel:false,
                showWarningForLoanCycle: false
            };
            vm.query = {
                search:'',
                page:1,
                per_page:10
            };

            var myBlockUI = blockUI.instances.get('ClientBlockUI');
            myBlockUI.start();

            LoanManagementService.GetClientDetail(vm.clientId)
                .then(function(response){
                    myBlockUI.stop();
                    vm.client = response.data;
                    vm.loanCycle =  vm.client.loan_cycle_number;
                    getLoanCycles();
                    _onTabSelected();

                },function(error){
                    myBlockUI.stop();
                    console.log("error getting client detail",error);
                });
        }


        function CallClientScreeningAPI() {
            var blockUIName =  'screeningTabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            LoanManagementService.GetClientScreening(vm.clientId).then(function (response) {
                myBlockUI.stop();
                vm.clientScreening = response.data;
            },function (error) {
                myBlockUI.stop();
                console.log("error fetching screening",error);
            });
        }

        function GetClientApplicationByLoanCycle(application) {
            var blockUIName =  application + 'TabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            vm.clientScreening = undefined; // reset on every load
            vm.client.loan_application = undefined;// reset on every load
            vm.clientACATs = undefined;// reset on every load
            LoanManagementService.GetClientApplicationByLoanCycle(vm.clientId,application,vm.loanCycle).then(function (response) {
                myBlockUI.stop();

                if(application ==='screening'){
                    vm.clientScreening = response.data;
                } else if(application ==='loan'){
                    vm.client.loan_application = response.data;
                } else if(application ==='acat'){
                    vm.clientACATs = response.data;
                }

            },function (error) {
                myBlockUI.stop();
                console.log("error fetching data by loan cycle",error);
            });
        }

        function CallClientLoanApplicationAPI() {
            var blockUIName =  'loanTabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            vm.client.loan_application = undefined; // reset on every load
            LoanManagementService.GetClientLoanApplication(vm.clientId)
                .then(function (response) {
                    myBlockUI.stop();
                    vm.client.loan_application = response.data;
                },function (error) {
                    myBlockUI.stop();
                    console.log(" error .loan_application",error);
                });
        }

        function CallClientACAT() {
            var blockUIName =  'acatTabBlockUI';
            var myBlockUI = blockUI.instances.get(blockUIName);
            myBlockUI.start();
            vm.clientACATs = undefined; // reset on every load
            LoanManagementService.GetClientACAT(vm.clientId)
                .then(function(response){
                    myBlockUI.stop();
                    vm.clientACATs = response.data;
                },function(error){
                    myBlockUI.stop();
                });

        }
        function setActiveTabObj() {
            vm.activeTab = {};
            vm.activeTab = _.find(vm.tabsList,function (tab) {
                return tab.index === vm.activeTabIndex;
            });
            vm.visibility.showWarningForLoanCycle = vm.loanCycle !==  vm.client.loan_cycle_number.toString();
        }
        function _onTabSelected() {
            setActiveTabObj();
            switch (vm.activeTab.code){
                case 'screening':
                    if(_.isUndefined(vm.loanCycle)){
                        CallClientScreeningAPI();
                    }else{
                        GetClientApplicationByLoanCycle(vm.activeTab.code);
                    }
                    break;
                case 'loan':
                    if(_.isUndefined(vm.loanCycle)){
                        CallClientLoanApplicationAPI();
                    }else{
                        GetClientApplicationByLoanCycle(vm.activeTab.code);
                    }
                    break;
                case 'acat':
                    if(_.isUndefined(vm.loanCycle)){
                        CallClientACAT();
                    }else{
                        GetClientApplicationByLoanCycle(vm.activeTab.code);
                    }
                    break;
                default:
                    break;
            }
        }

        function getLoanProposals() {
            LoanManagementService.GetClientLoanProposals(vm.clientACATs._id)
                .then(function(response){
                    vm.clientLoanProposals = response.data;
                },function(error){
                    console.log("error getting  clientLoanProposals ",error);
                });
        }

        function _aCATGroupOnClick(selectedClientACAT,index) {
            vm.selectedClientACAT = selectedClientACAT;
            // vm.selectedClientACAT.estimated.net_cash_flow

            sortMonths();

            ShowCropPanel();
        }

        function sortMonths() {

            // let net_cash_flow = [];
            // let firstExpenseMonth = MONTHS_CONST.find( mon => mon.name === vm.selectedClientACAT.first_expense_month);
            // let loop = true;
            // let index = firstExpenseMonth.number;
            // net_cash_flow.push(MONTHS_CONST[index]);
            // if(index === 11) index = 0; else index++;
            // while (loop) {
            //     if(index === firstExpenseMonth) loop = false;
            //     else {
            //         net_cash_flow.push(MONTHS_CONST[index]);
            //         if(index === 11) index = 0; else index++;
            //     }
            // }
            // return net_cash_flow;
        }



        function _onLoanProposalClick(loanProduct) {
            getLoanProposals();
            ShowSummaryPanel();
            vm.selectedLoanProduct = loanProduct;
            vm.list = { settingActive: 10 };

        }
        function _downloadDocument(selectedClientACAT) {
            var client_ACAT_id = selectedClientACAT._id;
            var myBlockUI = blockUI.instances.get('acatTabBlockUI');
            myBlockUI.start('Downloading...');
            DocumentService.GetDocument(client_ACAT_id).then(function (response) {
                window.open(DocumentService.OpenDocument(response.data,vm.FILE_TYPE.EXCEL), '_self', '');
                myBlockUI.stop();
            },function () { myBlockUI.stop(); });
        }

        function ShowCropPanel() {
            vm.visibility.showCropPanel = true;
            vm.visibility.showSummaryPanel = false;
        }
        function ShowSummaryPanel() {
            vm.visibility.showCropPanel = false;
            vm.visibility.showSummaryPanel = true;
        }
    }


})(window.angular);
/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.loan_management")
        .controller("ClientManagementController", ClientManagementController);
    ClientManagementController.$inject = ['LoanManagementService','$state','$scope','AuthService'];

    function ClientManagementController(LoanManagementService,$state,$scope,AuthService) {
        var vm = this;
        vm.currentUser = {selected_access_branch:undefined};
        vm.labelBasedOnStatus = LoanManagementService.StyleLabelByStatus;
        vm.paginate = _paginate;
        vm.clearSearch = _clearSearch;
        //CLIENT RELATED
        vm.clientDetail = _clientDetail;
        vm.onSelectedBranch = _onSelectedBranch;
        vm.onSelectedLoanCycle = _onSelectedLoanCycle;



        initialize();

        function initialize() {
            vm.pageSizes = [10, 25, 50, 100, 250, 500];
            vm.loanCycles = LoanManagementService.loanCycles;
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
            GetBranchFilter();
        }


        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            callApi();
        }
        function _paginate (page, pageSize) {
            console.log('current Page: ' + vm.query.page + ' page size: ' + vm.query.per_page);
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callApi();

        }

        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                LoanManagementService.GetBranches().then(function(response){
                    vm.currentUser.user_access_branches = response.data.docs;
                },function(error){
                    vm.currentUser.user_access_branches = [];
                    console.log("error on GetBranchFilter",error);
                });
            }
            else {
                vm.currentUser.user_access_branches = AuthService.GetAccessBranches();
            }
        }

        function callApi(){
            vm.clientPromise = LoanManagementService.GetClients(vm.query).then(function(response){
                vm.clients = response.data.docs;
                vm.clientsCopy = angular.copy(vm.clients);
                vm.query.total_docs_count =  response.data.total_docs_count;
            },function (error) {
                console.log("error callApi vm.clients",error);
            });
        }

        function SearchApi(SearchText){
            vm.clientPromise = LoanManagementService.SearchClient(SearchText)
                .then(function(response){
                    vm.clients = response.data.docs;
                    vm.clientsCount = response.data.total_docs_count;
                    vm.query.total_docs_count =  response.data.total_docs_count;
                    console.log(response);
                },function (error) {
                    vm.clients = vm.clientsCopy;
                    console.log("error",error);
                });
        }

        function _clientDetail(client,ev) {
            $state.go('app.client_detail',{id:client._id});
        }

        function _onSelectedBranch(){
            vm.clients = vm.clientsCopy;

            vm.clients = _.filter(vm.clients,function(client){
                if(!_.isUndefined(client.branch) && client.branch !== null){
                    return client.branch._id === vm.currentUser.selected_access_branch._id;
                }
            });

        }
        function _onSelectedLoanCycle(){

            vm.clientPromise = LoanManagementService.GetClientByLoanCycle(vm.currentUser.loanCycle)
                .then(function(response){
                    vm.clients = response.data.docs;
                    vm.clientsCount = response.data.total_docs_count;
                    console.log(response);
                },function (error) {
                    vm.clients = vm.clientsCopy;
                    console.log("error",error);
                });
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                //make sure at least two characters are entered
                if(newValue.length > 2){
                    SearchApi(newValue);
                }else{
                    vm.clients = vm.clientsCopy;
                }

            }
        });

    }


})(window.angular);
/**
 * Created by Yonas on 20/2/2019.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("GroupLoanController", GroupLoanController);

    GroupLoanController.$inject = ['LoanManagementService','$scope','$state','AuthService'];

    function GroupLoanController(LoanManagementService,$scope,$state,AuthService) {
        var vm = this;
        vm.labelBasedOnStatus = LoanManagementService.StyleLabelByStatus;
        vm.loanCycles = LoanManagementService.loanCycles;
        vm.onSelectedBranch = _onSelectedBranch;

        vm.paginate = _paginate;
        vm.groupDetail = _groupDetail;

        vm.onSelectedLoanCycle = _onSelectedLoanCycle;
        vm.clearSearch = _clearSearch;

        initialize();

        function _clearSearch(){
            vm.query.search = "";
            vm.filter.show = false;
            // callApi();
        }

        function initialize() {
            vm.visibility = { showClientDetail: false };
            vm.currentUser = {selected_access_branch:undefined};
            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;
            vm.query = { search:'',   page:1,  per_page:10 };
            callAPI();
            GetBranchFilter();
        }
        function _onSelectedBranch(){
            vm.groupLoans = vm.groupLoansCopy;
            vm.groupLoans = _.filter(vm.groupLoans,function(group){
                if(!_.isUndefined(group.branch) && group.branch !== null){
                    return group.branch._id === vm.currentUser.selected_access_branch._id;
                }
            });

        }

        function GetBranchFilter() {
            if(AuthService.IsSuperuser()){
                LoanManagementService.GetBranches().then(function(response){
                    vm.currentUser.user_access_branches = response.data.docs;
                },function(error){
                    vm.currentUser.user_access_branches = [];
                    console.log("error on GetBranchFilter",error);
                });
            }
            else {
                vm.currentUser.user_access_branches = AuthService.GetAccessBranches();
            }
        }

        function _onSelectedLoanCycle(){

        }

        function callAPI() {
            vm.groupLoansPromise = LoanManagementService.GetGroupLoans(vm.query).then(function (response) {
                vm.groupLoans = response.data.docs;
                vm.groupLoansCopy = angular.copy(vm.groupLoans);
                vm.query.total_docs_count =  response.data.total_docs_count;
            },function (error) {  })
        }

        function _paginate(page, pageSize) {
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callAPI();
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("searching clients for ",newValue);
            }
        });

        function _groupDetail(group) {
            $state.go('app.group_loan_detail.members',{id: group._id});
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            // group loan search
        });

    }

})(window.angular);
/**
 * Created by Yonas on 20/2/2019.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("GroupLoanDetailController", GroupLoanDetailController);

    GroupLoanDetailController.$inject = ['LoanManagementService','$scope','$stateParams','$state','blockUI','DocumentService','APP_CONSTANTS'];

    function GroupLoanDetailController(LoanManagementService,$scope,$stateParams,$state,blockUI,DocumentService,APP_CONSTANTS) {
        var vm = this;
        vm.StyleLabelByStatus = LoanManagementService.StyleLabelByStatus;
        vm.onTabSelected = _onTabSelected;
        vm.loanProcessDetail = _loanProcessDetail;
        vm.backToList = _backToList;
        vm.printLoanProcess  = LoanManagementService.printLoanProcess;

        vm.downloadMemberListDocument = _downloadMemberListDocument;
        vm.downloadACATDocument = _downloadACATDocument;

        vm.ACATGroupOnClick = _aCATGroupOnClick;
        vm.onLoanProposalClick = _onLoanProposalClick;

        initialize();


        function _downloadMemberListDocument(group) {
            var group_id = group._id;
            var myBlockUI = blockUI.instances.get('groupMembersBlockUI');
            myBlockUI.start('Downloading...');
            DocumentService.GetGroupDocument(group_id).then(function (response) {
                window.open(DocumentService.OpenDocument(response.data,vm.FILE_TYPE.EXCEL), '_self', '');
                myBlockUI.stop();
            },function () { myBlockUI.stop(); });
        }
        function _downloadACATDocument(selectedClientACAT) {
            var client_ACAT_id = selectedClientACAT._id;
            var myBlockUI = blockUI.instances.get('acatTabBlockUI');
            myBlockUI.start('Downloading...');
            DocumentService.GetDocument(client_ACAT_id).then(function (response) {
                window.open(DocumentService.OpenDocument(response.data,vm.FILE_TYPE.EXCEL), '_self', '');
                myBlockUI.stop();
            },function () { myBlockUI.stop(); });
        }


        function initialize() {
            vm.tabsList = [
                { id:0,  heading:"Members",  code: 'members', route: 'app.group_loan_detail.members' },
                { id:1,  heading:"Screening", code: 'screening', route: 'app.group_loan_detail.screenings' },
                { id:2,  heading:"Loan Application", code: 'loan', route: 'app.group_loan_detail.loan' },
                { id:3,  heading:"A-CAT", code: 'acat', route: 'app.group_loan_detail.acat'  }
            ];
            ResetVisibility();
            vm.FILE_TYPE = APP_CONSTANTS.FILE_TYPE;

            vm.groupLoan = {};
            vm.groupLoanId = $stateParams.id;
            _.each(vm.tabsList,function (selectedTab) {
                if($state.current.name === selectedTab.route){
                    vm.selectedTab = selectedTab.id;
                    vm.selectedTabObj = selectedTab;
                }
            });

            callAPI();
        }
        function ResetVisibility() {
            vm.visibility = {
                showScreeningDetail: false,
                showLoanDetail: false,
                showACATDetail: false
            };
        }
        function callAPI() {
            vm.groupPromise = LoanManagementService.GetGroupLoan(vm.groupLoanId).then(function (response) {
                vm.groupLoan.group = response.data;
                GetData(vm.selectedTabObj.code);
            },function (error) {  });
        }

        function GetData(tabCode) {
            switch (tabCode) {
                case 'screening':
                    vm.groupScreeningPromise = LoanManagementService.GetGroupDataByLoanProcessStage('screenings',vm.groupLoanId).then(function (response) {
                        vm.groupLoan.screenings = response.data.screenings;
                        vm.groupScreening =  {
                            status: response.data.status,
                            last_modified: response.data.last_modified
                        };

                    },function (error) {});
                    break;
                case 'loan':
                    vm.groupLoanPromise = LoanManagementService.GetGroupDataByLoanProcessStage('loans',vm.groupLoanId).then(function (response) {
                        vm.groupLoan.loans = response.data.loans;
                        vm.groupLoanInfo =  {
                            status: response.data.status,
                            last_modified: response.data.last_modified
                        };
                    },function (error) {});
                    break;
                case 'acat':
                    vm.groupAcatPromise = LoanManagementService.GetGroupDataByLoanProcessStage('acats',vm.groupLoanId).then(function (response) {
                        vm.groupLoan.acats = response.data.acats;
                        vm.groupACAT =  {
                            status: response.data.status,
                            last_modified: response.data.last_modified
                        };
                    },function (error) {});
                    break;
                default:
                    break;
            }
        }


        function _onTabSelected(tab,index) {
            vm.selectedTab = index; //SET ACTIVE TAB
            vm.selectedTabObj = tab;
            ResetVisibility();
            GetData(tab.code); // get data for selected tab
            $state.go(tab.route); //REDIRECT TO CHILD VIEW
        }

        function _loanProcessDetail(stageData,tabCode,event) {
            switch (tabCode) {
                case 'screening':
                    vm.clientScreening = stageData;
                    vm.visibility.showScreeningDetail = true;
                    break;
                case 'loan':
                    vm.loanApplication = stageData;
                    vm.visibility.showLoanDetail = true;
                    break;
                case 'acat':
                    vm.selectedClientACAT = undefined; // reset on every load
                    vm.clientACATs = stageData;
                    vm.visibility.showACATDetail = true;
                    break;
                default:
                    break;
            }
        }

        function _backToList(tabCode) {
            switch(tabCode){
                case 'screening':
                    vm.visibility.showScreeningDetail = false;
                    break;
                case 'loan':
                    vm.visibility.showLoanDetail = false;
                    break;
                case 'acat':
                    vm.visibility.showACATDetail = false;
                    break;
            }
        }
        function _aCATGroupOnClick(selectedClientACAT,index) {
            vm.selectedClientACAT = selectedClientACAT;
            ShowCropPanel();
        }
        function _onLoanProposalClick(loanProduct) {
            ShowSummaryPanel();
            vm.selectedLoanProduct = loanProduct;
            vm.list = { settingActive: 10 };
        }

        function ShowCropPanel() {
            vm.visibility.showCropPanel = true;
            vm.visibility.showSummaryPanel = false;
        }
        function ShowSummaryPanel() {
            vm.visibility.showCropPanel = false;
            vm.visibility.showSummaryPanel = true;
        }
    }



})(window.angular);
/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("LoanProcessingController", LoanProcessingController);

    LoanProcessingController.$inject = ['$state'];

    function LoanProcessingController( $state ) {
        var vm = this;
        vm.visibility = {
            showScreeningDetail:false,
            showClientDetail:true,
            showLoanApplicationDetail:false,
            showACATDetail:false
        };

        vm.setActiveTab = _setActiveTab;

        function _setActiveTab(route,index){
            vm.selectedTab = index; //SET ACTIVE TAB
            $state.go(route); //REDIRECT TO CHILD VIEW
        }



        initialize();

        function initialize() {
            vm.tabs = [ { title:'Manage Clients',code:'CLIENT', route: 'app.loan_processing.clients' },
                { title:'Screenings',code:'SCREENING', route: 'app.loan_processing.screenings'},
                { title:'Loan Applications',code:'LOAN_APPLICATION', route: 'app.loan_processing.loan_applications' },
                { title:'ACAT Processor',code:'ACAT_PROCESSOR', route: 'app.loan_processing.acat'}
            ];
            _.forEach(vm.tabs,function (tab,index) {
               if(!_.isUndefined($state.current.name) && tab.route === $state.current.name ) {
                   vm.selectedTab = index; //SET ACTIVE TAB BASED ON STATE
               }
            });

        }
    }



})(window.angular);
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

(function (angular) {
    "use strict";

    angular.module("app.processing")
        .controller("EstimatedYieldDetailController", EstimatedYieldDetailController);

    EstimatedYieldDetailController.$inject = ['$mdDialog','data'];

    function EstimatedYieldDetailController($mdDialog,data) {
        var vm = this;
        console.log("data",data);

        vm.cancel = _cancel;
        vm.saveProductForMarket = _saveProductForMarket;


        function _cancel() {
            $mdDialog.cancel();
        }

        function _saveProductForMarket() {
            $mdDialog.hide("hello");
        }
    }
})(window.angular);
(function (angular) {
    "use strict";

    angular.module("app.processing")
        .controller("GeoLocationController", GeoLocationController);

    GeoLocationController.$inject = ['$mdDialog','data'];

    function GeoLocationController($mdDialog,data) {
        var vm = this;
        vm.gps_location = { polygon: [],single_point:{}};
        console.log("data",data);

        vm.cancel = _cancel;
        vm.updateGeoLocation = _updateGeoLocation;
        vm.addEditGeoLocation = _addEditGeoLocation;


        function _cancel() {
            $mdDialog.cancel();
        }

        function _updateGeoLocation(geolocation) {
            $mdDialog.hide("hello");
        }

        function _addEditGeoLocation(geolocation) {
            vm.gps_location.polygon.push(angular.copy(geolocation));
            // $mdDialog.hide("hello");
        }
    }
})(window.angular);
/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("ACATProcessorController", ACATProcessorController);

    ACATProcessorController.$inject = ['LoanManagementService','$scope','$mdDialog','RouteHelpers','$rootScope'];

    function ACATProcessorController(LoanManagementService,$scope,$mdDialog ,RouteHelpers,$rootScope) {
        var vm = this;
        vm.selectedSubsection = {};
        vm.toggle = {};
        vm.accordionToggle = {};
        vm.non_financial_resources = ["training","advisory","technical support","access to inputs"];
        //collapse sub menu to give the UI space

        $rootScope.app.layout.isCollapsed = true;

        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearchText;

        vm.addEditClientACAT = _addEditClientACAT;
        //CLIENT ACAT
        vm.onClientACATClick = _onClientACATClick;
        vm.onSubsectionClick = _onSubsectionClick;
        vm.onAccordionClick = _onAccordionClick;

        vm.addGeoLocation = _addGeoLocation;
        vm.estimatedYieldDetail = _estimatedYieldDetail;

        initialize();

        function initialize() {
            vm.isEditAcat = false;
            vm.visibility = {
                showClientACAT:false,
                showCropACAT:false
            };
            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;

            vm.query = { search:'',   page:1,  per_page:10 };
            vm.months = MONTHS_CONST;
            fetchCropsList();//Fetch Crops first
            callAPI();

        }

        function callAPI() {
            vm.acatCollectionPromise = LoanManagementService
                .GetACATCollections(vm.query).then(
                function (response) {
                    vm.acatCollection = response.data.docs;
                    vm.query.total_docs_count = response.data.total_docs_count;
                },function (error) {
                        console.log("error",error);
                    });
        }



        function _onSubsectionClick(subsection) {
            vm.toggle[subsection._id] = !vm.toggle[subsection._id];
            if (subsection.sub_sections.length === 0) {
                vm.selectedSubsection = subsection;
            }
        }


        function _onAccordionClick(acc) {
            vm.toggle[acc._id] = !vm.toggle[acc._id];
        }


        function _onClientACATClick(acat, ev) {
            vm.visibility.showClientACAT = true;//show client acat
            vm.visibility.showCropACAT = false;
            vm.acats = acat;
            vm.acats.crops = [];
            // set client acat crops for UI purpose
            _.each(acat.ACATs,function (acat) {
                _.each(vm.crops,function (crp) {
                    if(acat.crop._id === crp._id){
                        vm.acats.crops.push(crp);
                    }
                })
            })
        }


        function _paginate(page, pageSize) {
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callAPI();
        }
        function _clearSearchText() {
            vm.query.search = '';
            vm.filter.show = false;
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("search for ",newValue);
            }
        });

        function _addEditClientACAT(clientAcat) {
            vm.visibility.showCropACAT = true;//show client acat
            vm.clientAcat = clientAcat;
            vm.selectedSubsection = vm.clientAcat.sections[0].sub_sections[0].sub_sections[1];
            debugger
        }

        function fetchCropsList() {
            LoanManagementService.GetCrops().then(
                function (response) {
                    vm.crops = response.data.docs;
                }
            )
        }

        function _addGeoLocation(data,ev) {
            $mdDialog.show({
                locals: {data: data },
                templateUrl: RouteHelpers.basepath('loan_management/loan_processing/tabs/acat.geolocation.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: 'GeoLocationController',
                controllerAs: 'vm'
            }).then(function (response) {
                console.log("_addNonFinancialResource ok ",response);
            }, function (response) {
                console.log("_addNonFinancialResource cancel ",response);
            });

        }

        function _estimatedYieldDetail(data, ev) {
            $mdDialog.show({
                locals: {data: data },
                templateUrl: RouteHelpers.basepath('loan_management/loan_processing/tabs/acat.estimated.yield.detail.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                escapeToClose: true,
                controller: 'EstimatedYieldDetailController',
                controllerAs: 'vm'
            }).then(function (response) {
                console.log("EstimatedYieldDetailController ok ",response);
            }, function (response) {
                console.log("EstimatedYieldDetailController cancel ",response);
            });
        }

        $scope.$watch(angular.bind(vm, function () {
            return vm.clientAcat;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("old value  ",oldValue);
                console.log("new value  ",newValue);
            }
        });

    }



})(window.angular);
/**
 * Created by Yonas on 7/2/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("ClientsController", ClientsController);

    ClientsController.$inject = ['LoanManagementService','$scope','blockUI','SharedService','AlertService'];

    function ClientsController(LoanManagementService,$scope,blockUI,SharedService,AlertService) {
        var vm = this;
        vm.clientDetailEdit = _clientDetailEdit;
        vm.paginate = _paginate;
        vm.clearSearchText = _clearSearchText;
        vm.saveClient = _saveClient;
        vm.backToClientList = _backToClientList;



        initialize();

        function initialize() {
            initializeDatePicker();
            vm.visibility = { showClientDetail: false };
            vm.civilStatuses = CIVIL_STATUSES;
            vm.options =   MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
            vm.filter = {show : false};
            vm.pageSizes = MD_TABLE_GLOBAL_SETTINGS.PAGE_SIZES;

            vm.query = { search:'',   page:1,  per_page:10 };
            vm.months = MONTHS_CONST;
            callAPI();
            getBranches();
        }

        function callAPI() {
            var myBlockUI = blockUI.instances.get('clientsBlockUI');
            myBlockUI.start();

            vm.clientsPromise = LoanManagementService.GetClients(vm.query).then(function (response) {
                vm.clients = response.data.docs;
                vm.query.total_pages = response.data.total_pages;
                vm.query.total_docs_count = response.data.total_docs_count;
                myBlockUI.stop();
                console.log("clients",vm.clients);
            });
        }

        function _clientDetailEdit(client,ev) {
            console.log("client detail",client);
            vm.visibility.showClientDetail = true;
            //data set
            vm.selectedClient = client;
            var dt = new Date(client.date_of_birth);
            vm.selectedClient.date_of_birth = dt;
            vm.selectedClient.civil_status = client.civil_status.toLowerCase();
            vm.selectedClient.gender = client.gender.toLowerCase();
            vm.selected_branch = client.branch;
        }

        function _backToClientList() {
            vm.visibility = { showClientDetail: false };
        }
        function _saveClient() {

            if(_.isUndefined(vm.selected_branch)){
                AlertService.showWarning("Warning!","Please Select Branch....");
            }else{
                var myBlockUI = blockUI.instances.get('ClientDetailBlockUI');
                myBlockUI.start();
                var client = vm.selectedClient;
                client.branch = vm.selected_branch._id;
                client.created_by =  undefined;


                if( _.isUndefined(vm.selectedClient._id)){
                    //ADD NEW CLIENT INFORMATION
                    LoanManagementService.SaveClient(client).then(function (response) {
                        console.log("save client",response);
                        myBlockUI.stop();
                        vm.visibility = { showClientDetail: false };
                        AlertService.showSuccess("Saved Successfully","Saved Client information successfully");

                    },function (error) {
                        console.log("save client error",error);
                        myBlockUI.stop();
                        var message = error.data.error.message;
                        AlertService.showError("Failed to save client",message);

                    });
                }else{
                    //UPDATE CLIENT INFORMATION
                    LoanManagementService.UpdateClient(client).then(function (response) {
                        console.log("save client",response);
                        myBlockUI.stop();
                        vm.visibility = { showClientDetail: false };
                        AlertService.showSuccess("Updated Successfully","Updated Client information successfully");
                    },function (error) {
                        console.log("Updated client error",error);
                        myBlockUI.stop();
                        var message = error.data.error.message;
                        AlertService.showError("Failed to update Client",message);

                    });
                }


            }

        }

        function getBranches() {
            SharedService.GetBranches().then(function(response){
                vm.branches = response.data.docs;
                console.log("vm.branches",vm.branches);
            },function(error){
                console.log("error",error);
            });
        }

        /**
         *
         *  Paging parameters and methods
         */
        function _paginate(page, pageSize) {
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callAPI();
        }
        function _clearSearchText() {
            vm.query.search = '';
            vm.filter.show = false;
        }
        function initializeDatePicker() {
            vm.clear = function() {
                vm.dt = null;
            };

            vm.dateOptions = {
                dateDisabled: false,
                formatYear: "yy",
                maxDate: new Date(2020, 5, 22),
                startingDay: 1
            };

            vm.openPopup = function() {
                vm.popup1.opened = true;
            };

            vm.dateFormat = "dd-MMMM-yyyy";
            vm.altInputFormats = ["M!/d!/yyyy"];

            vm.popup1 = {
                opened: false
            };
        }
        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("searching clients for ",newValue);
            }
        });

    }

})(window.angular);
/**
 * Created by Yonas on 7/3/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("LoanApplicationProcessorController", LoanApplicationProcessorController);

    LoanApplicationProcessorController.$inject = ['LoanManagementService','AlertService','$scope','$mdDialog','RouteHelpers','$state'];

    function LoanApplicationProcessorController(LoanManagementService,AlertService,$scope,$mdDialog,RouteHelpers,$state ) {
        var vm = this;
        vm.backToList = _backToList;
        vm.questionValueChanged = questionValueChanged;
        vm.loanApplicationDetail = _loanApplicationDetail;
        vm.saveClientForm = _saveClientForm;

        vm.options = MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
        vm.filter = {show : false};
        vm.pageSizes = [10, 25, 50, 100, 250, 500];

        vm.query = {
            search:'',
            page:1,
            per_page:10
        };
        vm.visibility = { showLoanApplicationDetail: false };

        vm.paginate = function(page, pageSize) {
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callAPI();
        };
        vm.clearSearchText = function () {
            vm.query.search = '';
            vm.filter.show = false;
        };

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("search for ",newValue);
            }
        });

        initialize();

        function _loanApplicationDetail(client_loan_application) {
            var client = client_loan_application.client;

            LoanManagementService.GetClientLoanApplication(client._id).then(function (response) {
                vm.client = response.data;
                vm.visibility.showLoanApplicationDetail = true;
                console.log("vm.client",vm.client);
            });
        }


        function _saveClientForm(client,status) {

            var loan_application = {
                status: status,
                questions:[],
                sections: client.sections
            };
            // "[{"status":"Correct Status is either inprogress, accepted, submitted, rejected or declined_under_review"}]"

            console.log("save status ", client);

            LoanManagementService.SaveClientLoanApplication(loan_application,client._id)
                .then(function (response) {
                    AlertService.showSuccess('Client Loan Application',"Successfully saved Client Loan Application information  with status: " + status);
                    console.log("saved  ", response);
                },function (error) {
                    console.log("error on saving loan application", error);
                    var message = error.data.error.message;
                    AlertService.showError("Error when saving loan application",message);
                });

        }

        function _backToList(type) {
            switch(type){
                case 'LOAN_APPLICATION':
                    vm.visibility.showLoanApplicationDetail = false;
                    callAPI();
                    break;
            }

        }

        function initialize() {
            callAPI();
        }
        function callAPI() {
            vm.loanApplicationPromise = LoanManagementService.GetLoanApplications(vm.query).then(function (response) {
                console.log("loan applications",response);
                vm.loan_applications = response.data.docs;
                vm.query.total_pages = response.data.total_pages;
                vm.query.total_docs_count = response.data.total_docs_count;
            });
        }

        function questionValueChanged(question) {

            var prQues = getPrerequisiteQuestion(question._id);

            _.each(prQues, function(prQue) {
                if (prQue) {
                    var prerequisite = prQue.prerequisites[0];
                    //Set question's show based by comparing current value with expected preq. value
                    prQue.show = (prerequisite.answer === question.values[0]);
                }
            });

        }

        function getPrerequisiteQuestion(questionID) {

            //extract outer questions; if section type, get them from sections
            var questions = vm.client.has_sections ?
                _.reduce(vm.client.sections, function(m, q) {
                    return m.concat(q.questions);
                }, []) :
                vm.client.questions;

            //Get all subquestions
            var subQuestions = _.reduce(questions, function(m, q) {
                return m.concat(q.sub_questions);
            }, []);

            //merge questions with subquestions into a singl array
            var mergedQuestions = _.uniq(_.union(questions, subQuestions), false, _.property('_id'));

            //Search in mergedQuestions
            var prQue = _.filter(mergedQuestions, function(obj) {
                return _.some(obj.prerequisites, { question: questionID });
            });

            return prQue;
        }

    }



})(window.angular);
/**
 * Created by Yonas on 7/3/2018.
 */
(function(angular) {
    'use strict';
    var screenings = {
        bindings: { },
        templateUrl: 'app/views/loan_management/loan_processing/tabs/screenings.html',
        controller: 'ScreeningProcessorController',
        controllerAs:'vm'
    };

    angular.module('app.processing')
        .component('screenings', screenings);
})(window.angular);
/**
 * Created by Yonas on 7/3/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("ScreeningProcessorController", ScreeningProcessorController);

    ScreeningProcessorController.$inject = ['LoanManagementService','AlertService','$scope','$mdDialog','RouteHelpers','$state'];

    function ScreeningProcessorController(LoanManagementService,AlertService,$scope,$mdDialog,RouteHelpers,$state ) {
        var vm = this;
        vm.screeningDetail = _screeningDetail;
        vm.backToList = _backToList;
        vm.saveScreeningForm = _saveScreeningForm;
        vm.questionValueChanged = questionValueChanged;


        vm.options = MD_TABLE_GLOBAL_SETTINGS.OPTIONS;
        vm.filter = {show : false};
        vm.pageSizes = [10, 25, 50, 100, 250, 500];

        vm.query = {
            search:'',
            page:1,
            per_page:10
        };

        vm.paginate = function(page, pageSize) {
            console.log('Scope Page: ' + vm.query.page + ' Scope Limit: ' + vm.query.per_page);
            vm.query.page = page;
            vm.query.per_page = pageSize;
            callAPI();

        };
        vm.clearSearchText = function () {
            vm.query.search = '';
            vm.filter.show = false;
        };
        vm.searchScreening = function () {
            console.log("search text",vm.query.search);
        };

        $scope.$watch(angular.bind(vm, function () {
            return vm.query.search;
        }), function (newValue, oldValue) {
            if (newValue !== oldValue) {
                console.log("search for screening ",newValue);
            }
        });

        vm.visibility = {
            showScreeningDetail:false,
            showClientDetail:true,
            showLoanApplicationDetail:false,
            showACATDetail:false
        };

        initialize();

        function _screeningDetail(screening) {
            vm.selectedScreening = screening;
            console.log("screening detail");
            var client = screening.client;

            LoanManagementService.GetClientScreening(client._id).then(function (response) {
                vm.client = response.data;
                vm.visibility.showScreeningDetail = true;
                console.log("vm.client",vm.client);
            });
        }
        function _backToList(type) {
            switch(type){
                case 'SCREENING':
                    vm.visibility.showScreeningDetail = false;
                    break;
                case 'ACAT_PROCESSOR':
                    vm.visibility.showClientACAT=false;
                    break;
            }
        }
        function _saveScreeningForm(client,screening_status) {

            var status = _.find(SCREENING_STATUS,function (stat) {
                return stat.code === screening_status;
            });
            var screening = {
                status: status.code,
                questions: client.questions
            };

            // console.log("save screening status ", screening);

            LoanManagementService.SaveClientScreening(screening,client._id)
                .then(function (response) {
                    AlertService.showSuccess('Screening',"Successfully saved screening information  with status: " + status.name);
                    console.log("saved screening ", screening);
                },function (error) {
                    var message = error.data.error.message;
                    AlertService.showError("Error when saving screening",message);
                    console.log("error on saving screening ", error);
                });

        }

        function initialize() {
            callAPI();
        }

        function callAPI() {
            vm.screeningPromise = LoanManagementService.GetScreenings(vm.query).then(function (response) {
                vm.screenings = response.data.docs;
                vm.query.total_pages = response.data.total_pages;
                vm.query.total_docs_count = response.data.total_docs_count;
                console.log("screenings info",vm.screenings);
            });
        }
        function questionValueChanged(question) {

            var prQues = getPrerequisiteQuestion(question._id);

            _.each(prQues, function(prQue) {
                if (prQue) {
                    var prerequisite = prQue.prerequisites[0];
                    //Set question's show based by comparing current value with expected preq. value
                    prQue.show = (prerequisite.answer === question.values[0]);
                }
            });

        }
        function getPrerequisiteQuestion(questionID) {

            //extract outer questions; if section type, get them from sections
            var questions = vm.client.has_sections ?
                _.reduce(vm.client.sections, function(m, q) {
                    return m.concat(q.questions);
                }, []) :
                vm.client.questions;

            //Get all subquestions
            var subQuestions = _.reduce(questions, function(m, q) {
                return m.concat(q.sub_questions);
            }, []);

            //merge questions with subquestions into a singl array
            var mergedQuestions = _.uniq(_.union(questions, subQuestions), false, _.property('_id'));

            //Search in mergedQuestions
            var prQue = _.filter(mergedQuestions, function(obj) {
                return _.some(obj.prerequisites, { question: questionID });
            });

            return prQue;
        }

    }



})(window.angular);
(function(angular) {
  'use strict';

    angular.module('app.mfi')
        .controller('CreateBranchController', CreateBranchController);

    CreateBranchController.$inject = ['$mdDialog','items','AlertService','CommonService','MainService','blockUI','SharedService'];

  function CreateBranchController($mdDialog, items,AlertService,CommonService,MainService,blockUI,SharedService) {
      var vm = this;
      vm.cancel = _cancel;
      vm.saveBranch = _saveBranch;
      vm.isEdit = items !== null;
      vm.branch = items !== null?items:null;
      vm.MFIBranchForm = {
          IsnameValid: true,
          IslocationValid: true
      };

      init();

      function GetWoredas() {
          SharedService.GetWoredas().then(function (response) {
              vm.woredas = response.data.docs;
              },function (reason) { console.log("reason",reason) });
      }

      function _saveBranch() {
          vm.IsValidData = CommonService.Validation.ValidateForm(vm.MFIBranchForm, vm.branch);

          if(vm.branchForm.inputEmail.$error.email){
              AlertService.showWarning("Branch validation failed","Please provide valid email address");
          }else if(vm.IsValidData){
              var myBlockUI = blockUI.instances.get('CreateBranchBlockUI')
              myBlockUI.start();
              vm.branch.weredas = _.pluck(vm.branch.selectedWoredas, '_id');
              if(!vm.isEdit){
                  //Save new branch API
                  MainService.CreateBranch(vm.branch).then(
                      function(data) {
                          myBlockUI.stop();
                          $mdDialog.hide();
                          AlertService.showSuccess(
                              "success",
                              "Saved! Branch saved successfully."
                          );
                      },
                      function(response) {
                          myBlockUI.stop();
                          var message = response.data.error.message;
                          console.log("could not be saved", response.data);
                          AlertService.showError(
                              "ERROR",
                              "Could not be saved!, " + message
                          );
                      }
                  )
              }else {

                  var upBranch = {
                      _id: vm.branch._id,
                      name: vm.branch.name,
                      location: vm.branch.location,
                      branch_type: vm.branch.branch_type,
                      opening_date: vm.branch.opening_date
                  };
                  upBranch.weredas = _.pluck(vm.branch.selectedWoredas, '_id');

                      if(!_.isUndefined(vm.branch.email)){
                        upBranch.email =vm.branch.email;
                      }
                      if(_.isString(vm.branch.phone) && vm.branch.phone !== ""){
                        upBranch.phone =vm.branch.phone;
                      }
                      //Update branch api
                      MainService.UpdateBranch(upBranch).then(
                        function(response) {
                            myBlockUI.stop();
                          AlertService.showSuccess(
                            "Branch Updated",
                            "Branch updated successfully."
                          );
                          $mdDialog.hide();
                        },
                        function(response) {
                            myBlockUI.stop();
                            var message = response.data.error.message;
                          console.log("could not be updated", response.data);
                          AlertService.showError(
                              "Could not update Branch",
                              message
                          );
                        }
                      );

              }

          } else {
              AlertService.showError("Failed to create branch","Please fill the required fields and try again.");
          }
      }

      vm.clear = function() {
          vm.dt = null;
      };
      vm.dateOptions = {
          dateDisabled: false,
          formatYear: "yy",
          maxDate: new Date(2020, 5, 22),
          startingDay: 1
      };
      vm.openDatePicker = function() {
          vm.popup1.opened = true;
      };
      vm.format = "dd-MMMM-yyyy";
      vm.altInputFormats = ["d!/M!/yyyy"];
      vm.popup1 = {
          opened: false
      };

      function _cancel() {
          $mdDialog.cancel();
      }

      function init(){
          vm.branchTypes =['Select Branch Type','Satellite office','Rural Service','Regional office','Urban office'];
          GetWoredas();
          if(vm.isEdit)
          {
              var dt =_.isUndefined(vm.branch.opening_date)?undefined: new Date(vm.branch.opening_date);
              vm.branch.opening_date = dt;
              vm.branch.selectedWoredas = vm.branch.weredas;
          }else{
              vm.branch = { branch_type : vm.branchTypes[0] }; //SET DEFAULT SELECT OPTION FOR BRANCH TYPE
          }
      }
  }



})(window.angular);
