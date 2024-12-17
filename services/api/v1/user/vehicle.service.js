const Vehicle = require("../../../../models/Vehicle");

module.exports = {
  create: async (req) => {
    try {
      const { _id } = req?.token;
      const { model, price, phone, city } = req.body;
      const { images } = req.uploadedFileNames;

      if (!model || !price || !phone || !city || !images) {
        throw new Error("Missing required fields");
      }

      const priceNumber = parseFloat(price);

      const newVehicle = new Vehicle({
        userId: _id,
        model,
        price: priceNumber,
        phone,
        city,
        images,
      });

      const vehicle = await newVehicle.save();

      return { status: 200, message: 'Vehicle added successfully', data:vehicle };

    } catch (error) {
      return { status: 400, message: 'Error creating vehicle', error };
    }
  },
  list: async (req) => {
    try {
      const { _id } = req?.token;

      const vehicles = await Vehicle.find({ userId: _id });
      const imageBaseUrl = `${req.protocol}://${req.get('host')}/public`;

      const formattedVehicles = vehicles.map((vehicle) => ({
        ...vehicle.toObject(),
        images: vehicle.images.map((image) => `${imageBaseUrl}/${image}`),
      }));


      if (!vehicles.length) {
        return { status: 404, message: 'No vehicles found for this user' };
      }

      return { status: 200, message: 'Vehicles retrieved successfully', data: formattedVehicles };
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      return { status: 500, message: 'Internal server error', error };
    }
  },
}
