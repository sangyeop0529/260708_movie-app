# 🎬 Movie Search App

React + TypeScript로 만든 영화 검색 애플리케이션입니다.
로그인한 사용자만 TMDB API로 영화를 검색할 수 있으며, Supabase를 이용한 이메일/비밀번호 인증을 지원합니다.

🔗 **[Live Demo](https://260708-movie-app.vercel.app/)**

---

## 📌 주요 기능

- ✅ **회원가입 / 로그인 / 로그아웃** (Supabase Auth)
- ✅ **로그인 상태 유지** (새로고침해도 세션 유지, 자동 로그인 감지)
- ✅ **영화 검색** (TMDB API, Enter 키/버튼 지원)
- ✅ **반응형 그리드 레이아웃** (화면 크기에 따라 2~4열 자동 조정)
- ✅ **포스터 없는 영화 예외 처리**
- ✅ **로딩 / 에러 상태 처리**

---

## 🛠 기술 스택

| 분류       | 기술                      |
| ---------- | ------------------------- |
| Language   | TypeScript                |
| Library    | React                     |
| Build Tool | Vite                      |
| Styling    | Tailwind CSS              |
| Auth / DB  | Supabase (Authentication) |
| 외부 API   | TMDB (The Movie Database) |
| Deploy     | Vercel                    |

---

## 📂 프로젝트 구조

```
src/
├── api/
│   ├── auth.ts              # 회원가입, 로그인, 로그아웃 함수
│   └── movie.ts              # TMDB 영화 검색 함수
├── components/
│   ├── LoginForm.tsx          # 로그인 / 회원가입 폼 UI
│   └── MovieSearch.tsx         # 영화 검색 입력창 + 결과 그리드
├── lib/
│   └── supabaseClient.ts       # Supabase 클라이언트 초기화
├── types.ts                    # Movie 타입 정의
├── App.tsx                     # 세션 관리 및 화면 분기
└── main.tsx
```

---

## 🧠 구현하며 배운 것

- **외부 인증 서비스 연동**: Supabase Auth로 회원가입/로그인/로그아웃을 구현하고, `onAuthStateChange`로 로그인 상태 변화를 실시간으로 감지
- **세션 기반 화면 분기**: 로그인 여부(`session`)에 따라 로그인 폼과 핵심 기능(영화 검색) 화면을 조건부로 렌더링
- **비동기 초기화 처리**: 앱 첫 실행 시 `getSession()`으로 기존 세션 여부를 확인하는 동안 로딩 상태를 별도로 관리하여 화면 깜빡임 방지
- **컴포넌트 책임 분리**: 로그인 관련 상태/로직은 `App.tsx`가 소유하고 `LoginForm`은 UI만 담당(props로 전달), 반면 영화 검색은 완전히 독립된 컴포넌트(`MovieSearch`)로 구성 — 상태 소유 위치를 상황에 따라 다르게 설계
- **에러 핸들링**: Supabase가 반환하는 에러를 그대로 노출하지 않고 사용자 친화적인 메시지로 변환하여 표시
- **API 응답 구조 파싱**: TMDB 응답의 중첩 구조(`results` 배열)를 정확히 추출하고, 배열 전체를 반환하도록 설계

---

## 🚀 실행 방법

```bash
git clone https://github.com/sangyeop0529/260708_movie-app.git
cd 260708_movie-app
npm install
```

루트에 `.env` 파일 생성 후 아래 내용 작성:

```
VITE_TMDB_API_KEY=발급받은_TMDB_API_키
VITE_SUPABASE_URL=발급받은_Supabase_Project_URL
VITE_SUPABASE_ANON_KEY=발급받은_Supabase_anon_key
```

```bash
npm run dev
```

**참고**: Supabase 프로젝트에서 이메일 인증 없이 바로 테스트하려면, 대시보드 → `Authentication → Providers → Email`에서 "Confirm email" 옵션을 꺼두면 편리합니다.

---

## 🔜 향후 개선 방향

- 찜하기 기능 (Supabase DB에 사용자별 찜 목록 저장)
- React Router로 페이지 라우팅 분리 (`/login`, `/search` 등)
- 영화 상세 페이지 (줄거리, 출연진 등)
- 검색 결과 페이지네이션
- 소셜 로그인 (Google 등) 추가
