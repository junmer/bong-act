/**
 * @file pk drawer
 */

define(function (require) {

    function getOption(data) {

        var arrUserName = [];

        $.each(data, function (i, user) {
            arrUserName.push(user.name);
        });

        var option = {
 
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                x : 'center',
                data: arrUserName
            },
            polar : [
                {
                    indicator : [
                        {text : '散步', max : 100},
                        {text : '热身', max : 100},
                        {text : '健走', max : 100},
                        {text : '复合', max : 100},
                        {text : '跑步', max : 100}
                    ],
                    radius : 120
                }
            ],
            series : [
                {
                    name: 'bong-pk',
                    type: 'radar',
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data : data
                }
            ]
        };
                                
        return option;

    }
                    
    var echarts;
    var myChart;

    function render(targetId, data) {

        require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar',
                'echarts/chart/scatter',
                'echarts/chart/k',
                'echarts/chart/pie',
                'echarts/chart/radar',
                'echarts/chart/force',
                'echarts/chart/chord'
            ],
            function (ec) {

                if (myChart && myChart.dispose) {
                    myChart.dispose();
                }

                echarts = ec;

                myChart = echarts.init(
                    document.getElementById(targetId)
                );

                myChart.setOption(getOption(data), true);

            }
        );

    }

    var exports = {
        draw: render
    };

    return exports;
});
