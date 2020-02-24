require('dotenv').config();

const server = require('./API/server.js');
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});