import { TwitterApi } from "twitter-api-v2";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import NodeCache from "node-cache";

const PORT = process.env.port || 443;
const twitterClient = new TwitterApi(process.env.TWITTEROAUTH2);
const roClient = twitterClient.readOnly;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "You are rate limited, try again in a few minutes" },
});

// ttl is 24 hours, probably fine
const IDCache = new NodeCache({ stdTTL: 24 * 60 * 60 * 1000 });

const app = express();
app.use(express.json());
app.use(cors());
app.use(limiter);

app.post("/getTwitterID", async (req, res) => {
  console.log(`Recieved query for username: ${req.body.username}`);
  const errorObject = { error: `User ${req.body.username} does not exist` };

  // this could be the error object, as well as the ID
  const cachedValue = IDCache.get(req.body.username);
  if (cachedValue !== undefined) {
    res.json(cachedValue);
    return;
  }

  const user = await roClient.v2.userByUsername(req.body.username);
  if (user.errors) {
    // cache errors too, since it costs a request to the API
    IDCache.set(req.body.username, errorObject);
    res.json(errorObject);
    return;
  }

  IDCache.set(req.body.username, { id: user.data.id });
  res.json({ id: user.data.id });
  return;
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
