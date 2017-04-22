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
        
        opcion.attr("class", "collection-item");
        opcion.attr("id",nombre+"op"+index);
           
    }
    
    /*opcion.on("click", {"nombre":nombre, "op":nom}, function(e) {
            actualizarReloj(e.data.nombre, e.data.op);
        });*/
    
    div.append(lista);
    $(".collection-item").on('click',function() {
	var oID=$(this).attr("id");         
        var nombre= $(this).text();
        var padre= $("#"+oID).parent().parent().parent().siblings().text(); //aca estoy en el div con el nombre de la parte
        var op;
        
        for(var i in personalizables){
            if(i.toString()===padre){
                op=personalizables[i];
            }                
        }
        for(var j=0; j<op.length;j++)
            if(op[j].nombre.toString()===nombre){
                actualizarReloj(padre,op[j]);                
            }
          	   
        });
}

function actualizarReloj(parte, elegido) {
    
    $("#"+parte).attr('src', "img/"+elegido.imagen);
    modelo[parte]=elegido;
}

function limpiarReloj(){
    for(var parte in personalizables){
        $("#"+parte).attr("src","img/vacio.png");
    }
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
