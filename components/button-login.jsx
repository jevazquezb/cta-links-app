"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, text, extraStyles }) => {
  const dashboardUrl = "/dashboard";
  const btnStyles = "btn text-white";
  const isUserSubscribed = true;

  return session ? (
    <Link
      href={dashboardUrl}
      className={`${btnStyles} ${extraStyles ? extraStyles : ""}`}
    >
      Welcome back {session.user.name?.split(" ")[0] || "you!"}
    </Link>
  ) : (
    <button
      className={`${btnStyles} ${extraStyles ? extraStyles : ""}`}
      onClick={() => {
        signIn(undefined, { redirectTo: dashboardUrl });
      }}
    >
      {text}
    </button>
  );
};

export default ButtonLogin;
