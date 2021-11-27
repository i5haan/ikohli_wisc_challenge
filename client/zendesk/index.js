const axios = require('axios');
const config = require("../../config");

const PAGE_SIZE = 25;

async function getAllTickets(pageNumber) {
    var requestDetails = {
        method: `get`,
        url: `https://zccikohli.zendesk.com/api/v2/tickets.json?page=${pageNumber}&per_page=${PAGE_SIZE}`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Basic abcd'
        }
    };

    let payload;
    let status;

    try {
        let response = await axios(requestDetails);
        payload = response.data;
        status = response.status;
    } catch(e) {
        payload = e.response.data;
        status = e.response.status;
    }

    return {status, payload};
}

async function getTicketById(id) {
    var requestDetails = {
        method: `get`,
        url: `https://zccikohli.zendesk.com/api/v2/tickets/${id}.json`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Basic abcd'
        }
    };

    let payload;
    let status;

    try {
        let response = await axios(requestDetails);
        payload = response.data;
        status = response.status;
    } catch(e) {
        payload = e.response.data;
        status = e.response.status;
    }

    return {status, payload};
}

module.exports = {
    getAllTickets: getAllTickets,
    getTicketById: getTicketById
}