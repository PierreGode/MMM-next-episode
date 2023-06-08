var NodeHelper = require('node_helper');
var request = require('request');
var qrcode = require('qrcode');  // Import the qrcode library
var uuidv4 = require('uuid').v4; // Import the uuid library

module.exports = NodeHelper.create({
    start: function() {
        console.log("next-episode, Node Helper started!");
        this.timer = null; // Declare a variable to hold the interval timer
    },

    stop: function() {
        // Clear the interval when the module is stopped
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("next-episode, Received socket notification: ", notification, " with payload: ", payload);
        if (notification === 'GET_DATA') {
            this.getData(payload);

            // Clear existing timer if any
            if (this.timer !== null) {
                clearInterval(this.timer);
            }

            // Set interval to fetch data every 24 hours
            var self = this;
            this.timer = setInterval(function() {
                self.getData(payload);
            }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
        }
    },

    getData: function(config) {
        var self = this;
        // Check if id and hash_key are empty
        if(config.id === '' && config.hash_key === '') {
            // Generate unique device ID
            var deviceId = uuidv4();
            // Create URL for QR code
            var url = `https://next-episode.net/api/magicmirror/v1/services.php?service=link&device_id=${deviceId}&username=USERNAME&password=PASSWORD`;
            // Generate QR code
            qrcode.toDataURL(url, function (err, url) {
                if (err) {
                    console.log("next-episode, Error generating QR Code: ", err);
                } else {
                    console.log("next-episode, QR Code: ", url);
                    // Send the QR code URL to the frontend so it can be displayed
                    self.sendSocketNotification('QR_CODE', url);
                }
            });
        } else {
            var url = `https://next-episode.net/api/magicmirror/v1/services.php?service=next&user_id=${config.id}&hash_key=${config.hash_key}`;
            console.log("next-episode, Requesting data from: ", url);
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
    }
});
