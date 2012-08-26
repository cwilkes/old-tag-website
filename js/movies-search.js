/**
 * Created with PyCharm.
 * User: cwilkes
 * Date: 8/23/12
 * Time: 1:20 AM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {
    var movies_url = $.cookie('tfg_api_host') + '/movies';
    var movies_popup_url = movies_url + '/popup/';
    var cache = {};

    function get_movie_popup(movie_id) {
        var value = cache[movie_id];
        if (!value) {
            $.ajax({ url:movies_popup_url + movie_id,
                type:'GET',
                dataType:'json', xhrFields:{
                    withCredentials:true
                }
            }).success(function (resp) {
                    value = resp['html'];
                    cache[movie_id] = value;
                });
        }
        ;
        return value;
    }

    ;


    $.ajax({    url:movies_url,
        type:'GET',
        dataType:'json', xhrFields:{
            withCredentials:true
        }
    })
        .done(function (data) {
            for (var pos in data['movies']) {
                var m = data['movies'][pos];
                var img = m['images'][0];
                var divBlock = '<div class="movie" data-title="' + m['title'] + '">' +
                    '<div><img data-movietitle="' + m['title'] + '" data-movieid="' + m['movie_id'] + '" class="movie-image fadeover" src="' + img['url'] + '" width="' + img['width'] +
                    '" height="' + img['height'] + '"/></div></div>';
                $(divBlock).appendTo('#movies');
                get_movie_popup(m['movie_id']);
            };
            $(".fadeover").hover(function() {
                $(this).animate({
                    opacity: 0.2
                });
            }, function() {
                $(this).stop(true, true).animate({
                    opacity: 1
                });
            });
        })
        .fail(function (jqXHR, textStatus, ex) {
            console.log("Request failed: " + jqXHR.readyState + "," + jqXHR.status + ":" + +jqXHR.statusText + "," + jqXHR.responseText + "," + textStatus + "," + ex);
        })
        .always(function () {
            console.log("complete");
        });


});
