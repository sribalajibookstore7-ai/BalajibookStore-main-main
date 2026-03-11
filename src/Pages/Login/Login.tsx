import { useState } from "react";
import { UserLogin } from "../../services/api";
import VideoBackground from '../../assets/media/bg_video.mp4';
function Login() {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [erro, setErro] = useState<string>('');
  // console.log(username, password);
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await UserLogin(username, password);
      console.log("Login bem-sucedido:", data);
      window.location.href = "/";
    } catch (err) {
      setErro("Credenciais inválidas! Tente novamente.");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Vídeo de fundo */}
      <video
        src={VideoBackground}
        loop
        muted
        autoPlay
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        Seu navegador não possui suporte para o vídeo!
      </video>

      {/* Formulário sobreposto */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <form
          onSubmit={handleLogin}
          className="bg-gray-950 p-4 rounded-lg shadow-md text-white w-full max-w-md shadow-neutral-50"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center">Faça seu Login!</h1>
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 rounded text-white bg-gray-900 outline-0"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Insira seu username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 rounded text-white bg-gray-900 outline-0"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Insira sua senha"
            />
          </div>

          {erro && (
            <p className="text-red-500 text-sm mb-4">{erro}</p>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Logar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
