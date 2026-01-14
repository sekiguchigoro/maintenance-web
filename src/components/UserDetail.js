import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // サンプルデータ
  const userData = {
    id: id,
    companyName: '株式会社ABC',
    userName: '山田太郎',
    email: 'yamada@abc.com',
    phone: '03-1234-5678',
    address: '東京都千代田区1-1-1',
    status: '有効',
    registerDate: '2025-01-01',
    lastLogin: '2026-01-07 10:30',
  };

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
            <h1 className="page-title">ユーザー情報確認</h1>

            <div className="content-card">
              <table className="data-table">
                <tbody>
                  <tr>
                    <th style={{ width: '200px', background: '#f8f9fa' }}>
                      ユーザーID
                    </th>
                    <td>{userData.id}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>会社名</th>
                    <td>{userData.companyName}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>ユーザー名</th>
                    <td>{userData.userName}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>メールアドレス</th>
                    <td>{userData.email}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>電話番号</th>
                    <td>{userData.phone}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>住所</th>
                    <td>{userData.address}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>ステータス</th>
                    <td>
                      <span
                        className={`status-badge ${
                          userData.status === '有効'
                            ? 'status-active'
                            : 'status-inactive'
                        }`}
                      >
                        {userData.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>登録日</th>
                    <td>{userData.registerDate}</td>
                  </tr>
                  <tr>
                    <th style={{ background: '#f8f9fa' }}>最終ログイン</th>
                    <td>{userData.lastLogin}</td>
                  </tr>
                </tbody>
              </table>

              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/admin/user-edit/${id}`)}
                >
                  ユーザー情報変更
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/admin/user-contracts?userId=${id}`)}
                >
                  契約一覧表示
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/admin/user-service-status?userId=${id}`)
                  }
                >
                  サービス申込状況
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/admin/user-purchase-history?userId=${id}`)
                  }
                >
                  購入履歴・利用状況
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate('/admin/user-list')}
                >
                  一覧に戻る
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDetail;
