

var Queue = function () {

};

(function () {

    var queue = [];

    /**
     * Enqueue element to Queue. Element goes to the end of queue
     *
     * @param element - element to enqueue. Cannot be undefined or nulll
     */
    Queue.prototype.enqueue = function (element) {

        console.log("Pushing Element : " + element);
        if (element !== undefined && element !== null)
            queue.push(element);
    };


    /**
     * Dequeue from the head of queue.
     * The most old element will be returned
     * @returns {*} return dequeued element or throw exception if queue is  empty.
     */
    Queue.prototype.dequeue = function () {
        if (queue.length > 0) {
            var i = queue.shift();
            console.log("Shifting Element " + i);
            return i;
        }
        else {
            throw new Error("nothing to dequeue");
        }
    };

    /**
     * Get current status of elements (snapshot) in queue.
     * @returns {Array} queue array
     */
    Queue.prototype.getSnapshot = function () {
        console.log("Snapshot : " + this.queue);
        return queue;
    };

    /**
     * Get queue size
     * @returns {Number} - number of elements in queue
     */
    Queue.prototype.getQueueSize = function () {

        return queue.length;
    };

    /**
     * Clear Queue
     */
    Queue.prototype.clearQueue = function () {

        queue.length =0;
    };
})();

module.exports = new Queue();