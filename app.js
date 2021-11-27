const cli = require('./cli');
const helpers = require('./helpers')


async function init() {
    var option = await helpers.askAndReturn("Type 'all' to print all tickets, or a ticket id to print details about certain ticket: ");

    if(option == "all") {
        cli.printAllTickets();
    } else if(/^\d+$/.test(option)) {
        cli.printTicket(option);
    } else {
        console.log("Input is wrong! Quiting CLI");
    }
}


init();