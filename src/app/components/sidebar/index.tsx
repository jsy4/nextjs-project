'use client';

import { Layout, Menu } from 'antd';
import { items } from '@/constants/menuItems';
import { useState } from 'react';

const { Sider } = Layout;

const SidebarLayout: React.FC<{ pathname: string }> = ({ pathname }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider
            breakpoint="lg"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            collapsedWidth={0}
            zeroWidthTriggerStyle={{ position: 'fixed', top: '95%', left: '0%' }}
        >
            <Menu
                defaultSelectedKeys={[pathname.slice(1)]}
                defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                mode="inline"
                items={items}
                onClick={(event) => window.location.href = event.key}
            />
        </Sider>
    );
};

export default SidebarLayout;
