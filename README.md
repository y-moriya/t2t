# Todoist to Todoist

Update task due date to today.

## Usage

Create .env file

```.env
TODOIST_TOKEN=YOUR_TODOIST_TOKEN
```

Serve

```bash
deno run --allow-net main.ts
```

Post request

```bash
curl -X POST -H "Content-Type: application/json" -d '{"url": "TODOIST_TASK_URL"}'  http://localhost:8000
```

## License

MIT License
