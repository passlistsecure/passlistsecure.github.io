/* global $ */
/* global Firebase */

var time = 1;
$("#error").hide();
var username = null;
var password = null;
$("#submit").click(onclick);
var ids = {};
function onclick() {
    if (time === 1) {
        console.log(1);
        username = $("#email").val();
        $("#error").show();
        $("#email").val("");
        $("#email").attr("type", "password");

        time = 2;
    } else {
        console.log(2);
        password = $("#email").val();
        console.log(username + " : " + password);
        login(username, password);
    }

}


function login(username, password) {
    if (username === undefined || username === null || username === '') {
        window.location.reload();
    }
    var masterPassword = password;
    var reloading = false;
    var ref = new Firebase('passspam.firebaseio.com/' + username);
    
    ref.on('child_added', function(snapshot) {
        addListPassword(snapshot.val());
    });
    
    

    
    
    function addListPassword(response) {
        // decoding
        var decrypted;
        try {
            decrypted = sjcl.decrypt(masterPassword, response.userpass);
            showLogIn();
        } catch (e) {
            if (!reloading) {
                alert('Wrong password!');
                reloading = true;
                window.location.reload();
            }
        }
        
        var username = window.atob(decrypted.split(',')[0]);
        var password = window.atob(decrypted.split(',')[1]);
        
        

        $("#password-list").append('<tr><th>' + response.website + '</th><th>' + username + '</th><th><span class="password hidden" id="' + response.website + '-password">' + password + '</span><span id="' + response.website + '-dots">******</span></th><th><a onclick="show(' + response.website + ')" onrelease="hide(' + response.website + ')" id="' + response.website + '-visibility">Show</a><a onclick="edit(' + response.website + ')">edit</a><a onclick="del(' + response.website + ')">delete</a></th></tr>');     
    }
}
function show(website) {
    $("#" + website + "-password").removeClass("hidden");
    $("#" + website + "-dots").addClass("hidden");
    $("#" + website + "-visibility").html("hide");
}
function hide(website) {
    $("#" + website + "-password").addClass("hidden");
    $("#" + website + "-dots").removeClass("hidden");
    $("#" + website + "-visibility").html("show");
}
function edit(website) {
    
}
function del(website) {
    
}
function add(website) {
    
}