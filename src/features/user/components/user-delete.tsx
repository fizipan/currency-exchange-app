import { useDeleteUser } from "../api/delete-user";
import { Loader } from "@/components/ui/loader";
import { Modal } from "@/components/ui/modal";
import { toast } from "sonner";

export const UserDelete = ({
  userId,
  isModalOpen,
  setIsModalOpen,
}: {
  userId: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const deleteUserMutation = useDeleteUser();
  return (
    <Modal.Content
      isOpen={isModalOpen}
      onOpenChange={() => setIsModalOpen(false)}
    >
      <Modal.Header>
        <Modal.Title>Delete User</Modal.Title>
        <Modal.Description>
          Are you sure you want to delete this user?
        </Modal.Description>
      </Modal.Header>
      <Modal.Footer>
        <Modal.Close appearance="outline">Cancel</Modal.Close>
        <Modal.Close
          appearance="solid"
          intent="danger"
          isDisabled={deleteUserMutation.isPending}
          onPress={async () => {
            await deleteUserMutation.mutateAsync({ userId });
            toast.success("User deleted successfully");
            setIsModalOpen(false);
          }}
        >
          {deleteUserMutation.isPending && <Loader variant="spin" />}
          Delete
        </Modal.Close>
      </Modal.Footer>
    </Modal.Content>
  );
};
