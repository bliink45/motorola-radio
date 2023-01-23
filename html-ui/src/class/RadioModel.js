class RadioModel {
    constructor(radioElement, radioData) {
        this.radio = radioElement;
        this.image = radioElement.children(".image");
        this.screen = radioElement.children(".screen");

        this.imageBank = {
            radio_off: Config["assets-path"] + "images/radio_off.png",
            radio_start1: Config["assets-path"] + "images/radio_start1.png",
            radio_start2: Config["assets-path"] + "images/radio_start2.png",
            radio_zones_submit: Config["assets-path"] + "images/radio_zones_submit.png",
            radio_contact_single: Config["assets-path"] + "images/radio_contact_single.png",
            radio_contact_double: Config["assets-path"] + "images/radio_contact_double.png",
        }

        this.soundBank = {
            radio_start: new Audio(Config["assets-path"] + "sounds/radio_start.mp3"),
            radio_connect: new Audio(Config["assets-path"] + "sounds/radio_connect.mp3"),
            radio_tick: new Audio(Config["assets-path"] + "sounds/radio_tick.mp3"),
            radio_buton_sound: new Audio(Config["assets-path"] + "sounds/radio_buton_sound.mp3"),
        }

        this.soundBank.radio_tick.volume = 0.1;
        this.soundBank.radio_tick.radio_connect = 0.3;
        this.soundBank.radio_tick.radio_tick = 0.3;

        this.setImage(this.imageBank.radio_off)

        this.setChannelLabels({
            "channel-number": radioData.current.channel.index,
            "channel-name": radioData.current.channel.name,
        })
    }

    async turn(radioActionStatus) {
        if (radioActionStatus === RadioAction.status.ON) {
            this.soundBank.radio_tick.play();
            this.setImage(this.imageBank.radio_start1);
            await sleep(2000);
            this.setImage(this.imageBank.radio_start2);
            this.soundBank.radio_start.play();
            await sleep(1500);
            this.displayScreen(true);
            this.soundBank.radio_connect.play();
            this.setImage(this.imageBank.radio_start1);
        } else if (radioActionStatus === RadioAction.status.OFF) {
            this.soundBank.radio_tick.play();
            this.setImage(this.imageBank.radio_off);
            this.displayScreen(false);
        } else
            throw new Error(
                `RadioModel.turn(RadioStatus): Unknown Radio status: ${radioStatus}.`
            );
    }

    setImage(path) {
        this.image.attr("src", path);
    }

    displayScreen(display) {
        if (display)
            this.screen.removeClass("hide");
        else
            this.screen.addClass("hide");
    }

    playButtonSound() {
        this.soundBank.radio_buton_sound.volume = 0.2;
        this.soundBank.radio_buton_sound.play()
    }

    hideScreen(radioMenu) {
        $('.' + radioMenu).addClass("hide");
    }

    showScreen(radioMenu) {
        $('.' + radioMenu).removeClass("hide");
    }

    setChannelLabels(channelLabelData) {
        $(".radio .screen .content .home .channel-number").text("Ch " + channelLabelData['channel-number']);
        $(".radio .screen .content .home .channel-name").text(channelLabelData['channel-name']);
    }

    setHomeLabels(homeLabelData) {
        $(".radio .screen .home .footer .actions action-1").text(homeLabelData['action-1']);
        $(".radio .screen .home .footer .actions action-2").text(homeLabelData['action-2']);
    }

    getEnabledZoneIndex(currentZoneName, zoneList = []) {
        let enabledZoneIndex;

        for (let i = 0; i < 3; i++) {
            if (zoneList[i] == null)
                zoneList[i] = $(".zone-" + (i + 1)).text();

            if (zoneList[i] === currentZoneName)
                return enabledZoneIndex = i + 1;
        }

        return
    }
    
    setZonesData(zoneData) {
        for (let i = 1; i < 4; i++) {
            $(".row-" + i).removeClass("enabled")
        }
    

        $(".zone-1").text(zoneData["zone-1"]);
        $(".zone-2").text(zoneData["zone-2"]);
        $(".zone-3").text(zoneData["zone-3"]);

        if (zoneData["cursor-index-old"])
            $(".radio .screen .content .zones .row-" + (zoneData["cursor-index-old"])).removeClass("selected");

        if (zoneData["enabled-zone-index"])
            $(".row-" + zoneData["enabled-zone-index"]).addClass("enabled")

        $(".radio .screen .content .zones .row-" + (zoneData["cursor-index"])).addClass("selected");
    }

    async enableSelectedZone(selectedZoneName, cursorIndex, zoneOldIndex) {

        $(".container.submit").removeClass("hide");
        $(".zone-name").text(selectedZoneName.toUpperCase());
        $(".row-" + zoneOldIndex).removeClass("enabled")
        $(".row-" + cursorIndex).addClass("enabled")
        await sleep(2000);
        $(".container.submit").addClass("hide");
    }

    refresh(data) {
        this.setChannelLabels({
            "channel-number": data.current.channel.index,
            "channel-name": data.current.channel.name,
        })

        this.setZonesData({
            "zone-1": data.zones[0] ? data.zones[0].name : "",
            "zone-2": data.zones[1] ? data.zones[1].name : "",
            "zone-3": data.zones[2] ? data.zones[2].name: "",
            "cursor-index": data.current.cursorIndex,
            "enabled-zone-index": 1
        })
    }
}
