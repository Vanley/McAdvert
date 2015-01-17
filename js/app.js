/*global $:false */
/*global jQuery:false */
/*global angular:false */

var app = angular.module("mcAdvert", ['dndLists']);



app.controller("mcAdvertControler", mcAdvertControll);


function mcAdvertControll($scope, $http) {
    $scope.jsonData = [];
    $scope.temp = [];


    $scope.loadJsonData = function () {

        $http({
            method: 'GET', //TODO czy powinien byc POST (bardziej bezpieczny)
            url: 'data/data.json'
        })
            .success(function (data) {
                $scope.temp = data;
                $scope.jsonData = angular.fromJson(data);

                //______________________________________



                console.log($scope.jsonData);
                $scope.models = {
                    selected: null,
                    lists: $scope.jsonData
                    // lists: $scope.jsonData.ad_accounts
                    /*lists: {
                        "Available Advertisers": $scope.jsonData.advertisers,
                        "Available Add Accounts": $scope.jsonData.ad_accounts
                    }*/


                };
                console.log($scope.jsonData.ad_accounts);
                // Generate initial model
                //    for (var i = 1; i <= 3; ++i) {
                //        $scope.models.lists.A.push({
                //            label: "Item A" + i
                //        });
                //        $scope.models.lists.B.push({
                //            label: "Item B" + i
                //        });
                //    }
                // $scope.models.lists.A = angular.toJson($scope.temp);
                //$scope.models = angular.toJson($scope.temp);
                // $scope.models.lists.A = angular.toJson($scope.data);
                // $scope.temp = angular.toJson($scope.data);




                //______________________________________


            })
            .error(function (data, status) {
                $scope.jsonData = "error";
            });
    };


    $scope.clearJsonData = function () {
        $scope.temp = $scope.jsonData;
        $scope.jsonData = [];
    };



    // Model to JSON 
    $scope.$watch('models', function (model) {

        console.log($scope.models.lists.ad_accounts);

  //      $scope.models.lists.ad_accounts.sort(sort_by('id', true, parseInt));

        // $scope.sortObj(model.lists.ad_accounts, "id");

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
    
    


    var init = function () {
        $scope.loadJsonData();


    };
    init();

}

//
//form watch 
//http://www.w3schools.com/angular/angular_bootstrap.asp
//


//init functions
//function init() {}
//$(init);