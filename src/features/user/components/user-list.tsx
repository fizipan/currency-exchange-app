import { Table } from "@/components/ui/table";
import { useUsers } from "../api/get-users";
import { Loader } from "@/components/ui/loader";
import { Menu } from "@/components/ui/menu";
import { IconDotsVertical } from "justd-icons";
import { UserDelete } from "./user-delete";
import { useState } from "react";
import { UserEdit } from "./user-edit";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const UsersList = () => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [userIdEdit, setUserIdEdit] = useState<string>("");
  const [userIdDelete, setUserIdDelete] = useState<string>("");

  const usersQuery = useUsers();

  if (usersQuery.isLoading || usersQuery.isFetching) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  const users = usersQuery.data;

  if (!users) return null;

  return (
    <>
      <Card>
        <Table aria-label="User">
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column />
          </Table.Header>
          <Table.Body
            items={users}
            renderEmptyState={() => (
              <div className="flex my-10 w-full items-center justify-center">
                No data
              </div>
            )}
          >
            {(item) => (
              <Table.Row id={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>
                  <Badge
                    intent={item.role === "admin" ? "success" : "warning"}
                    className="capitalize"
                  >
                    {item.role}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex justify-end">
                    <Menu>
                      <Menu.Trigger>
                        <IconDotsVertical />
                      </Menu.Trigger>
                      <Menu.Content
                        aria-label="Actions"
                        showArrow
                        placement="left"
                      >
                        <Menu.Item
                          onAction={() => {
                            setUserIdEdit(item.id);
                            setIsModalEditOpen(true);
                          }}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item
                          isDanger
                          onAction={() => {
                            setUserIdDelete(item.id);
                            setIsModalDeleteOpen(true);
                          }}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Content>
                    </Menu>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card>
      <UserEdit
        userId={userIdEdit}
        isModalOpen={isModalEditOpen}
        setIsModalOpen={setIsModalEditOpen}
      />
      <UserDelete
        userId={userIdDelete}
        isModalOpen={isModalDeleteOpen}
        setIsModalOpen={setIsModalDeleteOpen}
      />
    </>
  );
};
