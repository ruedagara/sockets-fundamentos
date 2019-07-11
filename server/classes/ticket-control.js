const fs = require("fs");
const path = require("path");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];
    let data = require("../data/data.json");
    console.log(data);

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    } else {
      this.reiniciarConteo();
    }
  }

  siguiente() {
    this.ultimo += 1;
    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);
    this.grabaArchivo();
    return `Ticket ${this.ultimo}`;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];
    console.log("Se ha iniciado el sistema");
    this.grabaArchivo();
  }

  grabaArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    };

    let jsonDataString = JSON.stringify(jsonData);
    const dataPath = path.resolve(__dirname, "../data/data.json");
    fs.writeFileSync(dataPath, jsonDataString);
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return "No hay Tickets";
    }
    let numeroTicket = this.tickets[0].numero;
    this.tickets.shift();

    let atenderTicket = new Ticket(numeroTicket, escritorio);
    this.ultimos4.unshift(atenderTicket);
    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1); // Borra el ultimo
    }
    console.log("Ultimos 4");
    console.log(this.ultimos4);
    this.grabaArchivo();
    return atenderTicket;
  }

  getUltimos4() {
    return this.ultimos4;
  }
}

module.exports = {
  TicketControl
};
