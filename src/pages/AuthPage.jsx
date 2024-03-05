import { useState } from "react";
import { auth, provider } from "./../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isForgotPass, setIsForgotPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabınız başarıyla oluşturuldu.");
          navigate("/feed");
        })
        .catch((err) => toast.error(`Üzgünüz bir hata oluştu: ${err.code}`));
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınıza giriş yapıldı");
          navigate("/feed");
        })
        .catch((err) => {
          if (err.code == "auth/invalid-credential") {
            isForgotPass(true);
          }
          toast.error(`Üzgünüz bir hata oluştu: ${err.code}`);
        });
    }
  };

  const sendMail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("E-postanıza şifre sıfırlama kodu gönderildi");
      })
      .catch(() => {
        toast.error("E-posta gönderilirken bir hata oluştu");
      });
  };

  const logingWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => navigate("/feed"));
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logo.webp" />
        </div>

        <h1 className="text-center font-bold text-xl">Twitter'a Giriş Yap</h1>

        {/* Google Button */}
        <button
          onClick={logingWithGoogle}
          className="flex items-center bg-white py-2 px-10 rounded-full text-black cursor-pointer gap-3 transition hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" alt="" />
          <span className="whitespace-nowrap">Google ile Giriş Yap</span>
        </button>

        {/* Giriş Formu */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-5">Şifre</label>
          <input
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            type="password"
            required
            onChange={(e) => setPass(e.target.value)}
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignUp ? "Kayıt Ol" : "Giriş Yap"}
          </button>

          <p className="mt-5 flex gap-4 ">
            <span className="text-gray-500">Hesabınız yoksa </span>
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 cursor-pointer select-none"
            >
              {isSignUp ? "Giriş Yap" : "Kayıt Ol"}
            </span>
          </p>
        </form>

        {isForgotPass && (
          <p
            onClick={sendMail}
            className="text-center text-red-500 cursor-pointer"
          >
            Şifrenizi mi unuttunuz?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
