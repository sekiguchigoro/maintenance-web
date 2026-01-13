import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function NewsEditConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, newsId } = location.state || {};

  // データがない場合は編集画面に戻る
  if (!formData) {
    navigate(`/admin/news-edit/${newsId || 'new'}`);
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/admin/login');
  };

  const handleConfirm = () => {
    // 更新処理（実際はAPIを呼び出す）
    navigate('/admin/news-complete', {
      state: { formData, newsId },
    });
  };

  const handleBack = () => {
    navigate(`/admin/news-edit/${newsId}`, {
      state: { formData },
    });
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
              お知らせ{newsId === 'new' ? '作成' : '編集'}確認
            </h1>

            <div className="content-card">
              <p
                style={{
                  marginBottom: '30px',
                  color: '#666',
                  fontSize: '15px',
                }}
              >
                以下の内容でお知らせを{newsId === 'new' ? '作成' : '更新'}
                します。内容を確認して「確定」ボタンを押してください。
              </p>

              <table className="data-table">
                <tbody>
                  <tr>
                    <th style={{ width: '200px', background: '#f8f9fa' }}>
                      タイトル
                    </th>
                    <td>{formData.title}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>内容</th>
                    <td style={{ whiteSpace: 'pre-wrap' }}>
                      {formData.content}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>公開日</th>
                    <td>{formData.publishDate}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>ステータス</th>
                    <td>
                      <span
                        className={`status-badge ${
                          formData.status === '公開中'
                            ? 'status-active'
                            : 'status-inactive'
                        }`}
                      >
                        {formData.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                style={{
                  marginTop: '30px',
                  display: 'flex',
                  gap: '15px',
                  justifyContent: 'center',
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleBack}
                  style={{ minWidth: '150px' }}
                >
                  戻る
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirm}
                  style={{ minWidth: '150px' }}
                >
                  確定
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default NewsEditConfirm;
