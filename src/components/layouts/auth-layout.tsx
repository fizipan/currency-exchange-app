import * as React from "react";

import { Head } from "@/components/seo";

import { Card } from "../ui/card";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Card className="mt-8 p-6 sm:mx-auto sm:w-full sm:max-w-md">
          {children}
        </Card>
      </div>
    </>
  );
};
