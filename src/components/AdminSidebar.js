import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: 'お知らせ管理',
      icon: '📢',
      path: '/admin/news-list',
    },
    {
      title: 'お問い合わせ管理',
      icon: '✉️',
      path: '/admin/inquiry-list',
    },
    {
      title: 'ユーザー管理',
      icon: '👥',
      path: '/admin/user-list',
    },
    {
      title: '承認管理',
      icon: '✅',
      path: '/admin/approval-list',
    },
    {
      title: '購入履歴確認',
      icon: '📊',
      path: '/admin/purchase-history-list',
    },
  ];

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">TDB</div>
        <div className="sidebar-title">管理画面</div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`sidebar-nav-item ${
              isActive(item.path) ? 'active' : ''
            }`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-title">{item.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
