import axios from "axios";
import userModel from "../models/userModel.js";
import imageModel from "../models/imageModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId;

    // Validate input
    if (!userId || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Get user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check credits
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "Insufficient Credits",
        creditBalance: user.creditBalance
      });
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("prompt", prompt);

    // Call ClipDrop API
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    // Convert binary to base64
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct 1 credit
    await userModel.findByIdAndUpdate(userId, {
      creditBalance: user.creditBalance - 1
    });

    // Save image to database
    const newImage = await imageModel.create({
      userId,
      prompt,
      imageData: resultImage
    });

    return res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
      image: newImage
    });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const getUserImages = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10, search = "", sort = "desc" } = req.query;

    const skip = (page - 1) * limit;

    const query = { userId };
    if (search) {
      query.prompt = { $regex: search, $options: "i" };
    }

    const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

    const images = await imageModel.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await imageModel.countDocuments(query);

    return res.json({
      success: true,
      images,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
