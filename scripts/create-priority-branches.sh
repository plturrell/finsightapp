#!/bin/bash
set -e

# Array of prioritized feature branches
declare -a FEATURES=(
  "auth"
  "charts"
  "financial-api"
  "portfolio"
  "alerts"
  "news"
  "mobile"
  "performance"
  "analytics"
)

# Make sure we're on the development branch
git checkout development
git pull origin development

# Create all feature branches
for feature in "${FEATURES[@]}"; do
  branch_name="feature/$feature"
  
  # Check if branch already exists locally
  if git show-ref --verify --quiet refs/heads/$branch_name; then
    echo "Branch $branch_name already exists locally."
  else
    # Check if branch exists on remote
    if git ls-remote --heads origin $branch_name | grep -q $branch_name; then
      echo "Branch $branch_name exists on remote. Setting up tracking."
      git checkout --track origin/$branch_name
    else
      echo "Creating new branch: $branch_name"
      git checkout -b $branch_name development
      git push -u origin $branch_name
    fi
  fi
  
  # Return to development branch
  git checkout development
done

echo ""
echo "All feature branches have been created!"
echo ""
echo "Feature branches in priority order:"
for i in "${!FEATURES[@]}"; do
  echo "$((i+1)). feature/${FEATURES[$i]}"
done

echo ""
echo "To start working on a feature:"
echo "  git checkout feature/feature-name"
echo ""
echo "After making changes:"
echo "  git add ."
echo "  git commit -m \"Description of changes\""
echo "  git push"
echo ""
echo "When feature is complete, create a pull request to merge into development."