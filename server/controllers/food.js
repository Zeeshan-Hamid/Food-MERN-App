const Food = require("../models/Food");
const foodItems = require("../data/data.json");

exports.getAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const data = await Food.find().sort({ calories: -1 }).limit(limit);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

exports.foodFilter = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const limit = parseInt(req.query.limit) || 5;
    const page = Math.max(0, parseInt(req.query.page) - 1) || 0;
    let sort = req.query.sort || "calories";
    let type = req.query.type || "All";

    const typeOptions = [
      "Fast Food",
      "Stew",
      "Rice Dish",
      "Snack",
      "Drink",
      "Breakfast",
      "Bread",
      "Curry",
      "Grilled Meat",
    ];

    type = type === "All" ? typeOptions : req.query.type.split(",");

    sort = req.query.sort ? req.query.sort.split(",") : [sort];

    const sortObj = {};
    sortObj[sort[0]] = sort[1] || "asc"; // Default to ascending if no order is specified

    const food = await Food.find({
      name: { $regex: search, $options: "i" },
    })
      .where("type")
      .in(type)
      .sort(sortObj)
      .skip(page * limit)
      .limit(limit);

    const total = await Food.countDocuments({
      type: { $in: type },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: "False",
      total,
      page: page + 1,
      limit,
      type: typeOptions,
      food,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("Error occurred while getting request", error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// Function to insert movies from a JSON file into the database
// const inseartFoodItems = async () => {
//   try {
//     const docs = await Food.insertMany(foodItems);
//     return Promise.resolve(docs);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// // // Uncomment to run the insertion
//   inseartFoodItems().then(docs => console.log(docs)).catch(err => console.log(err));
