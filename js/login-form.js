
$(document).ready(function () {
    if ($.cookie('secure_token') == undefined) {
        $('#login-form').css('visibility', 'visible')
    }
    $("#login-form").submit(function (event) {
        $('.submit-button').attr("disabled", "disabled");
        $.ajax({    url:'http://api.stage.tfg.ladro.com/authorize/user',
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
