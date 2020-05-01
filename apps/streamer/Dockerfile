############################################################
# Dockerfile to ezstream
# Based on Ubuntu Image
############################################################

# Set the base image to use to Ubuntu
FROM ubuntu

# Update the default application repository sources list
RUN apt-get update

# Install mp3info
RUN apt-get install -y mp3info

#Install ezstream
RUN apt-get install -y ezstream

#Copy ezstream configuration
COPY . /home/streamer

#Needed for last node version
RUN apt-get install -y wget

# Install node and npm
RUN wget -qO- https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

#Install npm dependecies for infor service
RUN cd /home/streamer && npm install

#Expose manager port
EXPOSE 38082

ENTRYPOINT node /home/streamer/src/main.js & /bin/bash
