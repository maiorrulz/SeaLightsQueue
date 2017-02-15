var assert = require('assert');
const express = require('express');
var queueManager = require('../queue/queueManager');
var Queue = require('../queue/queue');



beforeEach(function() {
    queueManager.clearAllQueues();
});


describe("Create new queue",function () {
    it("Creates queue with given name", function () {

        var name = "myQ";
        queueManager.createNewQueue(name);
        var q = queueManager.getQueue(name);
        assert.notEqual(q, null);
        assert.notEqual(q, undefined);
    })
});

describe("create queue with same name",function () {
    it("doesn't create queue and throws error", function () {

        var name = "myQ";
        queueManager.createNewQueue(name);
        assert(function () {queueManager.createNewQueue(name)}, Error);
    })
})

describe("try to create queue with undefined name",function () {
    it("doesn't create queue and throws error", function () {

        assert.throws(function(){queueManager.createNewQueue(undefined)}, Error);
        assert.throws(function(){queueManager.createNewQueue(null)}, Error);
        assert.throws(function(){queueManager.createNewQueue("")}, Error);
    })
})


describe("enqueue element ",function () {
    it("element is in queue", function () {
        var name = "myQ";
        var element = "1";

        queueManager.createNewQueue(name);
        queueManager.enqueueElement(element, name);
        var q = queueManager.getQueue(name);
        assert(q._queue.indexOf(element) >=0);
    })
})


describe("enqueue element to undefined queue",function () {
    it("throws error", function () {
        var element = "1";

        assert.throws(function(){queueManager.enqueueElement(element)}, Error);
        assert.throws(function(){queueManager.enqueueElement(element, null)}, Error);
    })
})


describe("dequeue element from given queue",function () {
    it("dequeue and returns element", function () {

        var name = "myQ";
        var qu = new Queue();
        qu.enqueue("1");
        qu.enqueue("2");
        qu.enqueue("3");
        var size = qu.getQueueSize();
        queueManager.injectQueue(name, qu);
        assert.equal(queueManager.dequeueElement(name),"1");
        assert.equal(qu.getQueueSize(), size -1 );

    })
})


describe("dequeue element from undefined queue",function () {
    it("throws error", function () {

        assert.throws(function(){queueManager.dequeueElement()}, Error);
        assert.throws(function(){queueManager.dequeueElement( null)}, Error);
    })
})


describe("snapshot of queue",function () {
    it("returns snapshot of given queue", function () {

        var name = "myQ";
        var qu = new Queue();
        qu.enqueue("1");
        qu.enqueue("2");
        qu.enqueue("3");

        queueManager.injectQueue(name, qu);
        assert.equal(queueManager.getQueueSnapshot(name), qu._queue);

    })
})


describe("snapshot of undefined queue",function () {
    it("throws error", function () {

        assert.throws(function(){queueManager.getQueueSnapshot()}, Error);
        assert.throws(function(){queueManager.getQueueSnapshot(null)}, Error);
    })
})


describe("get all queue names",function () {
    it("returns names of all added queues", function () {

        var name1 = "q1";
        var name2 = "q2";
        var name3 = "q3";

        assert(queueManager.getAllQueueName().length ===0 );
        queueManager.createNewQueue(name1);
        var qNames = queueManager.getAllQueueName();

        assert(qNames.length ===1 );
        assert(qNames.indexOf(name1) > -1);

        queueManager.createNewQueue(name2);
        queueManager.createNewQueue(name3);
        qNames = queueManager.getAllQueueName();

        assert(qNames.length ===3 );
        assert(qNames.indexOf(name2) > -1);


    })
})


describe("multiple queues with enqueue dequeue commands",function () {
    it("every queue save it state, not matter actions on other queue", function () {

        var name1 = "q1";
        var name2 = "q2";
        var element1 = "1"
        var element2 = "2"
        var element3 = "3"
        var element4 = "4"
        queueManager.createNewQueue(name1);
        queueManager.createNewQueue(name2);

        queueManager.enqueueElement(element1, name1);
        queueManager.enqueueElement(element2, name1);

        assert.equal(queueManager.getQueue(name1).getQueueSize(), 2);
        assert.equal(queueManager.getQueue(name2).getQueueSize() , 0);

        queueManager.enqueueElement(element3,name2);
        queueManager.enqueueElement(element4,name2);
        queueManager.dequeueElement(name1);

        assert.equal(queueManager.getQueue(name1).getQueueSize(), 1);
        assert.equal(queueManager.getQueue(name2).getQueueSize() , 2);

        assert(queueManager.getQueue(name1)._queue.indexOf("2") > -1);
        assert(queueManager.getQueue(name2)._queue.indexOf("3") > -1);

    })
})

