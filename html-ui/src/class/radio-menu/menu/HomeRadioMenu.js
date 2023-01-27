class HomeRadioMenu extends RadioBaseMenu {
    constructor(radioModel, radioCurrentData) {
        super(radioModel, RadioMenu.HOME);

        this.radioCurrentData = radioCurrentData;

        this[RadioAction.button.P1] = () => {
            this.hide()
            this.radioModel.showScreen(RadioMenu.ZONES);
            this.radioCurrentData.menu = RadioMenu.ZONES;
        };

        this[RadioAction.button.CHANNEL_UP] = () => {
            this.radioCurrentData.channel = this.radioCurrentData.zone.getNextChannel(
                this.radioCurrentData.channel.index
            );

            this.refresh();
        };

        this[RadioAction.button.CHANNEL_DOWN] = () => {
            this.radioCurrentData.channel = this.radioCurrentData.zone.getPrevChannel(
                this.radioCurrentData.channel.index
            );

            this.refresh();
        };
    }

    refresh() {
        this.radioModel.setChannelLabels({
            "channel-number": this.radioCurrentData.channel.index,
            "channel-name": this.radioCurrentData.channel.name,
        });
    }
}
