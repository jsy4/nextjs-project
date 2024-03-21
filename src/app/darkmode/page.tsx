'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { GlobalOutlined, HighlightOutlined } from '@ant-design/icons';
import AxiosClient from '@/utilsaxios';

const DarkModeTogglePage = () => {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        async function fetchUserDarkMode() {
            try {
                const response = await AxiosClient.get('users/' + "1");
                console.log("Response:", response.data.darkmode);
                setDarkMode(response.data.darkmode)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUserDarkMode();
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        async function setUserDarkMode() {
            try {
                let response = await AxiosClient.get('users/' + "1");
                const userData = response.data;
                userData.darkmode = !darkMode;
                console.log("userData: " + userData.darkmode)
                await AxiosClient.patch(`users/` + "1", userData);
                window.location.reload();
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        setUserDarkMode();
    };

    return (
        <div className="dark-mode-toggle-page">
            <h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
            <Button onClick={toggleDarkMode} icon={darkMode ? <GlobalOutlined /> : <HighlightOutlined />}>
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </Button>
        </div>
    );
};

export default DarkModeTogglePage;
