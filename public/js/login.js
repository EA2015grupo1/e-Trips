var API_BASE_URL_LOGIN = 'http://localhost:8080/sprint0-api';
var username;
var password;
$("#buttom_testuser").click(function(e) {
	e.preventDefault();
	if($('#user').val() == "" || $('#key').val()=="") {
		
		jAlert('Debes rellenar los campos Username y Password', 'Error al Logearse');
	
	}
	else{
		var x= document.getElementById("chequear").checked;
		if (x== true){
			setCookie('username', $("#user").val(),1)
			setCookie('password', $("#key").val(),1)
			username = getCookie('username');
			password = getCookie('password');
			
		}
		else{
			username= $("#user").val();
			password= $("#key").val();
			
		}
	
	GetRoles();
	login();
	}
});

function GetRoles() {
	
	var url= API_BASE_URL_LOGIN + '/users/roles/' +username;

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
					var rolename= data.rolename;
					setCookie('rolename', rolename,1)
						

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#result"));
	});

}

function login(){
	
	
	var user=new Object();
	var rolename = getCookie('rolename');
	var url= API_BASE_URL_LOGIN + '/users/login';
	user.username=username;
	user.password=password;
	var data = JSON.stringify(user);
	
	$.ajax({
		url:url,
		type:'POST',
		crossDomain: true,
		dataType:'json',
		contentType: 'application/vnd.sprint.api.user+json',
		data: data,
	}).done(function(data, status, jqxhr) {
				var info= data;
				if ((info.loginSuccessful == true)&&(rolename='administrador')){
					
				window.location.replace("users.html");

				}
				else {		
				jError('Contraseña incorrecta', 'Error al Logearse');
				
						      													
				
			}
		 

	}).fail(function() {
		jError('Usuario o contraseña incorrecto', 'Error al Logearse');	  
	});


}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
	
} 

function getCookie(cname) {

    var name = cname + "=";

    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);{
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);{}}
    }
    return "";
} 



