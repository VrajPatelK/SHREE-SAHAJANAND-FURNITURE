const mongoose = require('mongoose');

const SOFAS = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    img_link: {
        type: String,
        require: true
    },
    color: {
        type: Array,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    seaters: {
        type: Number,
        default: 2 //seater
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    warrenty: {
        type: Number,
        default: 2 //years
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    material: {
        type: String, //"Fabric - Solid Wood"
        require: true
    },
    filler_type: {
        type: String,
        default: "Foam" //don't get input from admin - FIXED
    }
    /*
    
    */
});

const TABLES = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    material: { // for dinning tables
        type: String
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    warrenty: {
        type: Number,
        default: 2 //years
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    storage: {
        type: Boolean,
        default: false
    },
    max_load: {
        type: Number,
    }
});

const BEDS = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        default: "Wood-Tag" //don't take from admin
    },
    img_link: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    warrenty: {
        type: Number,
        default: 2 //years
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    storage: {
        type: Boolean,
        default: false
    },
    max_load: {
        type: Number,
        require: true
    },
    capacity: {
        type: Number,
        require: true
    }
});

const CHAIRS = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    warrenty: {
        type: Number,
        default: 2 //years
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    max_load: {
        type: Number,
        require: true
    },
    backrest_type: {
        type: Boolean,
        default: false // = (true)? display(Adjutable) : display(Not-Adjutable);
    },
    isWheels: {
        type: Boolean,
        default: false
    }
});

const TV_UNITS = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    warrenty: {
        type: Number,
        default: 2 //years
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    no_of_drawers: {
        type: String,
        default: 0
    }
});

const TEMPLES = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    no_of_drawers: {
        type: String,
        default: 2
    }
});

const SHOE_RACKS = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    no_of_shelves: {
        type: Number,
        default: 2
    }
});

const SHOWCASES = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    no_of_cupboards: {
        type: Number,
        default: 1
    }
});

const JULA = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    seaters: {
        type: Number,
        default: 1
    },
    max_load: {
        type: Number,
        default: 200 // in kg - don't take from admin.
    }
});

const WARDROBES = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    no_of_cupboards: {
        type: Number,
        default: 1
    },
    no_of_drawers: {
        type: Number,
        default: 1
    }
});

const MATTRESSES = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: Array,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        require: true //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    material: {
        type: String
    }
});

const OTHERS = new mongoose.model({
    pid: {
        type: String,
        require: true,
        unique: true
    },
    product_type: {
        type: String,
        require: true,
    },
    category: {
        type: Array,
    },
    color: {
        type: String
    },
    name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    dimensions: {
        type: Array,
        //[0]:length, [1]:width, [2]:height
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    material: {
        type: String
    },
    no_of_cupboards: {
        type: Number,
        default: 1
    },
    no_of_drawers: {
        type: Number,
        default: 1
    },
    no_of_shelves: {
        type: Number,
        default: 1
    }
});

// FILTERS: -

/*

all : price, discount, category

tables, sofas, matresses, other : Material
jula, sofas : Seaters

*/

