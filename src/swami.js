/*
 * Swami module and factory
 */

define(['jquery', 'angular'], function($, angular) { 

    var SwamiFactory= ['$http', function($http) {

        return function(url) {

            var Swami = {};

            Swami.all = function() {
                var http = $http.get(url);
                http.result = {};
                http.then(function(response) {
                    $.extend(http.result, response.data);
                });
                return http.result;
            };

            return Swami;
        };

    }];

    return angular.module('Swami', [])

    .factory('Swami', SwamiFactory);

});
