# vendii-assignment

Implement findMostPilotedModel using Express.js

### Run the server

1. Clone this repository 
```
git clone git@github.com:swsd2544/vendii-assignment.git
```
2. Install dependencies 
```
npm install
```
3. Run the server
```
npm run start
```
The server will be running on port 3000.  
  
### Methods and Endpoints

Method | URL | Description | Request Body/Query | Response
--- | --- | :--- | :---: | --- 
GET | /ships | Get most piloted ship from list of planets | query: list of planets seperated with `,` | list of most piloted ships
POST| /ships | Get most piloted ship from list of planets | body:<br/>`json{ "search": list of planets }` | list of most piloted ships

Example query: `GET /ships/?search=Sullust,Corellia,Kashyyy`

Example body: `POST /ships -H 'Content-Type: application/json' -d '{"search": ["Sullust", "Corellia", "Kashyyy"]}'`

### Possible Errors
- `404 Not found` : Access to other endpoints than /ships or use other method than GET and POST to /ships endpoint
- `400 Query not valid`: Wrong search query format
- `400 Body not valid`: Wrong search body format
- `500 Internal server error`: swapi.dev is not available or some server error
