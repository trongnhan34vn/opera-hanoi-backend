#!/bin/bash

# Đọc file JSON
JSON_FILE="/Volumes/Music/ITProject/HanoiOperaHouse/util/concert_db/concert_data.json"

# Duyệt qua từng phần tử trong mảng JSON
for row in $(jq -c '.[]' $JSON_FILE); do
    # Trích xuất các giá trị từ phần tử JSON
    if [ $counter -eq 0 ]; then
        # Trích xuất các giá trị từ phần tử JSON
        title=$(echo $row | jq -r '.title')
        description=$(echo $row | jq -r '.description')
        art=$(echo $row | jq -r '.art')
        director=$(echo $row | jq -r '.director')
        duration=$(echo $row | jq -r '.duration')
        price=$(echo $row | jq -r '.price')
        categories=$(echo $row | jq -r '.categories | join(",")')
        showTimes=$(echo $row | jq -r '.showTimes | join(",")')

        # In ra thông tin của phần tử đầu tiên
        echo "Title: $title"
        echo "Description: $description"
        echo "Art: $art"
        echo "Director: $director"
        echo "Duration: $duration"
        echo "Price: $price"
        echo "Categories: $categories"
        echo "ShowTimes: $showTimes"
    fi
    # title=$(echo $row | jq -r '.title')
    # description=$(echo $row | jq -r '.description')
    # art=$(echo $row | jq -r '.art')
    # director=$(echo $row | jq -r '.director')
    # duration=$(echo $row | jq -r '.duration')
    # price=$(echo $row | jq -r '.price')
    # categories=$(echo $row | jq -r '.categories | join(",")')
    # showTimes=$(echo $row | jq -r '.showTimes | join(",")')

    # # In ra thông tin
    # echo "Title: $title"
    # echo "Description: $description"
    # echo "Art: $art"
    # echo "Director: $director"
    # echo "Duration: $duration"
    # echo "Price: $price"
    # echo "Categories: $categories"
    # echo "ShowTimes: $showTimes"
done