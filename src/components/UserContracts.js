import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function UserContracts() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  const [contracts] = useState([
    {
      id: 1,
      userId: 1,
      userName: '山田太郎',
      companyName: '株式会社ABC',
      plan: 'スタンダード',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: '有効',
    },
    {
      id: 2,
      userId: 2,
      userName: '佐藤花子',
      companyName: '株式会社XYZ',
      plan: 'プレミアム',
      startDate: '2025-02-01',
      endDate: '2026-01-31',
      status: '有効',
    },
    {
      id: 3,
      userId: 3,
      userName: '鈴木一郎',
      companyName: '株式会社TEST',
      plan: 'ベーシック',
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      status: '期限切れ',
    },
  ]);

  // userIdでフィルタリング
  const filteredContracts = userId
    ? contracts.filter((c) => c.userId === parseInt(userId))
    : contracts;

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
              ユーザー契約一覧表示
              {userId && (
                <span
                  style={{
                    fontSize: '0.8em',
                    marginLeft: '10px',
                    color: '#666',
                  }}
                >
                  (ユーザーID: {userId})
                </span>
              )}
            </h1>

            <div className="content-card">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>契約ID</th>
                    <th>ユーザーID</th>
                    <th>ユーザー名</th>
                    <th>会社名</th>
                    <th>プラン</th>
                    <th>契約開始日</th>
                    <th>契約終了日</th>
                    <th>ステータス</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((contract) => (
                    <tr key={contract.id}>
                      <td>{contract.id}</td>
                      <td>{contract.userId}</td>
                      <td>{contract.userName}</td>
                      <td>{contract.companyName}</td>
                      <td>{contract.plan}</td>
                      <td>{contract.startDate}</td>
                      <td>{contract.endDate}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            contract.status === '有効'
                              ? 'status-active'
                              : contract.status === '期限切れ'
                              ? 'status-inactive'
                              : 'status-pending'
                          }`}
                        >
                          {contract.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '20px' }}>
                {userId ? (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate(`/admin/user-detail/${userId}`)}
                    >
                      ユーザー詳細に戻る
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate('/admin/user-list')}
                    >
                      一覧に戻る
                    </button>
                  </div>
                ) : (
                  <div className="pagination">
                    <button disabled>前へ</button>
                    <button className="active">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>次へ</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserContracts;
