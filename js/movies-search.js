/**
 * Created with PyCharm.
 * User: cwilkes
 * Date: 8/23/12
 * Time: 1:20 AM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {
    var cache = {};
    function get_movie_popup( movie_id ){
        var value = cache[movie_id];
        if (! value) {
            $.ajax({ url:'http://api.stage.tfg.ladro.com/movies/popup/' + movie_id,
                type:'GET',
                dataType:'json', xhrFields:{
                    withCredentials:true
                }
            }). success( function(resp) {
                    value = resp['html'];
                    cache[movie_id] = value;
            });
        };
        return value;
    };


    $.ajax({    url:'http://api.stage.tfg.ladro.com/movies',
        type:'GET',
        dataType:'json', xhrFields:{
            withCredentials:true
        }
    })
        .done(function (data) {
            for (var pos in data['movies']) {
                var m = data['movies'][pos];
                var img = m['images'][0];
                var divBlock = '<div class="movie-container"><div class="movie" data-title="' + m['title'] + '">' +
                    '<img data-movietitle="' +  m['title'] + '" data-movieid="' + m['movie_id'] + '" class="movie-image" src="' + img['url'] + '" width="' + img['width'] +
                    '" height="' + img['height'] + '"/></div></div>';
                $(divBlock).appendTo('#movies');
                get_movie_popup(m['movie_id']);
            }
            $('.movie-image').hover(function (e) {
                var my_data = get_movie_popup($(this).data('movieid'));
                $('#movie-modal .modal-body').html(my_data);
                $('#myModalLabel').html($(this).data('movietitle'));
                $('#movie-modal').modal();
            }, function(e) {
                    $('#movie-modal .modal-body').html('');
                    $('#myModalLabel').html('');
                    $('#movie-modal').modal('hide');
                }
            );
        })
        .fail(function (jqXHR, textStatus, ex) {
            console.log("Request failed: " + jqXHR.readyState + "," + jqXHR.status + ":" + +jqXHR.statusText + "," + jqXHR.responseText + "," + textStatus + "," + ex);
        })
        .always(function () {
            console.log("complete");
        });



});
