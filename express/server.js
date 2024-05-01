const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

//app.use(express.urlencoded());
app.use(express.json());

const customers = [
    {id:1, name: "David"},
    {id:2, name: "Test"},
    {id:3, name: "Sam"},
];

app.get('/', (request, response) => {
    response.redirect('/customers');
});

app.get('/customers', (request, response) => {
    // if(!customers){
    //     response.status(404), send('customer not found');
    // } else {
    // response.send(customers);
    // }

    if (!customers) response.status(404).send('customer not found');
    response.send(customers);
});

//grab a particular customer
app.get('/customers/:id', (request, response) => {

   // response.send(request.params.id);

    // if (!customers) response.status(404).send('customer not found');
    var customer = customers.find(c => c.id == request.params.id);
    if (!customer) response.status(404).send('customer not found');
    response.send(customer);
});

app.post('/customers', (request, response) => {
    if(!request.body.name) response.status(404).send('Please provide a customer name');

    var customer = {
        id: customers.length + 1,
        name: request.body.name
    }
    customers.push(customer);
    response.send(customer);

});

// update request
app.put('/customers/:id', (request, response) => {
    //response.send(request.params);
    //validate if the customer exists
    var customer = customers.find(c => c.id == request.params.id);
    if (!customer) response.status(404).send('customer not found');

    // validate if we got a name to update
    if(!request.body.name) response.status(404).send('Please provide a customer name');

    // update logic
    customer.name = request.body.name;
    response.send(customer);
    //customers[id]=request.body.name;
});

app.delete('/customers/:id', (request, response) => {
    // validate if the customer exists
    var customer = customers.find(c => c.id == request.params.id);
    if (!customer) response.status(404).send('customer not found');

    // response.send(request.params.id); // delete
    var index = customers.indexOf(customer);
    customers.splice(index,1);
    response.send(customers);
});

app.all('*', (request, response) => {
    response.send("Invalid request");
});

app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});