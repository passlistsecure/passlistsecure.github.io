/* global $ */
/* global Firebase */


$("#error").hide();
var time = 1;
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
    if (username === undefined || username === null || username === '') {
        window.location.reload();
    }
    var masterPassword = password;
    var reloading = false;
    var ref = new Firebase('passspam.firebaseio.com/' + username);
    
    ref.on('child_added', function(snapshot) {
        addListPassword(snapshot.val());
    });
    
    
    
    var userList = new List('password-list', {
        valueNames: ['website', 'username', 'password'],
        item: '<li><a class="website small-margin" onclick="window.location.href = \'http://\' + this.innerHTML"></a><p class="username small-margin"></p><p class="password small-margin"></p></li>'
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
        
        
        userList.add({
            website: response.website,
            username: username,
            password: password
        });
    }
}