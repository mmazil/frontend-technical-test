import { FC } from "react";
import { Messages } from "../../components/message";
import { Conversation } from "../../types/conversation";
import { getLoggedUserId } from "../../utils/getLoggedUser";

interface Props {
  conversationId: Conversation['id']
}

const Conversation: FC<Props> = ({ conversationId }: Props) => {
  const loggedUserId = getLoggedUserId()

  return (
    <Messages conversationId={conversationId} loggedUserId={loggedUserId} />
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