class RadioZone {
    constructor(index, name, channelList) {
        this.index = index;
        this.name = name;
        this.channelList = channelList;
        this.count = channelList.length;
    }

    getNextChannel(currentIndex) {
        if (this.count > 0) {
            if (currentIndex < this.count)
                return this.channelList[currentIndex];
            else
                return this.channelList[0];
        }
    }

    getPrevChannel(currentIndex) {
        if (this.count > 0) {
            if (currentIndex - 2 >= 0)
                return this.channelList[currentIndex - 2];
            else
                return this.channelList[this.count - 1]
        }
    }

    static buildList(zones) {
        let out = [];
    
        for (let index = 0; index < zones.length; index++) {
            out.push(new RadioZone(index, zones[index].name, RadioChannel.buildList(zones[index].channelList)))
        }

        return out;
    }
}