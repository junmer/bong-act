/**
 * @file weekly main
 */

define(function (require) {

    var conifg = require('common/config');
    var drawer = require('./drawer');

    function init(targetId) {

        var removeSpinner = drawer.spinner(targetId, 70, 120, 12, 25, "#fff");

        $.getJSON(conifg['api/weekly'], function (res) {

            removeSpinner();

            if (+res.status === 0) {
                drawer.draw(targetId, res.data);                
            }
            else {
                alert('获取数据异常，请稍后重试');
            }


        });
    }

    var exports = {
        init: init
    };

    return exports;
});
