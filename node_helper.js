const NodeHelper = require("node_helper");
const Log = require("logger");
const qrcode = require("qrcode"); // Import the qrcode library
const uuidv4 = require("uuid").v4; // Import the uuid library

module.exports = NodeHelper.create({
  start () {
    Log.log("next-episode, Node Helper started!");
    this.timer = null; // Declare a variable to hold the interval timer
  },

  stop () {
    // Clear the interval when the module is stopped
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  socketNotificationReceived (notification, payload) {
    Log.debug("next-episode, Received socket notification: ", notification, " with payload: ", payload);
    if (notification === "GET_DATA") {
      this.getData(payload);

      // Clear existing timer if any
      if (this.timer !== null) {
        clearInterval(this.timer);
      }

      // Enforce minimum update interval of 180 minutes
      const updateInterval = payload.updateInterval < 180
        ? 180
        : payload.updateInterval;

      // Set interval to fetch data as per the configuration
      const self = this;
      this.timer = setInterval(() => {
        self.getData(payload);
      }, updateInterval * 60 * 1000); // updateInterval in minutes
    }
  },

  async getData (config) {
    const self = this;
        // Check if id or hash_key is empty
        if (config.id === '' || config.hash_key === '') {
            // Generate unique device ID
            var deviceId = uuidv4();
            // Create URL for QR code
            var url = `https://next-episode.net/api/magicmirror/v1/services.php?service=link&device_id=${deviceId}&username=${config.username}&password=${config.password}`;
            // Generate QR code
      qrcode.toDataURL(url, (err, url) => {
        if (err) {
          Log.log("next-episode, Error generating QR Code: ", err);
          self.sendSocketNotification("ERROR", "Error generating QR Code");
        } else {
          Log.log("next-episode, QR Code: ", url);
          // Send the QR code URL to the frontend so it can be displayed
          self.sendSocketNotification("QR_CODE", url);
        }
      });
    } else {
      const url = `https://next-episode.net/api/magicmirror/v1/services.php?service=next&user_id=${config.id}&hash_key=${config.hash_key}`;
      Log.log("next-episode, Requesting data from: ", url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error fetching data from API.");
        }
        const body = await response.text();
        Log.log("next-episode, Successfully received data from the API");
        self.sendSocketNotification("DATA", body);
      } catch (error) {
        Log.error("next-episode, Error in getData: ", error);
        self.sendSocketNotification("ERROR", "Error fetching data from API.");
      }
    }
  }
});
