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