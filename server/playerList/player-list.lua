local playerList = {}

function getListIndexByGuid(list, guid)
    for i, v in ipairs(list) do
        if v.guid == guid then
            return i
        end
    end
    return -1
end

function getPlayerByGuid(list, guid)
    for i, v in ipairs(list) do
        local index = getListIndexByGuid(v, guid)
        if index ~= -1 then
            return v[index]
        end
    end

    return nil
end

function removeListEltByGuid(list, guid)
    local index = getListIndexByGuid(list, guid)

    if index ~= -1 then
        table.remove(list, index)
        return true -- Return true if value was found and removed
    end

    return false  -- Return false if value was not found in the list
end

function registerPlayerByFrequency(frequency, playerId)
    if not playerList[frequency] then
        playerList[frequency] = {}
    end

    local player = {
        name = GetPlayerName(playerId),
        guid = GetPlayerGuid(playerId)
    }

    if getListIndexByGuid(playerList[frequency], player.guid) == -1 then
        table.insert(playerList[frequency], player)
        return true
    else
        return false
    end
end

function removePlayerByFrequency(frequency, playerId)
    if not playerList[frequency] then
        print("Frequency: "..frequency.." does not exist.")
    else
        removeListEltByGuid(playerList[frequency], GetPlayerGuid(playerId))
    end
end

function getPlayerListByFrequency(frequency)
    if not playerList[frequency] then
        print("Frequency: "..frequency.." does not exist.")
        return nil
    else
        return playerList[frequency]
    end
end

function printPlayerList()
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

RegisterNetEvent('motorola-radio:registerPlayerByFrequency', function(frequency)
    print("player with id: "..source.." requested to be register in "..frequency.." frequency.")
    registerPlayerByFrequency(frequency, source)
    TriggerClientEvent('motorola-radio:getPlayerList', source, playerList)
    printPlayerList()
end)

RegisterNetEvent('motorola-radio:removePlayerByFrequency', function(frequency)
    print("player with id: "..source.." requested to be removed in "..frequency.." frequency.")
    removePlayerByFrequency(frequency, source)
    TriggerClientEvent('motorola-radio:getPlayerList', -1, playerList)
end)

RegisterNetEvent('motorola-radio:getPlayerListByFrequency', function(frequency)
    TriggerClientEvent('motorola-radio:getPlayerListByFrequency', source, getPlayerListByFrequency(frequency))
end)

RegisterNetEvent('motorola-radio:getPlayerList', function()
    TriggerClientEvent('motorola-radio:getPlayerList', source, playerList)
end)