class HomeRadioMenu extends RadioBaseMenu {
    constructor(radioModel, radioCurrentData) {
        super(radioModel, RadioMenu.HOME);

        this.radioCurrentData = radioCurrentData;

        this[RadioAction.button.P1] = () => {
            this.hide()
            this.radioModel.showScreen(RadioMenu.ZONES);
            this.radioCurrentData.menu = RadioMenu.ZONES;
        };

        this[RadioAction.button.P2] = () => {
            this.hide()
            this.radioModel.showScreen(RadioMenu.CONTACTS);
            this.radioCurrentData.menu = RadioMenu.CONTACTS;
        };

        this[RadioAction.button.CHANNEL_UP] = () => {
            this.channel = this.zone.getNextChannel(
                this.channel.index
            );

            this.refresh();
        };

        this[RadioAction.button.CHANNEL_DOWN] = () => {
            this.channel = this.zone.getPrevChannel(
                this.current.channel.index
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
