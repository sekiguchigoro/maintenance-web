import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function NewsEditComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const { newsId } = location.state || {};

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
            <h1 className="page-title">
              お知らせ{newsId === 'new' ? '作成' : '編集'}完了
            </h1>

            <div className="content-card">
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 40px',
                }}
              >
                <div
                  style={{
                    fontSize: '60px',
                    color: '#28a745',
                    marginBottom: '20px',
                  }}
                >
                  ✓
                </div>
                <h2
                  style={{
                    fontSize: '24px',
                    marginBottom: '15px',
                    color: '#333',
                  }}
                >
                  お知らせを{newsId === 'new' ? '作成' : '更新'}しました
                </h2>
                <p
                  style={{
                    color: '#666',
                    fontSize: '15px',
                    marginBottom: '40px',
                  }}
                >
                  お知らせの{newsId === 'new' ? '作成' : '更新'}が完了しました。
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                  }}
                >
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin/news-list')}
                    style={{ minWidth: '180px' }}
                  >
                    お知らせ一覧に戻る
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/admin/news-edit/new')}
                    style={{ minWidth: '180px' }}
                  >
                    新しいお知らせを作成
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default NewsEditComplete;
