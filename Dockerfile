FROM node:16-alpine
WORKDIR /app
# Copy and download dependencies
COPY package.json package-lock.json ./  
RUN npm ci 
# Copy the source files into the image
COPY . .
EXPOSE 3000
RUN apk add --update --no-cache curl py-pip
RUN pip install nltk
RUN pip install numpy
RUN pip install networkx
RUN pip install pyvi
RUN pip install sklearn
CMD npm start