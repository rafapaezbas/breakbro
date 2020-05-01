sudo docker build -t rpaezbas/manager:0.01 . 
sudo docker run --name manager -p 38081:38081/tcp --link streamer:streamer -v /home/streamers:/home/streamers --rm -ti rpaezbas/manager:0.01 /bin/bash
