var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
    start: function() {
        console.log("Node Helper started!");
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("Received socket notification: ", notification, " with payload: ", payload);
        if (notification === 'GET_DATA') {
            this.getData(payload);
        }
    },

    getData: function(config) {
        var self = this;
        var url = `https://next-episode.net/api/magicmirror/v1/services.php?service=next&user_id=${config.id}&hash_key=${config.hash_key}`;
        console.log("Requesting data from: ", url);
        request({ url: url, method: 'GET' }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("next-episode, Successfully received data from the API");
                self.sendSocketNotification('DATA', body);
            } else {
                console.error("next-episode, Error in getData: ", error);
                console.log("next-episode, Response status code: ", response && response.statusCode);
            }
        });
    }
});
