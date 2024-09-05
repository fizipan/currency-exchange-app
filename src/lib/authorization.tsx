/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import { useUser } from "./auth";
import { Role } from "@/features/auth/types/dto";

type RoleTypes = keyof typeof Role;

export const useAuthorization = () => {
  const user = useUser();

  if (!user.data) {
    throw Error("User does not exist!");
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes }) => {
      if (allowedRoles && allowedRoles.length > 0 && user.data) {
        return allowedRoles?.includes(user.data.role);
      }

      return true;
    },
    [user.data]
  );

  return { checkAccess, role: user.data.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes;
    }
  | {
      allowedRoles?: never;
    }
);

export const Authorization = ({
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
