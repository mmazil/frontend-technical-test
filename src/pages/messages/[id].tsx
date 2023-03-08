import { FC } from "react";
import { Messages } from "../../components/message";
import { Conversation } from "../../types/conversation";

interface Props {
  conversationId: Conversation['id']
}

const Conversation: FC<Props> = ({ conversationId }: Props) => {
  return <Messages conversationId={conversationId} />
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      conversationId: params.id
    }
  }
}

export default Conversation;