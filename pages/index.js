import axios from "axios";
import Link from "next/link";

export async function getServerSideProps() {
  const usersReq = await axios.get("https://api.rwnjs.com/04/users");
  return {
    props: {
      users: usersReq.data,
    },
  };
}

function HomePage({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.username}`}>
            <a>{user.username}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default HomePage;
