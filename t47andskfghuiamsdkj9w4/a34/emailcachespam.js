
/* global atob btoa Firebase sjcl $*/
$("#passwords").hide();
var time = 1;
$("#error").hide();
var username = null;
var password = null;
$("#submit").click(onclick);
$(document).keypress(function(e) {
    if(e.which == 13) {
        onclick();
    }
});
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
    
        

        $("#password-list").append('<tr><th>' + response.website + '</th><th id="' + response.website + '-username">' + username + '</th><th><span class="password" id="' + response.website + '-password">*******</th><th><a onclick="show(\'' + response.website + '\', \'' + password + '\')" id="' + response.website + '-visibility">Show</a> | <a onclick="edit(\'' + response.website + '\', \'' + username + '\', \'' + password + '\')">edit</a> | <a onclick="del(\'' + response.website + '\')">delete</a></th></tr>');     
    }
}
function decrypt(data, password) {
    var desjcl = sjcl.decrypt(password, data);
    console.log(data);
    return atob(desjcl);
}
function encrypt(data, password) {
    var baseenc = btoa(data);
    console.log(data);
    sjcl.encrypt(password, baseenc);
    return data;
}
function show(website, password) {
    $("#" + website.replace(".", "\\.") + "-visibility").attr("onclick", "hide('" + website + "', '" + password + "')");
    $("#" + website.replace(".", "\\.") + "-visibility").html("Hide");
    $("#" + website.replace(".", "\\.") + "-password").html(password);
}
function hide(website, password) {
    $("#" + website.replace(".", "\\.") + "-visibility").attr("onclick", "show('" + website + "', '" + password + "')");
    $("#" + website.replace(".", "\\.") + "-visibility").html("Show");
    $("#" + website.replace(".", "\\.") + "-password").html("*******");

}
function edit(website, username, password) {
    $("#edit-websitename").html(website);

    $("#edit-username").val(username);
    $("#edit-password").val(password);

    $("#edit-website-save").attr("onclick", "editwebsite('" + website + "', $('#edit-username').val(), $('#edit-password').val())")
    $("#edit").modal();
}
function editwebsite(website, username, password) {
    console.log(website);
    console.log(username);
    console.log(password);
}
function del(website) {
    
}
function add(website) {
    
}