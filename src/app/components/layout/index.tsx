'use client';

import { Breadcrumb, Col, ConfigProvider, Layout, Row, theme } from 'antd';
const { Footer } = Layout;
import 'antd/dist/reset.css';
import ko_KR from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SidebarLayout from '../sidebar';
import AxiosClient from '@/utilsaxios';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;

type DashboardLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const pathSnippets = pathname.split('/').filter(item => item);

    const breadcrumbItems = [
        {
            key: '/',
            title: <Link href="/"><HomeOutlined /></Link>,
        },
        ...pathSnippets.map((segment, index) => ({
            key: `/${pathSnippets.slice(0, index + 1).join('/')}`,
            title: (
                <Link href={`/${pathSnippets.slice(0, index + 1).join('/')}`}>
                    {segment}
                </Link>
            ),
        })),
    ];
    const [today, setDate] = React.useState(new Date());
    const date = dayjs(today).locale('ko').format('YYYY/MM/DD A h:mm');
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        async function fetchUserDarkMode() {
            try {
                const response = await AxiosClient.get('users/' + "1");
                setDarkMode(response.data.darkmode)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUserDarkMode();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <ConfigProvider
            locale={ko_KR}
            theme={{
                token: {
                    colorPrimary: darkMode ? '#5c9cfc' : '#1677ff',
                    colorBgContainer: darkMode ? '#000' : '#fff',
                },
                algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <Layout className="min-h-screen">
                <Layout>
                    <SidebarLayout pathname={pathname} />
                    <Layout>
                        <Content className="mx-4">
                            <Row justify={'space-between'} align={'middle'} className="my-4">
                                <Col span={12}>
                                    <Breadcrumb separator=">" items={breadcrumbItems} />
                                </Col>
                                <Col span={12} className="text-right">
                                    <a
                                        style={{ color: darkMode ? 'grey' : 'black' }}
                                        onClick={() => setDarkMode(!darkMode)}
                                    >
                                        {date}
                                    </a>
                                </Col>
                            </Row>
                            <Layout
                                className="p-6 min-h-full"
                                style={{
                                    background: darkMode ? '#000' : '#fff',
                                    color: darkMode ? 'white' : 'black',
                                }}
                            >
                                {children}
                            </Layout>
                        </Content>
                        <Footer className="text-center text-zinc-500">made in 2024</Footer>
                    </Layout>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default DashboardLayout;
