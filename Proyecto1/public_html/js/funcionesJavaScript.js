var personalizables;
var modelo;

$(function() {
    var ajax = new AJAXInteraction("data/personalizables.json", function(data) {
        personalizables = data;
        cargarpartes(data);
        cargarpreestablecido(0);
    });
    ajax.doGet();
    
    $('.collapsible').collapsible();
    
    if(localStorage.getItem("estilo") !== null){ 
        
        cambiarestilo(localStorage.getItem("estilo"));
    }
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
        
        opcion.on("click", {"nombre":nombre, "op":nom}, function(e) {
            
            actualizarReloj(e.data.nombre, e.data.op);
        });      
    }
    
    div.append(lista);
}

function actualizarReloj(parte, elegido) {
    
    modelo[parte] = elegido;
    
    $("#"+parte).attr('src', "img/"+elegido.imagen);
}

function limpiarReloj(){
    
    cargarpreestablecido(0);
}

function cargarmodelo(modelo) {
    
    for(var parte in modelo) {
        
        actualizarReloj(parte, modelo[parte]);
    }
}

function cargarpreestablecido(id) {
    
    var ajax = new AJAXInteraction("data/preestablecidos.json", function(data) {
        
        modelo = data[id];
    });
    ajax.doGet();
    
    cargarmodelo(modelo);
}

function addFavoritos(){
    if(localStorage.getItem("favorito")!==null){
        
        Materialize.toast('Favorito reemplazado!', 4000);
    }
    else{
        
        Materialize.toast('Marcado como favorito!', 4000);
              
    }
    
    localStorage.setItem("favorito", JSON.stringify(modelo));
}

function aplicarFavorito() {
    
    if(localStorage.getItem("favorito")!==null){
       
        cargarmodelo(JSON.parse(localStorage.getItem("favorito")));
        
        Materialize.toast('Favorito cargado!', 4000);
    }
    else {
        
        Materialize.toast('No hay un modelo favorito guardado!', 4000);
              
    }
}

function descargarimagen() { 
        html2canvas($("#reloj"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                
                //borrar esta linea de abajo si no se usa
                //document.body.appendChild(canvas);

                canvas.toBlob(function(blob) {
					saveAs(blob, "Mireloj.png"); 
				});
            }
        });
 }
 
 function cambiarestilo(id) {
   
        $("#estilo").attr("href", "css/estilo"+id+".css");
        localStorage.setItem("estilo", id);
        
        $('.dropdown-button').dropdown('close');
 }
