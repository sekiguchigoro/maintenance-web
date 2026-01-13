import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function UserEditConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, userId } = location.state || {};

  // データがない場合は編集画面に戻る
  if (!formData) {
    navigate(`/admin/user-edit/${userId || 1}`);
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/admin/login');
  };

  const handleConfirm = () => {
    // 更新処理（実際はAPIを呼び出す）
    navigate('/admin/user-complete', {
      state: { formData, userId },
    });
  };

  const handleBack = () => {
    navigate(`/admin/user-edit/${userId}`, {
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
            <h1 className="page-title">ユーザー情報変更確認</h1>

            <div className="content-card">
              <p
                style={{
                  marginBottom: '30px',
                  color: '#666',
                  fontSize: '15px',
                }}
              >
                以下の内容でユーザー情報を更新します。内容を確認して「確定」ボタンを押してください。
              </p>

              <table className="data-table">
                <tbody>
                  <tr>
                    <th style={{ width: '200px', background: '#f8f9fa' }}>
                      会社名
                    </th>
                    <td>{formData.companyName}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>ユーザー名</th>
                    <td>{formData.userName}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>メールアドレス</th>
                    <td>{formData.email}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>電話番号</th>
                    <td>{formData.phone}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>ステータス</th>
                    <td>
                      <span
                        className={`status-badge ${
                          formData.status === '有効'
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

              <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                <button className="btn btn-primary" onClick={handleConfirm}>
                  確定
                </button>
                <button className="btn btn-secondary" onClick={handleBack}>
                  戻る
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserEditConfirm;
