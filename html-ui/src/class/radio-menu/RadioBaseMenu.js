class RadioBaseMenu {
    constructor(radioModel, radioMenu) {
        this.radioMenu = radioMenu;
        this.radioModel = radioModel;

        for(let action of Object.values(RadioAction.button))
            this[action] = () => console.log(`${this.radioMenu}: '${action}' button is not bind.`)
    }

    static build(buildData) {
        const classBuilder = {}
        classBuilder[RadioMenu.HOME] = HomeRadioMenu;
        classBuilder[RadioMenu.ZONES] = ZonesRadioMenu;
        classBuilder[RadioMenu.CONTACTS] = ContactsRadioMenu;

        return new classBuilder[buildData.radioMenu](buildData.radioModel, buildData.radioData);
    }

    hide() {
        this.radioModel.hideScreen(this.radioMenu);
    }

    show() {
        this.radioModel.showScreen(this.radioMenu);
    }
}