var express = require('express');
var router = express.Router();
var queueManager = require('../queue/queue');

/* Delete element from queue */

router.post('/', function(req, res, next) {
    try {
        var element = queueManager.dequeue();
        res.send(element);
    } catch (ex) {
        res.send(ex.message);
    }
});

/* insert element to queue */
router.put('/', function (req, res, next) {
    var element = req.body.element;
    if(element === undefined || element == null || element.length <= 0)
    {
        res.send("No such element");
    }
    queueManager.enqueue(element);
    res.send("Great Success");

});

/*Get current queue status*/
router.get('/', function (req, res, next) {
    res.send(queueManager.getSnapshot());
})

module.exports = router;