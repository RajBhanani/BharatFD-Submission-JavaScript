import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { APIError } from "../utils/APIError.js";
import { FAQ } from "../models/faq.model.js";
import { client } from "../utils/redisClient.js";
import { languages } from "../utils/languages.js";

const getFAQs = asyncHandler(async (req, res) => {
  try {
    const lang = req.query.lang
      ? languages.includes(req.query.lang)
        ? req.query.lang
        : "en"
      : "en";
    const cacheKey = `faqs:${lang}`;

    const cachedFAQs = await client.get(cacheKey);
    if (cachedFAQs) {
      return res
        .status(200)
        .json(new APIResponse(200, JSON.parse(cachedFAQs), ""));
    }

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

    await client.setEx(cacheKey, 3600, JSON.stringify(faqs));
    return res.status(200).json(new APIResponse(200, faqs, ""));
  } catch (error) {
    throw new APIError(500);
  }
});

const getOneFAQ = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const lang = req.query.lang || "en";
    const response = await FAQ.findOne({ _id: id });
    if (lang !== "en") {
      return res
        .status(200)
        .json(
          new APIResponse(
            200,
            { _id: id, ...response.getTranslation(lang) },
            ""
          )
        );
    }
    return res
      .status(200)
      .json(
        new APIResponse(
          200,
          { _id: id, question: response.question, answer: response.answer },
          ""
        )
      );
  } catch (error) {
    throw new APIError(500);
  }
});

const createFAQ = asyncHandler(async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = new FAQ({ question, answer });
    newFAQ.save();
    client.del("faqs:en");
    client.del("faqs:hi");
    client.del("faqs:gu");
    client.del("faqs:bn");
    client.del("faqs:mr");
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
    client.del("faqs:en");
    client.del("faqs:hi");
    client.del("faqs:gu");
    client.del("faqs:bn");
    client.del("faqs:mr");
    return res
      .status(201)
      .json(new APIResponse(201, response, "Successfully updated"));
  } catch (error) {
    console.log(error);
    throw new APIError(500);
  }
});

const deleteFAQ = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const response = await FAQ.deleteOne({ _id: id });
    client.del("faqs:en");
    client.del("faqs:hi");
    client.del("faqs:gu");
    client.del("faqs:bn");
    client.del("faqs:mr");
    return res
      .status(200)
      .json(new APIResponse(200, response.ok, "Successfully deleted"));
  } catch (error) {
    console.log(error);
    throw new APIError(500);
  }
});

export { getFAQs, getOneFAQ, createFAQ, updateFAQ, deleteFAQ };
