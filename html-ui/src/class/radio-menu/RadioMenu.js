class RadioBaseMenu {
    constructor(radioModel, menuName) {
        this.menuName = menuName;
        this.radioModel = radioModel;

        for(let action of RadioAction.button.values())
            this[action] = () => `${this.menuName}: '${action}' is not bind.`
    }
}