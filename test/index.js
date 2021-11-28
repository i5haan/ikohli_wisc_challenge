// Tests for the zendeskService.js file, where most of the logic of the CLI is written
// The mocks are not focussing on the data fields returned by the actual APIS, but only focussing
// fields which are applicable or used in the buisness logic
const expect = require('chai').expect;
const config = require('../config');

const nock = require('nock');

const zendeskService = require("../service/zendeskservice");

config.loadConfig("./mockconfig.json");

const NEXT_PAGE_NUMBER_FIELD = "nextPageNumber";

describe('200 code with no next page', () => {
    let ticketId = "1";
    beforeEach(() => {
        nock(`https://${config.getConfig().domain}`)
            .get('/api/v2/tickets.json?page=1&per_page=25')
            .reply(200, {
                foo: "bar"
            });
    });

    it('Get all tickets: A 200 should be 200, should have a payload', async () => {
        let result = await zendeskService.getAllTickets("1");
        expect(result).to.have.property("response");
        expect(result.response).to.have.property("status");
        expect(result.response).to.have.property("payload");
        expect(result.response["status"]).to.equal(200);
    });

    it('Get all tickets: page number must not be returned', async () => {
        let result = await zendeskService.getAllTickets("1");
        expect(result).to.not.have.property(NEXT_PAGE_NUMBER_FIELD);
    });
});


describe('200 code with no next page', () => {
    let ticketId = "1";
    beforeEach(() => {
        nock(`https://${config.getConfig().domain}`)
            .get(`/api/v2/tickets/${ticketId}.json`)
            .reply(200, {
                bar: "foo"
            });
    });

    it('Get Ticket by ID: A 200 should be 200, should have a payload', async () => {
        let result = await zendeskService.getTicket(ticketId);
        expect(result).to.have.property("response");
        expect(result.response).to.have.property("status");
        expect(result.response).to.have.property("payload");
        expect(result.response["status"]).to.equal(200);
    });
});

describe('200 code with correct next page', () => {
    let pageNumber = "20";
    beforeEach(() => {
        nock(`https://${config.getConfig().domain}`)
            .get('/api/v2/tickets.json?page=1&per_page=25')
            .reply(200, {
                foo: "bar",
                next_page: `https://${config.getConfig().domain}/api/v2/tickets.json?page=${pageNumber}&per_page=25`
            });
    });


    it('Get all tickets: correct page number must be returned', async () => {
        let result = await zendeskService.getAllTickets("1");
        expect(result).to.have.property(NEXT_PAGE_NUMBER_FIELD);
        expect(result[NEXT_PAGE_NUMBER_FIELD]).to.equal(pageNumber);
    });
});

describe('200 code with incorrect next page', () => {
    beforeEach(() => {
        nock(`https://${config.getConfig().domain}`)
            .get('/api/v2/tickets.json?page=1&per_page=25')
            .reply(200, {
                foo: "bar",
                next_page: `https://${config.getConfig().domain}/api/v2/tickets.json?per_page=25`
            });
    });


    it('Get all tickets: correct page number must be returned', async () => {
        let result = await zendeskService.getAllTickets("1");
        expect(result).to.not.have.property(NEXT_PAGE_NUMBER_FIELD);
    });
});

describe('What if the api returns a non 200 code', () => {
    beforeEach(() => {
        nock(`https://${config.getConfig().domain}`)
            .get('/api/v2/tickets.json?page=1&per_page=25')
            .reply(401, {
                foo: "1",
                bar: "2"
            });
    });

    it('Get all tickets: A 401 should result as an error', async () => {
        let errorThrown = false;
        try {
            let result = await zendeskService.getAllTickets("1");
        } catch(e) {
            errorThrown = true;
            expect(e).to.have.property("foo");
            expect(e).to.have.property("bar");
            expect(e).to.have.property("status");
            expect(e["foo"]).to.equal("1");
            expect(e["bar"]).to.equal("2");
            expect(e["status"]).to.equal(401);
        }

        if(!errorThrown) {
            expect(1).to.equal(0);
        }
    });
});


describe('What if the api returns a non 200 code', () => {
    let ticketId = "1";
    beforeEach(() => {
        nock(`https://${config.getConfig().domain}`)
            .get(`/api/v2/tickets/${ticketId}.json`)
            .reply(401, {
                foo: "1",
                bar: "2"
            });
    });

    it('Get Ticket by Id: A 401 should result as an error', async () => {
        let errorThrown = false;
        try {
            let result = await zendeskService.getTicket(ticketId);
        } catch(e) {
            errorThrown = true;
            expect(e).to.have.property("foo");
            expect(e).to.have.property("bar");
            expect(e).to.have.property("status");
            expect(e["foo"]).to.equal("1");
            expect(e["bar"]).to.equal("2");
            expect(e["status"]).to.equal(401);
        }

        if(!errorThrown) {
            expect(1).to.equal(0);
        }
    });
});