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