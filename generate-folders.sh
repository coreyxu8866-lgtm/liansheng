#!/bin/bash
# 定义json文件路径
jsonFile="product-folders.json"

# 清空原有文件
echo "[" > $jsonFile

# 遍历images/products下的子文件夹
first=1
for folder in images/products/*/; do
    # 获取纯文件夹名（去掉路径和末尾/）
    folderName=$(basename "$folder")
    if [ $first -eq 1 ]; then
        first=0
    else
        echo "," >> $jsonFile
    fi
    echo "    \"$folderName\"" >> $jsonFile
done

echo "]" >> $jsonFile

echo "已生成产品文件夹列表：$jsonFile"