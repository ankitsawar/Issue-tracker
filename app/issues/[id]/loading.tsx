import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const LoadingIssuePage = () => {
   return (
      <Box>
         <Skeleton className="max-w-xl" />
         <Flex my="2" className="space-x-3">
            <Skeleton width="5rem" />
            <Skeleton width="8rem" />
         </Flex>
         <Card className="prose" mt="4">
            <Skeleton count={3} />
         </Card>
      </Box>
   )
}

export default LoadingIssuePage;