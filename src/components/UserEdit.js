import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    companyName: '株式会社ABC',
    userName: '山田太郎',
    email: 'yamada@abc.com',
    phone: '03-1234-5678',
    status: '有効',
  });

  // 確認画面から戻ってきた場合、保存されたデータを復元
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/admin/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 確認画面に遷移
    navigate('/admin/user-confirm', {
      state: { formData, userId: id },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            <h1 className="page-title">ユーザー情報変更</h1>

            <div className="content-card">
              <form onSubmit={handleSubmit}>
                <div className="form-section">
                  <label className="form-label">会社名</label>
                  <input
                    type="text"
                    name="companyName"
                    className="form-control"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-section">
                  <label className="form-label">ユーザー名</label>
                  <input
                    type="text"
                    name="userName"
                    className="form-control"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-section">
                  <label className="form-label">メールアドレス</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-section">
                  <label className="form-label">電話番号</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-section">
                  <label className="form-label">ステータス</label>
                  <select
                    name="status"
                    className="form-control"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="有効">有効</option>
                    <option value="無効">無効</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary">
                    確認画面へ
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin/user-list')}
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserEdit;
