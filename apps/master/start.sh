sudo docker build -t rpaezbas/icecast2:0.01 . 
sudo docker run --name icecast2 -p 38080:38080/tcp --rm -ti rpaezbas/icecast2:0.01 /bin/bash
