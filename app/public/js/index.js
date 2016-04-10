;(function (window, document, undefined) {

    'use strict';

    var Index = (function () {

        var _formatLabelDaily = function (data) {
            return moment().day(data.label).format('dddd');
        };

        var _dailyParticipants = function () {
            $.get('/analytics/participant/daily', function (data) {
                nv.addGraph(function () {
                    var chart = nv.models.multiBarChart().options({
                        staggerLabels: true,
                        showValues: true,
                        transitionDuration: 350
                    });

                    chart.tooltip.enabled(true);

                    chart.x(_formatLabelDaily);
                    chart.y(function(d) { return d.value });

                    d3.select('#daily-participants')
                        .datum(data)
                        .call(chart);

                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            });
        };

        var _dailyParticipantsPresent = function () {
            $.get('/analytics/participant/daily/present', function (data) {
                nv.addGraph(function () {
                    var chart = nv.models.multiBarChart().options({
                        staggerLabels: true,
                        showValues: true,
                        transitionDuration: 350
                    });

                    chart.tooltip.enabled(true);

                    chart.x(_formatLabelDaily);
                    chart.y(function(d) { return d.value });

                    d3.select('#daily-participants-present')
                        .datum(data)
                        .call(chart);

                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            });
        };

        var _dailyParticipantsAbsent = function () {
            $.get('/analytics/participant/daily/absent', function (data) {
                nv.addGraph(function () {
                    var chart = nv.models.multiBarChart().options({
                        staggerLabels: true,
                        showValues: true,
                        transitionDuration: 350
                    });

                    chart.tooltip.enabled(true);

                    chart.x(_formatLabelDaily);
                    chart.y(function(d) { return d.value });

                    d3.select('#daily-participants-absent')
                        .datum(data)
                        .call(chart);

                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            });
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
                    var chart = nv.models.multiBarChart().options({
                        staggerLabels: true,
                        showValues: true,
                        transitionDuration: 350
                    });

                    chart.tooltip.enabled(true);

                    chart.x(function(d) { return d.label });
                    chart.y(function(d) { return d.value });

                    d3.select('#yearly-registrations')
                        .datum(data)
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
