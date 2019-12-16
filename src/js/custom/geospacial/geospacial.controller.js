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