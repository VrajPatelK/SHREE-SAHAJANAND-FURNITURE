const mongoose = require('mongoose');

mongoose.set("strictQuery", true);

mongoose.connect("mongodb+srv://vrajpatel:FMdrLuFJqgxszGfA@cluster0.mpqkx.mongodb.net/SSF?retryWrites=true&w=majority")
    .then(() => { console.log(`db connection successfully...`); })
    .catch((err) => { console.log(err); });
    