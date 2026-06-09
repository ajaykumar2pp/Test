"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schemas/auth.schema";
import { Loader, Save, EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaMale, FaFemale } from "react-icons/fa";
import Image from "next/image";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    gender: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create user.");
      } else {
        toast.success(data.message || "User registered successfully.");
        resetForm();
        router.push("/login");
      }
    } catch (error) {
      toast.error("Failed to create user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-md p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="flex flex-col gap-3">
            {/* Heading */}
            <div className="flex justify-center items-center">
              <h3 className="text-lg font-semibold text-slate-700">
                Register
              </h3>
            </div>

            {/* Gender */}
            <div>
              <Label className="mb-3 block text-slate-700">
                Gender
                <span className="text-rose-500">*</span>
              </Label>

              <RadioGroup
                value={values.gender}
                onValueChange={(value) => setFieldValue("gender", value)}
                className="grid grid-cols-2 gap-4"
              >
                {/* Male */}
                <div>
                  <RadioGroupItem
                    value="Male"
                    id="male"
                    className="peer sr-only"
                  />

                  <Label
                    htmlFor="male"
                    className="
          flex flex-col items-center justify-center
          rounded-2xl border-2 p-5 cursor-pointer
          transition-all duration-200
          hover:border-blue-400
          peer-data-[state=checked]:border-blue-500
          peer-data-[state=checked]:bg-blue-50
        "
                  >
                    <Image
                      src="/boy.png"
                      alt="boy"
                       priority
                     width={50}
                     height={50}
                      draggable={false}
                     
                    />

                    <span className="font-semibold text-blue-600">Boy</span>
                  </Label>
                </div>

                {/* Female */}
                <div>
                  <RadioGroupItem
                    value="Female"
                    id="female"
                    className="peer sr-only"
                  />

                  <Label
                    htmlFor="female"
                    className="
          flex flex-col items-center justify-center
          rounded-2xl border-2 p-5 cursor-pointer
          transition-all duration-200
          hover:border-pink-400
          peer-data-[state=checked]:border-pink-500
          peer-data-[state=checked]:bg-pink-50
        "
                  >
                    <Image
                      src="/girl.png"
                      alt="girl"
                      priority
                     width={50}
                     height={50}
                      draggable={false}
                      
                    />

                    <span className="font-semibold text-pink-600">Girl</span>
                  </Label>
                </div>
              </RadioGroup>

              <ErrorMessage
                name="gender"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>

            {/* Full Name */}
            <div>
              <Label htmlFor="name" className="mb-2 text-slate-700">
                Full Name
                <span className="text-rose-500">*</span>
              </Label>

              <Field
                as={Input}
                id="name"
                name="name"
                placeholder="Enter full name"
              />

              <ErrorMessage
                name="name"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-2 text-slate-700">
                Email
                <span className="text-rose-500">*</span>
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
                Password
                <span className="text-rose-500">*</span>
              </Label>

              <div className="relative">
                <Field
                  as={Input}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
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
            <div className="text-right mt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 flex gap-2 items-center cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Register...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Register
                  </>
                )}
              </Button>
            </div>

            {/* Login Link */}
            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-cyan-700 hover:underline">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
