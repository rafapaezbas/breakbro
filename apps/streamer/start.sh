sudo docker build -t rpaezbas/streamer:0.01 . 
sudo docker run --name streamer --link icecast2:icecast2 -p 38082:38082/tcp -v /home/streamers:/home/streamers --rm -ti rpaezbas/streamer:0.01 /bin/bash
