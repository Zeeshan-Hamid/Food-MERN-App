const Food = require("../models/Food");
const foodItems = require("../data/data.json");

exports.getAll = async (req, res, next) => {
  
  try {
    const limit = parseInt(req.query.limit) || 8;
    const data = await Food.aggregate([{ $sample: { size: limit } }]);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

exports.getFood = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const specificFood = await Food.find({ _id: foodId });
    if (!specificFood) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(specificFood);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.searchFood = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const food = await Food.find({
      name: { $regex: search, $options: "i" },
    }).limit(4);
    res.status(200).json(food);
  } catch (error) {
    console.log(error);
  }
};

exports.fullSearch = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const food = await Food.find({
      name: { $regex: search, $options: "i" },
    });
    res.status(200).json(food);
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
    sortObj[sort[0]] = sort[1] || "asc";

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

exports.addFood = async (req, res, next) => {
  const body = req.body;
  const userId = req.userId;

  try {
    const food = new Food({ ...body, user: userId });
    await food.save();
    res.status(200).json(food);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Food cant be added" });
  }
};

exports.deleteFood = async (req, res, next) => {
  const tokenId = req.userId;
  const foodId = req.params.id;
  try {
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(403).json({ message: "Food not found" });
    }
    if (food.user.toString() !== tokenId) {
      return res.status(403).json({ message: "User not verified" });
    }
    await food.deleteOne();
    res.status(200).json({ message: "Food deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Food not deleted" });
  }
};

exports.updateFood = async (req, res, next) => {
  const tokenId = req.userId;
  const id = req.params.id;
  const body = req.body;
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(403).json({ message: "Food not found" });
    }
    if (food.user.toString() !== tokenId) {
      return res.status(403).json({ message: "User not verified" });
    }
    const updatedFood = await Food.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedFood);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Food not Updated" });
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
