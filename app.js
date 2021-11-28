const cli = require('./cli');
const helpers = require('./helpers')
const homedir = require('os').homedir();
const CONFIG_PATH = `${homedir}/.zendesk/config.json`;

const config = require('./config');


async function start() {
    var option = await helpers.askAndReturn("Type 'all' to print all tickets, or a ticket id to print details about a certain ticket: ");

    if(option == "all") {
        await cli.printAllTickets();
    } else if(/^\d+$/.test(option)) {
        await cli.printTicket(option);
    } else {
        console.log("Input is wrong! Please try again!");
    }
}

async function main() {
    config.loadConfig(CONFIG_PATH);
    while(1) {
        await start();
    }
}

main()