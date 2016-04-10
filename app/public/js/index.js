;(function (window, document, undefined) {

    'use strict';

    var Index = (function () {

        var _getMultiBarChart = function (url, select) {
            $.get(url, function (data) {
                nv.addGraph(function () {
                    var chart = nv.models.multiBarChart().options({
                        staggerLabels: true,
                        showValues: true,
                        transitionDuration: 350
                    });

                    chart.tooltip.enabled(true);

                    chart.x(function(d) { return moment().day(d.label).format('dddd') });
                    chart.y(function(d) { return d.value });

                    d3.select(select)
                        .datum(data)
                        .call(chart);

                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            });
        }

        var _dailyParticipants = function () {
            _getMultiBarChart('/analytics/participant/daily', '#daily-participants');
        };

        var _dailyParticipantsPresent = function () {
            _getMultiBarChart('/analytics/participant/daily/present', '#daily-participants-present');
        };

        var _dailyParticipantsAbsent = function () {
            _getMultiBarChart('/analytics/participant/daily/absent', '#daily-participants-absent');
        };

        var _yearlyParticipants = function () {
            $.get('/analytics/participant/yearly', function (data) {
                nv.addGraph(function () {
                    var chart = nv.models.discreteBarChart().options({
                        staggerLabels: true,
                        showValues: true,
                        transitionDuration: 350
                    });

                    chart.tooltip.enabled(true);

                    chart.x(function(d) { return d.label });
                    chart.y(function(d) { return d.value });

                    d3.select('#yearly-participants')
                        .datum([
                            {
                                key: 'yearly-participants',
                                values: data
                            }
                        ])
                        .call(chart);

                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            });
        };

        var _yearlyRegistrations = function () {
            $.get('/analytics/participant/yearly/registration', function (data) {
                nv.addGraph(function () {
                    var chart = nv.models.discreteBarChart().options({
                        staggerLabels: true,
                        showValues: true,
                        transitionDuration: 350
                    });

                    chart.tooltip.enabled(true);

                    chart.x(function(d) { return d.label });
                    chart.y(function(d) { return d.value });

                    d3.select('#yearly-registrations')
                        .datum([
                            {
                                key: 'yearly-registrations',
                                values: data
                            }
                        ])
                        .call(chart);

                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            });
        };

        return {

            init : function () {
                _yearlyRegistrations();
                _yearlyParticipants();
                _dailyParticipants();
                _dailyParticipantsPresent();
                _dailyParticipantsAbsent();
            }

        }

    })();

    Index.init();

})(window, document);
