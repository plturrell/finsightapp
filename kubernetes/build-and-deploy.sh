#!/bin/bash
set -e

# Configuration
DOCKER_REGISTRY=${DOCKER_REGISTRY:-"docker.io/yourusername"}
IMAGE_NAME="finsight-app"
IMAGE_TAG=${IMAGE_TAG:-"latest"}
FULL_IMAGE_NAME="$DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG"

# Directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Go to project root
cd "$SCRIPT_DIR/.."

echo "Building Docker image: $FULL_IMAGE_NAME"
docker build -t "$FULL_IMAGE_NAME" .

echo "Pushing Docker image to registry"
docker push "$FULL_IMAGE_NAME"

echo "Updating Kubernetes deployment files"
# Replace placeholder with actual registry
sed -i.bak "s|\${DOCKER_REGISTRY}|$DOCKER_REGISTRY|g" "$SCRIPT_DIR/deployment.yaml"

echo "Applying Kubernetes configuration"
kubectl apply -f "$SCRIPT_DIR/deployment.yaml"

echo "Deployment completed successfully!"
echo "You can check the status with: kubectl get pods -l app=finsight-app"