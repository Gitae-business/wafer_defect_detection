from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import cv2
import torch

app = Flask(__name__)

# 모델 로드
model = torch.load('CNN_01.pth')
model.eval()

# 디코딩에 사용할 결함 종류 텍스트
failure_types = ['Center', 'Donut', 'Edge-Loc', 'Edge-Ring', 'Loc', 'Near-full', 'Random', 'Scratch', 'none']

# waferMap 전처리 함수
def resizing(originMap):
    maxRow = 300
    maxCol = 202
    
    if len(originMap.shape) != 2:
        originMap = np.array(originMap)
    
    if originMap.shape == (maxRow, maxCol):
        return originMap
    
    resizedMap = cv2.resize(originMap, (maxCol, maxRow), interpolation=cv2.INTER_LINEAR)
    
    return resizedMap

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    image_bytes = file.read()
    image_array = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_GRAYSCALE)
    
    resized_image = resizing(image)
    image_tensor = torch.FloatTensor(resized_image).unsqueeze(0).unsqueeze(0)
    
    with torch.no_grad():
        outputs = model(image_tensor)
        _, predicted = torch.max(outputs, 1)
    
    predicted_class = failure_types[predicted.item()]
    
    return jsonify({'predicted_class': predicted_class})

if __name__ == '__main__':
    app.run(debug=True)
