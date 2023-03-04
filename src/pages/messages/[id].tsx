import { FC } from "react";
import { Messages } from "../../components/message";
import { getLoggedUserId } from "../../utils/getLoggedUserId";

interface Props {
  conversationId: number
}

const Conversation: FC<Props> = ({ conversationId }: Props) => {
  const loggedUserId = getLoggedUserId();

  return (
    <Messages conversationId={conversationId} loggedUserId={loggedUserId}/>
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