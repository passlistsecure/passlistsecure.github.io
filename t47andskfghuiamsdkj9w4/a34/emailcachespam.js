/* global $ */
/* global Firebase */
/* global sjcl */
$("#passwords").hide();
var time = 1;
$("#error").hide();
var username = null;
var password = null;
$("#submit").click(onclick);
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
    $("#passwords").show();
    $("#main").hide();
    $("#main").remove();
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
            console.log(response.userpass);
            //decrypted = sjcl.decrypt(masterPassword, response.userpass);
    
            decrypted = atob(sjcl.decrypt(masterPassword, JSON.stringify(response.userpass)));
        //    showLogIn();
        } catch (e) {
            if (!reloading) {
                alert('Wrong password!');
                reloading = true;
                window.location.reload();
            }
        }
        
        var username = decrypted.split(',')[0];
        var password = decrypted.split(',')[1];
    
        

        $("#password-list").append('<tr><th>' + response.website + '</th><th>' + username + '</th><th><span class="password" id="' + response.website + '-password">' + password + '</th><th><a onclick="show(\'' + response.website + '\')" onrelease="hide(\'' + response.website + '\', \'' + password + '\')" id="' + response.website + '-visibility">Show</a> | <a class="btn" data-clipboard-text="' + password + '">Copy to clipboard</a> | <a onclick="edit(\'' + response.website + '\')">edit</a> | <a onclick="del(\'' + response.website + '\')">delete</a></th></tr>');     
    }
}
function show(website, password) {
    $("#" + website + "-password").html(password);
}
function hide(website) {
    $("#" + website + "-password").html("*******");

}
function edit(website) {
    
}
function del(website) {
    
}
function add(website) {
    
}