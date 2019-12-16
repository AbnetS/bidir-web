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