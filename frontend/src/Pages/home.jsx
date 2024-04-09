import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sideBar';
import TaskBoard from '../components/taskBoard';

const Home = () => {
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const response = await fetch(`${BASE_URL}/home`, {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="home">
      <h1>Welcom</h1>
        <Sidebar />
        <TaskBoard>

        </TaskBoard>
      </div>
    </>
  );
};

export default Home;
