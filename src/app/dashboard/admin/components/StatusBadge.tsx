"use client";
import React from "react";
import { UserStatus } from "../types";
import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: UserStatus }) {
  const label =
    status === "active"
      ? "Active"
      : status === "invited"
      ? "Invited"
      : "Disabled";
  const variant =
    status === "active"
      ? "active"
      : status === "invited"
      ? "invited"
      : "disabled";
  return <Badge variant={variant}>{label}</Badge>;
}

export default StatusBadge;
