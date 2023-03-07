import { FC } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Messages } from "../../components/message";
import { Conversation } from "../../types/conversation";

interface Props {
  conversationId: Conversation['id']
}

const queryClient = new QueryClient()

const Conversation: FC<Props> = ({ conversationId }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Messages conversationId={conversationId} />
    </QueryClientProvider>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      conversationId: params.id
    }
  }
}

export default Conversation;