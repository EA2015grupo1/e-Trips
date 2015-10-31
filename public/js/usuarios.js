var API_BASE_URL = 'http://localhost:8080/sprint0-api/users';
		var array = new Array();
$(document).ready(function(){
 lee_json();
});
 function lee_json() {
	 var url= API_BASE_URL + '/collection/';
    	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
		}).done(function(data, status, jqxhr) {
				
				var usuarios = data.users;
				
				$.each(usuarios, function(i, v) {
					var usuario = v;
					if (usuario.name!='Admin'){
					array[i]= usuario.username;
					$('<br><strong></strong> ' + usuario.name + '<br>').appendTo($('#usuarios'));
					var u= usuario;
					$('<a class="btn red-haze btn-sm dropdown-toggle" onclick="eliminar('+i+')" id="delete" align=right>Eliminar</a>').appendTo($('#usuarios'));
					$('<a class="btn red-haze btn-sm dropdown-toggle" onclick="actualizar('+i+')" id="actualizar" align=right>Actualizar</a><br>').appendTo($('#usuarios'));
					
					}
				});

			}).fail(function() {
		$("#usuarios").text("No hay usuarios.");
		});
}
function actualizar(pos){
	var username;

	for (i = 0; i < array.length; i++) { 
	if (pos==i){
		username = array[i];
		}
	}
	setCookie('name', username,1)
	window.location="extra_profile_account.html";

}
function eliminar (pos){
	
	var username;

	for (i = 0; i < array.length; i++) { 
	if (pos==i){
		username = array[i];
	}
    
}
jConfirm('Estas seguro de eliminarlo?', 'Eliminar Usuario', function(r) {
	
	if (r==true){
		var url = API_BASE_URL + '/' + username;

	$
			.ajax({
										
						url : url,
						type : 'DELETE',
						crossDomain : true,
						dataType : 'json',
					})
			.done(
					function(data, status, jqxhr) {

					  jAlert('Usuario Eliminado', 'Eliminar Usuario');
						window.location= "users.html";
						$('useres.html').ready(function(){
						});
					})
			.fail(
					function() {
						jAlert('Error al eliminar el usuario', 'Eliminar Usuario');
					});
	
	}
	
	
});

	
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
	
} 





