#!/bin/bash

printf "song title: "
read -r title
title=$(echo $title | sed 's/.*/\L&/; s/[a-z]*/\u&/g')

printf "song artist: "
read -r artist
artist=$(echo $artist | sed 's/.*/\L&/; s/[a-z]*/\u&/g')

name="${title} - ${artist}"

title=$(echo ${title//[[:blank:]]/} | sed 's/^[A-Z]/\L&/')
artist=$(echo ${artist//[[:blank:]]/} | sed 's/^[A-Z]/\L&/')
key="${title}_${artist}"
echo $key

printf "lrc file is ahead by ??? s: "
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

mkdir $key
touch $key/$key.lrc

songlist=$(ls | grep "^songlist")
echo -e "${name},${key},${delay},${difficulty}" >> $songlist