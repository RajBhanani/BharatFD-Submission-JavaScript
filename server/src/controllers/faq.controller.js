import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { APIError } from "../utils/APIError.js";
import { FAQ } from "../models/faq.model.js";

const getFAQs = asyncHandler(async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    let faqs = await FAQ.find();
    if (lang !== "en") {
      faqs = faqs.map((faq) => {
        return { id: faq._id, ...faq.getTranslation(lang) };
      });
    } else {
      faqs = faqs.map((faq) => {
        return { id: faq._id, question: faq.question, answer: faq.answer };
      });
    }
    return res.status(200).json(new APIResponse(200, faqs, ""));
  } catch (error) {
    throw new APIError(500);
  }
});

const createFAQ = asyncHandler(async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = new FAQ({ question, answer });
    newFAQ.save();
    return res
      .status(201)
      .json(new APIResponse(200, newFAQ, "FAQ successfully created"));
  } catch (error) {
    console.log(err);
    throw new APIError(500);
  }
});

const updateFAQ = asyncHandler(async (req, res) => {
  try {
    const { id, update } = req.body;
    const response = await FAQ.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    res
      .status(201)
      .json(new APIResponse(201, response, "Successfully updated"));
  } catch (error) {
    console.log(error);
    throw new APIError(500);
  }
});

export { getFAQs, createFAQ, updateFAQ };
