"use client";

import { baseUrl } from "@/utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

function Login() {
  //   console.log(baseUrl, "tttttttttttttttttttt");
  const route = useRouter();

  const onSubmits = async (e) => {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    try {
      let res = await axios.post(`${baseUrl}/auth`, {
        email,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.token);
        route.push("/dashboard");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // console.log(email, password);
  };
  if (localStorage.getItem("accessToken")) {
    route.push("/dashboard");
  }
  return (
    <div>
      <form
        action=""
        onSubmit={onSubmits}
        className="flex flex-col gap-3 items-center"
      >
        <input type="text" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Login;
