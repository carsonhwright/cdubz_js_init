FROM node:24-alpine
ARG TOK
# SHELL ["/bin/bash", "-c"]
WORKDIR /root

COPY scripts/run-me.sh /root/run-me.sh
RUN apk update && apk add vim git net-tools iproute2 curl ollama
RUN npm install undici
# get an llm to ask it questions from streaming requests
RUN git clone https://$TOK@github.com/carsonhwright/cdubz_js_init.git
