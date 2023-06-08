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
        console.log("next-episode, Received socket notification: ", notification, " with payload: ", payload);
        if (notification === 'DATA') {
            console.log("next-episode, Received DATA notification with payload: ", payload);
            this.shows = this.processData(payload);
            this.updateDom();
        }
    },
    
processData: function(data) {
    console.log("next-episode, Processing data: ", data);
    let dataArr = data.trim().split('\n');
    let processedData = [];
    for(let i=0; i<dataArr.length; i++){
        try {
            // Match and extract relevant parts of the line
            let match = dataArr[i].match(/(\d+) (\d+:\d+) (\d+) (\d+) (https:\/\/[\S]+) (.+)/);
            if (match) {
                const showData = {
                    id: match[1],
                    time: match[2],
                    season: match[3],
                    episode: match[4],
                    showName: match[5].split('/').pop().split('?')[0].split('.jpg')[0],
                    airDate: match[6]
                };
                console.log("next-episode, Processed show data: ", showData);
                processedData.push(showData);
            } else {
                console.error("next-episode, Error: failed to match line format");
            }
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
        console.log("next-episode, Creating DOM element for show: ", show.showName, " with air date: ", show.airDate);
        var showElement = document.createElement('div');
        
        // Modify this line to format the display string as you desire
        showElement.innerHTML = `${show.showName} ${show.airDate}`;
        
        wrapper.appendChild(showElement);
    });
    return wrapper;
},
});
