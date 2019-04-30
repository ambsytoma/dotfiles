var count = 0, multi = 1, ackCount = 0, lastPlay = 1, appPorts = {};

function onWebMessage(id, ext2helper) {
    return function (message) {
        var obj = eval(message), cmd = obj.cmd, port = obj.port; // not used
        console.log('ID = ' + id + ' send cmd = ' + cmd + ' to port = ' + port);
        if (cmd === 'e_play') {
            if (multi) {
                console.log('GET PLAY: ID = ' + id + ', Ack = ' + ackCount + ', Multi = ' + multi);
                appPorts[id].web.postMessage({type: 'e_play_success'});
            } else {
                if (ackCount || !appPorts[id]) {
                   /*appPorts[id].web.postMessage({type: 'e_play_fail'});*/
                } else if (!ackCount && lastPlay === id || !appPorts[lastPlay]) {
                    lastPlay = id;
                    appPorts[id].web.postMessage({type: 'e_play_success'});
                } else {
                    console.log('GET PLAY: ID = ' + id + ', Ack = ' + ackCount + ', Multi = ' + multi);
                    lastPlay = id;
                    for (var key in appPorts) {
                        if (appPorts[key] && key != id) {
                            ackCount++;
                            appPorts[key].web.postMessage({type: 'e_stop'});
                        }
                    }
                }
            }
        } else if (cmd === 'e_stop_success') {
            console.log('GET STOP: ID = ' + id + ', Ack = ' + ackCount + ', Last = ' + lastPlay + ', Multi = ' + multi);
            if (--ackCount === 0) appPorts[lastPlay].web.postMessage({type: 'e_play_success'});
        } else if (cmd === 'e_multi_inst') {
            // turn on multi instance mode if value is non-zero
            if (!ackCount || multi === obj.value) {
                console.log('GET MULTI INST: ID = ' + id + ', value = ' + obj.value + ', Multi = ' + multi + ' --> OK');
                multi = obj.value;
                appPorts[id].web.postMessage({type: 'e_multi_inst_succ'});
            } else {
                console.log('GET MULTI INST: ID = ' + id + ', value = ' + obj.value + ', Multi = ' + multi + ' --> FAIL');
                appPorts[id].web.postMessage({type: 'e_multi_inst_fail'});
            }
        }
        else if (cmd === 'e_inst_cnt') {
            var x = 0;
            for (var key in appPorts) if (appPorts[key]) ++x;
            console.log('GET INST COUNT: ID = ' + id + ', cnt = ' + x);
            appPorts[id].web.postMessage({type: 'e_inst_cnt', value: x});
        }
        else {
            try {
                ext2helper.postMessage(obj);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
}
function onNativeMessage(id, ext2web) {
    return function (message) {
        var obj = eval(message);
        var port = obj.port;
        var brandVersion = obj.brandVersion;
        console.log('ID = ' + id + ' get port = ' + port + ' get brand version = ' + brandVersion);
        //var toWebMsg = {type: 'message', port: port};
        //if (brandVersion)
        //   toWebMsg.brandVersion = brandVersion;
        obj.type = 'message';
        ext2web.postMessage(obj);
    }
}

function onDisconnected(id, ext2web) {
    return function () {
        var legalExit = (chrome.runtime.lastError && chrome.runtime.lastError.message.length) ?
            (chrome.runtime.lastError.message == 'Native host has exited.') : false;
        console.log('ID = ' + id + ' disconnect from host with legalExit = ' + legalExit);
        try {
            ext2web.postMessage({type: (legalExit ? 'HostClosed' : 'HostNotInstalled')});
        } catch (e) {
            console.log(e);
        }
        appPorts[id] = undefined;
    }
}

chrome.runtime.onConnectExternal.addListener(function (connect) {
    var Ext2Web = connect;
    appPorts[++count] = {web: Ext2Web};
    var Ext2Helper = chrome.runtime.connectNative("com.minervanetworks.chrome.plugin.helper");
    Ext2Web.onMessage.addListener(onWebMessage(count, Ext2Helper));
    Ext2Helper.onMessage.addListener(onNativeMessage(count, Ext2Web));
    Ext2Helper.onDisconnect.addListener(onDisconnected(count, Ext2Web));
});

chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
    sendResponse(true);
});