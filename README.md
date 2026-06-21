# Judo Store 프로젝트 프롬프트

## 프로젝트 정보

**프로젝트명**
Judo Store

**주제**
유도 도복 전문 쇼핑몰 제작

**기술 스택**

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Supabase
- Toss Payments (Test)

---

# 1-1 프로젝트 기본 구조

## 역할

Next.js 15 + TypeScript + Tailwind + Shadcn/UI + Supabase 전문 개발자

## 목표

유도 도복 전문 쇼핑몰 Judo Store의 기본 구조를 생성한다.

## 구현

### Header

- Logo
- Products
- Brands
- Cart

### Main

- Hero Banner
- Featured Brands
- Featured Products

### Footer

- Copyright
- Github
- Contact

## 주의사항

- 상품 기능은 구현하지 않는다.

## 출력 규칙

- 기존 파일 전체 코드 출력 금지
- 새 파일만 전체 코드 출력
- 기존 파일은 변경 부분만 출력

---

# 1-2 디자인 시스템

## 목표

쇼핑몰 디자인 시스템 구축

## 구현

- Typography
- Color
- Spacing
- Card
- Button
- Badge
- Container
- Grid
- Responsive
- Dark Mode

## 주의사항

- 기존 Layout 수정 최소화
- 기존 파일 전체 코드 출력 금지

---

# 2-1 Supabase 연결

## 전제

환경변수는 이미 설정되어 있다.

## 작업

- lib/supabase/client.ts
- lib/supabase/server.ts
- products 테이블 연결
- 42개 상품 조회 확인

## 주의사항

- UI 수정 금지
- 기존 파일 전체 코드 출력 금지

---

# 2-2 Product Type

## 작성 파일

- types/product.ts
- lib/supabase/queries.ts

## 구현 함수

- getProducts()
- getProduct()
- getBrands()
- getProductsByBrand()

## 주의사항

- UI 수정 금지
- 기존 파일 전체 코드 출력 금지

---

# 3-1 상품 목록 데이터

## 목표

Products 조회 및 정렬

### 브랜드 정렬

1. Mizuno
2. KuSakura
3. Fighting Films
4. Essimo
5. DAX Sports

### 등급 정렬

1. IJF
2. Premium
3. Competition
4. Training
5. Beginner
6. Accessory

## 주의사항

- UI 구현 금지
- 기존 파일 전체 코드 출력 금지

---

# 3-2 상품 목록 UI

## 카드 구성

- 이미지
- 상품명
- 브랜드
- 등급 Badge
- 가격

## UI

- Hover Effect
- Responsive
- Skeleton Loading

## 주의사항

- UI만 구현
- 기존 파일 전체 코드 출력 금지

---

# 4-1 브랜드 필터

## 구현

- All
- Mizuno
- KuSakura
- Fighting Films
- Essimo
- DAX Sports

## 기능

- 브랜드 선택 시 상품 즉시 변경
- 검색 기능

## 주의사항

- UI 최소 수정
- 기존 파일 전체 코드 출력 금지

---

# 4-2 상품 상세

## 표시 항목

- 이미지
- 상품명
- 브랜드
- 등급
- 가격
- 설명
- 재고
- 사이즈
- 수량 선택
- 장바구니 버튼
- Breadcrumb

## 주의사항

- 기존 파일 전체 코드 출력 금지

---

# 5-1 장바구니 데이터

## 구현

localStorage 기반

- 추가
- 삭제
- 수량 변경
- 총 금액 계산

## 주의사항

- UI 구현 금지
- 기존 파일 전체 코드 출력 금지

---

# 5-2 장바구니 UI

## 표시

- 상품 이미지
- 상품명
- 가격
- 수량
- 총 금액

## 기능

- 비우기
- 결제하기

## UI

- Responsive

## 주의사항

- 기존 파일 전체 코드 출력 금지

---

# 6-1 검색 및 정렬

## 검색

- 상품명
- 브랜드
- 등급

## 정렬

- 가격 낮은순
- 가격 높은순
- 브랜드순
- 등급순

## 주의사항

- UI 최소 수정
- 기존 파일 전체 코드 출력 금지

---

# 6-2 즐겨찾기

## 구현

localStorage 기반

- 즐겨찾기 추가
- 즐겨찾기 삭제
- 즐겨찾기만 보기

## UI

- 상품 카드 하트 아이콘
- Toast 알림

## 주의사항

- 기존 파일 전체 코드 출력 금지

---

# 6-2 완료 체크리스트

- [ ] Supabase 상품 42개 표시
- [ ] 브랜드 필터 정상 동작
- [ ] 등급 정렬 정상 동작
- [ ] 상품 상세 페이지 이동
- [ ] 장바구니 담기
- [ ] 장바구니 수량 변경 및 삭제
- [ ] 새로고침 후 장바구니 유지
- [ ] 즐겨찾기 저장
- [ ] 즐겨찾기만 보기
- [ ] 검색 및 정렬 정상 동작

---

# 7-1 Toss Payments

## 환경변수

- NEXT_PUBLIC_TOSS_CLIENT_KEY
- TOSS_SECRET_KEY

## 구현

- /api/payments
- Test Key만 사용

## 주의사항

- UI 구현 금지
- 기존 파일 전체 코드 출력 금지

---

# 7-2 결제 UI

## 구현

- 결제하기
- 주문번호 생성
- 결제 성공 페이지
- 결제 실패 페이지

## 주의사항

- Test 결제만 사용
- 실제 결제 금지
- 기존 파일 전체 코드 출력 금지

---

# 8-1 디자인 개선

## 구현

- Hero Banner
- Brand Section
- Hover Animation
- Loading Skeleton
- Dark Mode
- Responsive

## 주의사항

- 기존 기능 수정 금지
- 기존 파일 전체 코드 출력 금지

---

# 8-2 추가 기능

## 구현

- 최근 본 상품
- 추천 상품
- 장바구니 Badge
- 브랜드별 상품 개수
- 검색 결과 개수
- Quick View Modal
- Toast 알림

## 주의사항

- 기존 파일 전체 코드 출력 금지

---

# 9 최종 점검

## 실행

npm run dev

npm run lint

npm run build

## 확인

- [ ] 42개 상품 정상 표시
- [ ] 브랜드 필터 정상 동작
- [ ] 상품 상세 정상 동작
- [ ] 장바구니 정상 동작
- [ ] Toss Test 결제 정상 동작
- [ ] 반응형 UI 정상 동작
- [ ] 404 페이지 확인
- [ ] 500 에러 없음

## 주의사항

- 기능 추가 금지
- 에러 수정만 진행
- 기존 파일 전체 코드 출력 금지