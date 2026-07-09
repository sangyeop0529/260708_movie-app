interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string | null;
  handleSignUp: () => void;
  handleSignIn: () => void;
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleSignUp,
  handleSignIn,
}: LoginFormProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        로그인
      </h1>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded mb-3">
          {error}
        </p>
      )}

      <div className="space-y-3">
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
            className="flex-1 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
            onClick={handleSignUp}
          >
            회원가입
          </button>
          <button
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleSignIn}
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
