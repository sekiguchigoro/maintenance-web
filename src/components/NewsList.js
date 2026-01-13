import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function NewsList() {
  const navigate = useNavigate();
  const [newsList] = useState([
    { id: 1, title: '新商品のご案内', date: '2026-01-05', status: '公開中' },
    {
      id: 2,
      title: 'メンテナンスのお知らせ',
      date: '2026-01-03',
      status: '公開中',
    },
    {
      id: 3,
      title: '年末年始休業のお知らせ',
      date: '2025-12-25',
      status: '下書き',
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/admin/login');
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
            <h1 className="page-title">お知らせ一覧</h1>

            <div className="content-card">
              <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/admin/news-edit/new')}
                >
                  + 新規作成
                </button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>タイトル</th>
                    <th>公開日</th>
                    <th>ステータス</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList.map((news) => (
                    <tr key={news.id}>
                      <td>{news.id}</td>
                      <td>{news.title}</td>
                      <td>{news.date}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            news.status === '公開中'
                              ? 'status-active'
                              : 'status-pending'
                          }`}
                        >
                          {news.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() =>
                            navigate(`/admin/news-edit/${news.id}`)
                          }
                          style={{ marginRight: '10px' }}
                        >
                          編集
                        </button>
                        <button className="btn btn-danger btn-small">
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default NewsList;
