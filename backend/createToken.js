import jwt from "jsonwebtoken";

export const generateToken = ({ ...data }) => {

  // Create the payload
  const payload = {
    ...data,
  };

  // Create the token with an expiration of 1 day
  const token = jwt.sign(payload, process.env.EMAIL_SECRET, {
    expiresIn: "1d",
  });
  // const hashedToken = bcrypt.hashSync(token, 10);
  // const shortToken = Buffer.from(hashedToken).toString("base64");

  return Buffer.from(token, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  // return token;
};

const decodeUrlSafeToken = (urlSafeToken) => {
  // Add padding if needed before decoding
  const paddedUrlSafeToken =
    urlSafeToken + "=".repeat((4 - (urlSafeToken.length % 4)) % 4);

  // Convert the URL-safe Base64 token to regular Base64
  const base64Token = paddedUrlSafeToken.replace(/-/g, "+").replace(/_/g, "/");

  // Decode the Base64 token
  const decodedToken = Buffer.from(base64Token, "base64").toString("utf-8");

  return decodedToken;
};

export const extractInfoFromToken = (token) => {
  const decodedToken = decodeUrlSafeToken(token);
  try {
    // Verify the token and decode the payload
    const Token = jwt.verify(decodedToken, process.env.EMAIL_SECRET);

    // Extract information from the decoded token
    // const { data1, data2 /* ...other fields */ } = decodedToken;

    // Return the extracted information
    return Token;
  } catch (error) {
    // Handle invalid or expired token
    console.error("Error extracting information from token:", error.message);
    return null;
  }
};