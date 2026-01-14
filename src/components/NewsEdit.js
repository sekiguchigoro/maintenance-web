import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function NewsEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    publishDate: '',
    status: '下書き',
  });

  // サンプルデータ（実際はAPIから取得）
  const newsData = {
    1: {
      id: 1,
      title: '新商品のご案内',
      content: '新商品のご案内です。詳細は以下の通りです。',
      publishDate: '2026-01-05',
      status: '公開中',
    },
    2: {
      id: 2,
      title: 'メンテナンスのお知らせ',
      content: 'システムメンテナンスを実施いたします。',
      publishDate: '2026-01-03',
      status: '公開中',
    },
    3: {
      id: 3,
      title: '年末年始休業のお知らせ',
      content: '年末年始の休業日についてお知らせいたします。',
      publishDate: '2025-12-25',
      status: '下書き',
    },
  };

  // IDに基づいてデータを読み込む
  useEffect(() => {
    // location.stateからデータを復元（確認画面から戻った場合）
    if (location.state?.formData) {
      setFormData(location.state.formData);
    } else if (id !== 'new' && newsData[id]) {
      const news = newsData[id];
      setFormData({
        title: news.title,
        content: news.content,
        publishDate: news.publishDate,
        status: news.status,
      });
    }
  }, [id, location.state]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 確認画面に遷移
    navigate('/admin/news-confirm', {
      state: { formData, newsId: id },
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
            <h1 className="page-title">
              {id === 'new' ? 'お知らせ新規作成' : 'お知らせ編集'}
            </h1>

            <div className="content-card">
              <form onSubmit={handleSubmit}>
                <div className="form-section">
                  <label className="form-label">タイトル</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-section">
                  <label className="form-label">本文</label>
                  <textarea
                    name="content"
                    className="form-control form-control-textarea"
                    value={formData.content}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-section">
                  <label className="form-label">公開日</label>
                  <input
                    type="date"
                    name="publishDate"
                    className="form-control"
                    value={formData.publishDate}
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
                    <option value="下書き">下書き</option>
                    <option value="公開中">公開中</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary">
                    保存
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin/news-list')}
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

export default NewsEdit;
