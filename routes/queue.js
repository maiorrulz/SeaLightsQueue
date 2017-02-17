var express = require('express');
var router = express.Router();
var queueManager = require('../queue/queueManager');

/* Delete element from queue */


router.get('/queue/:qname/longpoll', function (req, res, next) {

    try {
        var qname = req.params.qname;

        var callback = function (value) {
            result = "<h1>" + valuse + "</h1>"
            res.send(result);
        }

        queueManager.longPollRequest(qname, callback);
    } catch(ex) {
        res.status(405).send(ex.message);
    }

});

router.post('/', function (req, res, next) {
    try {
        var qname = req.body.qname;
        queueManager.createNewQueue(qname);
        res.status(200).send("Great Success")
    } catch (ex) {
        res.status(405).send(ex.message);
    }
});

/* Dequeue element*/
router.post('/queue/:qname', function(req, res, next) {
    try {
        var qname = req.params.qname;
        var element = queueManager.dequeueElement(qname);
        res.send(element);
    } catch (ex) {
        res.status(405).send(ex.message);
    }
});

/* insert element to queue */
router.put('/queue/:qname', function (req, res, next) {
    var element = req.body.element;
    var qname = req.params.qname;
    // if(element === undefined || element == null || element.length <= 0)
    try {

        queueManager.enqueueElement(element, qname);
        res.send("Great Succe ss");
    } catch (ex) {
        res.status(405).send(ex.message);
    }

});

/*Get current queue status*/
router.get('/queue/:qname', function (req, res, next) {
    var qname = req.params.qname;
    try {

        var q = queueManager.getQueueSnapshot(qname);
        res.status(200).send(q);
    }catch (ex) {

        res.status(405).send(ex.message);
    }

})

/**
 * Get all queues
 */
router.get('/allqueues', function (req, res, next) {

    res.send(queueManager.getAllQueueName());
})

module.exports = router;