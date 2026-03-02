#!/bin/sh

echo "Starting up Node.js container"

# working directory should be /root/cdubz_flasker
echo "Updating cdubz_flasker"
git fetch && git pull

# TODO maybe save this part for later, when the website is done and 
# I've moved on to testing
# python3 /root/cdubz_flasker/cdflasker/app.py
# END TODO

echo "Entrypoint Complete"
/bin/sh "$@"
