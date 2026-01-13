import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function PurchaseHistoryList() {
  const navigate = useNavigate();

  // 検索フォームの状態管理
  const [searchForm, setSearchForm] = useState({
    purchaseId: '',
    userId: '',
    userName: '',
    serviceName: '',
    purchaseDate: '',
  });

  // 検索結果の状態管理
  const [purchases, setPurchases] = useState([
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

  const [filteredPurchases, setFilteredPurchases] = useState(purchases);
  const [isSearched, setIsSearched] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/admin/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // ユーザーIDのみで検索した場合はPurchaseHistoryDetailに遷移
    if (
      searchForm.userId &&
      !searchForm.purchaseId &&
      !searchForm.userName &&
      !searchForm.serviceName &&
      !searchForm.purchaseDate
    ) {
      navigate(`/admin/purchase-history/${searchForm.userId}`);
      return;
    }

    // 複数条件での検索
    const filtered = purchases.filter((purchase) => {
      const matchPurchaseId = searchForm.purchaseId
        ? purchase.id.toString().includes(searchForm.purchaseId)
        : true;
      const matchUserId = searchForm.userId
        ? purchase.userId.toString().includes(searchForm.userId)
        : true;
      const matchUserName = searchForm.userName
        ? purchase.userName.includes(searchForm.userName)
        : true;
      const matchServiceName = searchForm.serviceName
        ? purchase.serviceName.includes(searchForm.serviceName)
        : true;
      const matchPurchaseDate = searchForm.purchaseDate
        ? purchase.purchaseDate === searchForm.purchaseDate
        : true;

      return (
        matchPurchaseId &&
        matchUserId &&
        matchUserName &&
        matchServiceName &&
        matchPurchaseDate
      );
    });

    setFilteredPurchases(filtered);
    setIsSearched(true);
  };

  const handleReset = () => {
    setSearchForm({
      purchaseId: '',
      userId: '',
      userName: '',
      serviceName: '',
      purchaseDate: '',
    });
    setFilteredPurchases(purchases);
    setIsSearched(false);
  };

  const handleViewUserHistory = (userId) => {
    navigate(`/admin/purchase-history/${userId}`);
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
            <h1 className="page-title">購入履歴確認</h1>
            {/* 検索フォーム */}
            <div className="content-card">
              <h2 className="section-title">購入履歴検索</h2>
              <form onSubmit={handleSearch}>
                <div className="form-row">
                  <div className="form-group">
                    <label>購入ID</label>
                    <input
                      type="text"
                      name="purchaseId"
                      value={searchForm.purchaseId}
                      onChange={handleInputChange}
                      placeholder="購入IDを入力"
                    />
                  </div>
                  <div className="form-group">
                    <label>ユーザーID</label>
                    <input
                      type="text"
                      name="userId"
                      value={searchForm.userId}
                      onChange={handleInputChange}
                      placeholder="ユーザーIDを入力"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>ユーザー名</label>
                    <input
                      type="text"
                      name="userName"
                      value={searchForm.userName}
                      onChange={handleInputChange}
                      placeholder="ユーザー名を入力"
                    />
                  </div>
                  <div className="form-group">
                    <label>サービス名</label>
                    <input
                      type="text"
                      name="serviceName"
                      value={searchForm.serviceName}
                      onChange={handleInputChange}
                      placeholder="サービス名を入力"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>購入日</label>
                    <input
                      type="date"
                      name="purchaseDate"
                      value={searchForm.purchaseDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    検索
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleReset}
                  >
                    クリア
                  </button>
                </div>
              </form>
            </div>

            {/* 検索結果 */}
            {isSearched && (
              <div className="content-card" style={{ marginTop: '20px' }}>
                <div className="section-header">
                  <h2 className="section-title">検索結果</h2>
                  <span className="result-count">
                    {filteredPurchases.length}件
                  </span>
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
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPurchases.length > 0 ? (
                      filteredPurchases.map((purchase) => (
                        <tr key={purchase.id}>
                          <td>{purchase.id}</td>
                          <td>{purchase.userId}</td>
                          <td>{purchase.userName}</td>
                          <td>{purchase.serviceName}</td>
                          <td>{purchase.purchaseDate}</td>
                          <td>{purchase.amount}</td>
                          <td>{purchase.usageCount}</td>
                          <td>
                            <button
                              className="btn btn-small"
                              onClick={() =>
                                handleViewUserHistory(purchase.userId)
                              }
                            >
                              ユーザー履歴
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="no-data">
                          検索結果が見つかりませんでした
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PurchaseHistoryList;
