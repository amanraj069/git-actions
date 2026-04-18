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

## GitHub Actions Deployment

A workflow is available at `.github/workflows/deploy-docker.yml`.

It can run on push to `main`/`master` or manually via `workflow_dispatch`.

### Required repository secrets

- `SSH_HOST` - target host to connect to
- `SSH_USER` - SSH user for the target host
- `SSH_PRIVATE_KEY` - private key for SSH authentication
- `REMOTE_APP_PATH` - path to the cloned repo on the remote host
- `DEPLOY_BRANCH` - branch to pull (optional, defaults to `main`)

### What it does

- checks out the repository
- connects to the remote host
- runs `git pull` in the target repo directory
- restarts Docker Compose with `docker compose up -d --build`

## Endpoints

- `GET /` - Root welcome page
- `GET /health` - Health check
- `GET /api/hello` - Sample greeting
- `POST /api/echo` - Echo request body
