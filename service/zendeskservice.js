const zendeskClient = require('../client/zendesk');
var Table = require('cli-table');
const PAGE_PARAM_NAME = "page";


// This function is a wrapper for the api client
// It does some post processing of the response
// To get the next page number of the paginated response
// If there is no next page number, then we return undefined plus the response
// Or else it is the next page number plus the response;
async function getAllTickets(pageNumber) {
    let ticketResponse = await zendeskClient.getAllTickets(pageNumber);

    if(ticketResponse.status != 200) {
        throw ticketResponse.payload;
    }

    let nextPageUrl = ticketResponse.payload.next_page;

    if(!nextPageUrl) {
        return {response: ticketResponse}; 
    }


    let queryString = nextPageUrl.split("?")[1];

    let queryStringSplit = queryString.split("&");

    for(var i = 0; i < queryStringSplit.length; i++) {
        let paramSplit = queryStringSplit[i].split("=");

        if(paramSplit[0] == PAGE_PARAM_NAME) {
            return {response: ticketResponse, nextPageNumber: paramSplit[1]};;
        }
    }

    return {response: ticketResponse};

};

// This function is a wrapper for the api client
// It does some post processing of the response
// To get the next page number of the paginated response
// If there is no next page number, then we return undefined plus the response
// Or else it is the next page number plus the response;
async function getTicket(id) {
    let ticketResponse = await zendeskClient.getTicketById(id);
    if(ticketResponse.status != 200) {
        throw ticketResponse.payload;
    }

    return {response: ticketResponse};
};  

function getFormattedTableForManyTickets(tickets, fields) {
    var table = new Table({ head: fields, colWidths: [5, 60, 10, 10, 10, 14, 14, 14] });

    tickets.forEach((ticket) => {
        let tempArray = [];
        fields.forEach(field => {
            if(ticket[field]) {
                tempArray.push(ticket[field]);
            } else {
                tempArray.push("");
            }
            
        });
        table.push(tempArray);
    });
    
    return table;
};


module.exports = {
    getAllTickets: getAllTickets,
    getFormattedTableForManyTickets: getFormattedTableForManyTickets,
    getTicket
};