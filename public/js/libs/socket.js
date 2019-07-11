//Establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket');

socket.on("connect", function() {
  console.log("Conectado al Socket");
});

socket.on("disconnect", function() {
  console.log("Desconectado del Socket");
});

socket.on('estadoActual', function(estado){
    label.text(estado.actual)
})

$("button").on("click", function() {
  socket.emit("siguienteTicket", null, function(siguienteTicket){
        label.text(siguienteTicket)
  });
});
