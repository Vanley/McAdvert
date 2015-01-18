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


app.controller("mcAdvertControler", mcAdvertControll);

function mcAdvertControll($scope, $http) {
    $scope.jsonData = [];
    $scope.temp = [];


    $scope.loadJsonData = function () {

        $http({
            method: 'GET', //TODO czy powinien byc POST (jako bardziej bezpieczny)
            url: 'data/data.json'
        })
            .success(function (data) {
                $scope.temp = data;
                $scope.jsonData = angular.fromJson(data);

                //______________________________________



                console.log($scope.jsonData);
                $scope.models = {
                    selected: null,
                    //lists: $scope.jsonData
                    lists: {
                        "advertisers": $scope.jsonData.advertisers,
                        "ad_accounts": $scope.jsonData.ad_accounts
                    }
                };

                console.log($scope.jsonData.ad_accounts);

            })
            .error(function (data, status) {
                $scope.jsonData = "error";
            });
    };


    $scope.clearJsonData = function () {
        $scope.temp = $scope.jsonData;
        $scope.jsonData = [];
        $scope.models = {};
    };

    $scope.$watchCollection('models.lists.ad_accounts', function (model) {
        console.log($scope.models.lists.ad_accounts);
    });

    // Model to JSON 
    $scope.$watch('models', function (model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);


    var sort_by = function (field, reverse, primer) {

        var key = primer ?
            function (x) {
                return primer(x[field]);
            } :
            function (x) {
                return x[field];
            };

        reverse = [-1, 1][+!!reverse];

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        };
    };

    //  Initialization function
    var init = function () {
        $scope.loadJsonData();
        tmpscope = $scope; //TODO delete

    };
    init();

}

//
//form watch 
//http://www.w3schools.com/angular/angular_bootstrap.asp
//

