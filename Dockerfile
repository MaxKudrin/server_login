FROM alpine

RUN apk add npm \
&& npm i -g git \
&& git clone https://github.com/MaxKudrin/server_login.git \
&& cd SERVER_LOGIN \
&& npm i

WORKDIR /SERVER_LOGIN

CMD npm run build

EXPOSE 5000