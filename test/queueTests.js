var assert = require('assert');
const express = require('express');
var queueManager = require('../queue/queueManager');
var Queue = require('../queue/queue');
var emitter = require('../queue/myEmitter');
var uuid = require('node-uuid');


// var queue = new Queue();

describe ("asdasd",function () {
    it("asdsads",function () {

        var q = new Queue();
        var element;
        var id = uuid.v1();
        if(q.getQueueSize() > 0){
            element = q.dequeue();
        }
        else {
            emitter.on("message",id, function (value) {
                console.log("value is : " + value);
            });
        }
        console.time("Emitters");
        // setTimeout(emitter.emitOnTimeout("message", id, "none"),10000);
        setTimeout(emitter.emit("message",5),12000);



    })
})
//
// beforeEach(function() {
//     queue.clearQueue();
// });
//
//
// describe('Enqueue Test', function () {
//     it("Checks enqueue method for increasing queue size", function () {
//         var currentSize = queue.getQueueSize();
//         queue.enqueue("1");
//         queue.enqueue("2");
//         assert((currentSize += 2) == queue.getQueueSize());
//     })
// });
//
// describe("Enqueue null element", function () {
//     it("Queue should not enqueue null or undefined element and throw error", function () {
//
//         assert.throws( queue.enqueue, Error, "incorrect null value");
//         assert.throws(function () {queue.enqueue(null)}, Error);
//         assert(queue.getQueueSize() === 0);
//     })
// });
//
// describe('Dequeue FIFO', function () {
//     it('Checks FIFO condition', function () {
//         queue.enqueue("first");
//         queue.enqueue("second");
//         queue.enqueue("third");
//
//         var element = queue.dequeue();
//         assert(element === "first");
//         element = queue.dequeue()
//         assert(element === "second");
//         element = queue.dequeue()
//         assert(element === "third");
//     })
// });
//
// describe('Dequeue test', function () {
//     it('Check dequeue method for removing element', function () {
//
//         queue.enqueue("1");
//         queue.dequeue();
//         assert(queue.getQueueSize() === 0);
//     })
// });
//
// describe('Dequeue from empty', function () {
//     it('Check exception throwing', function () {
//
//         assert.throws(queue.dequeue, Error, "No such element");
//
//     })
// });
//
// describe('snapshot test', function () {
//     it('check snapshot changes', function () {
//
//         queue.enqueue("first");
//         queue.enqueue("second");
//
//         assert(queue.getSnapshot().length ===2);
//         assert(queue.getSnapshot().indexOf("first") > -1)
//
//         queue.dequeue()
//
//         assert(queue.getSnapshot().length ===1 );
//         assert(queue.getSnapshot().indexOf("first") === -1)
//         assert(queue.getSnapshot().indexOf("second") > -1)
//
//     })
// });
