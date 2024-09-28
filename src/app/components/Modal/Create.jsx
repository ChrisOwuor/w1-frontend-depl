import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, NumberInput, PasswordInput } from "@mantine/core";
import axios from "axios";

export default function Create() {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });
  const registerUser = async (formData) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        formData
      );
      console.log("sent req");
      if (res && res.status === 200) {
        // console.log(res);
        return res;
      }
    } catch (error) {
      console.log("failed req");
      console.log(error);
      return null;
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    // e.preventDefault();
    console.log(form.values);

    const requiredFields = [
      "firstName",
      "lastName",
      "username",
      "phoneNumber",
      "email",
      "password",
    ];

    if (requiredFields.every((field) => form.values[field] !== "")) {
      try {
        const res = await registerUser(form.values);
        console.log(res);
        if (res) {
          if (res.status === 200) {
            setLoading(false);
            setSuccess(true);
            localStorage.setItem("tk", res.data.token);
            window.location.replace("/profile");
            // window.location.replace("/confirmcode");
          } else {
            setLoading(false);
            setErrorM(res.data.message);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setErrorM("Something went wrong, contact support for help");
      }
    } else {
      setLoading(false);
      setErrorM("Some required fields are missing");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorM("");
    }, 7000);
  }, [errorM]);

  return (
    <div>
      <form>
        {errorM && (
          <div className=" bg-white">
            <p className="text-red-900">{errorM}</p>
          </div>
        )}
        <TextInput
          withAsterisk
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          withAsterisk
          label="Last Name"
          placeholder="Last Name"
          {...form.getInputProps("lastName")}
        />
        <TextInput
          withAsterisk
          label="Username"
          placeholder="username"
          {...form.getInputProps("username")}
        />
        <NumberInput
          label="Phone Number"
          placeholder="(+9)12345.."
          {...form.getInputProps("phoneNumber")}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          // description="Password must include at least one letter, number and special character"
          withAsterisk
          {...form.getInputProps("password")}
        />
        <div className=" mt-2 mb-2 text-center  text-white">
          <Button
            className="bg-black"
            disabled={loading}
            onClick={() => handleRegister()}
          >
            {loading ? "Processing" : success ? "Redirecting.." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
}
