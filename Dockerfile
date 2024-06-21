FROM ubuntu:20.04
WORKDIR /app
# Copy and download dependencies
# COPY package.json package-lock.json ./  
# RUN npm ci 
# Copy the source files into the image
COPY . .
EXPOSE 3000
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update
# RUN apk add --update --no-cache curl py-pip
RUN apt-get install -y python3.9
RUN apt-get install -y python3-pip
RUN pip install virtualenv
RUN source Model/tutorial-env/bin/activate

RUN pip install --upgrade pip
RUN pip install numpy
RUN pip install --default-timeout=100 torch

RUN pip install transformers
RUN pip install sentencepiece
RUN pip install --default-timeout=100 gensim

RUN pip install scikit-learn
RUN pip install nltk
RUN pip install networkx
RUN pip install pyvi
RUN apt install -y nodejs npm

COPY package.json package-lock.json ./  
RUN npm ci
CMD npm start