const server = require('./server');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Coming in Hot and Sassy on port: ${PORT}`);
})