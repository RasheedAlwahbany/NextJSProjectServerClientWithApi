// /pages/add-user.js
import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [createUser] = useMutation(CREATE_USER);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser({ variables: { name, email } });
        window.location.href = '/';
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-4 text-center text-black">Add User</h1>
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
                    Add User
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
