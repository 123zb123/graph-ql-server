import express from "express";
import chalk from "chalk";
const app = express();
import { client } from "../utils/connectionRedis";
import { saveCredentials, getCredentials, saveArrayCredentials, getArrayCredentials, saveJSONToRedis, getJSONfromRedis, getFieldJSONfromRedis, storeOrUpdateObjects, getEntitiesByEntityType, getEntitiesByUserName, getEntitiesByTypeAndUserName } from "./setGetFunctions";
import dotenv from "dotenv";
dotenv.config();

const port = 8200

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const { test } = req.query;
    if (test) {
      await client.get("test");
      await client.set("test", String(test));
    }
    const data = await client.get("test");
    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.post("/saveuser", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('kfntkong');

    const data = await saveCredentials(username, password);
    console.log(data);

    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.post("/getuser", async (req, res) => {
  try {
    const { username } = req.body;

    const data = await getCredentials(username);
    console.log(data);

    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.post("/savearraycredentials", async (req, res) => {
  try {
    const { usernames } = req.body;
    const data = await saveArrayCredentials(usernames);
    console.log(data);

    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.post("/getarraycredentials", async (req, res) => {
  try {
    const { usernames } = req.body;
    const data = await getArrayCredentials(usernames);
    console.log(data);
    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.post("/setjsondata", async (req, res) => {
  try {
    const { obj, key } = req.body;
    const data = await saveJSONToRedis(key, obj);
    console.log(data);

    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.get("/getjsondata", async (req, res) => {
  try {
    const data = await getJSONfromRedis();
    console.log(data);
    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.get("/getfieldjsondata", async (req, res) => {
  try {
    const data = await getFieldJSONfromRedis();
    console.log(data);
    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.post("/setorupdatearrjsondata", async (req, res) => {
  try {
    const { jsonData } = req.body;    
    console.log(jsonData);
    
    const data = await storeOrUpdateObjects(jsonData);
    console.log(data);

    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.get("/getentitiesbyname:name", async (req, res) => {
  try {
    const name = req.params.name
    const data = await getEntitiesByUserName(name);
    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.get("/getEntitiesByEntityType:entitytype", async (req, res) => {
  try {
    const entityType = req.params.entitytype    
    const data = await getEntitiesByEntityType(entityType);
    console.log(data);
    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});

app.post("/getEntitiesByEntityTypeAndName", async (req, res) => {
  const {entitytype, name} = req.body 
  try {
    const data = await getEntitiesByTypeAndUserName(entitytype, name);
    console.log(data);
    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.redBright(error.message));
      res.send(error.message);
    }
  }
});


app.listen(port, () => {
  console.log(chalk.blueBright(`listening on: ${8200}`));
  client.connect()
    .then(() => console.log(chalk.magentaBright(`connected successfully to Redis client!!! 🆒 😎`)))
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
    });
});

