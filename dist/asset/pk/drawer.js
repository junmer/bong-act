define("pk/drawer",function(require){function e(e){var t=[];$.each(e,function(e,a){t.push(a.name)});var a={tooltip:{trigger:"axis"},legend:{x:"center",data:t},polar:[{indicator:[{text:"散步",max:100},{text:"热身",max:100},{text:"健走",max:100},{text:"复合",max:100},{text:"跑步",max:100}],radius:120}],series:[{name:"bong-pk",type:"radar",itemStyle:{normal:{areaStyle:{type:"default"}}},data:e}]};return a}function t(t,_){require(["echarts","echarts/chart/line","echarts/chart/bar","echarts/chart/scatter","echarts/chart/k","echarts/chart/pie","echarts/chart/radar","echarts/chart/force","echarts/chart/chord"],function(s){n&&n.dispose&&n.dispose(),a=s,n=a.init(document.getElementById(t)),n.setOption(e(_),!0)})}var a,n,exports={draw:t};return exports});