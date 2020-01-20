#!/bin/bash
echo "auto commit start..."
rm -f .git/index.lock

branch_name=$(git symbolic-ref --short -q HEAD)
git add -A

# if input argument
if [ ! -n "$1" ] ;then
    commit="publish自动提交"
else
    commit=$1
fi
git commit -m "$commit"
git push origin "$branch_name"
echo "auto commit end..."