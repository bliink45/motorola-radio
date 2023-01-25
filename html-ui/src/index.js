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

    
    $(document).on("click", ".button",async (event) => {
        return await radioUI.motorolaRadio.trigger(event.target.classList[1]);
    })

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $.post('https://motorola-radio/radio-close', JSON.stringify({}));
        };
   });
});