/**
 * Created by Yoni on 12/30/2017.
 */
//Directive

(function(angular) {

    'use strict';

    angular.module('app.common')
        .directive('userpermission', function(PermissionService) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    scope.$watch(attrs.userpermission, function(value) {
                        var permission = value;
                        var hasPermission = false;
                        if (_.isString(permission)) {
                            hasPermission = PermissionService.hasThisPermission(permission);
                        } else if (_.isArray(permission)) {
                            hasPermission = PermissionService.hasThesePermissions(permission); //multiple permissions
                        }

                        toggleVisibility(hasPermission);
                    });

                    function toggleVisibility(hasPermission) {
                        if (hasPermission) {
                            element.show();
                        } else {
                            element.hide();
                        }
                    }
                }
            };
        })
        // Text Editor template directive
        .directive('editor', function() {
            return {
                restrict: 'E',
                template: "<div ng-show='vm.editorEnabledForElement === (radioOption);'>" +
                    "<input class='editableTextInput' type='text' ng-model='vm.text' ng-required='true' " +
                    "show-focus='vm.editorEnabledForElement === (radioOption);' " +
                    "keypress-enter='vm.saveOption(radioOption, vm.text)' " +
                    "ng-blur='vm.saveOption(radioOption, vm.text)'" +
                    " show-focus select-on-click >" +
                    "</div>"
            };
        })
        .directive('keypressEnter', function() {
            return function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        scope.$apply(function() {
                            scope.$eval(attrs.keypressEnter);
                        });
                        console.log("Pressed enter.");
                        event.preventDefault();
                    }
                });
            };
        })
        // Put focus on element when event is triggered.
        // https://coderwall.com/p/a41lwa/angularjs-auto-focus-into-input-field-when-ng-show-event-is-triggered

        .directive('eventFocus', function(focus) {
            return function(scope, elem, attr) {
                elem.on(attr.eventFocus, function() {
                    focus(attr.eventFocusId);
                });

                // // Removes bound events in the element itself
                // // when the scope is destroyed
                // scope.$on('$destroy', function() {
                //     element.off(attr.eventFocus);
                // });
            };
        })
        // Select text on focus.
        // http://stackoverflow.com/questions/14995884/select-text-on-input-focus
        .directive('selectOnClick', ['$window', function($window) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('focus', function() {
                        if (!$window.getSelection().toString()) {
                            // Required for mobile Safari
                            this.setSelectionRange(0, this.value.length)
                        }
                    });
                }
            };
        }])

        .directive('questionRow', function($timeout, $compile, $filter) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    questionRowData: '=questionRowData',
                    layoutData: '=layoutData',
                    parentRowNo: '=parentRowNo',
                    rowNo: '=rowNo',
                    isSubquestion: '=isSubquestion',
                    isReadonly: '=isReadonly',
                    valueChanged: '='
                },
                link: function($scope, element, attrs) {
                    $scope.$watch('questionRowData.values', function(newValue) {
                        if (!_.isEmpty(newValue) && $scope.questionRowData.type !== QUESTION_TYPE.FILL_IN_BLANK && !_.isUndefined($scope.valueChanged)) {
                            $scope.valueChanged($scope.questionRowData);
                        }
                    }, true);
                },
                templateUrl: 'app/views/common/directives/templates/question_row.tmpl.html'
            };
        })
        .directive('questionRowWithAnswer', function($timeout, $compile, $filter) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    questionRowData: '=questionRowData',
                    layoutData: '=layoutData',
                    parentRowNo: '=parentRowNo',
                    rowNo: '=rowNo',
                    isSubquestion: '=isSubquestion'
                },
                link: function($scope, element, attrs) {},
                templateUrl: 'app/views/common/directives/templates/question_row_with_answer.tmpl.html'
            };
        })
        .directive('question', function($timeout, $compile, $filter) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    questionData: '=questionData',
                    isReadonly: '=isReadonly'
                },
                link: function($scope, element, attrs) {

                    $scope.$watch('questionData', function(questionData) {
                        if (questionData) {
                            var questionType = questionData.type.toLowerCase();


                            switch (questionType) {
                                case "fill_in_blank":
                                {
                                    break;
                                }
                                case "yes_no":
                                {
                                    questionType = "single_choice";
                                    break;
                                }
                            }

                            //Parse values
                            if (questionData.validation_factor === 'NUMERIC' || questionData.validation_factor === 'ALPHANUMERIC') {
                                questionData.values = _.map(questionData.values, function(val) {
                                    return parseFloat(val);
                                });
                            }

                            $scope.dynamicTemplateUrl = 'app/views/common/directives/templates/' + questionType + '.tmpl.html';
                        }
                    });

                    //Helping function
                    //Multi-select
                    $scope.toggle = function(item, list) {
                        var idx = list.indexOf(item);
                        if (idx > -1) {
                            list.splice(idx, 1);
                        } else {
                            list.push(item);
                        }
                    };

                    $scope.exists = function(item, list) {
                        return list.indexOf(item) > -1;
                    };
                },

                template: '<ng-include src="dynamicTemplateUrl"></ng-include>'
            };
        })
        .directive('costList', function($timeout, $compile, $filter) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    costListData: '=costListData'
                },
                link: function($scope, element, attrs) {

                    $scope.$watch(watchExpected, function(oldvalue) {
                        $scope.costListData.estimated.total_price = $scope.costListData.estimated.value * $scope.costListData.estimated.unit_price;
                    }, true);

                    $scope.$watch(watchActual, function(oldvalue) {
                        $scope.costListData.achieved.total_price = $scope.costListData.achieved.value * $scope.costListData.achieved.unit_price;
                    }, true);

                    function watchExpected() {
                        return watchProperties($scope.costListData.estimated, ['cash_flow', 'total_price']);
                    }

                    function watchActual() {
                        return watchProperties($scope.costListData.achieved, ['cash_flow', 'total_price']);
                    }

                    function watchProperties(obj, keys) {
                        return Object.keys(obj).filter(function(key) {
                            return keys.indexOf(key) === -1;
                        }).reduce(function(result, key) {
                            result[key] = obj[key];
                            return result;
                        }, {});
                    }

                    $scope.monthes = [{
                        "name": "January",
                        "short": "jan"
                    }, {
                        "name": "February",
                        "short": "feb"
                    }, {
                        "name": "March",
                        "short": "mar"
                    }, {
                        "name": "April",
                        "short": "apr"
                    }, {
                        "name": "May",
                        "short": "may"
                    }, {
                        "name": "June",
                        "short": "june"
                    }, {
                        "name": "July",
                        "short": "july"
                    }, {
                        "name": "August",
                        "short": "aug"
                    }, {
                        "name": "September",
                        "short": "sep"
                    }, {
                        "name": "October",
                        "short": "oct"
                    }, {
                        "name": "November",
                        "short": "nov"
                    }, {
                        "name": "December",
                        "short": "dec",
                    }];
                },
                templateUrl: 'app/views/common/directives/templates/cost_list.tmpl.html'
            };
        })
        .directive('reportParameter',function($timeout, $compile, $filter,$http) {
            var baseUrl = 'http://api.test.bidir.gebeya.co/';
            return {
                restrict: 'E',
                scope: {
                    parameters: '=parameters'
                },
                link: function($scope, element, attrs) {

                    $scope.searchParameters = function(parameter,searchTerm){
                        if(parameter.type === 'SEARCH' && searchTerm !== ""){
                            console.log("searching....",searchTerm);

                            if(searchTerm.length >= 3){
                                let url = baseUrl+'reports/'+parameter.get_from + '?search=' + searchTerm;
                                $http.get(url).then(function (response) {
                                    parameter.values = response.data;
                                });
                            }

                        }
                    };

                },
                templateUrl: 'app/views/common/directives/templates/report.parameter.tmpl.html'
            };
        })
        .directive('formWizard', formWizard)

         formWizard.$inject = ['$parse'];

         function formWizard ($parse) {
                var directive = {
                    link: link,
                    controller:  function ($scope) {
                        $scope.wizardValidate = function(formName) {
                            if(angular.isDefined($scope[formName] )) {
                                // Set submitted to perform validation
                                $scope[formName].$setSubmitted(true);
                                // return valid status of the subform
                                return $scope[formName].$valid;
                            }
                        }
                    },
                    restrict: 'A',
                    scope: true
                };
                return directive;

                function link(scope, element, attrs) {
                    var validate = $parse(attrs.validateSteps)(scope),
                        wiz = new Wizard(attrs.steps, !!validate, element);
                    scope.wizard = wiz.init();
                }

                function Wizard (quantity, validate, element) {

                    var self = this;
                    self.quantity = parseInt(quantity,10);
                    self.validate = validate;
                    self.element = element;

                    self.init = function() {
                        self.createsteps(self.quantity);
                        self.go(1); // always start at fist step
                        return self;
                    };

                    self.go = function(step) {

                        if ( angular.isDefined(self.steps[step]) ) {
                            if(self.validate && step !== 1) { // no need to validate when move to first state
                                var scope = self.element.scope();
                                if(typeof scope.wizardValidate === 'function') {
                                    var form = $(self.element).children().children('div').eq(step - 2).children('[ng-form]');
                                    if ( ! scope.wizardValidate(form.attr('ng-form')))
                                        return false;
                                }
                            }

                            self.cleanall();
                            self.steps[step] = true;
                        }
                    };

                    self.active = function(step) {
                        return !!self.steps[step];
                    };

                    self.cleanall = function() {
                        for(var i in self.steps){
                            self.steps[i] = false;
                        }
                    };

                    self.createsteps = function(q) {
                        self.steps = [];
                        for(var i = 1; i <= q; i++) self.steps[i] = false;
                    };

                }

            }



})(window.angular);
