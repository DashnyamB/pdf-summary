"use client";
import React from "react";
import { UserRole } from "../types";
import { Badge } from "@/components/ui/badge";

export function RoleBadge({ role }: { role: UserRole }) {
  const label = role === "admin" ? "Admin" : "Member";
  const variant = role === "admin" ? "admin" : "member";
  return <Badge variant={variant}>{label}</Badge>;
}

export default RoleBadge;
