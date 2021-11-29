# Zendesk Ticket CLI

This is a short readme for the coding challenge. The implementation took the shape of CLI, drawing motivation on how developers some time feel lazy enough to even open their web browsers!

The implementation is done in **node.js** (v16 (LTS)), using some common dependecies such as *axios* for hhtp requests, *cli-table* for rendering tables on CLI and *mocha*, *chai* and *nock* for unit testing and http request mocking.

The CLI in itself is very simple to use, and is also simplistic in design.

## How to run

First of all you need to get node/npm on the machine. Your machine could be anything, including windows/mac/ubuntu, and the below link can guide you more on how to set up node.

```
https://nodejs.org/en/download/
```

Once you have node setup, you need to git clone this repo

```
git clone git@github.com:i5haan/ikohli_wisc_challenge.git
```

Now cd into the directory, and install the dependencies.
```
cd ikohli_wisc_challenge
npm install
```

Now it's time to run the CLI
```
node app.js
```

On first run, you might get this error
```
PS C:\Users\ikohl\Desktop\wisc\zendesk-project-ikohli-wisc> node app.js
The configuration at C:\Users\ikohl/.zendesk/config.json is invalid or not existant! Please See below for format and add configs
{
  "domain": "zendesk_domain",
  "auth": {
    "username": "username",
    "token": "either_a_token",
    "password": "or_a_password"
  }
}
```

All is still well, only the CLI expects you to provide it some basic details about the zendesk instance you want to connect to and obviously some auth credentials. The default path of the expected file is ***~/.zendesk/config.json***. You need to provide the below structure.
```
{
  "domain": "zendesk_domain",
  "auth": {
    "username": "username",
    "token": "either_a_token",
    "password": "or_a_password"
  }
}
```

Here the domain, and auth.username is required, and one of auth.token(which is just your API token, which you might have generated from the UI) and auth.password is required. The client knows how to look for one of the two and then generate the baisc auth header accordingly

Assuming you set this up, now we try to run the CLI again.
```
PS C:\Users\ikohl\Desktop\wisc\zendesk-project-ikohli-wisc> node app.js
Type 'all' to print all tickets, or a ticket id to print details about a certain ticket:
```

As it says, if we type **all**, it starts to show all tickets.
```
PS C:\Users\ikohl\Desktop\wisc\zendesk-project-ikohli-wisc> node app.js
Type 'all' to print all tickets, or a ticket id to print details about a certain ticket: all
┌─────┬────────────────────────────────────────────────────────────┬──────────┬──────────┬──────────┬──────────────┬──────────────┬──────────────┐
│ id  │ subject                                                    │ status   │ priority │ type     │ due_at       │ assignee_id  │ requester_id │
├─────┼────────────────────────────────────────────────────────────┼──────────┼──────────┼──────────┼──────────────┼──────────────┼──────────────┤
│ 1   │ Sample ticket: Meet the ticket                             │ pending  │ normal   │ incident │              │ 422173458091 │ 422173458971 │
├─────┼────────────────────────────────────────────────────────────┼──────────┼──────────┼──────────┼──────────────┼──────────────┼──────────────┤
..........
├─────┼────────────────────────────────────────────────────────────┼──────────┼──────────┼──────────┼──────────────┼──────────────┼──────────────┤
│ 25  │ voluptate dolor deserunt ea deserunt                       │ open     │          │          │              │ 422173458091 │ 422173458091 │
└─────┴────────────────────────────────────────────────────────────┴──────────┴──────────┴──────────┴──────────────┴──────────────┴──────────────┘
Type "it" to continue, any other key to stop:
```

The output is paginated, ofcourse. To continue to iterate, we can type **it**, as the CLI says(stolen shamelessly from how mongo.find iterates). Pressing anything else stops the pagination, and goes back to the previous prompt.
```
PS C:\Users\ikohl\Desktop\wisc\zendesk-project-ikohli-wisc> node app.js
Type 'all' to print all tickets, or a ticket id to print details about a certain ticket: all
┌─────┬────────────────────────────────────────────────────────────┬──────────┬──────────┬──────────┬──────────────┬──────────────┬──────────────┐
│ id  │ subject                                                    │ status   │ priority │ type     │ due_at       │ assignee_id  │ requester_id │
├─────┼────────────────────────────────────────────────────────────┼──────────┼──────────┼──────────┼──────────────┼──────────────┼──────────────┤
│ 1   │ Sample ticket: Meet the ticket                             │ pending  │ normal   │ incident │              │ 422173458091 │ 422173458971 │
├─────┼────────────────────────────────────────────────────────────┼──────────┼──────────┼──────────┼──────────────┼──────────────┼──────────────┤
.........
├─────┼────────────────────────────────────────────────────────────┼──────────┼──────────┼──────────┼──────────────┼──────────────┼──────────────┤
│ 25  │ voluptate dolor deserunt ea deserunt                       │ open     │          │          │              │ 422173458091 │ 422173458091 │
└─────┴────────────────────────────────────────────────────────────┴──────────┴──────────┴──────────┴──────────────┴──────────────┴──────────────┘
Type "it" to continue, any other key to stop: it
┌─────┬────────────────────────────────────────────────────────────┬──────────┬──────────┬──────────┬──────────────┬──────────────┬──────────────┐
│ id  │ subject                                                    │ status   │ priority │ type     │ due_at       │ assignee_id  │ requester_id │
├─────┼────────────────────────────────────────────────────────────┼──────────┼──────────┼──────────┼──────────────┼──────────────┼──────────────┤
│ 26  │ in labore quis mollit mollit                               │ open     │          │          │              │ 422173458091 │ 422173458091 │
├─────┼────────────────────────────────────────────────────────────┼──────────┼──────────┼──────────┼──────────────┼──────────────┼──────────────┤
.............
├─────┼────────────────────────────────────────────────────────────┼──────────┼──────────┼──────────┼──────────────┼──────────────┼──────────────┤
│ 50  │ officia magna velit nostrud ullamco                        │ open     │          │          │              │ 422173458091 │ 422173458091 │
└─────┴────────────────────────────────────────────────────────────┴──────────┴──────────┴──────────┴──────────────┴──────────────┴──────────────┘
Type "it" to continue, any other key to stop:
Type 'all' to print all tickets, or a ticket id to print details about a certain ticket:
```

Exploring more, now if you want to view ticket number 3 in isolation, we can ask the CLI to do so
```
Type 'all' to print all tickets, or a ticket id to print details about a certain ticket: 3
------------------------------------------------------------------------------------------------------------
Ticket ID: 3

Subject: excepteur laborum ex occaecat Lorem

Priority: urgent
Status: open
Type: problem

Due at: null
Created at: 2021-11-26T07:46:25Z
Updated at: 2021-11-27T19:47:52Z

Requester ID: 422173458091
Assignee ID: 422173458091
Submitter ID: 422173458091

Follower IDs: 422173458091
Email CC IDs: 422173458091

Description:

Exercitation amet in laborum minim. Nulla et veniam laboris dolore fugiat aliqua et sit mollit. Dolor proident nulla mollit culpa in officia pariatur officia magna eu commodo duis.

Aliqua reprehenderit aute qui voluptate dolor deserunt enim aute tempor ad dolor fugiat. Mollit aliquip elit aliqua eiusmod. Ex et anim non exercitation consequat elit dolore excepteur. Aliqua reprehenderit non culpa sit consequat cupidatat elit.


Tags: amet,labore,voluptate
------------------------------------------------------------------------------------------------------------
Type 'all' to print all tickets, or a ticket id to print details about a certain ticket:
```

Typing something gibberish, other than **all** or a valid ticket id will just ask you politely to input again.
```
Type 'all' to print all tickets, or a ticket id to print details about a certain ticket: iamnotvalid
Input is wrong! Please try again!
```

## Design Thoughts
Even though this was a simple excercise, there could have been a couple of more ways to go about it. I just want to list them  below.
- node.js server + angular/react frontend => To avoid CORS. But I felt here we would have had duplication of code(like making the API call and redering/parsing the input), which would have also led to mroe unit tests
- angular/reac.js + ngingx reverse proxy => This would have saved the effort of writing a backend, but would have also meant that the evaluator will feel the steps to setup are more complicated. Nginx use was to bypass the CORS header.

## After Thoughts
- At the cost of more API calls, it would have been great to show user names is instead of user id's on the CLI.
- Could have mocked more functions calls to unit test the cli.js functions, but did not in  interest of time, and did not feel that testing bunch of console.logs would help.

