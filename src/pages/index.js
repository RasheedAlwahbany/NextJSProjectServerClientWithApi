// /pages/index.js
import { useQuery, useMutation, gql } from '@apollo/client';
import Link from 'next/link';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;
const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <Link href="/add">
        <span className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Add User</span>
      </Link>
      <table className="w-full bg-gray-200 border border-gray-300 rounded-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 border border-black">Name</th>
            <th className="py-2 px-4 border border-black">Email</th>
            <th className="py-2 px-4 border border-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(({ id, name, email }) => (
            <tr key={id} className="border-b">
              <td className="py-2 px-4 border border-black">{name}</td>
              <td className="py-2 px-4 border border-black">{email}</td>
              <td className="py-2 px-4 border border-black">
                <Link href={`/edit/${id}`}>
                  <span className="text-blue-500 hover:underline">Edit</span>
                </Link>
                <button
                  onClick={() => deleteUser({ variables: { id } })}
                  className="text-red-500 hover:underline ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
