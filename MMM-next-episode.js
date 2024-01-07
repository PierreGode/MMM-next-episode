/* global Module Log */
Module.register("MMM-next-episode", {
  defaults: {
    id: "",
    hash_key: "",
    displaySeasonAndEpisode: false,
    maxdays: 7,
    ShowThumbnail: true,
    ThumbnailSize: "medium"
  },

  getStyles () {
    return ["MMM-next-episode.css"];
  },

  start () {
    Log.log("MMM-next-episode started!");
    this.shows = [];
    this.qrCode = null;
    this.sendSocketNotification("GET_DATA", this.config);
  },

  socketNotificationReceived (notification, payload) {
    Log.debug("next-episode, Received socket notification: ", notification, " with payload: ", payload);
    if (notification === "DATA") {
      Log.log("next-episode, Received DATA notification with payload: ", payload);
      this.shows = this.processData(payload);
      this.updateDom();
    } else if (notification === "QR_CODE") {
      Log.log("next-episode, Received QR_CODE notification with payload: ", payload);
      this.qrCode = payload;
      this.updateDom();
    }
  },

  processData (data) {
    Log.log("next-episode, Processing data: ", data);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");

    const processedData = [];

    const sizeMapping = {
      small: "little",
      medium: "thumb",
      large: "big"
    };

    const results = xmlDoc.getElementsByTagName("result");
    for (let i = 0; i < results.length; i++) {
      try {
        const result = results[i];
        const showData = {
          id: result.getElementsByTagName("showid")[0].textContent,
          time: result.getElementsByTagName("hour")[0].textContent,
          season: result.getElementsByTagName("seasonNumber")[0].textContent,
          episode: result.getElementsByTagName("episodeNumber")[0].textContent,
          showName: result.getElementsByTagName("imageUrl")[0].textContent.split("/").pop()
            .split("?")[0].replace(".jpg", ""),
          thumbnail: `https://static.next-episode.net/tv-shows-images/${sizeMapping[this.config.ThumbnailSize]}/${result.getElementsByTagName("imageUrl")[0].textContent.split("/").pop()
            .split("?")[0].replace(".jpg", "")}.jpg`,
          airDate: result.getElementsByTagName("countdown")[0].textContent
        };
        Log.log("next-episode, Processed show data: ", showData);
        processedData.push(showData);
      } catch (error) {
        Log.error("next-episode, Error occurred when processing data: ", error);
      }
    }
    Log.log("next-episode, Final processed data: ", processedData);
    return processedData;
  },

  getDom () {
    Log.log("next-episode, Creating DOM elements");
    const wrapper = document.createElement("div");
    wrapper.className = "MMM-next-episode";

    if (this.qrCode) {
      const img = document.createElement("img");
      img.src = this.qrCode;
      wrapper.appendChild(img);
    } else {
      this.shows.forEach((show) => {
        const airDateDays = parseInt(show.airDate.split(" ").filter((word) => !isNaN(word))[0], 10);

        Log.log(`next-episode, airDateDays: ${airDateDays}`);

        if (isNaN(airDateDays) || airDateDays <= this.config.maxdays) {
          Log.log("next-episode, Creating DOM element for show: ", show.showName, " with season and episode: S", show.season, "E", show.episode, " and air date: ", show.airDate);
          const showElement = document.createElement("div");
          showElement.className = "show-element";

          if (this.config.ShowThumbnail) {
            const img = document.createElement("img");
            img.src = show.thumbnail;
            img.className = "show-thumbnail";
            showElement.appendChild(img);
          }

          const capitalizedShowName = show.showName.charAt(0).toUpperCase() + show.showName.slice(1);
          const showDetails = document.createElement("div");
          showDetails.className = this.config.ShowThumbnail
            ? "show-details thumbnail-enabled"
            : "show-details thumbnail-disabled";

          const showNameElement = document.createElement("div");
          showNameElement.className = "show-name";
          showNameElement.innerHTML = capitalizedShowName;
          showDetails.appendChild(showNameElement);

          if (this.config.displaySeasonAndEpisode) {
            const episodeElement = document.createElement("div");
            episodeElement.className = "show-episode";
            episodeElement.innerHTML = `S${show.season}E${show.episode}`;
            showDetails.appendChild(episodeElement);
          }

          const airDateElement = document.createElement("div");
          airDateElement.className = "show-airdate";
          airDateElement.innerHTML = show.airDate;
          showDetails.appendChild(airDateElement);

          showElement.appendChild(showDetails);
          wrapper.appendChild(showElement);
        }
      });
    }
    return wrapper;
  }
});
// @Created By Pierre Gode
