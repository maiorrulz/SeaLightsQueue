var assert = require('assert');
const request = require('supertest');
const express = require('express');

const app = express();


var queueManager = require('../queue/queue');

beforeEach(function() {
    queueManager.clearQueue();
});



describe('Enqueue Test', function () {
    it("Checks enqueue method for increasing queue size", function () {
        var currentSize = queueManager.getQueueSize();
        queueManager.enqueue("1");
        queueManager.enqueue("2");
        assert((currentSize += 2) == queueManager.getQueueSize());
    })
});

describe("Enqueue null element", function () {
    it("Queue should not enqueue null idefined element", function () {
        queueManager.enqueue(null);
        queueManager.enqueue(undefined);

        assert(queueManager.getQueueSize() === 0);
    })
});

describe('Dequeue FIFO', function () {
    it('Checks FIFO condition', function () {
        queueManager.enqueue("first");
        queueManager.enqueue("second");
        queueManager.enqueue("third");

        var element = queueManager.dequeue();

        assert(element === "first");
    })
});

describe('Dequeue test', function () {
    it('Check dequeue method for removing element', function () {

        queueManager.enqueue("1");
        queueManager.dequeue();
        assert(queueManager.getQueueSize() === 0);
    })
});

describe('Dequeue from empty', function () {
    it('Check exception throwing', function () {

        assert.throws(queueManager.dequeue, Error, "No such element");

    })
});

describe('snapshot test', function () {
    it('check snapshot changes', function () {

        queueManager.enqueue("first");
        queueManager.enqueue("second");

        assert(queueManager.getSnapshot().length ===2);
        assert(queueManager.getSnapshot().indexOf("first") > -1)

        queueManager.dequeue()

        assert(queueManager.getSnapshot().length ===1 );
        assert(queueManager.getSnapshot().indexOf("first") === -1)
        assert(queueManager.getSnapshot().indexOf("second") > -1)

    })
});
