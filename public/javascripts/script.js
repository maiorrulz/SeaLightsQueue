// Code goes here
var qlist=[];
const BASE_URL = window.location.origin;
$(function() {

    $.ajax({
        url: BASE_URL + "/queuecontainer/allqueues",
        type: "get",
        success: function (response) {
            console.log(response);
            for(i=0; i < response.length ; i++) {
                $("body").append(appendQueue(response[i]));
            }
        },
        error: function (xhr) {
            alert(xhr);
        }
    });


    $(".q-create").on('click', function(){
        var qname = $("#q-name").val();
        if(qname.indexOf(" ") > -1) {
            qname = qname.substr(0, qname.indexOf(" "));
        }
        var newQueueContainer = appendQueue(qname);

        $.ajax({
            url: BASE_URL + "/queuecontainer/",
            type: "post",
            data: {qname:qname},
            success: function (response) {
                $("body").append(newQueueContainer);
                $("#q-name").val("");
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });

    });


    //
    $('body').on('click', '.enqueue-btn', function () {
        var queue_name = $(this).parents('.queue-container').data('queue_name');
        console.log('queue name', queue_name);

        var element = $("#" + queue_name).val();
        $("#" + queue_name).val("");
        if(element === undefined || element == null || element.length <= 0 )
        {
            return;
        }
        $.ajax({
            url: BASE_URL + "/queuecontainer/queue/" + queue_name,
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
            url: BASE_URL + "/queuecontainer/queue/" + queue_name,
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
            url: BASE_URL + "/queuecontainer/queue/" + queue_name,
            type: "get",
            success: function(response) {
                console.log("handleUnconnectedUser Response : " + response);
                $("." +queue_name).text("[" + response + "]");
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
        "<lable class='label-q "+ name +"'>[]</lable>" +
        "<p>" +
        "<button type='button' class='btn btn-primary btn-sm enqueue-btn'>Enqueue</button>" +
        "<input type='text' id='" + name +"' class='enqueue-val'>" +
        "</p>" +
        "<p><button type='button' class='btn btn-primary btn-sm dequeue-btn'>Dequeue</button></p>" +
        "<button type='button' class='btn btn-primary btn-sm snapshot-btn'>Snapshot</button>" +
        "</div>";

    var $queueContainer = $(q);
    $queueContainer.data('queue_name', name);

    return $queueContainer;
}
