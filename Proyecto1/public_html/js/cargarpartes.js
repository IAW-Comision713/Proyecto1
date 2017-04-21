var personalizables;


$(function() {
    var ajax = new AJAXInteraction("data/personalizables.json", function(data) {
        personalizables = data;
        cargarpartes(data);
    });
    ajax.doGet();
    
   $('.collapsible').collapsible(); 
});

function cargarpartes(data) {
    
    for(var parte in data) {
        
        var item = $("<li></li>");
        
        cargarmenu(parte, item);
        cargaropciones(parte, data[parte], item);
        
        $("#partes").append(item);
    }
}

function cargarmenu(parte, item) {
    
     var link = $("<div></div>").attr("class", "collapsible-header").text(parte);
     item.append(link);
}

function cargaropciones(nombre, opciones, li) {
    
    var div = $("<div></div>").attr("class", "collapsible-body");
    
    li.append(div);
    
    var lista = $("<ul></ul>");
    
    var index;
    var item;
    for (index = 0; index < opciones.length; ++index) {
        
        var nom = opciones[index];

        var item = $("<li></li>");
        var opcion = $("<div></div>").text(opciones[index].nombre);
        item.append(opcion);
        lista.append(item);
        
        opcion.attr("class", "collection-item");
        opcion.attr("id",nombre+"op"+index);
        
        //opcion.click(click(nombre, nom));
        
        
        
    }
    
    div.append(lista);
    $(".collection-item").on('click',function() {
	var oID=$(this).attr("id");         
        
        var elem= $("#"+oID).parent().parent().parent().siblings(); //aca estoy en el div con el nombre de la parte
        
        var padre= elem[0]; 
        var padreNom=padre.attr("innerHTML"); //no funcionaa
        var nombre= $("#"+oID).attr("text");
        
        actualizarReloj(padre,nombre);	   
        });
}




/*function click(nombre, nom) {
    return function(){
        actualizarReloj(nombre, nom);
    };
} */

function actualizarReloj(parte, elegido) {
    
    $("#"+parte).attr('src', "img/"+elegido.imagen);
}

