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