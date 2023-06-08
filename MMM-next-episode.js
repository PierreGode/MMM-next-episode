Module.register('MMM-next-episode', {
    defaults: {
        id: '',
        hash_key: '',
        displaySeasonAndEpisode: false
    },

    start: function() {
        console.log("MMM-next-episode started!");
        this.shows = [];
        this.sendSocketNotification('GET_DATA', this.config);
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("next-episode, Received socket notification: ", notification, " with payload: ", payload);
        if (notification === 'DATA') {
            console.log("next-episode, Received DATA notification with payload: ", payload);
            this.shows = this.processData(payload);
            this.updateDom();
        }
    },

    processData: function(data) {
        console.log("next-episode, Processing data: ", data);
    
        // Parse the XML data
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data, "text/xml");

        let processedData = [];

        // Get all the result elements
        let results = xmlDoc.getElementsByTagName('result');
        for(let i=0; i<results.length; i++){
            try {
                const result = results[i];
                const showData = {
                    id: result.getElementsByTagName('showid')[0].textContent,
                    time: result.getElementsByTagName('hour')[0].textContent,
                    season: result.getElementsByTagName('seasonNumber')[0].textContent,
                    episode: result.getElementsByTagName('episodeNumber')[0].textContent,
                    showName: result.getElementsByTagName('imageUrl')[0].textContent.split('/').pop().split('?')[0].replace('.jpg', ''),
                    airDate: result.getElementsByTagName('countdown')[0].textContent
                };
                console.log("next-episode, Processed show data: ", showData);
                processedData.push(showData);
            } catch (error) {
                console.error("next-episode, Error occurred when processing data: ", error);
            }
        }
        console.log("next-episode, Final processed data: ", processedData);
        return processedData;
    },

getDom: function() {
    console.log("next-episode, Creating DOM elements");
    var wrapper = document.createElement('div');
    this.shows.forEach((show) => {
        console.log("next-episode, Creating DOM element for show: ", show.showName, " with season and episode: S", show.season, "E", show.episode, " and air date: ", show.airDate);
        var showElement = document.createElement('div');
        var capitalizedShowName = show.showName.charAt(0).toUpperCase() + show.showName.slice(1);
        if (this.config.displaySeasonAndEpisode) {
            showElement.innerHTML = `${capitalizedShowName}: S${show.season}E${show.episode} ${show.airDate}`;
        } else {
            showElement.innerHTML = `${capitalizedShowName}: ${show.airDate}`;
        }
        wrapper.appendChild(showElement);
    });
    return wrapper;
}
});
