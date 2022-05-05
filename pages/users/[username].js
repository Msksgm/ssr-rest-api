import Link from "next/link";

import axios from "axios";

export async function getServerSideProps(ctx) {
  const { username } = ctx.query;
  try {
    const userReq = await axios.get(
      `https://api.rwnjs.com/04/users/${username}`,
      {
        headers: {
          authorization: process.env.API_TOKEN,
        },
      }
    );
    console.log(userReq.status);
    if (userReq.status === 404) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        user: userReq.data,
      },
    };
  } catch (error) {
    console.log("error");
    console.log(error);
    console.log("error.response");
    console.log(error.response);
    console.log("error.response.status");
    console.log(error.response.status);
    return {
      notFound: true,
    };
  }
}
function UserPage({ user }) {
  return (
    <div>
      <div>
        <Link href="/" passHref>
          Back to home
        </Link>
      </div>

      <hr />

      <div style={{ display: "flex" }}>
        <img
          src={user.profile_picture}
          alt={user.username}
          width={150}
          height={150}
        />

        <div>
          <div>
            <b>Username:</b> {user.username}
          </div>

          <div>
            <b>Full name:</b>
            {user.first_name} {user.last_name}
          </div>

          <div>
            <b>Email:</b> {user.email}
          </div>

          <div>
            <b>Company:</b> {user.company}
          </div>

          <div>
            <b>Job title:</b> {user.job_title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
