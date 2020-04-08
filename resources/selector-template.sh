#!/bin/bash
#count number of lines in file
number_of_lines=$(wc -l ./playlist | awk '{print $1}')
#if there are no lines left, generate the file again
if [ $number_of_lines -eq "0" ]; then
    #generate the file again with every song
    readlink -f ./music/* > ./playlist
    number_of_lines=$(wc -l ./playlist | awk '{print $1}')
fi
#generate random number between 0 and number of lines
line_number=$(($RANDOM % $number_of_lines + 1));
#read the line
song=$(head -"$line_number" ./playlist | tail -1);
#remove the line, watch the concatenation!
sed -i $line_number" d" ./playlist
mp3info -p '{"title": "%t","artist": "%a" ,"album" : "%l" }' "$song" > ./info.json
echo $song;
