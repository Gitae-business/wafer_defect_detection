from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
import sys
import gdown
import numpy as np
import pandas as pd

import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.serialization import add_safe_globals

app = Flask(__name__)
CORS(app)

# 디코딩에 사용할 결함 종류 텍스트
failure_types = ['Center', 'Donut', 'Edge-Loc', 'Edge-Ring', 'Loc', 'Near-full', 'Random', 'Scratch', 'none']

class CNN(nn.Module):
    def __init__(self, num_classes):
        super(CNN, self).__init__()
        
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)

        self.pool = nn.MaxPool2d(2, 2)
        
        self.fc1 = nn.Linear(128 * 37 * 25, 512)
        self.fc2 = nn.Linear(512, num_classes)

        self.dropout = nn.Dropout(0.5)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.dropout(x)
        x = self.pool(F.relu(self.conv2(x)))
        x = self.dropout(x)
        x = self.pool(F.relu(self.conv3(x)))
        
        x = x.view(-1, 128 * 37 * 25)
        
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)

        return x

# waferMap 전처리 함수
def resizing(originMap):
    maxRow = 300
    maxCol = 202
    
    if len(originMap.shape) != 2:
        originMap = np.array(originMap)
    
    if originMap.shape == (maxRow, maxCol):
        return originMap
    
    resizedMap = cv2.resize(originMap.astype(float), (maxCol, maxRow), interpolation=cv2.INTER_LINEAR)
    
    return resizedMap

sys.modules['CNN'] = CNN
add_safe_globals([CNN, nn.Conv2d, nn.Linear, nn.MaxPool2d, nn.Dropout])

# Google Drive에서 pth 파일 다운로드
file_id = "1t5ZQjAcKBLlkAhstqMogNqWBXCe5G3Jg"
output_path = os.path.join(os.getcwd(), "CNN_01_weights.pth")

if not os.path.exists(output_path):  # 파일이 없을 때만 다운로드
    url = f"https://drive.google.com/uc?id={file_id}"
    gdown.download(url, output_path, quiet=False)

# 모델 로드
model = CNN(num_classes=9)
state_dict = torch.load(output_path, map_location=torch.device('cpu'))
model.load_state_dict(state_dict)
model.eval()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # JSON 데이터 받기
        data = request.get_json()
        wafer_map = data.get('waferMap')
        
        if wafer_map is None:
            return jsonify({'error': 'No waferMap provided'}), 400
        
        wafer_map = np.array(wafer_map)

        resized_image = resizing(wafer_map)
        image_tensor = torch.FloatTensor(resized_image).unsqueeze(0).unsqueeze(0)  # 배치 크기와 채널 차원 추가
        
        # 예측
        with torch.no_grad():
            outputs = model(image_tensor)
            _, predicted = torch.max(outputs, 1)
        
        predicted_class = failure_types[predicted.item()]
        
        return jsonify({'predicted_class': predicted_class})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)