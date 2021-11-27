const zendeskService = require('./service/zendeskservice');
const helpers = require("./helpers");
const console = require('console');

const GET_ALL_TICKETS_FIELDS = ["id", "subject", "status", "priority", "type", "due_at", "assignee_id", "requester_id", "tags"];

async function printAllTickets() {
    let nextPageNumber = "1";
    let cont = true;

    while(nextPageNumber && cont) {
        let response = await zendeskService.getAllTickets(nextPageNumber);

        console.log(zendeskService.getFormattedTableForManyTickets(response.response.payload.tickets, GET_ALL_TICKETS_FIELDS).toString());

        nextPageNumber = response.nextPageNumber;
        if(nextPageNumber) {
            cont = await helpers.askAndCheckExpteced("it");
        }
    }
}

async function printTicket(id) {
    let response = await zendeskService.getTicket(id);
    let ticket = response.response.payload.ticket;

    // console.log(ticket)
    console.log("------------------------------------------------------------------------------------------------------------");
    console.log(`Ticket ID: ${(ticket.id)}`);

    console.log(`\nSubject: ${ticket.subject}`);

    console.log(`\nPriority: ${ticket.priority}`);
    console.log(`Status: ${ticket.status}`);
    console.log(`Type: ${ticket.type}`);

    console.log(`\nDue at: ${ticket.due_at}`);
    console.log(`Created at: ${ticket.created_at}`);
    console.log(`Updated at: ${ticket.updated_at}`);

    console.log(`\nRequester ID: ${ticket.requester_id}`);
    console.log(`Assignee ID: ${ticket.assignee_id}`);
    console.log(`Submitter ID: ${ticket.submitter_id}`)

    console.log(`\nFollower IDs: ${ticket.follower_ids}`);
    console.log(`Email CC IDs: ${ticket.email_cc_ids}`);

    console.log(`\nDescription: \n`);
    console.log(`${ticket.description}\n\n`);

    console.log(`Tags: ${ticket.tags}`)
    console.log("------------------------------------------------------------------------------------------------------------");
    
}


module.exports = {
    printAllTickets,
    printTicket
}