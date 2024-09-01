// /pages/edit-user/[id].js
import { useQuery, useMutation, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default function EditUser() {
    const router = useRouter();
    const { id } = router.query;
    const { data, loading, error } = useQuery(GET_USER, { variables: { id } });
    const [updateUser] = useMutation(UPDATE_USER);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (data) {
            setName(data.user.name);
            setEmail(data.user.email);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser({ variables: { id, name, email } });
        window.location.href = '/';
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h1 className="text-black text-2xl font-semibold mb-4 text-center">Add User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 text-black p-2 rounded w-full"
                        placeholder="Enter name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 text-black p-2 rounded w-full"
                        placeholder="Enter email"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition">
                    Update User
                </button>
                <div className='w-full text-center'>
                    <Link href={`/`} className=''>
                        <span className="text-blue-500 hover:underline">Home</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}
