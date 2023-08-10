Radio = {}

Radio.new = function()
    newRadio = {}
    
    newRadio.current = {
        frequency = 0,
        volume = 0,
        status = RadioAction.status.OFF,
    }

    function newRadio.init(zones)
        SendNUIMessage({
            type = 'init-radio',
            zones = zones
        })

        exports['nse_voice']:setRadioChannel(0)
        exports['nse_voice']:setVoiceProperty('radioEnabled', false)
    end

    function newRadio.turn(radioAction)
        newRadio.current.status = radioAction

        if (radioAction == RadioAction.OFF) then
            exports['nse_voice']:setRadioChannel(0)
            SendNUIMessage({
                type = 'clear-player-list',
            })
        end
        
        exports['nse_voice']:setVoiceProperty('radioEnabled', radioAction == RadioAction.ON)
    end

    function newRadio.toggleRadio(enable)
        SetNuiFocus(enable, enable)
        SendNUIMessage({
            type = 'toggle-radio'
        })
    end

    function newRadio.setFrequency(frequency)
        newRadio.current.frequency = frequency
        exports['nse_voice']:setRadioChannel(frequency)
    end

    function newRadio.setVolume(volume)
        newRadio.current.volume = volume
    end

    return newRadio
end