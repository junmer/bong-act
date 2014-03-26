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

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getRandomValue() {
        var v = [];
        for (var i = 0; i < 5; i++) {
            v.push(randomInt(30, 99));
        }
        return v;
    }

    function getRandomName() {
        return Math.floor(Math.random() * 2147483648).toString(36);
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

        // var userAttr = {
        //     value: userValue,
        //     name: userOpt.nickName
        // };
        
        var userAttr = {
            value: getRandomValue(),
            name: getRandomName()
        };

        return userAttr;

        // return testData.pop();

    }

    function getUser(callback) {

        // @todo 获取配对用户信息

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

    function getBongPk() {
        getUser(function (users) {

            whenCallback(users, getUserData, render);

        });
    }

    function init() {

        getBongPk();
        
        shake.on('bongpk', getBongPk);

    }

    var exports = {
        init: init
    };

    return exports;
});
