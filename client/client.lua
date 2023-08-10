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
    TriggerServerEvent("motorola-radio:removePlayerByFrequency", Motorola.Radio.current.frequency)
    Motorola.Radio.setFrequency(data.frequency)
    TriggerServerEvent("motorola-radio:registerPlayerByFrequency", data.frequency)
end)

function printPlayerList(playerList)
    print("PlayerList:")
    print("-------------")
    for frequency, list in pairs(playerList) do
        print("frequency: "..frequency)
        for index, player in pairs(list) do
            print("player "..index.." -> name: "..player.name..", guid: "..player.guid)
        end
        print("--")
    end
end

RegisterNetEvent('motorola-radio:getPlayerList')
AddEventHandler('motorola-radio:getPlayerList', function(playerList)
    printPlayerList(playerList)

    if Motorola.Radio.current.frequency ~= 0 then
        SendNUIMessage({
            type = 'update-player-list',
            playerList = playerList[Motorola.Radio.current.frequency]
        })
    end
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