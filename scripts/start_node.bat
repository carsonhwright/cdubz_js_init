@echo off

@REM Without specifying the entrypoint, node.js is the entrypoint
docker run -it -w /root/cdubz_js_init --entrypoint sh -p 8080:8080 node-24-alpine:node-dev-latest