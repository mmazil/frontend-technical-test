import { FC } from "react";
import { Messages } from "../../components/message";
import { getLoggedUserId } from "../../utils/getLoggedUser";

interface Props {
  conversationId: number
}

const Conversation: FC<Props> = ({ conversationId }: Props) => {
  return (
    <Messages conversationId={conversationId}/>
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