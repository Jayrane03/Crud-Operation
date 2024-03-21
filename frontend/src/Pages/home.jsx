import React, { useEffect, useState } from 'react';
import "../Styles/pages.css"
const Home = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }
        
                const req = await fetch('http://localhost:5000/api/home', {
                    headers: {
                        'x-access-token': token,
                    }
                });
                
                if (!req.ok) {
                    throw new Error('Failed to fetch user data');
                }
        
                const responseData = await req.json();
                
                if (typeof responseData.user !== 'object' || !responseData.user.name || !responseData.user.email) {
                    throw new Error('Invalid user data format. Response: ' + JSON.stringify(responseData));
                }
        
                setUserData(responseData.user);
            } catch (error) {
                console.error(error);
                localStorage.removeItem('token');
                // Redirect to login page or handle error as needed
            } finally {
                setLoading(false);
            }
        };
        

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
       <>
       
       <h1 className="">Welcome <span>{userData.name}</span></h1>
        <div className='table'>
    
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{userData.name}</td>
                    <td>{userData.email}</td>
                </tr>
            </tbody>
        </table>
    </div>
       </>
    );
};

export default Home;
