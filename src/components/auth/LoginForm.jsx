"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schemas/auth.schema";
import { Loader, Save, EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = loginSchema;

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res.ok) {
        toast.error(res.error || "Invalid email or password");
        return;
      }

      toast.success("Login successful.");
      resetForm();

      const session = await getSession();
      // console.log("Login data :", session);

      if (!session?.user) {
        toast.error("Session not found, please login again");
        return;
      }

      // Role based redirect
      if (session.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } catch (error) {
      // console.error("Login error:", error);
      toast.error("Failed to login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-md p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex  flex-col gap-3">
            {/* Login*/}
            <div className="sm:col-span-2">
              <h3 className="text-lg font-semibold text-slate-700">Login</h3>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-2 text-slate-700">
                Email<span className="text-rose-500">*</span>
              </Label>
              <Field
                as={Input}
                id="email"
                name="email"
                placeholder="email@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="mb-2 text-slate-700">
                Password<span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <Field
                  as={Input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>
           

            {/* Submit Button */}
            <div className="sm:col-span-4 text-right mt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 flex gap-2 items-center cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Login...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Login
                  </>
                )}
              </Button>
            </div>
            {/* Register Link */}
            <p className="text-sm text-gray-600 mt-4 text-center">
              Don’t have an account?{" "}
              <Link href="/register" className="text-cyan-700 hover:underline">
                Register
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;