# 🛠 WM-811K Wafer Map 데이터셋을 활용한 반도체 결함 분류 프로젝트

### 📌 프로젝트 개요
본 프로젝트는 157MB의 WM-811K Wafer Map 데이터셋을 활용하여 CNN 모델을 적용한 9가지 결함 분류를 수행하는 가벼운 딥러닝 프로젝트입니다.

### 🎯 목표
- 반도체 웨이퍼의 결함을 정확하게 분류
- 데이터 분석 및 시각화를 통해 결함 패턴 탐색
- 머신러닝 & 딥러닝을 활용한 모델 성능 비교 및 최적화


## 🔧 0. 환경 구축
이 프로젝트는 157MB의 WM-811K Wafer Map 데이터셋에 간단한 CNN 모델을 적용해  
9가지의 결함 종류를 분류하는 가벼운 딥러닝 프로젝트입니다.  
하단에 기재된 절차를 통해 직접 코드를 구동해 볼 수 있습니다.  
<br/>
먼저 프로젝트 폴더를 생성할 경로에서 터미널로 아래 코드를 실행시켜 주세요.  
```bash
git clone https://github.com/Gitae-business/wafer_defect_detection.git
cd wafer_defect_detection
mkdir data  # data 폴더 생성
```
프로젝트 폴더의 최상위 경로에 대해 root라고 하겠습니다.  
아래 링크에서 pkl을 다운받아 data 폴더 안에 넣어주세요.  
https://www.kaggle.com/datasets/qingyi/wm811k-wafer-map
<br/><br/>
@/api/analysis.ipynb 파일에서 데이터 분석 내용을 확인하고 모델을 생성할 수 있습니다.  
모델을 직접 학습시키거나 구조를 바꾸고 싶다면 해당 파일을 실행하시면 됩니다.  
ipynb 파일을 구동시키지 않더라도 index.py를 실행시키면 미리 학습시킨 파일이 자동으로 root에 다운됩니다.  
<br/>
> *만약 .pth 파일이 제대로 다운되지 않는다면 아래 링크에서 직접 다운받으실 수 있습니다.*
*https://drive.google.com/file/d/1t5ZQjAcKBLlkAhstqMogNqWBXCe5G3Jg/view?usp=drive_link*  
*해당 CNN_01_weights.pth 파일을 root 안에 넣어주세요*

<br/>

root에서 .env.local 파일을 생성해주세요.  
이는 index.py로 동작시킨 Flask API의 엔드포인트를 명시하기 위한 환경변수 파일입니다.  
.env.local을 열어 아래와 같이 작성하고 저장해줍니다.  
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```  
<br/>

index.py로 Flask API를 활성화하기 위해서 파이썬 가상환경이 필요합니다.  
터미널에 다음을 차례로 입력합니다.  
```
python -m venv venv
venv/Scripts/activate
pip install -r requirements.txt
```
이후 F1을 눌러 명령 팔레트를 열고, 'Python: Select Interpreter'를 선택합니다.  
Python {설치된 파이썬 버전} ('venv': venv) 라고 적힌 탭을 클릭합니다.  
그 후 index.py 파일을 클릭하고 우측 상단 실행 버튼을 눌러 Flask 서버를 실행합니다.  
이제 http://localhost:5000 경로로 Flask API에 접근이 가능합니다.  
<br/>
마지막으로 다른 터미널을 하나 더 열어줍니다.  
pip i 를 입력하여 라이브러리를 설치합니다.  
설치가 완료되었다면 npm run dev를 입력합니다.  
http://localhost:3000 에서 웹 실행을 확인할 수 있습니다.  

<br/>

---

## 📚 1. 프로젝트 개요
### 🏆 1.1 프로젝트 배경 및 목적
- 반도체 산업은 한국 경제에서 중요한 역할을 하며, 2021년 반도체 수출액이 전체 35%를 차지
- 반도체 제조 과정에서의 품질 관리 및 결함 감지는 필수
- CNN 모델을 활용하여 웨이퍼 결함을 자동 분류하고 공정 개선에 기여
### 📊 1.2 WM-811K 데이터셋 소개
총 811,457개의 웨이퍼 맵 데이터  
9가지 결함 패턴 (Center, Donut, Edge-Loc, Edge-Ring, Loc, Near-full, None, Random, Scratch)  
데이터 불균형 문제 존재 → 데이터 증강 기법 필요  
<br/>

## 🔍 2. 데이터 탐색 및 EDA
### ✅ 2.1 데이터 구조 파악
### ✅ 2.2 기술 통계 분석
### ✅ 2.3 시각화를 통한 인사이트 도출
<br/>

## 🛠 3. 데이터 전처리
### ✅ 3.1 결측치 처리
### ✅ 3.2 이상치 처리
### ✅ 3.3 특성 선택 및 생성
<br/>

## 🤖 4. 머신러닝을 활용한 결함 분류
### ✅ 4.1 모델 선택 및 학습
### ✅ 4.2 모델 평가 및 비교
### ✅ 4.3 하이퍼파라미터 튜닝
<br/>

## 🧠 5. CNN을 활용한 결함 분류
### ✅ 5.1 모델 아키텍처 설계
### ✅ 5.2 모델 학습 및 최적화
### ✅ 5.3 성능 평가 및 시각화
<br/>

## 📈 6. 결과 분석 및 해석
<br/>

## 🏁 7. 결론 및 제안
### ✅ 7.1 프로젝트 요약
### ✅ 7.2 한계점 및 향후 연구 방향
<br/>

