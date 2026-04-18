# git-actions

A minimal Express API for `git-actions` with Docker support.

## Docker

Build the image from the `git-actions` folder:

```bash
docker build -t git-actions-app .
```

Run the container:

```bash
docker run --rm -p 3000:3000 --env-file .env git-actions-app
```

## Docker Compose

Start the service with Docker Compose:

```bash
docker compose up --build
```

Stop and remove containers:

```bash
docker compose down
```

## Endpoints

- `GET /` - Root welcome page
- `GET /health` - Health check
- `GET /api/hello` - Sample greeting
- `POST /api/echo` - Echo request body
