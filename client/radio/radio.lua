function Radio:new() {
    newRadio = {}
    
    newRadio.current = {
        frequency = 0,
        volume = 0,
        status = RadioAction.status.OFF,
    }

    function newRadio.init(zones) {
        SendNUIMessage({
            type = 'init-radio'
            zones = zones
        })
    }

    function newRadio.turn(radioAction) {
        newRadio.current.status = radioAction

        if (radioAction == RadioAction.OFF) then
            exports['nse_voice']:setRadioChannel(0)
        end
        
        exports['nse_voice']:setVoiceProperty('radioEnabled', radioAction == RadioAction.ON)
    }

    function newRadio.toggleRadio(enable)
        SetNuiFocus(enable, enable)
        SendNUIMessage({
            type = 'toggle-radio'
        })
    end

    function newRadio.setFrequency(frequency) {
        newRadio.current.frequency = frequency
        exports['nse_voice']:setRadioChannel(channel)
    }

    function newRadio.setVolume(volume) {
        newRadio.current.volume = volume
    }
}