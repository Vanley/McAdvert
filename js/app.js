/*global $:false */
/*global jQuery:false */
/*global angular:false */
/*global console:false */

var tmpscope = {}; //TODO delete

var app = angular.module("mcAdvert", ['dndLists']);

app.directive('inclDireListItem', function () {
    return {
        scope: {},
        restrict: 'C',
        link: function (scope, element, attrs) {
            scope.list = attrs.list;
            scope.item = angular.fromJson(attrs.item);
        },
        templateUrl: 'inclDireListItem.html'
    };
});

app.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            //   console.log(w[0].innerHeight);
            return {
                'h': w[0].innerHeight
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h) + 'px',
                    'width': (newValue.w) + 'px'
                };
            };
            scope.styleScrollHighOfDiv = function () {
                return {
                    //                    'max-height': (newValue.h * 0.7) + 'px',
                    'min-height': '300px',
                    'height': (newValue.h - 40 - 240) + 'px',
                    'overflow': 'auto'
                };
            };
            scope.styleScrollHighOfWell = function () {
                return {
                    //   "max-height:800px; height:{{windowHeight-100}}px"
                    //                    'max-height': (newValue.h * 0.9) + 'px',
                    'min-height': '500px',
                    'height': (newValue.h - 40) + 'px',
                    'overflow': 'auto'
                };
            };
        }, true);
        w.bind('resize', function () {
            scope.$apply();
        });
    };
});

app.directive('focusMe', function ($timeout) {
    return {
        scope: {
            trigger: '=focusMe'
        },
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value === true) {
                    //console.log('trigger',value);
                    $timeout(function () {
                        element[0].focus();
                        scope.trigger = false;
                    });
                }
            });
        }
    };
});

app.controller("mcAdvertControler", mcAdvertControll);

function mcAdvertControll($scope, $http) {
    $scope.jsonData = [];
    $scope.loadJsonData = function () {
        $http({
                method: 'GET', //TODO czy powinien byc POST (jako bardziej bezpieczny)
                url: 'data/data.json'
            })
            .success(function (data) {
                $scope.jsonData = angular.fromJson(data);

                //  console.log($scope.jsonData);
                $scope.models = {
                    selected: null,
                    //lists: $scope.jsonData
                    template: [{
                        "id": "",
                        "name": "",
                        "ad_account": []
                    }],
                    newAdvertiser: [{
                        "id": "",
                        "name": "",
                        "ad_account": []
                    }],
                    lists: {
                        "aadvertisers": $scope.jsonData.advertisers,
                        "fad_accounts": $scope.jsonData.ad_accounts
                    }
                };
            })
            .error(function (data, status) {
                $scope.jsonData = "error";
            });
    };

    $scope.deleteAdvertiser = function (index) {
        angular.forEach($scope.models.lists.aadvertisers[index].ad_account, function (ad_account) {
            $scope.models.lists.fad_accounts.splice($scope.models.lists.fad_accounts.length, 0, ad_account);
        });
        $scope.models.lists.aadvertisers.splice(index, 1);
    };

    $scope.createAdvertiser = function () {
        console.log($scope.models);
        $scope.models.lists.aadvertisers.push($scope.models.newAdvertiser.shift());
        angular.copy($scope.models.template, $scope.models.newAdvertiser);
    };

    $scope.createAdvertiserFromAdAcc = function () {
        angular.forEach($scope.models.lists.fad_accounts, function (ad_account) {
            $scope.tempCreateAdv = {};
            angular.copy($scope.models.template[0], $scope.tempCreateAdv);
            $scope.tempCreateAdv.ad_account.push(ad_account);
            $scope.tempCreateAdv.name = $scope.tempCreateAdv.ad_account[0].fb_name;
            $scope.models.lists.aadvertisers.push($scope.tempCreateAdv);
        });
        $scope.models.lists.fad_accounts = [];
    };

    $scope.clearJsonData = function () {
        $scope.models.lists.aadvertisers = [];
        $scope.models.lists.fad_accounts = [];
        $scope.models.newAdvertiser = [];
    };

    // Model to JSON 
    $scope.$watch('models', function (model) {
        $scope.modelAsJson = angular.toJson(model, true);
        if (angular.isDefined(model) && angular.isDefined(model.newAdvertiser[0])) {
            if (model.newAdvertiser[0].ad_account.length > 0) {
                //console.log(model.newAdvertiser[0].ad_account);
                if (model.newAdvertiser[0].name === "") {
                    model.newAdvertiser[0].name = model.newAdvertiser[0].ad_account[0].fb_name;
                }
            }
        }
    }, true);

    //  Initialization function
    var init = function () {
        $scope.loadJsonData();
        tmpscope = $scope; //TODO delete
    };
    init();

}