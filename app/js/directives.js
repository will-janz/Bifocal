'use strict';

// @TODO: Needs normalization

angular.module('OBB.directives', []).
directive('card', function() {
    return {
        restrict: 'E',
        data: '=', // isolated scope.
        templateUrl: 'partials/card.html',
        replace: true
    };
}).directive('twitterTimeline', [function() {
    /*
    *  AngularJS Directive for Twitter's Embedded Timeline with support for custom CSS.
    *  https://github.com/userapp-io/twitter-timeline-angularjs
       The MIT License

       Copyright (c) 2013 Timothy E. Johansson

       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights
       to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       copies of the Software, and to permit persons to whom the Software is
       furnished to do so, subject to the following conditions:

       The above copyright notice and this permission notice shall be included in
       all copies or substantial portions of the Software.
    */
    return {
        restrict: 'A',
        scope: {
            cssUrl: "@",
            autoResize: "="
        },
        link: function (scope, element, attrs) {

            element
                .attr('id', 'twitter-feed')
                .attr("width", "100%" || attrs.width)
                .attr('data-chrome', 'noheader transparent')
                .attr('data-widget-id', attrs.twitterTimeline)
                .addClass('twitter-timeline');

            function render() {
                var body = $('.twitter-timeline').contents().find('body');

                if(scope.cssUrl) {
                    body.append($('<link/>', { rel: 'stylesheet', href: scope.cssUrl, type: 'text/css' }));
                }

                function setHeight() {
                    if(body.find('.stream').length == 0) {
                        setTimeout(setHeight, 100);
                    } else {
                        body.find('.stream').addClass('stream-new').removeClass('stream').css('height', 'auto');
                        $('.twitter-timeline').css('height', (body.height() + 20) + 'px');
                    }
                }

                if(scope.autoResize) {
                    setHeight();
                }
            }

            if(!$('#twitter-wjs').length) {
                $.getScript('https://platform.twitter.com/widgets.js', function() {
                    render();
                    $('.twitter-timeline').load(render);
                });
            }
        }
    };
}]).
directive('tos', function() {
    return {
        restrict: 'A',
        data: '=',
        templateUrl: 'partials/tos.html',
        replace: true
    };
}).
directive('passwordMatch', [function() {
    /* Password confirmation checker 
       http://rogeralsing.com/2013/08/26/angularjs-directive-to-check-that-passwords-match-followup/
       */
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function(scope, elem, attrs, control) {
            var checker = function() {
                // Get the value of the 2nd password
                // @TODO: what does $eval do?
                var P2 = scope.$eval(attrs.ngModel); 

                // Get the value of the 1st password  
                var P1 = scope.$eval(attrs.passwordMatch);
                //console.log("P1: " + P1 + " P2: " + P2);
                
                if(P2 == undefined || P1 == P2) {
                    return true;
                } else {
                    return false;
                }
            };
            scope.$watch(checker, function (n) {

                // Set the form control to valid if both 
                // Passwords are the same, else invalid
                control.$setValidity("unique", n);
                //console.log("Password match: " + n);
            });
        }
    };
}])
.directive('d3Simplescorechart', ['$window', '$timeout', function($window, $timeout){
    return{
        restrict: 'EA',
        scope: {
            data: '=' // enables bi-directional data-binding
        },
        link: function(scope, element, attrs){
            // set width to 100% here to support responsive design.
            var margin = parseInt(attrs.margin) || 20;
            var barHeight = parseInt(attrs.barHeight) || 25;

            var margin = {
                top: margin,
                right: margin,
                bottom: margin,
                left: margin
            };

            var chart = d3.select(element[0])
                .append("svg")
                .append("g")
                .style("width", "100%")
                .attr("height", "100%")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // browser onsize event here
            window.onresize = function(){
                scope.$apply();
            }

            // watcher for resize event
            scope.$watch(function(){
                return angular.element($window)[0].innerWidth;
            },function(){
                scope.render(scope.data);
            });

            // re-render if data changes
            scope.$watch('data', function(newData){
                scope.render(newData);
            }, true);

            scope.render = function(score){
                var data = [100];

                // render the graph
                // remove all previous items before render
                chart.selectAll('*').remove();

                if(!score) {
                    score = 0;
                }

                var width = d3.select(element[0]).node().offsetWidth - margin.left - margin.right;

                //TODO: need to move these out into a css file.
                var color1 = "#d30302";
                var color2 = "#e2320d";
                var color3 = "#df7718";
                var color4 = "#86a414";
                var color5 = "#8aba0b";
                var indicatorColor = "#124b63";

                var x = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {
                        return d;
                    })])
                    .range([0, width]);

                var bar = chart.selectAll("g")
                    .data(data)
                    .enter().append("g")
                    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
                
                // Temporary bugfix
                // This will prevent error spamming and angular crashing from a negative width attribute
                if(width < 0) { 
                    console.error("width is negative, not attempting to render graph.")
                } else {
                    var barWidth = width / 5;
                    bar.append("rect")
                        .attr("width", barWidth - 1)
                        .attr("height", barHeight - 1)
                        .style("fill", color5);

                    bar.append("rect")
                        .attr("x", barWidth)
                        .attr("width", barWidth -1)
                        .attr("height", barHeight - 1)
                        .style("fill", color4);

                    bar.append("rect")
                        .attr("x", barWidth * 2)
                        .attr("width", barWidth - 1)
                        .attr("height", barHeight - 1)
                        .style("fill", color3);

                    bar.append("rect")
                        .attr("x", barWidth * 3)
                        .attr("width", barWidth - 1)
                        .attr("height", barHeight - 1)
                        .style("fill", color2);

                    bar.append("rect")
                        .attr("x", barWidth * 4)
                        .attr("width", barWidth - 1)
                        .attr("height", barHeight - 1)
                        .style("fill", color1);

                    bar.append("circle")
                        .attr("cx", function() { return x(score);})
                        .attr("cy", barHeight - margin.top - margin.bottom + (margin.top / 4))
                        .attr("r", 6)
                        .style("fill", indicatorColor);

                    bar.append("path")
                        .attr("d", d3.svg.symbol().type("triangle-down"))
                        .attr("transform", "translate(" + x(score) + "," + (-5) + ")")
                        .style("fill", indicatorColor);

                    chart.append("text")
                        .attr("transform", "translate(0," + (barHeight  + margin.top / 2) + ")")
                        .text("LOW")
                        .attr("class", "d3SimpleChartText leftText");

                    chart.append("text")
                        .attr("transform", "translate(" + ((width + margin.left ) / 2) + "," + (barHeight  + margin.top / 2) + ")")
                        .text("MEDIUM")
                        .attr("class", "d3SimpleChartText middleText");

                    chart.append("text")
                        .attr("transform", "translate(" + (width - margin.right) +  "," + (barHeight  + margin.top / 2) + ")")
                        .text("HIGH")
                        .attr("class", "d3SimpleChartText rightText");

                    }
                }
            }
        }
    }
])
.directive('d3Detailedscorechart', ['$window', '$timeout', '$location', function($window, $timeout, $location){
    return{
        restrict: 'EA',
        scope: {
            data: '=' // enables bi-directional data-binding
        },
        link: function(scope, element, attrs) {
            // set width to 100% here to support responsive design.
            // console.log("ELEMENT");
            // console.log("------------------------------------------------");
            // console.log(element);
            var d3 = $window.d3
            var margin = parseInt(attrs.margin) || 20;
            var barHeight = parseInt(attrs.barHeight) || 17;

            var margin = {
                top: margin,
                right: margin,
                bottom: margin,
                left: margin
            };

            var chart = d3.select(element[0])
                .append("svg")
                .append("g")
                .style("width", "100%")
                .attr("height", "100%")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
            /// Size keepers?
            // When the browser window is resized
            $window.onresize = function() {
                // It applies stuff.. What does this do?
                scope.$apply();
            }
            
            // watcher for resize event
            scope.$watch(function() {
                return angular.element($window)[0].innerWidth;
            }, function() {
                scope.render(scope.data);
            });
            
            
            // re-render if data changes
            scope.$watch('data', function(newData) {
                scope.render(newData);
            }, true);

            
            // expose the absUrl for consumption by svg using the Html5Location Provider...
            //scope.absUrl = $location.absUrl(); // Is this needed? This isn't referenced anywhere else
            
            /// Render the graph
            scope.render = function(score) {

                // remove all previous items before render
                chart.selectAll('*').remove();

                if(!score) {
                    score = 0;
                }

                var width = d3.select(element[0]).node().offsetWidth - margin.left - margin.right;
                var color1 = "#d30302";
                var color2 = "#e2320d";
                var color3 = "#df7718";
                var color4 = "#86a414";
                var color5 = "#8aba0b";
                var indicatorColor = "#124b63";

                var data = [100];
                var x = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return d; })])
                    .range([0, width]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .ticks(5);

                var bar = chart.selectAll("g")
                    .data(data)
                    .enter().append("g")
                    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

                chart.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + margin.top / 2 + ")")
                    .call(xAxis);
                    
                if(width < 0) { 
                    console.error("width is negative, not attempting to render graph.")
                } else {

                    var barWidth = width / 5;
                    bar.append("rect")
                        .attr("width", barWidth - 1)
                        .attr("height", barHeight - 1)
                        .style("fill", color1);

                    bar.append("rect")
                        .attr("x", barWidth)
                        .attr("width", barWidth -1)
                        .attr("height", barHeight - 1)
                        .style("fill", color2);

                    bar.append("rect")
                        .attr("x", barWidth * 2)
                        .attr("width", barWidth - 1)
                        .attr("height", barHeight - 1)
                        .style("fill", color3);

                    bar.append("rect")
                        .attr("x", barWidth * 3)
                        .attr("width", barWidth - 1)
                        .attr("height", barHeight - 1)
                        .style("fill", color4);

                    bar.append("rect")
                        .attr("x", barWidth * 4)
                        .attr("width", barWidth - 1)
                        .attr("height", barHeight - 1)
                        .style("fill", color5);

                    var y1 = margin.top / 2;

                    bar.append("circle")
                        .attr("cx", function() { return x(score);})
                        .attr("cy", -y1 - 1)
                        .attr("r", 9)
                        .style("fill", indicatorColor);

                    bar.append("path")
                        .attr("d", d3.svg.symbol().type("triangle-down"))
                        .attr("transform", "translate(" + x(score) + "," + (-4) + ")")
                        .style("fill", indicatorColor);

                    bar.append("circle")
                        .attr("cx", function() { return x(score);})
                        .attr("cy", -y1 -1)
                        .attr("r", 7)
                        .style("fill", "white");

                    bar.append("text")
                        .attr("x", function() { return x(score); })
                        .attr("y", -y1 - 1)
                        .attr("dy", ".35em")
                        .text(score)
                        .attr("class", "d3DetailedIndicatorText");
                }
            }
        }
    }
}]);
