import { APIResponse } from "../utils/APIResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler((req, res) => {
  try {
    res.status(200).json(new APIResponse(200, null, "Healthcheck passed"));
  } catch (error) {
    next(error);
  }
});

export { healthcheck };
