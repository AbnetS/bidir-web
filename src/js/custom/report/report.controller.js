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