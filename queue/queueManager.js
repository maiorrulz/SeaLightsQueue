var Queue = require("../queue/queue");


/**
 * QueueManager is singleton, this way we do not need to use prototype.
 * @constructor
 */
var QueueManager = function () {

    var queueArray = {};
    /**
     *Create new queue with given name
     * @param name - name of queueu
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
     *Enqueue element to queue with given name
     * @param element - element to enqueue
     * @param name - name of queue to enqueue in.
     */
    this.enqueueElement = function (element, name) {

        var q = queueArray[name]
        if(q === undefined || q === null) {
            throw new Error("Undefined queue name");
        }
        q.enqueue(element);
    }
    /**
     *Dequeue element from named queue
     * @param name - name of the queue dequeue from
     * @returns {*} returns dequeued element
     */
    this.dequeueElement = function (name) {
        var q = queueArray[name]
        if(q === undefined || q === null) {
            throw new Error("Undefined queue name");
        }
        return q.dequeue();
    }

    /**
     *Get snapshot of named queue
     * @param name - name of queue
     * @returns {*} returns all element from queue(name)
     */
    this.getQueueSnapshot  = function (name) {

        var q = queueArray[name]
        if(q === undefined || q === null) {
            throw new Error("Undefined queue name");
        }
        return q.getSnapshot();
    }

    /**
     * Returns names of all created queues in the system
     * @returns {Array} name of all queues
     */
    this.getAllQueueName = function () {

        return Object.keys(queueArray);
    }

    //***************FOR Testing Purposes *************

    this.clearAllQueues = function () {
        queueArray = {};
    }

    this.injectQueue = function (name, queue) {
        queueArray[name] = queue;
    }
    this.getQueue = function (name) {
        var q = queueArray[name];
        if(q !== undefined && q !==null) {
            return Object.create(q);
        } else {
             return null;
        }
    }
}

module.exports = new QueueManager();