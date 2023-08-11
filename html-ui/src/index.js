$(document).ready(function () {
    let radioUI = {
        isOpen: false,
        motorolaRadio: new Radio($(".radio")),
    }

    window.addEventListener('message', function(event) {
        console.log("event: " + event.data.type)

        if (event.data.type === "toggle-radio") {
            if (radioUI.isOpen) {
                $("body").addClass("hide");
                radioUI.isOpen = false;
            }
            else {
                $("body").removeClass("hide");
                radioUI.isOpen = true;
            }
        }
        else if (event.data.type === "init-radio") {
            radioUI.motorolaRadio.setData(event.data.zones);
        }
        else if (event.data.type === "update-player-list") {
            const dropdownContentDiv = document.querySelector('.dropdown-content');
            dropdownContentDiv.innerHTML = ''; 
            
            event.data.playerList.forEach(player => {
                const playerElement = document.createElement('div');
                playerElement.classList.add('player-list-item'); // You can style this class in your CSS
                playerElement.innerHTML = `<a href="#">${player.name}</a>`;
                dropdownContentDiv.appendChild(playerElement);
            });
        }
        else if (event.data.type === "clear-player-list") {
            const dropdownContentDiv = document.querySelector('.dropdown-content');
            dropdownContentDiv.innerHTML = ''; 
        }
    });

    
    $(document).on("click", ".button",async (event) => {
        return await radioUI.motorolaRadio.trigger(event.target.classList[1]);
    })

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $.post('https://motorola-radio/radio-close', JSON.stringify({}));
        } else if (e.key === "l") {
            console.log(document.querySelector('.dropdown-content').classList.contains("hide"))
            if (document.querySelector('.dropdown-content').classList.contains("hide")) {
                document.querySelector('.dropdown-content').classList.remove("hide")
            } else {
                document.querySelector('.dropdown-content').classList.add("hide")
            }
        }
   });
});