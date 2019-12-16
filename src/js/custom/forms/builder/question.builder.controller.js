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