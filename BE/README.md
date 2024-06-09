## Backend

### 가상환경 세팅 (Mac)
`BE` 디렉토리에서 작업 (최초 1회)
```bash
python3 -m venv venv
```

### 작업 환경 (가상환경) 세팅
```bash
souce venv/bin/activate
pip install -r requirements.txt
```

### 프로젝트 실행
--reload 옵션 부여: 변경사항 발생 시 서버 자동 재시작
```bash
uvicorn main:app --reload
```

### 새로운 패키지 설치 시
패키지 정보 기록
```bash
pip freeze > requirements.txt
```
패키지 업데이트 사항 가상환경에 반영
```bash
pip install -r requirements.txt
```

### 가상환경 비활성화
```bash
deactivate
```

