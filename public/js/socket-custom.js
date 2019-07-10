var socket = io();
socket.on('connect', function(){
    console.log('Conectado al servidor');     
})
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
    
})

socket.on('enviarMensaje', function(res){
    console.log('Respuesta Server', res);
})

//Los emit son para enviar información, on es para escuchar info
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola mundo'
}, function(resp){
    console.log(resp);
})