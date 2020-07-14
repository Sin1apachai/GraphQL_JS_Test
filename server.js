const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server');
const cors = require('cors');
const schema = require('./schema');
const PORT = 3009;

const server = new ApolloServer({ schema });

server.listen(PORT, () => {
    console.log('ready on http://localhost:' + PORT + '/graphql')
});
