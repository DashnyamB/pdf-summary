"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import UserTable from "./components/UserTable";
import { User } from "./types";

const initialUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "member",
    status: "invited",
  },
  {
    id: "3",
    name: "Carmen Diaz",
    email: "carmen@example.com",
    role: "member",
    status: "active",
  },
  {
    id: "4",
    name: "Daniel Li",
    email: "daniel@example.com",
    role: "admin",
    status: "disabled",
  },
  {
    id: "5",
    name: "Eve Martin",
    email: "eve@example.com",
    role: "member",
    status: "active",
  },
];

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  function handleRoleChange(id: string, role: User["role"]) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }

  return (
    <>
      <div className="px-8 py-6 w-full">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage users and roles within the application.
            </p>
          </div>
          <div>
            <Button variant="secondary">Invite user</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              List of application users and their roles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserTable users={users} onChangeRole={handleRoleChange} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
