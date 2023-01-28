Motorola.Radio = Radio.new();

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

Citizen.CreateThread(function()
    Citizen.Wait(500)
    Motorola.Radio.init(Motorola.Config.Zones)
    print(GetCurrentResourceName() .. " initialized.")
end)