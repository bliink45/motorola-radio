class Radio {
    constructor(radioElement) {
        this.menus = {};

        this.current = {
            zone: null,
            channel: null,
            volume: 0,
            status: RadioAction.status.OFF,
            theme: 'light',
            menu: RadioMenu.HOME,
        }

        this.radioModel = new RadioModel(radioElement, this);

        for (let menu of Object.values(RadioMenu)) {
            this.menus[menu] = RadioBaseMenu.build({
                radioMenu: menu,
                radioModel: this.radioModel,
                radioData: this.current
            })
        }
    }

    setData(zones) {
        this.menus[RadioMenu.ZONES].zones = RadioZone.buildList(zones);
        this.current.zone = this.menus[RadioMenu.ZONES].zones.length > 0 ? this.menus[RadioMenu.ZONES].zones[0] : null;
        this.menus[RadioMenu.ZONES].selectedZone = this.current.zone
        this.current.channel = this.current.zone ? this.current.zone.channelList[0] : new RadioChannel(0, "Channel0", 0);
        this.radioModel.refresh(this);
    }

    async trigger(radioAction) {
        if (radioAction === RadioAction.button.VOLUME_UP || radioAction === RadioAction.button.VOLUME_DOWN)
            this.turnVolume(radioAction);
        else if (this.current.status === RadioAction.status.ON) {
            if (radioAction !== RadioAction.button.CHANNEL_UP && radioAction !== RadioAction.button.CHANNEL_DOWN)
                this.radioModel.playButtonSound();
            return this.menus[this.current.menu][radioAction]();
        }
    }

    
    async turnVolume(radioActionVolume) {
        if (radioActionVolume === RadioAction.button.VOLUME_UP) {
            if (this.current.status === RadioAction.status.OFF && this.current.volume === 0) {
                await this.radioModel.turn(RadioAction.status.ON);
                this.menus[RadioMenu.HOME].show();
                this.current.status = RadioAction.status.ON;

                this.radioModel.refresh(this);
                $.post('https://motorola-radio/radio-on', JSON.stringify({}));
            }

            this.current.volume = this.current.volume + 10 < 100 ? this.current.volume + 10 : 100;
        }
        else if (radioActionVolume === RadioAction.button.VOLUME_DOWN) {
            if (this.current.status === RadioAction.status.ON && this.current.volume - 10 <= 0) {
                this.radioModel.turn(RadioAction.status.OFF);
                this.menus[RadioMenu.HOME].show();
                this.current.status = RadioAction.status.OFF;
                this.current.zone = this.menus[RadioMenu.ZONES].zones[0];
                this.current.channel = this.current.zone.channelList[0];

                $.post('https://motorola-radio/radio-off', JSON.stringify({}));
            }

            this.current.volume = this.current.volume - 10 >= 0 ? this.current.volume - 10 : 0;
        }
    }

    /*
    changeMenu(radioMenu) {
        this.radioModel.hideScreen(this.current.menu);
        this.radioModel.showScreen(radioMenu);
        this.current.menu = radioMenu;
    }

    getChannel(action) {
        if (action === "next")
            this.current.channel = this.current.zone.getNextChannel(this.current.channel.index);
        else if (action === "previous") {
            this.current.channel = this.current.zone.getPrevChannel(this.current.channel.index);
        }

        this.radioModel.setChannelLabels({
            "channel-number": this.current.channel.index,
            "channel-name": this.current.channel.name,
        })
    }

    setData(zones) {
        this.zones = RadioZone.buildList(zones);
        this.current.zone = this.zones.length > 0 ? this.zones[0] : null;
        this.current.selectedZone = this.zones.length > 0 ? this.zones[0] : null
        this.current.channel = this.current.zone ? this.current.zone.channelList[0] : new RadioChannel(0, "Channel0", 0);
        this.radioModel.refresh(this);
    }

    zoneScroll(action) {
        let zone1, zone2, zone3;
        let cursorIndex_old = this.current.cursorIndex;

        if (action === "up") {
            if (this.current.selectedZone.index - 1 >= 0) {
                if (this.current.cursorIndex - 1 < 1) {
                    zone1 = this.zones[this.current.selectedZone.index - 1].name;
                    zone2 = this.zones[this.current.selectedZone.index].name;
                    zone3 = this.zones[this.current.selectedZone.index + 1].name;
                }
                else {
                    this.current.cursorIndex--;
                }

                this.current.selectedZone = this.zones[this.current.selectedZone.index - 1];
            }
            else {
                let zonesListLength = this.zones.length
                if (zonesListLength >= 3) {
                    zone1 = this.zones[zonesListLength - 3].name;
                    zone2 = this.zones[zonesListLength - 2].name;
                    zone3 = this.zones[zonesListLength - 1].name;
                    this.current.cursorIndex = 3;
                }
                else if (zonesListLength === 2) {
                    zone1 = this.zones[zonesListLength - 2].name;
                    zone2 = this.zones[zonesListLength - 1].name;
                    zone3 = ""
                    this.current.cursorIndex = 2;
                }
                else {
                    zone1 = this.zones[zonesListLength - 1].name;
                    zone2 = "";
                    zone3 = "";
                    this.current.cursorIndex = 1;
                }

                this.current.selectedZone = this.zones[zonesListLength - 1];
            }
        }
        else if (action === "down") {
            let zonesListLength = this.zones.length
            if (this.current.selectedZone.index + 1 < zonesListLength) {
                if (this.current.cursorIndex + 1 > 3) {
                    zone1 = this.zones[this.current.selectedZone.index - 1].name;
                    zone2 = this.zones[this.current.selectedZone.index].name;
                    zone3 = this.zones[this.current.selectedZone.index + 1].name;
                }
                else {
                    this.current.cursorIndex++;
                }

                this.current.selectedZone = this.zones[this.current.selectedZone.index + 1];
            }
            else {
                zone1 = this.zones[0] ? this.zones[0].name : "";
                zone2 = this.zones[1] ? this.zones[1].name : "";
                zone3 = this.zones[2] ? this.zones[2].name : "";
                this.current.cursorIndex = 1;

                this.current.selectedZone = this.zones[0];
            }
        }

        let finalZoneList = [zone1, zone2, zone3]

        
        let enabledZoneIndex = this.radioModel.getEnabledZoneIndex(this.current.zone.name, finalZoneList)

        this.radioModel.setZonesData({
            "zone-1": zone1,
            "zone-2": zone2,
            "zone-3": zone3,
            "cursor-index": this.current.cursorIndex,
            "cursor-index-old": cursorIndex_old,
            "enabled-zone-index": enabledZoneIndex
        })
    }

    enableZone() {
        let currentZoneOldIndex = this.radioModel.getEnabledZoneIndex(this.current.zone.name);
        this.current.zone = this.current.selectedZone;
        this.current.channel = this.current.zone.channelList[0];
        this.radioModel.refresh(this);
        this.radioModel.enableSelectedZone(this.current.zone.name, this.current.cursorIndex, currentZoneOldIndex);
    }

    triggerAction(RadioActionButton) {
        this.radioModel.playButtonSound();
        switch (RadioActionButton) {
            case RadioAction.button.ACTION_1:
                this.changeMenu(RadioMenu.ZONES)
                break;
            case RadioAction.button.ACTION_2:
                this.changeMenu(RadioMenu.CONTACTS)
                break;
            case RadioAction.button.BACK:
                if (this.current.menu != RadioMenu.HOME)
                    this.changeMenu(RadioMenu.HOME)
                break;
            case RadioAction.button.DOWN:
                if (this.current.menu === RadioMenu.ZONES)
                    this.zoneScroll("down");
                break;
            case RadioAction.button.UP:
                if (this.current.menu === RadioMenu.ZONES)
                    this.zoneScroll("up");
                break;
            case RadioAction.button.ENTER:
                if (this.current.menu === RadioMenu.ZONES)
                    this.enableZone()
                break;
            default:
                console.log(`Unknown button action: ${RadioActionButton}.`);
        }
    }
    */
}