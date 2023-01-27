class ZonesRadioMenu extends RadioBaseMenu {
    constructor(radioModel, radioCurrentData) {
        super(radioModel, RadioMenu.ZONES);

        this.zones = [];
        this.radioCurrentData = radioCurrentData;

        this.selectedZone = null;
        this.cursorIndex = 1;

        this[RadioAction.button.ARROW_UP] = () => this.scroll(RadioAction.button.ARROW_UP);
        this[RadioAction.button.ARROW_DOWN] = () => this.scroll(RadioAction.button.ARROW_DOWN);
        this[RadioAction.button.ENTER] = () => this.enableZone();
        this[RadioAction.button.BACK] = () => this.goBackHome();
    }

    scroll(radioAction) {
        let cursorIndex_old = this.cursorIndex;
        let { zone1, zone2, zone3 } = (radioAction === RadioAction.button.ARROW_UP) ? this.scrollUp() : this.scrollDown();

        let enabledZoneIndex = this.radioModel.getEnabledZoneIndex(
            this.radioCurrentData.zone.name,
            [ zone1, zone2, zone3 ]
        );

        this.radioModel.setZonesData({
            "zone-1": zone1,
            "zone-2": zone2,
            "zone-3": zone3,
            "cursor-index": this.cursorIndex,
            "cursor-index-old": cursorIndex_old,
            "enabled-zone-index": enabledZoneIndex,
        });
    }

    scrollUp() {
        let zone1, zone2, zone3;

        if (this.selectedZone.index - 1 >= 0) {
            if (this.cursorIndex - 1 < 1) {
                zone1 =
                    this.zones[this.selectedZone.index - 1]
                        .name;
                zone2 =
                    this.zones[this.selectedZone.index].name;
                zone3 = this.zones[this.selectedZone.index + 1]
                    ? this.zones[this.selectedZone.index + 1]
                          .name
                    : "";
            } else this.cursorIndex--;

            this.selectedZone =
                this.zones[this.selectedZone.index - 1];
        } else {
            let zonesListLength = this.zones.length;

            if (zonesListLength >= 3) {
                zone1 = this.zones[zonesListLength - 3].name;
                zone2 = this.zones[zonesListLength - 2].name;
                zone3 = this.zones[zonesListLength - 1].name;
                this.cursorIndex = 3;
            } else if (zonesListLength === 2) {
                zone1 = this.zones[zonesListLength - 2].name;
                zone2 = this.zones[zonesListLength - 1].name;
                zone3 = "";
                this.cursorIndex = 2;
            } else {
                zone1 = this.zones[zonesListLength - 1].name;
                zone2 = "";
                zone3 = "";
                this.cursorIndex = 1;
            }

            this.selectedZone =
                this.zones[zonesListLength - 1];
        }

        return {
            zone1: zone1,
            zone2: zone2,
            zone3: zone3
        };
    }

    scrollDown() {
        let zone1, zone2, zone3;
        let zonesListLength = this.zones.length;

        if (this.selectedZone.index + 1 < zonesListLength) {
            if (this.cursorIndex + 1 > 3) {
                zone1 =
                    this.zones[this.selectedZone.index - 1]
                        .name;
                zone2 =
                    this.zones[this.selectedZone.index].name;
                zone3 =
                    this.zones[this.selectedZone.index + 1]
                        .name;
            } else {
                this.cursorIndex++;
            }

            this.selectedZone =
                this.zones[this.selectedZone.index + 1];
        } else {
            zone1 = this.zones[0] ? this.zones[0].name : "";
            zone2 = this.zones[1] ? this.zones[1].name : "";
            zone3 = this.zones[2] ? this.zones[2].name : "";
            this.cursorIndex = 1;

            this.selectedZone = this.zones[0];
        }

        return { zone1, zone2, zone3 };
    }

    enableZone() {
        let currentZoneOldIndex = this.radioModel.getEnabledZoneIndex(this.radioCurrentData.zone.name);
        this.radioCurrentData.zone = this.selectedZone;
        this.radioCurrentData.channel = this.radioCurrentData.zone.channelList[0];
        this.radioModel.enableSelectedZone(this.radioCurrentData.zone.name, this.cursorIndex, currentZoneOldIndex);

        this.radioModel.setChannelLabels({
            "channel-number": this.radioCurrentData.channel.index,
            "channel-name": this.radioCurrentData.channel.name,
        });
    }

    goBackHome() {
        this.hide();
        this.radioModel.showScreen(RadioMenu.HOME);
        this.radioCurrentData.menu = RadioMenu.HOME;
    }
}