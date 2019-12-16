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