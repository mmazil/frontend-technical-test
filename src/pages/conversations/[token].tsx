import { FC } from "react";
import { List } from "../../components/conversation";
import { Messages } from "../../components/message";
import { User } from "../../types/user";
import { getLoggedUserId } from "../../utils/getLoggedUser";

interface Props {
  userToken: User['token']
}

const Conversations: FC<Props> = ({ userToken }: Props) => {
  const loggedUserId = getLoggedUserId(userToken);

  return (
    <List loggedUserId={loggedUserId}/>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      userToken: params.token
    }
  }
}

export default Conversations;