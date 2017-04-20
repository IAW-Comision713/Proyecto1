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
        opcion.attr("class", "collection-item");
        
        opcion.click(function(){
            
            actualizarReloj(nombre, nom);
        });
        
        item.append(opcion);
        lista.append(item);
      
    }
    
    div.append(lista);
}

function actualizarReloj(parte, elegido) {
    
    $("#"+parte).attr('src', "img/"+elegido.imagen);
}

