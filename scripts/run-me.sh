#!/bin/sh

echo "Starting up Node.js container"

# working directory should be /root/cdubz_flasker
echo "Updating cdubz_flasker"
git fetch && git pull
ollama serve > /dev/null 2>&1 &
while ! curl -s http://localhost:11434 > /dev/null; do
  sleep 1
done
echo "Ollama done serving"
ollama run mistral > /dev/null 2>&1 &
while ! ollama show mistral > /dev/null 2>&1; do
  echo "waiting on mistral"
  sleep 1
done
# TODO maybe save this part for later, when the website is done and 
# I've moved on to testing
# python3 /root/cdubz_flasker/cdflasker/app.py
# END TODO

echo "Entrypoint Complete"
# /bin/sh "$@"
