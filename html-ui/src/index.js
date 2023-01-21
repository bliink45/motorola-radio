$(document).ready(function () {
    let radioUI = {
        isOpen: false,
        motorolaRadio: new Radio($(".radio")),
    }

    window.addEventListener('message', function(event) {
        if (event.data.type === "toggle-radio") {
            if (radioUI.isOpen) {
                $("body").addClass("hide");
                radioUI.isOpen = false;
            }
            else {
                $("body").removeClass("hide");
                radioUI.isOpen = true;
            }
            
            radioUI.motorolaRadio.setData(event.data.zones)
        }
        else if (event.data.type === "init-radio") {
            radioUI.motorolaRadio.setData(event.data.zones);
        }
    });

    $(document).on("click", "#volume-up-btn", async () => {
        radioUI.motorolaRadio.turnVolume(RadioAction.volume.UP);
    })

    $(document).on("click", "#volume-down-btn", async () => {
        radioUI.motorolaRadio.turnVolume(RadioAction.volume.DOWN);
    })

    $(document).on("click", "#channel-prev-btn", async () => {
        radioUI.motorolaRadio.getChannel("previous");
    })

    $(document).on("click", "#channel-next-btn", async () => {
        radioUI.motorolaRadio.getChannel("next");
    })

    $(document).on("click", ".controller .p1", async () => {
        radioUI.motorolaRadio.triggerAction(RadioAction.button.ACTION_1);
    })

    $(document).on("click", ".controller .p2", async () => {
        radioUI.motorolaRadio.triggerAction(RadioAction.button.ACTION_2);
    })

    $(document).on("click", ".controller .back", async () => {
        radioUI.motorolaRadio.triggerAction(RadioAction.button.BACK);
    })

    $(document).on("click", ".controller .enter", async () => {
        radioUI.motorolaRadio.triggerAction(RadioAction.button.ENTER);
    })

    $(document).on("click", ".controller .up", async () => {
        radioUI.motorolaRadio.triggerAction(RadioAction.button.UP);
    })

    $(document).on("click", ".controller .left", async () => {
        radioUI.motorolaRadio.triggerAction(RadioAction.button.LEFT);
    })

    $(document).on("click", ".controller .down", async () => {
        radioUI.motorolaRadio.triggerAction(RadioAction.button.DOWN);
    })

    $(document).on("click", ".controller .right", async () => {
        radioUI.motorolaRadio.triggerAction(RadioAction.button.RIGHT);
    })

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $.post('https://motorola-radio/radio-close', JSON.stringify({}));
        };
   });
});