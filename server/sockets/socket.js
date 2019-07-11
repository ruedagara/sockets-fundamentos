const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");
const ticketControl = new TicketControl();

//Se dispara cuando un usuario se conecte
io.on("connection", client => {
  client.emit("estadoActual", { 
    actual: ticketControl.getUltimoTicket() ,
    ultimos4: ticketControl.getUltimos4()
  });
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguiente();
    console.log(`El siguiente Ticket es ${siguiente}`);
    callback(siguiente);
  });
  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: "El escritorio es necesario"
      });
    }
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);
    // Actualizar pantalla - notificar ultimos 4
    client.broadcast.emit("ultimos4",{
      ultimos4: ticketControl.getUltimos4()
    });
  });
});
