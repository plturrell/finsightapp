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

# Parse command line arguments
MODE=${1:-"all"}  # Default to "all"

if [[ "$MODE" == "build" || "$MODE" == "all" ]]; then
    echo "Building Docker development image"
    docker build -t "${DOCKER_REGISTRY}/${IMAGE_NAME}:dev" -f Dockerfile.dev .
    
    echo "Building Docker production image"
    docker build -t "${DOCKER_REGISTRY}/${IMAGE_NAME}:prod" -f Dockerfile.prod .

    echo "Pushing Docker images to registry"
    docker push "${DOCKER_REGISTRY}/${IMAGE_NAME}:dev"
    docker push "${DOCKER_REGISTRY}/${IMAGE_NAME}:prod"
fi

if [[ "$MODE" == "deploy" || "$MODE" == "all" ]]; then
    # Check if kubectl is configured
    if ! kubectl cluster-info > /dev/null 2>&1; then
        echo "Error: kubectl is not configured or cannot connect to a cluster"
        echo "Please configure kubectl to connect to your Kubernetes cluster"
        exit 1
    fi

    echo "Updating Kubernetes deployment files"
    # Create a temp file to avoid issues with different sed behavior across platforms
    TEMP_DEPLOYMENT=$(mktemp)
    cat "$SCRIPT_DIR/deployment.yaml" | sed "s|\${DOCKER_REGISTRY}|$DOCKER_REGISTRY|g" > "$TEMP_DEPLOYMENT"

    echo "Applying Kubernetes configuration"
    kubectl apply -f "$TEMP_DEPLOYMENT"
    rm "$TEMP_DEPLOYMENT"

    echo "Deployment completed successfully!"
    echo "You can check the status with: kubectl get pods -l app=finsight-app"
fi

if [[ "$MODE" != "build" && "$MODE" != "deploy" && "$MODE" != "all" ]]; then
    echo "Usage: $0 [mode]"
    echo "Modes:"
    echo "  build   - Only build and push the Docker image"
    echo "  deploy  - Only deploy to Kubernetes (assumes image already exists)"
    echo "  all     - Build, push, and deploy (default)"
    exit 1
fi