import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function UserList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    companyName: '',
    userName: '',
    email: '',
    status: '',
  });
  const [isSearched, setIsSearched] = useState(false);
  const [allUsers] = useState([
    {
      id: 1,
      companyName: '株式会社ABC',
      userName: '山田太郎',
      email: 'yamada@abc.com',
      status: '有効',
      registerDate: '2025-01-01',
    },
    {
      id: 2,
      companyName: '株式会社XYZ',
      userName: '佐藤花子',
      email: 'sato@xyz.com',
      status: '有効',
      registerDate: '2025-02-15',
    },
    {
      id: 3,
      companyName: '株式会社TEST',
      userName: '鈴木一郎',
      email: 'suzuki@test.com',
      status: '無効',
      registerDate: '2024-12-10',
    },
    {
      id: 4,
      companyName: '株式会社DEF商事',
      userName: '田中美咲',
      email: 'tanaka@def.com',
      status: '有効',
      registerDate: '2025-03-20',
    },
    {
      id: 5,
      companyName: 'XYZ株式会社',
      userName: '伊藤健太',
      email: 'ito@xyz-corp.com',
      status: '有効',
      registerDate: '2025-04-10',
    },
    {
      id: 6,
      companyName: '山田商店',
      userName: '山田次郎',
      email: 'jiro@yamada.com',
      status: '無効',
      registerDate: '2024-11-15',
    },
  ]);

  // 検索結果をフィルタリング
  const filteredUsers = isSearched
    ? allUsers.filter((user) => {
        const matchesCompanyName =
          !searchParams.companyName ||
          user.companyName.includes(searchParams.companyName);

        const matchesUserName =
          !searchParams.userName ||
          user.userName.includes(searchParams.userName);

        const matchesEmail =
          !searchParams.email || user.email.includes(searchParams.email);

        const matchesStatus =
          !searchParams.status || user.status === searchParams.status;

        return (
          matchesCompanyName && matchesUserName && matchesEmail && matchesStatus
        );
      })
    : allUsers;

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/');
  };

  const handleSearch = () => {
    setIsSearched(true);
  };

  const handleReset = () => {
    setSearchParams({
      companyName: '',
      userName: '',
      email: '',
      status: '',
    });
    setIsSearched(false);
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
            <h1 className="page-title">ユーザー情報検索一覧</h1>

            <div className="content-card">
              <h2 className="section-title">ユーザー検索</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>会社名</label>
                  <input
                    type="text"
                    placeholder="会社名を入力"
                    value={searchParams.companyName}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        companyName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>ユーザー名</label>
                  <input
                    type="text"
                    placeholder="ユーザー名を入力"
                    value={searchParams.userName}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        userName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>メールアドレス</label>
                  <input
                    type="text"
                    placeholder="メールアドレスを入力"
                    value={searchParams.email}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>ステータス</label>
                  <select
                    value={searchParams.status}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="">全ステータス</option>
                    <option value="有効">有効</option>
                    <option value="無効">無効</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleSearch}>
                  検索
                </button>
                <button className="btn btn-secondary" onClick={handleReset}>
                  クリア
                </button>
              </div>

              {isSearched && (
                <div
                  style={{
                    marginTop: '15px',
                    padding: '10px',
                    backgroundColor: '#f0f8ff',
                    borderRadius: '5px',
                    fontSize: '14px',
                    color: '#333',
                  }}
                >
                  検索結果: {filteredUsers.length}件
                </div>
              )}

              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>会社名</th>
                    <th>ユーザー名</th>
                    <th>メールアドレス</th>
                    <th>登録日</th>
                    <th>ステータス</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.companyName}</td>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>{user.registerDate}</td>
                        <td>
                          <span
                            className={`status-badge ${
                              user.status === '有効'
                                ? 'status-active'
                                : 'status-inactive'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              gap: '5px',
                              flexWrap: 'wrap',
                            }}
                          >
                            <button
                              className="btn btn-primary btn-small"
                              onClick={() =>
                                navigate(`/admin/user-detail/${user.id}`)
                              }
                              title="ユーザー情報確認"
                            >
                              詳細
                            </button>
                            <button
                              className="btn btn-secondary btn-small"
                              onClick={() =>
                                navigate(`/admin/user-edit/${user.id}`)
                              }
                              title="ユーザー情報変更"
                            >
                              編集
                            </button>
                            <button
                              className="btn btn-info btn-small"
                              onClick={() =>
                                navigate(
                                  `/admin/user-contracts?userId=${user.id}`
                                )
                              }
                              title="契約一覧"
                            >
                              契約
                            </button>
                            <button
                              className="btn btn-warning btn-small"
                              onClick={() =>
                                navigate(
                                  `/admin/user-service-status?userId=${user.id}`
                                )
                              }
                              title="サービス申込状況"
                            >
                              申込
                            </button>
                            <button
                              className="btn btn-success btn-small"
                              onClick={() =>
                                navigate(
                                  `/admin/user/${user.id}/purchase-history`
                                )
                              }
                              title="購入履歴・利用状況"
                            >
                              履歴
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        style={{
                          textAlign: 'center',
                          padding: '40px',
                          color: '#666',
                        }}
                      >
                        検索条件に一致するユーザーが見つかりませんでした。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="pagination">
                <button disabled>前へ</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>次へ</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserList;
