# DoToDo – AWS기반 ADHD 맞춤형 일정관리 서비스

![DoToDo Logo](frontend/public/logo.png)


## 서비스 소개

**DoToDo**는 성인 ADHD 사용자들을 위해 설계된 **일정 등록 및 반복 리마인드 서비스**입니다.  
집중력 부족과 시간 관리에 어려움을 겪는 사용자들을 위해 단순한 투두리스트를 넘어, **주기적인 리마인드와 클라우드 기반 안정적인 알림 시스템**을 제공합니다.

- 매일 반복적으로 할 일을 등록하고, 완료 여부를 기록
- 설정한 시간 간격(interval)에 따라 **반복 알림**
- **PWA 기반 앱**으로 모바일에서도 푸시 알림 수신 가능
- AWS 기반 아키텍처를 통해 **안정적인 스케일링 및 알림 누락 방지**
- **FCM(HTTP v1)** 기반 알림 전송과 SQS + Lambda를 통한 **비동기 병렬 처리**

---

## 기획 배경

ADHD 성인은 일반적인 일정관리 앱을 사용하기 어려운 경우가 많습니다.

- 하루에 한 번만 오는 알림
- 복잡한 UI
- 알림 누락 발생 시 대안 없음

**DoToDo**는 이러한 문제를 해결하기 위해:

- **일정마다 반복 알림을 보낼 수 있도록 설계**
- **간단한 UI/UX와 최소 입력 방식**
- **클라우드 기반 푸시알림 병렬 처리와 장애 대응 설계**

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프론트엔드 | React, Vite, PWA, Tailwind CSS |
| 백엔드 | FastAPI (Python), Uvicorn |
| 인증 | Firebase Authentication |
| 데이터베이스 | MySQL (Amazon RDS) |
| 메시징 | Amazon SQS |
| 알림 | FCM (Firebase Cloud Messaging HTTP v1 API) |
| 클라우드 인프라 | AWS ECS Fargate, RDS, ALB, S3, Lambda, Secrets Manager, CloudWatch, CodePipeline, Firehose, OpenSearch |
| 성능 테스트 | k6, InfluxDB, Grafana |
| IaC | AWS CloudFormation |

---

## AWS 인프라 아키텍처
