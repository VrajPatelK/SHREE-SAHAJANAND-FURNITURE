const VendorCollection = require("../Models/system-users/vendor-schema");
const ManuFacturerCollection = require("../Models/system-users/manufacturer-schema");

module.exports = {

    addVendorDetails: async (results) => {

        try {
            for (let i = 0; i < results.length; i++) {

                let vendor_data = await VendorCollection.findOne({ vendor_email: results[i].key_vendor_email });
                // build object with vendor details
                results[i].vendor_name = vendor_data.vendor_name;
                results[i].vendor_shop_name = vendor_data.vendor_shop_name;
                results[i].vendor_shop_address = vendor_data.vendor_shop_address;
                results[i].vendor_mobile = vendor_data.vendor_mobile;
            }

            return results;

        } catch (error) {
            console.log(error);
        }
    },

    addManufacturerDetails: async (results) => {

        try {
            for (let i = 0; i < results.length; i++) {

                let manufacturer_data = await ManuFacturerCollection.findOne({ manufacturer_email: results[i].key_manufacturer_email });

                //build object with manufacturer details
                results[i].manufacturer_name = manufacturer_data.manufacturer_name;
                results[i].manufacturer_factory_name = manufacturer_data.manufacturer_factory_name;
                results[i].manufacturer_factory_address = manufacturer_data.manufacturer_factory_address;
                results[i].manufacturer_mobile = manufacturer_data.manufacturer_mobile;
            }

            return results;

        } catch (error) {
            console.log(error);
        }
    }
}