"use client";

import React, { useState } from "react";
import "./style.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Navbar() {
  const token = localStorage.getItem("token");
  const pathname = usePathname();
  const route = useRouter();

  const logOut = () => {
    localStorage.removeItem("token");
    route.push("/");
  };

  return (
    <div className="flex justify-between p-4 bg-slate-900 text-gray-100">
      <Link href={"/"} className="text-gray-100">
        DevConnector
      </Link>
      <div className="flex gap-3">
        <Link
          className={`${pathname === "/developers" ? "active" : ""}`}
          href={"/developers"}
        >
          developers
        </Link>
        {!token ? (
          <div className="flex gap-3">
            <Link
              className={`${pathname === "/register" ? "active" : ""}`}
              href={"/register"}
            >
              Register
            </Link>
            <Link
              className={`${pathname === "/login" ? "active" : ""}`}
              href={"/login"}
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex gap-3">
              <Link
                className={`${pathname === "/posts" ? "active" : ""}`}
                href={"/posts"}
              >
                Posts
              </Link>
            <Link
              className={`${pathname === "/dashboard" ? "active" : ""}`}
              href={"/dashboard"}
            >
              Dashboard
            </Link>
            <button
              onClick={logOut}
              className={`${pathname === "/" ? "active" : ""}`}
            >
              logOut {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
