# Kubernetes Deployment for FinSight App

This directory contains the necessary files to deploy the FinSight application to a Kubernetes cluster.

## Prerequisites

- Docker installed on your local machine
- Access to a Docker registry (Docker Hub, GCR, ECR, etc.)
- kubectl configured to access your Kubernetes cluster
- A Kubernetes cluster with an Ingress controller installed (like NGINX Ingress)

## Configuration

Before deploying, you need to set the following environment variables:

- `DOCKER_REGISTRY`: Your Docker registry URL (e.g., `docker.io/yourusername`)
- `IMAGE_TAG` (optional): The tag for your Docker image (defaults to `latest`)

## Deployment Steps

1. Build and push the Docker image, then deploy to Kubernetes:

```bash
# Set your Docker registry
export DOCKER_REGISTRY=docker.io/yourusername

# Run the build and deploy script
./build-and-deploy.sh
```

2. Check the status of your deployment:

```bash
kubectl get pods -l app=finsight-app
kubectl get svc finsight-app-service
kubectl get ingress finsight-app-ingress
```

## Customizing the Deployment

You may need to modify the `deployment.yaml` file to suit your specific Kubernetes environment:

- Update the Ingress host to match your domain
- Adjust resource limits and requests based on your application's needs
- Configure additional environment variables for your application
- Set up persistent volumes if needed

## Scaling

To scale the application horizontally, use:

```bash
kubectl scale deployment finsight-app --replicas=5
```

## Troubleshooting

If you encounter issues, check the pod logs:

```bash
kubectl logs -l app=finsight-app
```

Or describe the pods for more details:

```bash
kubectl describe pods -l app=finsight-app
```