// Code goes here
var qlist=[];

$(function() {
    $(".q-create").on('click', function(){
        var newQueueContainer = appendQueue($("#q-name").val());

        $("#q-name").val("");

        $("body").append(newQueueContainer);
    });

    $('body').on('click', '.enqueue-btn', function () {
        var queue_name = $(this).parents('.queue-container').data('queue_name');
        console.log('queue name', queue_name);

        var element = $(".enqueue-val").val();
        $(".enqueue-val").val("");
        if(element === undefined || element == null || element.length <= 0 )
        {
            return;
        }
        $.ajax({
            url: "http://localhost:3000/queue",
            type: "put",
            data:{element:element},
            success: function(response) {
                console.log("handleUnconnectedUser Response : " + response);
            },
            error: function(xhr) {
                console.log("Error has occured:" + xhr);
            }
        });
    });

    $('body').on('click', '.dequeue-btn', function () {
        var queue_name = $(this).parents('.queue-container').data('queue_name');
        console.log('queue name', queue_name);

        $.ajax({
            url: "http://localhost:3000/queue",
            type: "post",
            success: function(response) {
                console.log("handleUnconnectedUser Response : " + response);
            },
            error: function(xhr) {
                console.log("Error has occured:" + xhr);
            }
        });
    })


    $('body').on('click', '.snapshot-btn', function () {
        var queue_name = $(this).parents('.queue-container').data('queue_name');
        console.log('queue name', queue_name);
        $.ajax({
            url: "http://localhost:3000/queue",
            type: "get",
            success: function(response) {
                console.log("handleUnconnectedUser Response : " + response);
                $(".label-q-1").text("[" + response + "]");
            },
            error: function(xhr) {
                console.log("Error has occured:" + xhr);
            }
        });
    })

});

function appendQueue(name) {
    var q = "<div class='queue-container queue q-" + name +"'> " +
        "<h4 class='q-title'>"+ name +"</h4>" +
        "<lable class='label-q'>[]</lable>" +
        "<p>" +
        "<button type='button' class='btn btn-primary btn-sm enqueue-btn'>Enqueue</button>" +
        "<input type='text' class='enqueue-val'>" +
        "</p>" +
        "<p><button type='button' class='btn btn-primary btn-sm dequeue-btn'>Dequeue</button></p>" +
        "<button type='button' class='btn btn-primary btn-sm snapshot-btn'>Snapshot</button>" +
        "</div>";

    if(name === undefined || name == null || name.length <= 0 || qlist.indexOf(name) >= 0) {
        return;
    }

    qlist.push(name);
    console.log(qlist);

    var $queueContainer = $(q);
    $queueContainer.data('queue_name', name);

    return $queueContainer;
}
