Module.register('MMM-next-episode', {
    defaults: {
        id: '',
        hash_key: ''
    },

    start: function() {
        console.log("MMM-next-episode started!");
        this.shows = [];
        this.sendSocketNotification('GET_DATA', this.config);
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("Received socket notification: ", notification, " with payload: ", payload);
        if (notification === 'DATA') {
            console.log("Received DATA notification with payload: ", payload);
            this.shows = this.processData(payload);
            this.updateDom();
        }
    },

    processData: function(data) {
        console.log("Processing data: ", data);
        let dataArr = data.trim().split('\n');
        let processedData = [];
        for(let i=0; i<dataArr.length; i++){
            try {
                let showDataArr = dataArr[i].trim().split(' ');
                const showData = {
                    id: showDataArr[0],
                    time: showDataArr[1],
                    season: showDataArr[2],
                    episode: showDataArr[3],
                    showName: showDataArr[4].split('/')[4].split('?')[0].split('.')[0],
                    airDate: showDataArr.slice(5).join(' '),
                };
                console.log("Processed show data: ", showData);
                processedData.push(showData);
            } catch (error) {
                console.error("Error occurred when processing data: ", error);
            }
        }
        console.log("Final processed data: ", processedData);
        return processedData;
    },

    getDom: function() {
        console.log("Creating DOM elements");
        var wrapper = document.createElement('div');
        this.shows.forEach((show) => {
            console.log("Creating DOM element for show: ", show.showName, " with air date: ", show.airDate);
            var showElement = document.createElement('div');
            showElement.innerHTML = `${show.showName} - ${show.airDate}`;
            wrapper.appendChild(showElement);
        });
        return wrapper;
    }
});
