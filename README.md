# 학습 플래너

## 프로젝트 개요
=> 한 주간의 학습 스케줄을 편집하고 저장하는 플래너 구현.
=> 수업(학습 블록)을 추가, 수정, 삭제할 수 있으며 시간 충돌 검사를 통해 중복된 일정 등록을 방지합니다.
=> 또한 주간 이동 기능과 LocalStorage 기반 데이터 저장을 통해 주차별 학습 계획을 유지할 수 있도록 구현했습니다. 

## 기술 스택
### Frontent
- React
- TypeScript
- Styled-components
- Vite

### State / Data
- React Hooks ('useState', 'useEffect')
- LocalStorage
- Mock API Layer

## 실행 방법
### 1. 프로젝트 설치
--- bash
npm install
---
### 2. 개발 서버 실행
--- bash
npm run dev
---
### 3. 접속
--- bash
http://localhost:5173
---

## 프로젝트 구조 설명
```txt
src/
├── components/                # UI 컴포넌트 및 styled-components
│   ├── PlannerGrid.tsx
│   ├── PlannerGridStyle.ts
│   ├── DraftModal.tsx
│   ├── DraftModalStyle.ts
│   ├── StudyBlockItem.tsx
│   ├── StudyBlockItemStyle.ts
│   ├── WeeklySummary.tsx
│   └── WeeklySummaryStyle.ts
│
├── hooks/                     # 커스텀 훅
│   └── usePlanner.ts
│
├── mock/                      # Mock 데이터
│   ├── plannerMock.ts
│   └── courseMock.ts
│
├── pages/                     # 페이지 컴포넌트
│   └── PlannerPage.tsx
│
├── services/                  # API 레이어 (mock/localStorage 기반)
│   └── plannerApi.ts
│
├── types/                     # TypeScript 타입 정의
│   ├── api.ts
│   ├── course.ts
│   └── planner.ts
│
└── utils/                     # 공통 유틸 함수
    ├── time.ts                # 시간 계산 관련
    ├── conflict.ts            # 시간 충돌 검사
    └── summary.ts             # 주간 통계 계산
```

## 요구사항 해석 및 가정
### 시간표 단위
- 30분 단위 시간표로 해석하여 구현했습니다.
- 08:00 ~ 20:00 기준으로 구성했습니다.

### 저장 방식
- 실제 서버 API 대신 LocalStorage 기반 Mock API 형태로 구현했습니다.
- 주차별 데이터가 각각 저장되도록 key 값을 분리했습니다.

### 충돌 검사
- 추가/수정 시에 같은 요일에 시간이 겹치는 블록은 등록되지 않도록 처리했습니다. 

## 설계 결정과 이유
### 1. usePlanner Hook 분리
시간표 관련 상태 및 로직을 커스텀 훅으로 분리

분리한 로직:
- 블록 CRUD
- 충돌 검사
- 저장 처리
- 주간 이동
- 로딩 상태 관리

### 2. API Layer 분리
초기에는 LocalStorage를 컴포넌트 내부에서 직접 사용했지만, 이후 'service/plannerApi.ts'로 분리했습니다.

이를 통해 
- 실제 API 전환이 쉬워지고
- 데이터 접근 책임을 분리할 수 있었습니다.

### 3. Draft / Server 상태 분리
편집 중 상태('draftBlocks')와 저장 완료 상태('serverBlocks'를 분리하여 저장 여부(isDirty)를 판단할 수 있도록 설계했습니다.

이를 통해
- 저장 버튼 활성화 제어
- 저장되지 않은 변경사항 경고

## 미구현 / 제약사항
### 미구현
- Drag & Drop 시간표 이동

### 제약사항
- 현재는 LocalStorage 기반으로만 동작합니다.
- 브라우저 저장소 삭제 시 데이터가 초기화 됩니다.

## AI 활용 범위

개발 과정에서 ChatGPT 를 활용하여:
- TypeScript 타입 설계
- 시간 계산 로직 구현
- LocalStorage 기반 MOCK API 구조 설계
에서 기능 요구사항에 맞게 수정 및 재구성하여 구현을 진행했습니다.

