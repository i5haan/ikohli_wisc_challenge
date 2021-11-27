const axios = require('axios');
const config = require("../../config");
var token = require('basic-auth-token');


const PAGE_SIZE = 25;


function getAuthHeader() {
    let finalHeader;
    // API Token or
    if(config.getConfig().auth.token) {
        finalHeader = `Basic ${token(config.getConfig().auth.username + "/token", config.getConfig().auth.token)}`;
    } else {
        // Basic Auth
        finalHeader = `Basic ${token(config.getConfig().auth.username, config.getConfig().auth.password)}`
    }
    return finalHeader;
}

function getDomain() {
    return config.getConfig().domain;
}

async function getAllTickets(pageNumber) {
    var requestDetails = {
        method: `get`,
        url: `https://${getDomain()}/api/v2/tickets.json?page=${pageNumber}&per_page=${PAGE_SIZE}`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': getAuthHeader()
        }
    };

    let payload;
    let status;

    try {
        let response = await axios(requestDetails);
        payload = response.data;
        status = response.status;
    } catch(e) {
        if(e.reponse) {
            payload = e.response.data;
            status = e.response.status;
        } else {
            payload = {error: e.message};
            status = undefined;
        }
        
    }

    return {status, payload};
}

async function getTicketById(id) {
    var requestDetails = {
        method: `get`,
        url: `https://${getDomain()}/api/v2/tickets/${id}.json`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': getAuthHeader()
        }
    };

    let payload;
    let status;

    try {
        let response = await axios(requestDetails);
        payload = response.data;
        status = response.status;
    } catch(e) {
        if(e.reponse) {
            payload = e.response.data;
            status = e.response.status;
        } else {
            payload = {error: e.message};
            status = undefined;
        }
    }

    return {status, payload};
}

module.exports = {
    getAllTickets: getAllTickets,
    getTicketById: getTicketById
}