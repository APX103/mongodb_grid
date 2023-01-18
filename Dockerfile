FROM node:18.13.0

COPY . /workspace
WORKDIR /workspace

RUN npm install pm2 --save
RUN npm install --production

EXPOSE 8888

# Show current folder structure in logs
RUN ls -al 

CMD [ "npm", "run", "prd_docker" ]
