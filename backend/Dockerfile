# 베이스가 될 이미지
FROM python:3

# 환경변수
ENV PYTHONUNBUFFERED 1

# 작업경로
WORKDIR /usr/src/app

# 현재 경로(.)에 존재하는 파일들을 이미지 . 경로에 모두 추가 
COPY . .

# 이미지를 만들기 위해 컨테이너 내부에서 실행할 명령어
RUN pip install pip --upgrade
RUN pip install -r requirements.txt


# 이동한 디렉토리에서 django를 가동시켜주는 코드를 작성합니다. 여기서 port는 8000로 실행시키겠습니다
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
#CMD ["gunicorn", "--bind", "0.0.0.0:8000", "djangoreactapi.wsgi:application"]

# 컨테이너 실행 시 노출될 포트
#EXPOSE 8000