import { FC } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { List } from "../../components/conversation";

const queryClient = new QueryClient()

const Conversations: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <List />
    </QueryClientProvider>
  )
}



export default Conversations;