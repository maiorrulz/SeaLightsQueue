var assert = require('assert');
const request = require('supertest');
const express = require('express');
var queueManager = require('../queue/queueManager');

const app = express();



describe('Helllo', function () {
   it("will be cool", function () {
        try {
            var vb = queueManager.getAllQueueName();
            queueManager.q
            queueManager.createNewQueue("bla");
            queueManager.createNewQueue("wow");
            queueManager.createNewQueue("sos");
            queueManager.enqueueElement("1", "bla");
            queueManager.enqueueElement("2", "bla");
            queueManager.enqueueElement("3", "bla");
            var t = queueManager.getAllQueueName();
            console.log("Deq element : " + queueManager.dequeueElement("bla"));
            console.log("Snapshot : " + queueManager.getQueueSnapshot("bla"));

            queueManager.createNewQueue("bla");
            console.log("Snapshot : " + queueManager.getQueueSnapshot("bla"));

            queueManager.createNewQueue("wow");
            console.log("Snapshot : " + queueManager.getQueueSnapshot("wow"));


        } catch (err) {
            console.log(err);
        }
   })
});

// var queue = require('../queue/queue');
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
//     it("Queue should not enqueue null idefined element", function () {
//         queue.enqueue(null);
//         queue.enqueue(undefined);
//
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
//
//         assert(element === "first");
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
