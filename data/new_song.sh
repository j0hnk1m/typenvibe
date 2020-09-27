#!/bin/bash

printf "Spotify Track ID: "
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

touch $spotify_track_id.lrc

songs=$(ls | grep "^songs")
echo -e "${spotify_track_id},${delay},${difficulty}" >> $songs