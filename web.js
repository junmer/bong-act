var express = require('express');
var app = express();
app.use(express.logger());

var product = process.env.PRODUCT;
if (product) {
    app.use(express.static(__dirname + '/dist'));
} 
else {
    app.use(express.static(__dirname + '/source'));
}

app.get('/api/weekly', function (req, res, next) {

    var result = {
        status: 0,
        statusInfo: '',
        data: {}
    };

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function mockDay(week) {
        var data = [];

        for (var i = 0; i < 24; i++) {
            if (i < 3) {
                data.push(1);
            }
            else if (i < 5) {
                data.push(randomInt(2, 5));
            }
            else if (i < 6) {
                data.push(randomInt(5, 10));
            }
            else if (i < 12) {

                if (week > 4 && i < 9) {
                    data.push(randomInt(2, 10));
                }
                else {
                    data.push(randomInt(10, 100));
                }

            }
            else if (i < 13) {
                data.push(randomInt(10, 20));
            }
            else if (i < 18) {
                data.push(randomInt(10, 90));
            }
            else if (i < 21) {

                if (week > 4 && i < 20) {
                    data.push(randomInt(10, 100));
                }
                else {
                    data.push(randomInt(10, 30));
                }

            }
            else if (i < 23) {
                data.push(randomInt(1, 4));
            }
            else {
                data.push(1);
            }
        }

        return data;
    }

    function mockWeek() {
        var data = [];
        for (var i = 0; i < 7; i++) {
            [].push.apply(data, mockDay(i));
        }
        return data;
    }

    // var data = [290, 300, 204, 255, 348, 383, 334, 217, 114, 33, 44, 26, 41, 39, 52, 17, 13, 2, 0, 2, 5, 6, 64, 153, 294, 313, 195, 280, 365, 392, 340, 184, 87, 35, 43, 55, 53, 79, 49, 19, 6, 1, 0, 1, 1, 10, 50, 181, 246, 246, 220, 249, 355, 373, 332, 233, 85, 54, 28, 33, 45, 72, 54, 28, 5, 5, 0, 1, 2, 3, 58, 167, 206, 245, 194, 207, 334, 290, 261, 160, 61, 28, 11, 26, 33, 46, 36, 5, 6, 0, 0, 0, 0, 0, 0, 9, 9, 10, 7, 10, 14, 3, 3, 7, 0, 3, 4, 4, 6, 28, 24, 3, 5, 0, 0, 0, 0, 0, 0, 4, 3, 4, 4, 3, 4, 13, 10, 7, 2, 3, 6, 1, 9, 33, 32, 6, 2, 1, 3, 0, 0, 4, 40, 128, 212, 263, 202, 248, 307, 306, 284, 222, 79, 39, 26, 33, 40, 61, 54, 17, 3, 0, 0, 0, 3, 7, 70, 199]

    result.data = mockWeek();

    res.jsonp(result);
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});