

var Queue = function () {

    this._queue = [];
};



    /**
     * Enqueue element to Queue. Element goes to the end of queue
     *
     * @param element - element to enqueue. Cannot be undefined or nulll
     */
    Queue.prototype.enqueue = function (element) {

        console.log("Pushing Element : " + element);
        if (element !== undefined && element !== null){
            this._queue.push(element);
        }else{
            throw new Error("incorrect null value")
        }
    };


    /**
     * Dequeue from the head of queue.
     * The most old element will be returned
     * @returns {*} return dequeued element or throw exception if queue is  empty.
     */
    Queue.prototype.dequeue = function () {
        if (this._queue.length > 0) {
            var i = this._queue.shift();
            console.log("Shifting Element " + i);
            return i;
        }
        else {
            return;
        }
    };

    /**
     * Get current status of elements (snapshot) in queue.
     * @returns {Array} queue array
     */
    Queue.prototype.getSnapshot = function () {
        return this._queue;
    };


    //*******************************FOR TESTING PURPOSES ************
    /**
     * Get queue size
     * @returns {Number} - number of elements in queue
     */
    Queue.prototype.getQueueSize = function () {

        return this._queue.length;
    };

    /**
     * Clear Queue
     */
    Queue.prototype.clearQueue = function () {

        this._queue.length =0;
    };

module.exports = Queue;