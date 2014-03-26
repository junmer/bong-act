/**
 * @file weekly
 */

define(function (require) {

    var instance;

    function spinner(holderid, R1, R2, count, stroke_width, colour) {
        var sectorsCount = count || 12,
            color = colour || "#fff",
            width = stroke_width || 15,
            r1 = Math.min(R1, R2) || 35,
            r2 = Math.max(R1, R2) || 60,
            cx = r2 + width,
            cy = r2 + width,
            r = Raphael(holderid, r2 * 2 + width * 2, r2 * 2 + width * 2),
            
            sectors = [],
            opacity = [],
            beta = 2 * Math.PI / sectorsCount,

            pathParams = {stroke: color, "stroke-width": width, "stroke-linecap": "round"};
            Raphael.getColor.reset();
        for (var i = 0; i < sectorsCount; i++) {
            var alpha = beta * i - Math.PI / 2,
                cos = Math.cos(alpha),
                sin = Math.sin(alpha);
            opacity[i] = 1 / sectorsCount * i;
            sectors[i] = r.path([["M", cx + r1 * cos, cy + r1 * sin], ["L", cx + r2 * cos, cy + r2 * sin]]).attr(pathParams);
            if (color == "rainbow") {
                sectors[i].attr("stroke", Raphael.getColor());
            }
        }
        var tick;
        (function ticker() {
            opacity.unshift(opacity.pop());
            for (var i = 0; i < sectorsCount; i++) {
                sectors[i].attr("opacity", opacity[i]);
            }
            r.safari();
            tick = setTimeout(ticker, 1000 / sectorsCount);
        })();
        return function () {
            clearTimeout(tick);
            r.remove();
        };
    }

    function clearChart() {
        if (instance) {
            instance.clear();
        }
    }

    function drawChart(targetId, data) {

        var r = instance = Raphael(targetId),
            xs = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
            ],
            ys = (function(){ var res=[]; for(var i = 7; i>0;i--){ for(var j=0;j<24;j++){ res.push(i)}}; return res; }()),
            axisy = ['日', '六', '五', '四', '三', '二', '一'],
            axisx = ['12am', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12pm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

        r.dotchart(
            5, 5, 320, 180, 
            xs, ys, data, 
            {
                symbol: 'o', 
                max: 5, 
                heat: true, 
                axis: '0 0 0 0', 
                axisxstep: 23, 
                axisystep: 6, 
                axisxlabels: axisx, 
                axisxtype: ' ', 
                axisytype: ' ', 
                axisylabels: axisy
            }
        );

        return r;
    }

    var exports = {
        spinner: spinner,
        draw: drawChart,
        clear: clearChart
    };

    return exports;

});
