var personalizables;

$(function() {
    var ajax = new AJAXInteraction("data/personalizables.json", function(data) {
        personalizables = data;
        cargarpartes(data);
    });
    ajax.doGet();
});

function cargarpartes(data) {
    
    for(var parte in data) {
        
        cargarmenu(parte);
        //cargaropciones(data[parte]);
    }
}

function cargarmenu(parte) {
    
     var partenueva = $("<li></li>").attr("class", "tab");
     var link = $("<a></a>").attr("href", "#"+parte).text(parte);
     partenueva.append(link);
    $("#partes").append(partenueva);
}

