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
        return data.map((showData) => {
            const splitData = showData.split(' ');
            const icon = splitData[4].split('/')[2];
            const showName = icon.split('.')[0];
            const airDate = splitData[6];
            return {
                name: showName,
                icon: icon,
                airDate: airDate
            };
        });
    },

    getDom: function() {
        var wrapper = document.createElement('div');
        this.shows.forEach((show) => {
            var showElement = document.createElement('div');
            showElement.innerHTML = `<img src="https://static.next-episode.net/tv-shows-images/thumb/${show.icon}" /> ${show.name} - ${show.airDate}`;
            wrapper.appendChild(showElement);
        });
        return wrapper;
    }
});
