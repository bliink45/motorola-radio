Motorola.Radio = {
    isOpen = false,
}

function Motorola.Radio.ToggleRadio(enable)
    Motorola.Radio.isOpen = enable
    SetNuiFocus(enable, enable)
    SendNUIMessage({
        type = 'toggle-radio',
        zones = Motorola.Config.Zones
    })
end

RegisterNUICallback('radio-close', function(data, cb)
    Motorola.Radio.ToggleRadio(false)
end)

if Motorola.Config.Keybind ~= '' then
    RegisterCommand('radio', function()
        Motorola.Radio.ToggleRadio(true)
    end)

    RegisterKeyMapping('radio', 'Ouvrir la radio', 'keyboard', Motorola.Config.Keybind)
end

AddEventHandler('onResourceStart', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
      return
    end

    print(resourceName .. " initialized.")
end)