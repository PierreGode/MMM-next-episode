Module.register('MMM-next-episode', {
    defaults: {
        id: '',
        hash_key: ''
    },

    start: function() {
        this.shows = [];
        this.sendSocketNotification('GET_DATA', this.config);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'DATA') {
            this.shows = this.processData(payload);
            this.updateDom();
        }
    },

    processData: function(data) {
        let dataArr = data.trim().split(' ');
        let processedData = [];
        for(let i=0; i<dataArr.length; i+=7){
            processedData.push({
                id: dataArr[i],
                time: dataArr[i+1],
                season: dataArr[i+2],
                episode: dataArr[i+3],
                icon: dataArr[i+4].split('/')[2],
                showName: dataArr[i+4].split('/')[2].split('.')[0],
                airDate: dataArr[i+5] + ' ' + (dataArr[i+6] || ''),
            });
        }
        return processedData;
    },

    getDom: function() {
        var wrapper = document.createElement('div');
        this.shows.forEach((show) => {
            var showElement = document.createElement('div');
            showElement.innerHTML = `<img src="https://static.next-episode.net/tv-shows-images/thumb/${show.icon}" /> ${show.showName} - ${show.airDate}`;
            wrapper.appendChild(showElement);
        });
        return wrapper;
    }
});
