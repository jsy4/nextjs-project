
import type { MenuProps } from 'antd';
import { AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export const items: MenuProps['items'] = [

    getItem('', 'grp', null, [], 'group'),

    getItem('유저', 'sub1', <UserOutlined />, [
        getItem('유저 목록', 'users'),
        getItem('유저 프로필', 'userProfiles'),
    ]),

    { type: 'divider' },


    getItem('포스팅', 'sub2', <AppstoreOutlined />, [
        getItem('포스팅 목록', 'posts'),
        getItem('채팅', 'postChats'),
    ]),

    { type: 'divider' },

    getItem('관리자 설정', 'sub3', <SettingOutlined />, [
        getItem('다크모드', 'darkmode'),
        getItem('관리자 정보', 'manager')
    ]),

];
