"use client"
import React, { useEffect, useState } from 'react';
import { Button,  PasswordInput, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { handleKey } from '../api/exchange/authentication';

export const EditPassword = () => {
  const [errorM, setErrorM] = useState("");
  const [successM, setSuccessM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      password: "",
      password1: ""
    },
  });

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("tk")
      if (form.values.password1.trim() != "" && form.values.password.trim() != "" && token) {
        setLoading(true);
        const savePasskey = await handleKey(form.values, token)
        if (savePasskey) {
          if (savePasskey.statusCode != 200) {
            setErrorM(savePasskey.message)
            setSuccess(false)  
            setOpened(true)          
          } else {
            setSuccessM(savePasskey.message)
            setSuccess(true)
            setOpened(true)          
          }
        }
        setLoading(false);
      } else {
        setErrorM("All input required")
        setLoading(false);
        setOpened(true)          
      }
    } catch (error) {
      console.log(error);
      setErrorM("Something went wrong, contact support for help");
      setLoading(false);
      setOpened(true)          
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorM("");
    }, 7000);
  }, [errorM]);

  return (
    <div className="min-w-[200px]">
      <form>
        {errorM && (
          <div className="mt-2">
            <p className="text-red-700 font-medium text-[0.8rem]">{errorM}</p>
          </div>
        )}
        <PasswordInput
          placeholder="******"
          label="Password"
          {...form.getInputProps("password1")}
        />
        <PasswordInput
          placeholder="******"
          label="New Password"
          {...form.getInputProps("password")}
        />
        <div className="flex items-center justify-start my-4 text-center  text-white">
          <Button className="bg-black" disabled={loading} onClick={handleEdit}>
            {loading ? "Processing" : success ? "Success" : "Save"}
          </Button>
        </div>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={success ? "Success" : "Something went wrong"}
          size={"xl"}
        >
          {success ? successM && successM : errorM && errorM}
        </Modal>

      </form>
    </div>
  );
}