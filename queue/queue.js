

var Queue = function () {

};

(function () {
    var queue = [];

    Queue.prototype.enqueue = function (element) {

        // QueueManager.responses[this.name].cb();

        console.log("Pushing Element : " + element);
        if (element !== undefined && element !== null)
            queue.push(element);
    };



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


    Queue.prototype.getSnapshot = function () {
        console.log("Snapshot : " + this.queue);
        return queue;
    };

    Queue.prototype.getQueueSize = function () {

        return queue.length;
    };
    Queue.prototype.clearQueue = function () {

        return queue.length =0;
    };
})();

module.exports = new Queue();