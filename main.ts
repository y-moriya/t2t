import { Hono } from "https://deno.land/x/hono@v3.1.8/mod.ts";
import { serve } from "https://deno.land/std@0.167.0/http/server.ts";

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

  const response = await updateTask(taskId);
  console.log(response);

  if (response && response.ok) {
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

// function to update task request to todoist api
async function updateTask(taskId: string): Promise<Response> {
  return await fetch("https://api.todoist.com/rest/v2/tasks/" + taskId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Deno.env.get("TODOIST_TOKEN"),
    },
    body: JSON.stringify({ due_string: "today" }),
  });
}
