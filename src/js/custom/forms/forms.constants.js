/**
 * Created by Yoni on 2/9/2018.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.forms')
        .constant('MW_QUESTION_TYPES', [
            {name:'Fill In Blank',url:'fib',code:'FILL_IN_BLANK',type:'text'},
            {name:'Yes/No Question',code:'YES_NO',url:'yn',type:'yn',options:['Yes','No']},
            {name:'Multiple Choice',url:'mc',code:'MULTIPLE_CHOICE',options:[],type:'checkbox'},
            {name:'Single Choice',url:'sc',code:'SINGLE_CHOICE',options:[],type:'select'},
            {name:'Grouped Question',url:'GROUPED',code:'GROUPED',type:'grouped'}])
        .constant('MW_FORM_TYPES', [
            {name:'ACAT',code:'ACAT'},
            {name:'Loan Application',code:'LOAN_APPLICATION'},
            {name:'Screening',code:'SCREENING'},
            {name:'Group Application',code:'GROUP_APPLICATION'},
            {name:'Test',code:'TEST'}]);
})(window.angular);