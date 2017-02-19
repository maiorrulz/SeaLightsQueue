/**
 * Module is singleton
 * @constructor
 */
function MyEmmiter() {
    this.events = {};
}
/**
 * Subscribe for event with unique id.
 * @param event - event to subscribw
 * @param uuid - id
 * @param listener - callback
 */
MyEmmiter.prototype.on = function (event, uuid, listener) {

    this.events[event] = this.events[event] || {};
    // listener.id = uuid;
    this.events[event][uuid] = listener;

}

/**
 * Call first listener with current subscribed event. Listener deleted after call
 * @param event - event name
 * @param value - argument passed to callback
 */
MyEmmiter.prototype.emit = function (event,value) {

    if(this.events[event]) {

        var listener = this.events[event].shift();
        if(listener) {
            listener(value);
        }
    }
}

/**
 * Call specific listener with id = uuid subscribed for event. Listener deleted after call
 * @param event - name of event
 * @param uuid - id
 * @param value - value passed to callback
 */
// MyEmmiter.prototype.emitOnTimeout = function (event, uuid, value) {
//
//     if(this.events[event]) {
//         var eventQueue = this.events[event];
//         var index;
//
//         eventQueue.forEach(function (listener) {
//             if(listener.id === uuid){
//                 index = eventQueue.indexOf(listener);
//                 listener(value);
//             }
//         })
//         if(index !== undefined && index > -1) {
//             this.events[event].splice(index,1);
//         }
//     }
// }
MyEmmiter.prototype.emitOnTimeout = function (event, uuid, value) {

    if(this.events[event]) {
        var eventQueue = this.events[event];

        lstr = eventQueue[uuid];
        if(lstr !== undefined)
        {
            lstr(value);
        }
        delete eventQueue[uuid];
    }
}

/**
 * Checks if queue of listeners is empty
 * @param event - name of listeners queue
 * @returns {boolean}
 */
MyEmmiter.prototype.isEventQueueEmpty = function (event) {

    if(this.events[event] === undefined){
        return true;
    }
    else if(this.events[event].length === 0) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = new MyEmmiter();