var Queue = require("../queue/queue");



var QueueManager = function () {

    var queueArray = {};
    /**
     *
     * @param name
     */
    this.createNewQueue =  function  (name) {

        if(name === undefined || name === null || name.length < 1) {
            throw new Error("incorrect name");
        }
        if(queueArray[name] == undefined || queueArray[name] == null) {
            queueArray [name] = new Queue();
        }else {
            throw new Error("Queue already exists");
        }
    }
    /**
     *
     * @param element
     * @param name
     */
    this.enqueueElement = function (element, name) {

        var q = queueArray[name]
        if(q === undefined || q === null) {
            throw new Error("Undefined queue name");
        }
        q.enqueue(element);
    }
    /**
     *
     * @param name
     * @returns {*}
     */
    this.dequeueElement = function (name) {
        var q = queueArray[name]
        if(q === undefined || q === null) {
            throw new Error("Undefined queue name");
        }
        return q.dequeue();
    }

    /**
     *
     * @param name
     * @returns {*}
     */
    this.getQueueSnapshot  = function (name) {

        var q = queueArray[name]
        if(q === undefined || q === null) {
            throw new Error("Undefined queue name");
        }
        return q.getSnapshot();
    }

    /**
     *
     * @returns {Array}
     */
    this.getAllQueueName = function () {

        return Object.keys(queueArray);
    }
}

module.exports = new QueueManager();