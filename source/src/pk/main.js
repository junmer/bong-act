/**
 * @file pk
 */

define(function (require) {

    var config = require('common/config');
    var shake = require('common/shake');
    var moment = require('moment');
    var drawer = require('./drawer');

    var targetId = 'bo-pk-chart';

    function render(data) {

        drawer.draw(targetId, data);

    }

    var testData = [{
        value: [98, 34, 94, 90, 86],
        name: 'dayu'
    }, {
        value: [32, 74, 95, 87, 65],
        name: 'haoyue'
    }];

    function parseApiData(userOpt, data) {

        var _data = data || [];

        var radarData = {
            '2-2': 1,    // 散步
            '3-1': 1,    // 热身
            '3-2': 1,    // 健走
            '3-3': 1,    // 运动
            '3-4': 1     // 跑步
        };

        // LIGHTLYSPORT("热身运动", 1),
        // STRIDE("健走", 2),
        // SPORT("运动", 3),
        // RUN("跑步", 4)

        $.each(_data, function (i, act) {

            if (radarData[act.type + '-' + act.subType]) {
                radarData[act.type + '-' + act.subType] += act.actTime;
            }

        });

        var userValue = [];

        $.each(radarData, function (i, value) {
            userValue.push(Math.ceil(value / 60));
        });

        var userAttr = {
            value: userValue,
            name: userOpt.username
        };

        return testData.pop();

        // return userAttr;

    }

    function getUser(callback) {

        var userList = [
            {username: 18668139821},
            {username: 13396508562}
        ];

        callback(userList);

    }

    function getUserData(userOpt, callback) {

        var url = [
            config['api/sportblocks'],
            moment().format('YYYYMMDD'),
            'jsonp'
        ].join('/');

        $.ajax({
            type: 'GET',
            url: url,
            data: {
                loginName: userOpt.username,
                password: userOpt.password || 'qqqqqq'
            },
            dataType: 'jsonp',
            success: function (res) {

                if (res.code == 200) {
                    callback(parseApiData(userOpt, res.value));
                } 
                else {
                    alert('没找到，再来一次');
                }

            }
        });
    }

    function whenCallback(todolist, task, allCallback) {

        var last = todolist.length;
        var allRes = [];

        $.each(todolist, function (i, item) {

            task(item, function (res) {

                allRes.push(res);

                if (--last === 0) {
                    allCallback(allRes);
                }

            });

        });

    }

    function init() {

        getUser(function (users) {

            whenCallback(users, getUserData, render);

        });

        shake.on('bongpk', function () {
            alert(123123);
        });

    }

    var exports = {
        init: init
    };

    return exports;
});