var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
    start: function() {},

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_DATA') {
            this.getData(payload);
        }
    },

    getData: function(config) {
        var self = this;
        var url = `https://next-episode.net/api/magicmirror/v1/services.php?service=next&user_id=${config.id}&hash_key=${config.hash_key}`;
        request({ url: url, method: 'GET' }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                self.sendSocketNotification('DATA', body);
            }
        });
    }
});
