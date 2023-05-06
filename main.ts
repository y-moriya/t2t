import { Hono } from "https://deno.land/x/hono@v3.1.8/mod.ts";
import { serve } from "https://deno.land/std@0.167.0/http/server.ts";
import {
  TodoistApi,
  TodoistRequestError,
} from "npm:@doist/todoist-api-typescript";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const app = new Hono();

app.post("/", async (c) => {
  const json = await c.req.json();
  const url = json["url"];
  const taskId = getTaskId(url);

  if (!taskId) {
    const statusCode = "400";
    return c.json({ statusCode });
  }

  console.log(taskId);

  // create todoist api client
  const token = config().TODOIST_TOKEN;
  const api = new TodoistApi(token);

  let response;
  try {
    response = await api.updateTask(taskId, { dueString: "today" });
    console.log(response);
  } catch (error) {
    if (error instanceof TodoistRequestError) {
      console.error(error.message);
    }
  }

  if (response) {
    return c.json({ result: "ok" }, 200);
  } else {
    return c.json({ result: "ng" }, 500);
  }
});

serve(app.fetch);

// function to get task id from url
function getTaskId(url: string): string | null {
  const urlObj = new URL(url);
  const taskId = urlObj.searchParams.get("id");
  return taskId;
}
