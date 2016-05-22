/* global atob btoa Firebase sjcl List $*/
var options = {
  valueNames: [ 'name', 'born' ]
};

var userList = new List('passwords', options);

$("#passwords").hide();
var websiteids = [];
var fulllist = "";
var time = 1;
$("#error").hide();
var username = null;
var password = null;
$("#submit").click(onclick);
$(document).keypress(function(e) {
    if (e.which == 13) {
        onclick();
    }
});

function decrypt(data, password) {
    var desjcl = sjcl.decrypt(password, data);
    console.log(data);
    return atob(desjcl);
}

function encrypt(data, password) {
    var baseenc = btoa(data);
    console.log(baseenc);
    var enc = sjcl.encrypt(password, baseenc);
    return enc;
}

function onclick() {
    if (time === 1) {
        console.log(1);
        username = $("#email").val();
        $("#error").show();
        $("#email").val("");
        $("#email").attr("type", "password");

        time = 2;
    }
    else {
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

            decrypted = decrypt(JSON.stringify(response.userpass), masterPassword);
            //    showLogIn();
        }
        catch (e) {
            if (!reloading) {
                alert('Wrong password!');
                reloading = true;
                window.location.reload();
            }
        }

        var username = decrypted.split(',')[0];
        var password = decrypted.split(',')[1];
        websiteids.append({
            id: response.id,
            website: response.website,
            username: username
        })
        
        var toappend = '<tr><th>' + response.website + '</th><th id="' + response.website + '-username">' + username + '</th><th><span class="password" id="' + response.website + '-password">*******</th><th><a onclick="show(\'' + response.website + '\', \'' + password + '\')" id="' + response.website + '-visibility">Show</a> | <a onclick="edit(\'' + response.website + '\', \'' + username + '\', \'' + password + '\', \'' + response.id + '\')">edit</a> | <a onclick="del(\'' + response.website + '\', \'' + response.id + '\')">delete</a></th></tr>';
        $("#password-list").append(toappend);
        filllist.append(toappend);
        
    }
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

function edit(website, username, password, id) {
    $("#edit-websitename").html(website);

    $("#edit-username").val(username);
    $("#edit-password").val(password);

    $("#edit-website-save").attr("onclick", "editwebsite('" + website + "', $('#edit-username').val(), $('#edit-password').val(), '" + id + "')")
    $("#edit").modal();
}

function editwebsite(website, username, password, id) {
    ref.child().set({
        alanisawesome: {
            date_of_birth: "June 23, 1912",
            full_name: "Alan Turing"
        },
        gracehop: {
            date_of_birth: "December 9, 1906",
            full_name: "Grace Hopper"
        }
    });
}

function del(website) {

}

function add(website) {

}

function search(s) {
    if (s !== null) {
        var options = {
            keys: ['website', 'username'], // keys to search in
            id: 'id' // return a list of identifiers only
        }
        var f = new Fuse(websites, options);
        var result = f.search(s); // Fuzzy-search for pattern in variable s
        while (result.length > 0) {
            var current = result[1];
            result.shift()
            $("#password-list").append('<tr><th class="website">' + response.website + '</th><th class="username" id="' + response.website + '-username">' + username + '</th><th><span class="password" id="' + response.website + '-password">*******</th><th><a onclick="show(\'' + response.website + '\', \'' + password + '\')" id="' + response.website + '-visibility">Show</a> | <a onclick="edit(\'' + response.website + '\', \'' + username + '\', \'' + password + '\', \'' + response.id + '\')">edit</a> | <a onclick="del(\'' + response.website + '\', \'' + response.id + '\')">delete</a></th></tr>');
        }
    } else {
        
    }

}