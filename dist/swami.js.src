/*
 * Swami module and factory
 */

define(['jquery', 'angular', 'es5-shim'], function($, angular) {

    var SwamiFactory= ['$http', function($http) {

        function Builder(mainUrl) {

            var rel   = {},   // relationships
                all   = {},   // all data records
                some  = {},   // some data records
                req   = { loadFrom: {} };   // $http promises

            var Swami = {
                'pk':      'id',
                'model':   Object,
                'before':  angular.noop,
                'success': angular.noop,
                'error':   angular.noop,
                'finally': angular.noop
            };

            Swami.http = function(method, data, init, url) {

                var sendData = ($.inArray(method, ['post', 'put']) != -1);

                if (sendData) {
                    data = data || {};
                    $.extend(data, Swami.dataDefaults.apply(Swami, arguments));
                }

                url = url  || mainUrl;

                config = Swami.configDefaults.apply(Swami, arguments);

                if (Swami.before != angular.noop) {
                    Swami.before.apply(Swami, arguments);
                }

                if (Builder.before != angular.noop) {
                    Builder.before.apply(Swami, arguments);
                }

                var http = sendData ? $http[method](url, data, config) : $http[method](url, config);

                http.result = init || {};

                angular.forEach(['success', 'error', 'finally'], function(event) {
                    if (Swami[event] != angular.noop) {
                        http[event](Swami[event]);
                    }
                    if (Builder[event] != angular.noop) {
                        http[event](Builder[event]);
                    }
                });

                return http;
            };

            Swami.all = function(force) {

                if (!$.isEmptyObject(all) && !force) return all;

                if (req.all && !force) return req.all.result;

                req.all = Swami.http('get', {}, all);

                req.all.success(function(data) {

                    Swami.transformData(data, 'all');

                    $.extend(req.all.result, data);

                    all = req.all.result;
                });

                return req.all.result;
            };

            Swami.first = function(thing) {

                thing = thing || all;

                for (var key in thing) {
                    return key;
                }
            };

            Swami.create = function(attributes, id) {
                var object = new Swami.model();
                $.extend(object, attributes);
                if (id) {
                    some[id] = object;
                }
                return object;
            };

            Swami.find = function(key) {
                if (all[key]) return all[key];
                if (some[key]) return some[key];
                return null;
            };

            Swami.loadFrom = function(url, data, force) {
                var jsonArgs = angular.toJson([url, data]);

                if (req.loadFrom[jsonArgs] && !force) return req.loadFrom[jsonArgs].result;

                var r = req.loadFrom[jsonArgs] = Swami.http('get', data, Swami.create(), url);

                r.success(function(data) {

                    var rels = Object.keys(rel);

                    // TODO: rewrite this as code seems confusing
                    angular.forEach(data, function(field, key) {
                        if ($.inArray(key, rels) == -1) {
                            r.result[key] = field;
                        } else if (rel[key][0] == 'hasOne') {
                            // hasOne
                            r.result[key] = rel[key][1].create(field, field[rel[key][1].pk]);
                        } else if (rel[key][0] == 'hasMany') {
                            // hasMany
                            angular.forEach(field, function(element, id) {
                                field[id] = rel[key][1].create(field[id], id);
                            });
                            r.result[key] = field;
                        }
                    });

                    if (r.result[Swami.pk]) {
                        some[r.result[Swami.pk]] = r.result;
                    }
                });

                return r.result;
            };

            Swami.transformData = function(data, source) {

                var rels = Object.keys(rel);

                // TODO: rewrite this as code seems confusing - integrate with previous transform code
                angular.forEach(data, function(item) {
                    angular.forEach(item, function(field, key) {
                        if ($.inArray(key, rels) != -1) {
                            // hasMany
                            angular.forEach(field, function(element, id) {
                                field[id] = rel[key][1].create(field[id], id);
                                rel[key][1].some[id] = field[id];
                            });
                        }
                    });
                });

            };

            Swami.hasMany = function(attribute, model) {

                rel[attribute] = ['hasMany', model];
            };

            Swami.hasOne = function(attribute, model) {

                rel[attribute] = ['hasOne', model];
            };

            Swami.save = function(object, url) {
                return Swami.http('post', object, {}, url);
            };

            Swami.dataDefaults = function() {
                return {
                    '_token': $('input[name=_token]').val()
                };
            };

            Swami.configDefaults = function() {
                return {
                    'headers': { 'X-Requested-With': 'XMLHttpRequest' }
                };
            };

            Swami.some = some;

            return Swami;
        }

        Builder.before     = function() { $('body').addClass('wait'); };
        Builder.success    = angular.noop;
        Builder.error      = angular.noop;
        Builder['finally'] = function() { $('body').removeClass('wait'); };

        return Builder;
    }];

    return angular.module('Swami', [])

    .factory('Swami', SwamiFactory);

});
