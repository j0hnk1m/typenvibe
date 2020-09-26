#!/bin/bash

printf "Title: "
read -r title

printf "Artist: "
read -r artist

title_key=$(echo $title | sed 's/.*/\L&/; s/[a-z]*/\u&/g')
artist_key=$(echo ${artist//[[:blank:]]/} | sed 's/^[A-Z]/\L&/')
title_key=$(echo ${title_key//[[:blank:]]/} | sed 's/^[A-Z]/\L&/')
artist_key=$(echo $artist_key | sed 's/.*/\L&/; s/[a-z]*/\u&/g')
key="${title_key}_${artist_key}"
echo $key

printf "Spotify Track ID (ex: spotify:track:0VjIjW4GlUZAMYd2vXMi3b): "
read -r spotify_track_id

printf "Lrc file is ahead by ??? s: "
read -r delay

PS3='Please enter your choice: '
options=("easy" "medium" "hard" "impossible")
select difficulty in "${options[@]}"
do
    case $difficulty in
        "easy")
            break
            ;;
        "medium")
            break
            ;;
        "hard")
            break
            ;;
        "impossible")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done

touch $key/$key.lrc

songlist=$(ls | grep "^songlist")
echo -e "${title},${artist},${key},${spotify_track_id},${delay},${difficulty}" >> $songlist