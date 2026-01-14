import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function UserServiceStatus() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  const [services] = useState([
    {
      id: 1,
      userId: 1,
      userName: '山田太郎',
      serviceName: '企業検索サービス',
      applyDate: '2025-01-05',
      status: '承認済み',
      approvalDate: '2025-01-06',
    },
    {
      id: 2,
      userId: 2,
      userName: '佐藤花子',
      serviceName: '業界分析レポート',
      applyDate: '2025-12-28',
      status: '審査中',
      approvalDate: '-',
    },
    {
      id: 3,
      userId: 1,
      userName: '山田太郎',
      serviceName: 'データ分析ツール',
      applyDate: '2025-12-20',
      status: '承認済み',
      approvalDate: '2025-12-21',
    },
    {
      id: 4,
      userId: 3,
      userName: '鈴木一郎',
      serviceName: 'APIアクセス',
      applyDate: '2025-12-15',
      status: '却下',
      approvalDate: '2025-12-16',
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/');
  };

  const handleStatusChange = (id, newStatus) => {
    // ステータス変更処理（実際はAPIを呼び出す）
    alert(`サービス申込ID:${id} のステータスを「${newStatus}」に変更しました`);
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
              ユーザーサービス申込状況
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
                    <th>申込ID</th>
                    <th>ユーザーID</th>
                    <th>ユーザー名</th>
                    <th>サービス名</th>
                    <th>申込日</th>
                    <th>ステータス</th>
                    <th>承認日</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {services
                    .filter((s) => !userId || s.userId === parseInt(userId))
                    .map((service) => (
                      <tr key={service.id}>
                        <td>{service.id}</td>
                        <td>{service.userId}</td>
                        <td>{service.userName}</td>
                        <td>{service.serviceName}</td>
                        <td>{service.applyDate}</td>
                        <td>
                          <span
                            className={`status-badge ${
                              service.status === '承認済み'
                                ? 'status-active'
                                : service.status === '審査中'
                                ? 'status-pending'
                                : 'status-inactive'
                            }`}
                          >
                            {service.status}
                          </span>
                        </td>
                        <td>{service.approvalDate}</td>
                        <td>
                          {service.status === '審査中' && (
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <button
                                className="btn btn-success btn-small"
                                onClick={() =>
                                  handleStatusChange(service.id, '承認済み')
                                }
                              >
                                承認
                              </button>
                              <button
                                className="btn btn-danger btn-small"
                                onClick={() =>
                                  handleStatusChange(service.id, '却下')
                                }
                              >
                                却下
                              </button>
                            </div>
                          )}
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

export default UserServiceStatus;
