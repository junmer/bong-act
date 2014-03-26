/**
 * @file shake
 */

define(function (require) {

    var enableMotion = !!window.DeviceMotionEvent;

    var SHAKE_THRESHOLD = 800;

    var listeners = [];

    function bindEvt(evtName, handler) {

        if (listeners[evtName]) {
            unbindEvt(evtName);
        }

        listeners[evtName] = getShakeHandler(handler);

        window.addEventListener('devicemotion', listeners[evtName], true);

    }

    function unbindEvt(evtName) {

        if (0 === arguments.length) {
            listeners.forEach(function (evtName) {
                window.removeEventListener('devicemotion', listeners[evtName], false);
            });
            return this;
        }

        window.removeEventListener('devicemotion', listeners[evtName], false);

    }

    function getShakeHandler (callback) {

        var last_update = 0;
        var x, y, z, last_x, last_y, last_z;

        return function deviceMotionHandler(eventData) {

            var acceleration = eventData.accelerationIncludingGravity;

            var curTime = new Date().getTime();

            if ((curTime - last_update) > 100) {

                var diffTime = curTime - last_update;
                last_update = curTime;

                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;

                var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

                if (speed > SHAKE_THRESHOLD) {
                    callback();
                }

                last_x = x;
                last_y = y;
                last_z = z;
            }
        };

    }

    var exports = {};

    exports.enable = enableMotion;
    exports.threshold = SHAKE_THRESHOLD;
    exports.on = exports.bind = bindEvt;
    exports.off = exports.unbind = unbindEvt;
    
    return exports;

});