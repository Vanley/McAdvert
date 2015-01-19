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
                    temporary: [{
                        "id": "",
                        "name": "",
                        "ad_account": []
                    }],
                    lists: {
                        "aadvertisers": $scope.jsonData.advertisers,
                        "fad_accounts": $scope.jsonData.ad_accounts
                    }
                };
                //    console.log($scope.jsonData.ad_accounts);
                //console.log($scope.models);
            })
            .error(function (data, status) {
                $scope.jsonData = "error";
            });
    };

    $scope.deleteAdvertiser = function (index) {
        angular.forEach($scope.models.lists.aadvertisers[index].ad_account, function (ad_account) {
            $scope.models.lists.fad_accounts.splice($scope.models.lists.fad_accounts.length, 0, ad_account)
        });
        $scope.models.lists.aadvertisers.splice(index, 1);
    };

    $scope.createAdvertiser = function () {
        console.log($scope.models)
  //      $scope.models.temporary[0].id = Math.random()*1000;
        $scope.models.lists.aadvertisers.splice($scope.models.lists.aadvertisers.length, 0, $scope.models.temporary[0])
        angular.copy($scope.models.template, $scope.models.temporary);
 
    };

    $scope.clearJsonData = function () {
        $scope.jsonData = {};
        $scope.models = {};
    };

    // Model to JSON 
    $scope.$watch('models', function (model) {
        $scope.modelAsJson = angular.toJson(model, true);
        if (angular.isDefined(model)) {
            if (model.temporary[0].ad_account.length > 0) {
                console.log(model.temporary[0].ad_account);
                if (model.temporary[0].name == "") {
                    model.temporary[0].name = model.temporary[0].ad_account[0].fb_name;
                };
            };
        };
       // console.log($scope.models.temporary[0]);
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