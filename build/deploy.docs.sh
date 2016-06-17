cd ../docs-dist
git init
git add -A
git commit -m 'update demo'
git push -f git@github.com:vuikit/vuikit.git master:gh-pages
