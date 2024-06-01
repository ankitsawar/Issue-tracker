"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const statuses: { lable: string, value?: Status }[] = [
      { lable: "All" },
      { lable: "Open", value: "OPEN" },
      { lable: "In Progress", value: "IN_PROGRESS" },
      { lable: "Closed", value: "CLOSED" },
   ];

   return (
      <Select.Root
         defaultValue={searchParams.get('status') === null ? "All" : searchParams.get('status')!}
         onValueChange={(status) => {
            const params = new URLSearchParams();
            if (status !== "All") params.append('status', status);
            if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!)
            searchParams.get('orderBy');
            const query = params.size ? '?' + params.toString() : '';
            router.push(`/issues/${query}`);
         }}>
         <Select.Trigger placeholder="Filter By Status..."></Select.Trigger>
         <Select.Content>
            {
               statuses.map(status => <Select.Item value={status.value || "All"}>{status.lable}</Select.Item>)
            }
         </Select.Content>
      </Select.Root>
   )
}

export default IssueStatusFilter;