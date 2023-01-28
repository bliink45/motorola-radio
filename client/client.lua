Motorola.Radio = Radio:new();

RegisterNUICallback('radio-close', function(data, cb)
    Motorola.Radio.toggleRadio(false)
end)

RegisterNUICallback('radio-on', function(data, cb)
    Motorola.Radio.turn(RadioAction.ON)
end)

RegisterNUICallback('radio-off', function(data, cb)
    Motorola.Radio.turn(RadioAction.OFF)
end)

RegisterNUICallback('radio-set-frequency', function(data, cb)
    Motorola.Radio.setFrequency(data.frequency)
end)

if Motorola.Config.Keybind ~= '' then
    RegisterCommand('radio-open', function()
        Motorola.Radio.toggleRadio(true)
    end)

    RegisterKeyMapping('radio-open', 'Ouvrir la radio', 'keyboard', Motorola.Config.Keybind)
end

AddEventHandler('onClientResourceStart', function(resourceName)
    if (GetCurrentResourceName() == resourceName) then
        Motorola.Radio.init(Motorola.Config.Zones)
        exports['nse_voice']:setRadioChannel(0)
        exports['nse_voice']:setVoiceProperty('radioEnabled', false)
        print(GetCurrentResourceName() .. " initialized.")
    end
end)