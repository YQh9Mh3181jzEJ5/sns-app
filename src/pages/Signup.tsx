import BackgroundImage from "@/components/BackgroundImage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { authApi } from "@/features/auth/api/authApi";
import { SessionContext } from "@/SessionProvider";
import { User } from "@/type/settion";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

type SignupResponse = {
  id?: string;
  email?: string;
  user_metadata?: {
    name?: string;
  };
};

function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { currentUser, setCurrentUser } = useContext(SessionContext);

  const signup = async () => {
    try {
      const signupUser: SignupResponse = await authApi.signup({
        name,
        email,
        password,
      });
      const formattedUser: User = {
        id: signupUser.id ?? "",
        name: signupUser.user_metadata?.name || name,
        email: signupUser.email || "",
        userName: signupUser.user_metadata?.name || name,
      };

      setCurrentUser(formattedUser);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  if (currentUser !== null) return <Navigate replace to={"/"} />;

  return (
    <div className="relative h-screen flex items-center">
      <BackgroundImage src={"/newyork.jpg"} />

      {/* コンテンツ */}
      <div className="relative z-10 w-full flex justify-evenly container mx-auto ">
        {/* 左：文字列 */}
        <div className="flex items-center">
          <h2 className="text-7xl font-bold text-white">さあ、出かけよう。</h2>
        </div>

        {/* 右：ログイン画面 */}
        <div className="flex items-center justify-center v">
          <Card className="w-full max-w-md bg-white bg-transparent shadow-none border-none rounded-none">
            <CardHeader>
              <h2 className="text-4xl font-bold mb-2 text-white">
                アカウントの作成
              </h2>
            </CardHeader>
            <CardContent className="space-y-8">
              <Input
                onChange={(event) => setName(event.target.value)}
                placeholder="名前"
                required
                type="name"
                className="text-white placeholder:text-gray-400"
              />
              <Input
                onChange={(event) => setEmail(event.target.value)}
                placeholder="メールアドレス"
                required
                type="email"
                className="text-white placeholder:text-gray-400"
              />
              <Input
                onChange={(event) => setPassword(event.target.value)}
                placeholder="パスワード"
                required
                type="password"
                className="text-white placeholder:text-gray-400"
              />
              <Button
                onClick={signup}
                disabled={name === "" || email === "" || password === ""}
                className="w-full"
              >
                登録する
              </Button>
            </CardContent>

            <Separator className="my-5" />

            <CardFooter className="justify-center">
              <p className="text-sm text-gray-200 text-center">
                アカウントをお持ちの場合は、
                <Link to="/signin" className="underline">
                  こちら
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Signup;
