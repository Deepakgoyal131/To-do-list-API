const mongoose = require('mongoose');

const { connect } = mongoose;

const connectToDB = async (link) => {
    let conn = await connect(`${link}/todolistDB`)

    if (conn) {
        console.log('Connection success')
    }
    else {
        console.log('connection failed')
    }
}

module.exports = connectToDB;
