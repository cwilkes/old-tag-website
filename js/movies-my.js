/**
 * Created with PyCharm.
 * User: cwilkes
 * Date: 8/23/12
 * Time: 1:21 AM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {
    var my_movies_url = $.cookie('tfg_api_host') + '/movies/my';
    if ($.cookie('secure_token') != undefined) {
        $.ajax({    url: my_movies_url,
            type:'GET',
            dataType:'json', xhrFields:{
                withCredentials:true
            }
        })
            .done(function (data) {
                for (var pos in data['movies']) {
                    var m = data['movies'][pos]
                    var link = '<a href="/view/' + m['movie_id'] + '">' + m['movie_title'] + '</a>';
                    $('#my-movies').append('<div class="movie">' + link + '</div>');
                }
                console.log("success");
            })
            .fail(function (jqXHR, textStatus, ex) {
                console.log("Request failed: " + jqXHR.readyState + "," + jqXHR.status + ":" + +jqXHR.statusText + "," + jqXHR.responseText + "," + textStatus + "," + ex);
            })
            .always(function () {
                console.log("complete");
            });
    }
});
