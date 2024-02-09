'use client'

import React, { useEffect, useState } from 'react';
import AxiosClient from '@/utilsaxios';

interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  birthday: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

interface User {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  deletedAt: string | null;
  profile: Profile | null;
  posts: Post[]| null;
}

const UsersPage = () => {
  // Provide a type annotation for the state variable
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    console.log("useEffect triggered");
    async function fetchUsers() {
      console.log("fetchUsers called");
      try {
        const response = await AxiosClient.get('users');
        console.log("Response:", response);
        setUsers(response.data); // Assuming response.data is an array of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []); // Empty dependency array triggers useEffect only on mount

  console.log("Component rendered");

  return (
    <div>
      <h1>Users</h1>
      <ul>
  {users.map(user => (
    <li key={user.id}>
      <div>
        <strong>User ID:</strong> {user.id}, 
      </div>
      <div>
        <strong>Username:</strong> {user.username}, 
      </div>
      <div>
        <strong>Password:</strong> {user.password}, 
      </div>
      <div>
        <strong>Created At:</strong> {user.createdAt}, 
      </div>
      <div>
        <strong>Deleted At:</strong> {user.deletedAt},
      </div>
      {user.profile && (
        <div>
          <strong>Profile:</strong>
          <div>
            <strong>Profile ID:</strong> {user.profile.id}
          </div>
          <div>
            <strong>First Name:</strong> {user.profile.firstName}
          </div>
          <div>
            <strong>Last Name:</strong> {user.profile.lastName}
          </div>
          <div>
            <strong>Age:</strong> {user.profile.age}
          </div>
          <div>
            <strong>Birthday:</strong> {user.profile.birthday}
          </div>
          <div>
            <strong>Created At:</strong> {user.profile.createdAt}
          </div>
          <div>
            <strong>Updated At:</strong> {user.profile.updatedAt}
          </div>
          <div>
            <strong>Deleted At:</strong> {user.profile.deletedAt}
          </div>
        </div>
      )}
      {user.posts && user.posts.length > 0 && (
        <div>
          <strong>Posts:</strong>
          <ul>
            {user.posts.map(post => (
              <li key={post.id}>
                <div>
                  <strong>Post ID:</strong> {post.id}
                </div>
                <div>
                  <strong>Title:</strong> {post.title}
                </div>
                <div>
                  <strong>Description:</strong> {post.description}
                </div>
                <div>
                  <strong>Created At:</strong> {post.createdAt}
                </div>
                <div>
                  <strong>Updated At:</strong> {post.updatedAt}
                </div>
                <div>
                  <strong>Deleted At:</strong> {post.deletedAt}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    <br />
    </li>
    
  ))}
</ul>

    </div>
  );
};

export default UsersPage;