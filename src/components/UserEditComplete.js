import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function UserEditComplete() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/');
  };

  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="admin-page-content">
        <header className="admin-header">
          <div className="header-container">
            <div>
              <span className="header-logo-text">TDB</span>
              <span className="admin-badge-header">管理者</span>
            </div>
            <div className="header-right">
              <div className="user-info">
                <span>👤</span>
                <span>管理者</span>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                ログアウト
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            <h1 className="page-title">ユーザー情報変更完了</h1>

            <div
              className="content-card"
              style={{ textAlign: 'center', padding: '60px 30px' }}
            >
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>✓</div>
              <h2
                style={{
                  fontSize: '24px',
                  marginBottom: '20px',
                  color: '#28a745',
                }}
              >
                ユーザー情報を更新しました
              </h2>
              <p style={{ color: '#666', marginBottom: '40px' }}>
                ユーザー情報の更新が正常に完了しました。
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/admin/user-list')}
              >
                ユーザー一覧に戻る
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserEditComplete;
