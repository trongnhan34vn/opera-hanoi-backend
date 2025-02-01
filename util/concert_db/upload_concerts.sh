#!/bin/bash

# Read the JSON file
json_data=$(cat concert_data.json)

# Extract each concert item
concerts=$(echo "$json_data" | jq -c '.[]')

# Loop through each concert and call the API
counter=0
for concert in $concerts; do
    if [ $counter -eq 0 ]; then
        echo "$concert"
        break
    fi
    counter=$((counter + 1))
done