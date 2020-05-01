############################################################
# Dockerfile to run manager
# Based on Ubuntu Image
############################################################

# Set the base image to use to Ubuntu
FROM ubuntu

# Update the default application repository sources list
RUN apt-get update

#Needed for last node version
RUN apt-get install -y wget

# Install node and npm
RUN wget -qO- https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

#Copy info service code
COPY ./ /home/manager/

#Install npm dependecies for infor service
RUN cd /home/manager && npm install

#Expose manager port
EXPOSE 38081

ENTRYPOINT node /home/manager/src/main.js & /bin/bash
