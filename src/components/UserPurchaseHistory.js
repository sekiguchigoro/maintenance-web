import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function UserPurchaseHistory() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [searchParams, setSearchParams] = useState({
    serviceName: '',
    purchaseDate: '',
  });
  const [purchases] = useState([
    {
      id: 1,
      userId: 1,
      userName: '山田太郎',
      serviceName: '企業レポート',
      purchaseDate: '2026-01-05',
      amount: '5,000円',
      usageCount: 12,
    },
    {
      id: 2,
      userId: 2,
      userName: '佐藤花子',
      serviceName: 'データダウンロード',
      purchaseDate: '2026-01-03',
      amount: '3,000円',
      usageCount: 5,
    },
    {
      id: 3,
      userId: 1,
      userName: '山田太郎',
      serviceName: '業界分析レポート',
      purchaseDate: '2025-12-28',
      amount: '10,000円',
      usageCount: 8,
    },
    {
      id: 4,
      userId: 3,
      userName: '鈴木一郎',
      serviceName: '企業レポート',
      purchaseDate: '2025-12-20',
      amount: '5,000円',
      usageCount: 3,
    },
  ]);

  // ユーザーIDでフィルタリングされた購入履歴
  const userPurchases = userId
    ? purchases.filter((p) => p.userId === parseInt(userId))
    : purchases;

  // さらに検索条件でフィルタリング
  const filteredPurchases = userPurchases.filter(
    (p) =>
      (!searchParams.serviceName ||
        p.serviceName.includes(searchParams.serviceName)) &&
      (!searchParams.purchaseDate ||
        p.purchaseDate === searchParams.purchaseDate)
  );

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/admin/login');
  };

  const handleSearch = () => {
    // 検索処理（実際はAPIを呼び出す）
    alert('検索を実行しました');
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
              ユーザー購入履歴・利用状況
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
              <div
                style={{
                  marginBottom: '20px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-end',
                }}
              >
                <div style={{ flex: 1 }}>
                  <label className="form-label">サービス名</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="サービス名で検索"
                    value={searchParams.serviceName}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        serviceName: e.target.value,
                      })
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">購入日</label>
                  <input
                    type="date"
                    className="form-control"
                    value={searchParams.purchaseDate}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        purchaseDate: e.target.value,
                      })
                    }
                  />
                </div>
                <button className="btn btn-primary" onClick={handleSearch}>
                  検索
                </button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>購入ID</th>
                    <th>ユーザーID</th>
                    <th>ユーザー名</th>
                    <th>サービス名</th>
                    <th>購入日</th>
                    <th>金額</th>
                    <th>利用回数</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPurchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td>{purchase.id}</td>
                      <td>{purchase.userId}</td>
                      <td>{purchase.userName}</td>
                      <td>{purchase.serviceName}</td>
                      <td>{purchase.purchaseDate}</td>
                      <td>{purchase.amount}</td>
                      <td>{purchase.usageCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                style={{
                  marginTop: '20px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '6px',
                }}
              >
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>
                  集計情報
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                  }}
                >
                  <div>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      総購入件数
                    </div>
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#667eea',
                      }}
                    >
                      4件
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      総売上
                    </div>
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#667eea',
                      }}
                    >
                      23,000円
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      総利用回数
                    </div>
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#667eea',
                      }}
                    >
                      28回
                    </div>
                  </div>
                </div>
              </div>

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

export default UserPurchaseHistory;
