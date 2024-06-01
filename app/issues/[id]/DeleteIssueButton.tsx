'use client';
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { GoTrash } from "react-icons/go"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
   const router = useRouter();
   const [error, setError] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const deleteIssue = async () => {
      try {
         setIsDeleting(true);
         await axios.delete("/api/issues/" + issueId);
         router.push("/issues");
         router.refresh();
      } catch (error) {
         setIsDeleting(false);
         setError(true);
      }
   }

   return (
      <>
         <AlertDialog.Root>
            <AlertDialog.Trigger>
               <Button color="red" disabled={isDeleting}>
                  <GoTrash />
                  Delete Issue
                  {isDeleting && <Spinner />}
               </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
               <AlertDialog.Title>
                  Confirm Deletion
               </AlertDialog.Title>
               <AlertDialog.Description>
                  Are you sure you want to delete this, This action cannot be undone.
               </AlertDialog.Description>
               <Flex mt="4" gap="4">
                  <AlertDialog.Cancel>
                     <Button color="gray" variant="soft">Cancel</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                     <Button color="red" onClick={deleteIssue}>Delete</Button>
                  </AlertDialog.Action>
               </Flex>
            </AlertDialog.Content>
         </AlertDialog.Root>
         <AlertDialog.Root open={error}>
            <AlertDialog.Content>
               <AlertDialog.Title>Error</AlertDialog.Title>
               <AlertDialog.Description mb="4">
                  This issue cannot be deleted.
               </AlertDialog.Description>
               <Button color="gray" variant="soft" onClick={() => setError(false)}>Ok</Button>
            </AlertDialog.Content>
         </AlertDialog.Root>
      </>
   )
}

export default DeleteIssueButton