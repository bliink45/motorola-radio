Motorola.Radio = {
    isOpen = false,
}

function Motorola.Radio.ToggleRadio(enable)
    Motorola.Radio.isOpen = enable
    SendNUIMessage({
        type = 'toggle-radio',
        zones = Motorola.Config.Zones
    })
    isOpen = enable

    if (not enable) then
        SetNuiFocus(false, false)
    end
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
end)



Citizen.CreateThread(function()
    while true do
        if isOpen then
            -- SHIFT + ARRAY_UP
            if IsControlPressed(0,  155) and IsControlPressed(0,  300) then    
                SetNuiFocus(true, true)
                Citizen.Wait(1000)
            elseif IsPauseMenuActive() then
                Motorola.Radio.ToggleRadio(false)
            end
        end
        Citizen.Wait(50)
    end
end)