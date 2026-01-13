"use client";
import React from "react";
import { User, UserRole } from "../types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import RoleBadge from "./RoleBadge";
import StatusBadge from "./StatusBadge";
import RoleSelect from "./RoleSelect";

type Props = {
  users: User[];
  onChangeRole?: (id: string, role: UserRole) => void;
};

export default function UserTable({ users, onChangeRole }: Props) {
  return (
    <Table>
      <TableHeader>
        <tr>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </tr>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="text-sm font-medium">{user.name}</div>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {user.email}
            </TableCell>
            <TableCell>
              <RoleBadge role={user.role} />
            </TableCell>
            <TableCell>
              <StatusBadge status={user.status} />
            </TableCell>
            <TableCell className="text-right">
              {onChangeRole ? (
                <RoleSelect
                  value={user.role}
                  onChange={(r) => onChangeRole(user.id, r)}
                />
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
