class RadioChannel {
    constructor(index, name, frequency) {
        this.index = index;
        this.frequency = frequency;
        this.name = name;
    }

    static buildList(channels) {
        let out = [];

        for (let index = 0; index < channels.length; index++) {
            out.push(new RadioChannel(index + 1, channels[index].name, channels[index].frequency));
        }

        return out;
    }
}