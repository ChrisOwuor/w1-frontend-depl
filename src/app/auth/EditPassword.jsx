"use client";
import React, { useEffect, useState } from "react";
import { Button, PasswordInput, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { handleKey } from "../api/exchange/authentication";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Visibility } from "@mui/icons-material";
export const EditPassword = () => {
  const [errorM, setErrorM] = useState("");
  const [successM, setSuccessM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      password: "",
      password1: "",
    },
  });

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("tk");
      if (
        form.values.password1.trim() != "" &&
        form.values.password.trim() != "" &&
        token
      ) {
        setLoading(true);
        const savePasskey = await handleKey(form.values, token);
        if (savePasskey) {
          if (savePasskey.statusCode != 200) {
            setErrorM(savePasskey.message);
            setSuccess(false);
            setOpened(true);
          } else {
            setSuccessM(savePasskey.message);
            setSuccess(true);
            setOpened(true);
          }
        }
        setLoading(false);
      } else {
        setErrorM("All input required");
        setLoading(false);
        setOpened(true);
      }
    } catch (error) {
      console.log(error);
      setErrorM("Something went wrong, contact support for help");
      setLoading(false);
      setOpened(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorM("");
    }, 7000);
  }, [errorM]);

  return (
    <div className="  py-[15px] ">
      <div className="header-password mt-[1rem] flex-flex-wrap">
        <div className="px-[0.5rem]">
          <div className="headerLine">
            <h6 className="text-[#5700a3] overflow-hidden uppercase text-center font-[700] z-[1] relative">
              Edit Password
            </h6>
          </div>
        </div>
      </div>
      <form className="loginpage">
        {errorM && (
          <div className="mt-2">
            <p className="text-red-700 font-medium text-[0.8rem]">{errorM}</p>
          </div>
        )}
        <label _ngcontent-jqf-c76="" for="password" class="login-page-label">
          Old password
        </label>
        <div className="input-group mb-3">
          <input
            _ngcontent-jqf-c76=""
            id="currentPassword"
            formcontrolname="old_password"
            class="form-control ng-untouched ng-pristine ng-invalid"
            type="password"
          />
          <a _ngcontent-jqf-c76="" class="login-eye d-flex align-items-center">
            <i _ngcontent-jqf-c76="" class="fa-solid fa-eye">
              <Visibility />
            </i>
          </a>
        </div>
        <label _ngcontent-jqf-c76="" for="password" class="login-page-label">
          New password
        </label>
        <div className="input-group mb-3">
          <input
            _ngcontent-jqf-c76=""
            id="currentPassword"
            formcontrolname="old_password"
            class="form-control ng-untouched ng-pristine ng-invalid"
            type="password"
          />
          <a _ngcontent-jqf-c76="" class="login-eye d-flex align-items-center">
            <i _ngcontent-jqf-c76="" class="fa-solid fa-eye">
              <Visibility />
            </i>
          </a>
        </div>{" "}
        <label _ngcontent-jqf-c76="" for="password" class="login-page-label">
          Current password
        </label>
        <div className="input-group mb-3">
          <input
            _ngcontent-jqf-c76=""
            id="currentPassword"
            formcontrolname="old_password"
            class="form-control ng-untouched ng-pristine ng-invalid"
            type="password"
          />
          <a _ngcontent-jqf-c76="" class="login-eye d-flex align-items-center">
            <i _ngcontent-jqf-c76="" class="fa-solid fa-eye">
              <Visibility />
            </i>
          </a>
        </div>
        <div className="text-center my-[1.3rem]">
          <button
            _ngcontent-jqf-c76=""
            type="submit"
            class="login-btn1 btn submit-button btn-disable"
          >
            {loading ? "Processing" : success ? "SUBMIT" : "SUBMIT"}
          </button>
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
};
