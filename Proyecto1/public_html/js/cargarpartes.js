var personalizables;
var modelo;


$(function() {
    var ajax = new AJAXInteraction("data/personalizables.json", function(data) {
        personalizables = data;
        cargarpartes(data);
        //cargarmodelo(data);
    });
    ajax.doGet();
    
   $('.collapsible').collapsible(); 
});


$(function(){
    if(localStorage.getItem("estilo")!==null){
        var estilo=localStorage.getItem("estilo");
        $("#estilo").attr("href",estilo);    
        $("#guardar i").text("turned_in");
    }
});

//$(function() {
/*function cargarmodelo(datos){
    var ajax=new AJAXInteraction("data/modelo1.json", function(dat) {
        modelo=dat;
    });
    ajax.doGet();
        for(var item in datos){
            inicializar(item,datos[item]);
        }
//});
}
function inicializar(item,opciones){
    var i=modelo.length;
    
    modelo[item]={"id":opciones[i].id,"nombre":opciones[i].nombre,"imagen":opciones[i].imagen};
  
}*/

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
    
    $("#"+parte).attr('src', "img/"+elegido.imagen);
    
    //modelo[parte]=elegido;
}

function limpiarReloj(){
    for(var parte in personalizables){
        $("#"+parte).attr("src","img/vacio.png");
    }
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

function guardarEstilo(){    
    
    if( localStorage.getItem("estilo")!==null){
        localStorage.removeItem("estilo");
        $("#guardar i").text("turned_in_not");        
    }
    else{
        var hrefEstilo= $("#estilo").attr("href");
        localStorage.setItem("estilo",hrefEstilo);
        $("#guardar i").text("turned_in");
    }
  
}

function addFavoritos(){
    if(localStorage.getItem("favorito")!==null){
        Materialize.toast('Favorito reemplazado!', 4000);
    }
    else{
        Materialize.toast('Marcado como favorito!', 4000);
              
    }
    localStorage.setItem("favorito",JSON.stringify(modelo));
    
    
    
}
