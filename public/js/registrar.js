var URL = 'http://localhost:8080/sprint0-api/users';

//var lastFilename;

$("#register-submit-btn").click(function(e){
	
	e.preventDefault();
	//$("#result").text('');
	
	var nuevoTodo ;
	//if($('#file_name').val() == "" && $('#descripcion').val()=="" && $('#fecha').val()=="" || $('#tamano').val() == "" && $('#tags').val()=="" && $('#url').val()==""){
	
	//	$('<div class="alert alert-info">Debes rellenar los campos Descripcion, Nombre de Archivo y Comentario</div>').appendTo($("#gist_result"));
	//}
	//else{
	if($('#name').val() == "" && $('#email').val()=="" && $('#password').val()=="" && $('#username').val() == ""){
		$('<div class="alert alert-info">Debes rellenar los campos Descripcion, Nombre de Archivo y Comentario</div>');
	}
    else{		

		nuevoTodo = {
			"name" : $('#name').val(),
			"email" : $('#email').val(),
			"username" : $('#username').val(),
			"password" : $('#password').val(),
			
					
		}
		console.log (nuevoTodo);
		createFile(nuevoTodo);
	}
			
});

function createFile(nuevoTodo) {

	var url = URL;
	var data = JSON.stringify(nuevoTodo);
	
	
	//$("#result").text('');
console.log(data);

	$.ajax({
		
        url : url,
		contentType: 'application/vnd.sprint.api.user+json',
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
		
	}).done(function(data, status, jqxhr) {
		console.log(data);
		//$('<div class="alert alert-success"> <strong>Ok!</strong> File Created</div>').appendTo($("#result"));	
        $("#name").val("");
		$("#email").val("");
		$("#password").val("");
		$("#username").val("");		
  	}).fail(function() {
		//$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#result"));
	});

}

