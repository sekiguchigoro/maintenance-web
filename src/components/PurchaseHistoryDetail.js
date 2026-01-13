import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function PurchaseHistoryDetail() {
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
      userName: '田中太郎',
      serviceName: 'ビジネスレポート',
      purchaseDate: '2026-01-05',
      amount: '20,000円',
      usageCount: 15,
    },
    {
      id: 2,
      userId: 1,
      userName: '田中太郎',
      serviceName: '企業情報データベース',
      purchaseDate: '2026-01-03',
      amount: '30,000円',
      usageCount: 22,
    },
    {
      id: 3,
      userId: 2,
      userName: '佐藤花子',
      serviceName: 'マーケット分析',
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
    {
      id: 5,
      userId: 4,
      userName: '高橋美咲',
      serviceName: 'ビジネスレポート',
      purchaseDate: '2026-01-02',
      amount: '15,000円',
      usageCount: 6,
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/admin/login');
  };

  const handleSearch = () => {
    // 検索処理（実際はAPIを呼び出す）
    alert('検索を実行しました');
  };

  // フィルタリングされた購入履歴
  const filteredPurchases = purchases.filter(
    (p) =>
      (!userId || p.userId === parseInt(userId)) &&
      (!searchParams.serviceName ||
        p.serviceName.includes(searchParams.serviceName)) &&
      (!searchParams.purchaseDate ||
        p.purchaseDate === searchParams.purchaseDate)
  );

  // 集計データ
  const totalAmount = filteredPurchases.reduce((sum, p) => {
    return sum + parseInt(p.amount.replace(/[^0-9]/g, ''));
  }, 0);
  const totalUsage = filteredPurchases.reduce(
    (sum, p) => sum + p.usageCount,
    0
  );

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
              購入履歴詳細
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
              <h2 className="section-title">検索条件</h2>
              <div
                style={{
                  display: 'flex',
                  gap: '15px',
                  marginBottom: '20px',
                  alignItems: 'flex-end',
                }}
              >
                <div style={{ flex: 1 }}>
                  <label className="form-label">サービス名</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="サービス名を入力"
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
                <h3 style={{ marginBottom: '15px', color: '#333' }}>
                  利用状況集計
                </h3>
                <div style={{ display: 'flex', gap: '30px' }}>
                  <div
                    style={{
                      flex: 1,
                      padding: '15px',
                      background: 'white',
                      borderRadius: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.9em',
                        color: '#666',
                        marginBottom: '8px',
                      }}
                    >
                      総購入件数
                    </div>
                    <div style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                      {filteredPurchases.length}件
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      padding: '15px',
                      background: 'white',
                      borderRadius: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.9em',
                        color: '#666',
                        marginBottom: '8px',
                      }}
                    >
                      総購入金額
                    </div>
                    <div style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                      {totalAmount.toLocaleString()}円
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      padding: '15px',
                      background: 'white',
                      borderRadius: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.9em',
                        color: '#666',
                        marginBottom: '8px',
                      }}
                    >
                      総利用回数
                    </div>
                    <div style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                      {totalUsage}回
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate('/admin/purchase-history-list')}
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

export default PurchaseHistoryDetail;
