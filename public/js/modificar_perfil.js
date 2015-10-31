var API_BASE_URL = 'http://localhost:8080/sprint0-api/users';
var username;
username = getCookie('name');



$("#button_edit_gist").click(function(e) {
	e.preventDefault();

    var editProfile;
	if($('#edit_username').val() == "" || $('#edit_password').val()=="" || $('#iedit_name').val()=="" || $('#edit_email').val()==") {
		jAlert('Debes rellenar los campos obligatorios');
	}else{
	
	 editProfile = {
	          "username" : $("#edit_username").val(),
	          "password" : $("#edit_password").val(),
	          "name" : $("#edit_name").val(),
			  "email" : $("#edit_email").val()
	  }
	  }

	updateProfile(editProfile);
	}
});


function updateGist(editGist, id) {
	var url = API_URL + '/gists/' + id;
	var data = JSON.stringify(editGist);

	$("#edit_result").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#edit_result"));}
    	}
	}).done(function(data, status, jqxhr) {
				var gist = data;
				//$("#repos_result").text('');
				$("#comment_gist").val(gist.comentario);
				$("#descripcion_gist").val(gist.descripcion);
	
				console.log(data);
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Updated</div>').appendTo($("#edit_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#edit_result"));
	});

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




