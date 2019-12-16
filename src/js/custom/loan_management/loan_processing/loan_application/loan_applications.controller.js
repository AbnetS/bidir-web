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