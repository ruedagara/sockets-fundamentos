const { io } = require("../server");

//Se dispara cuando un usuario se conecte
io.on("connection", client => {
  console.log("Usuario Conectado");
  client.emit("enviarMensaje", {
    usuario: "Admin",
    mensaje: "Hola desde el server"
  });

  client.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  //Escuchar el cliente
  client.on("enviarMensaje", (data, callback) => {
    console.log(data);

    //Enviar mensaje a todos los usuarios conectados al server
    client.broadcast.emit('enviarMensaje', data)
  });
});
