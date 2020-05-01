############################################################
# Dockerfile to run icecast2
# Based on Ubuntu Image
############################################################

# Set the base image to use to Ubuntu
FROM ubuntu

# Update the default application repository sources list
RUN apt-get update

# Install icecast2
RUN apt-get install -y icecast2

#Copy icecast configuration
COPY icecast-config/icecast.xml /etc/icecast2/icecast.xml

#Enable init.d
COPY icecast-config/icecast2 /etc/default/icecast2

#Expose icecast port
EXPOSE 38080

#Start icecast2, wait until is ready, run ezstream and info service, then run a bash console
ENTRYPOINT service icecast2 restart & /bin/bash

