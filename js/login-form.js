
$(document).ready(function () {
    if ($.cookie('secure_token') == undefined) {
        $('#login-form').css('visibility', 'visible');
        $('#logout').css('visibility', 'hidden');
    } else {
        $('#logout').css('visibility', 'visible');
        $('#logout .btn').html('Logout, ' + $.cookie('first_name'));
        $('#login-form').css('visibility', 'hidden');
    };
    var login_url = $.cookie('tfg_api_host') + '/authorize/user';
    $("#login-form").submit(function (event) {
        $('.submit-button').attr("disabled", "disabled");
        $.ajax({    url: login_url,
            type:'POST',
            dataType:'json', xhrFields:{
                withCredentials:true
            },
            data:{ 'email':$('#login-email').val(), 'password':$('#login-password').val() }
            }).done(function (data) {
                location.reload();
            })
            .fail(function (jqXHR, textStatus, ex) {
                console.log("Request failed: " + jqXHR.readyState + "," + jqXHR.status + ":" + +jqXHR.statusText + "," + jqXHR.responseText + "," + textStatus + "," + ex);
            });
        // prevent the form from submitting with the default action
        return false;
    });
    $("#logout").click(function() {
        $.removeCookie('secure_token');
        location.reload();
    });

});
