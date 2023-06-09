Module.register('MMM-next-episode', {
    defaults: {
        id: '',
        hash_key: '',
        displaySeasonAndEpisode: false,
        ShowThumbnail: false,
        ThumbnailSize: 'small'
    },

    start: function() {
        console.log("MMM-next-episode started!");
        this.shows = [];
        this.qrCode = null;
        this.sendSocketNotification('GET_DATA', this.config);
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("next-episode, Received socket notification: ", notification, " with payload: ", payload);
        if (notification === 'DATA') {
            console.log("next-episode, Received DATA notification with payload: ", payload);
            this.shows = this.processData(payload);
            this.updateDom();
        } else if (notification === 'QR_CODE') {
            console.log("next-episode, Received QR_CODE notification with payload: ", payload);
            this.qrCode = payload;
            this.updateDom();
        }
    },

    processData: function(data) {
        console.log("next-episode, Processing data: ", data);

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data, "text/xml");

        let processedData = [];

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
                    thumbnail: `https://static.next-episode.net/tv-shows-images/${this.config.ThumbnailSize}/${show.showName}.jpg`,
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

        if (this.qrCode) {
            var img = document.createElement('img');
            img.src = this.qrCode;
            wrapper.appendChild(img);
        } else {
            this.shows.forEach((show) => {
                let airDateDays = parseInt(show.airDate.split(' ').filter(word => !isNaN(word))[0]);

                console.log(`next-episode, airDateDays: ${airDateDays}`);

                if (isNaN(airDateDays) || airDateDays <= this.config.maxdays) {
                    console.log("next-episode, Creating DOM element for show: ", show.showName, " with season and episode: S", show.season, "E", show.episode, " and air date: ", show.airDate);
                    var showElement = document.createElement('div');

                    if (this.config.ShowThumbnail) {
                        var img = document.createElement('img');
                        img.src = show.thumbnail;
                        showElement.appendChild(img);
                    }

                    var capitalizedShowName = show.showName.charAt(0).toUpperCase() + show.showName.slice(1);
                    if (this.config.displaySeasonAndEpisode) {
                        showElement.innerHTML += `${capitalizedShowName}: S${show.season}E${show.episode} ${show.airDate}`;
                    } else {
                        showElement.innerHTML += `${capitalizedShowName}: ${show.airDate}`;
                    }
                    wrapper.appendChild(showElement);
                }
            });
        }
        return wrapper;
    }
});
