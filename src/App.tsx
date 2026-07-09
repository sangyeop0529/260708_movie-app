import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabaseClient";
import { signIn, signOut, signUp } from "./api/auth";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    console.log("email:", email, "password:", password);
    try {
      await signUp(email, password);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("회원가입에 실패했습니다.");
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("로그인에 실패했습니다.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err); // 로그는 남기되
    } finally {
      setSession(null); // 서버 실패와 무관하게 클라이언트 상태는 정리
    }
  };

  useEffect(() => {
    // 1) 현재 세션이 있는지 처음 한 번 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2) 이후 로그인 상태가 바뀔 때마다 자동으로 반응
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    // 3) 컴포넌트가 사라질 때 리스너 정리 (cleanup)
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      {session ? (
        <div className="text-center space-y-4">
          <p className="text-lg font-bold text-gray-800">
            환영합니다, {session.user.email}님!
          </p>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            로그인
          </h1>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <input
            className="border rounded px-3 py-2 w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          <input
            className="border rounded px-3 py-2 w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <div className="flex gap-2">
            <button
              className="flex-1 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
              onClick={handleSignUp}
            >
              회원가입
            </button>
            <button
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSignIn}
            >
              로그인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
