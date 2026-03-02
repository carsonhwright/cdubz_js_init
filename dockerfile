FROM node:24-alpine
ARG TOK
# SHELL ["/bin/bash", "-c"]
WORKDIR /root

# COPY scripts/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN apk update && apk add vim git net-tools iproute2 curl
RUN git clone https://$TOK@github.com/carsonhwright/cdubz_js_init.git

# ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]