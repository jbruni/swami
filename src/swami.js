/*
 * Swami module and factory
 */

define(['jquery', 'angular'], function($, angular) { 

    var SwamiFactory= ['$http', function($http) {

        return function(url) {

            var Swami = {};

            var all = {};

            Swami.all = function() {
                var http = $http.get(url);
                http.result = {};
                http.then(function(response) {
                    $.extend(http.result, response.data);
                    all = http.result;
                });
                return http.result;
            };

            Swami.first = function(thing) {
                thing = thing || all;
                for (var key in thing) {
                    return key;
                }
            };

            return Swami;
        };

    }];

    return angular.module('Swami', [])

    .factory('Swami', SwamiFactory);

});
