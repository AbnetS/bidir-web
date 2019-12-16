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