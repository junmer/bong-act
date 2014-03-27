/**
 * @file sound
 */

define(function (require) {

    var AudioFX = require('AudioFX');

    var soundPath = require.toUrl('./sound');

    var soundNames = ['radar', 'radar2', 'yyt', 'coin', 'fb', 'msn', 'zd'];

    var resource = {};

    function getSound(name) {

        name = name || soundNames[Math.floor(Math.random() * soundNames.length + 1) - 1];

        if (!resource[name]) {
            resource[name] = AudioFX(soundPath + '/' + name, {
                formats: ['mp3']
            });
        }
        return resource[name];

    }

    var exports = {};

    exports.supported = AudioFX.supported;

    exports.get = getSound;
    
    return exports;

});