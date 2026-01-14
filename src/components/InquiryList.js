import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function InquiryList() {
  const navigate = useNavigate();
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiries] = useState([
    {
      id: 1,
      date: '2026-01-07',
      name: '山田太郎',
      email: 'yamada@example.com',
      subject: '利用方法について',
      content:
        'サービスの利用方法がよく分かりません。特にデータのダウンロード機能について詳しく教えていただけますでしょうか。',
      status: '未対応',
    },
    {
      id: 2,
      date: '2026-01-06',
      name: '佐藤花子',
      email: 'sato@example.com',
      subject: '料金プランについて',
      content:
        '現在ベーシックプランを利用していますが、スタンダードプランへの変更を検討しています。プラン変更の手順と料金の差額について教えてください。',
      status: '対応中',
    },
    {
      id: 3,
      date: '2026-01-05',
      name: '鈴木一郎',
      email: 'suzuki@example.com',
      subject: 'データ更新について',
      content:
        '企業情報のデータ更新頻度について教えてください。また、最新データに更新されるタイミングはいつでしょうか。',
      status: '完了',
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/');
  };

  const handleStatusUpdate = (id, newStatus) => {
    // ステータス更新処理（実際はAPIを呼び出す）
    alert(`ID:${id} のステータスを「${newStatus}」に更新しました`);
  };

  const handleViewContent = (inquiry) => {
    setSelectedInquiry(inquiry);
  };

  const handleCloseModal = () => {
    setSelectedInquiry(null);
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
            <h1 className="page-title">お問い合わせ確認・ステータス更新</h1>

            <div className="content-card">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>受付日</th>
                    <th>氏名</th>
                    <th>メールアドレス</th>
                    <th>件名</th>
                    <th>ステータス</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td>{inquiry.id}</td>
                      <td>{inquiry.date}</td>
                      <td>{inquiry.name}</td>
                      <td>{inquiry.email}</td>
                      <td>{inquiry.subject}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            inquiry.status === '完了'
                              ? 'status-active'
                              : inquiry.status === '対応中'
                              ? 'status-pending'
                              : 'status-inactive'
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button
                            className="btn btn-primary btn-small"
                            onClick={() => handleViewContent(inquiry)}
                          >
                            内容確認
                          </button>
                          <select
                            className="form-control"
                            style={{
                              fontSize: '13px',
                              padding: '5px',
                              minWidth: '100px',
                            }}
                            defaultValue={inquiry.status}
                            onChange={(e) =>
                              handleStatusUpdate(inquiry.id, e.target.value)
                            }
                          >
                            <option value="未対応">未対応</option>
                            <option value="対応中">対応中</option>
                            <option value="完了">完了</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* お問い合わせ内容表示モーダル */}
            {selectedInquiry && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                }}
                onClick={handleCloseModal}
              >
                <div
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '30px',
                    maxWidth: '700px',
                    width: '90%',
                    maxHeight: '80vh',
                    overflow: 'auto',
                    position: 'relative',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handleCloseModal}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'none',
                      border: 'none',
                      fontSize: '24px',
                      cursor: 'pointer',
                      color: '#666',
                    }}
                  >
                    ×
                  </button>

                  <h2
                    style={{
                      marginBottom: '20px',
                      fontSize: '22px',
                      color: '#333',
                    }}
                  >
                    お問い合わせ詳細
                  </h2>

                  <div style={{ marginBottom: '15px' }}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '20px',
                        marginBottom: '15px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <strong style={{ color: '#666', fontSize: '14px' }}>
                          ID:
                        </strong>
                        <div style={{ marginTop: '5px' }}>
                          {selectedInquiry.id}
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ color: '#666', fontSize: '14px' }}>
                          受付日:
                        </strong>
                        <div style={{ marginTop: '5px' }}>
                          {selectedInquiry.date}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: '20px',
                        marginBottom: '15px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <strong style={{ color: '#666', fontSize: '14px' }}>
                          氏名:
                        </strong>
                        <div style={{ marginTop: '5px' }}>
                          {selectedInquiry.name}
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ color: '#666', fontSize: '14px' }}>
                          ステータス:
                        </strong>
                        <div style={{ marginTop: '5px' }}>
                          <span
                            className={`status-badge ${
                              selectedInquiry.status === '完了'
                                ? 'status-active'
                                : selectedInquiry.status === '対応中'
                                ? 'status-pending'
                                : 'status-inactive'
                            }`}
                          >
                            {selectedInquiry.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ color: '#666', fontSize: '14px' }}>
                        メールアドレス:
                      </strong>
                      <div style={{ marginTop: '5px' }}>
                        {selectedInquiry.email}
                      </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ color: '#666', fontSize: '14px' }}>
                        件名:
                      </strong>
                      <div
                        style={{
                          marginTop: '5px',
                          fontSize: '16px',
                          fontWeight: '600',
                        }}
                      >
                        {selectedInquiry.subject}
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <strong style={{ color: '#666', fontSize: '14px' }}>
                        お問い合わせ内容:
                      </strong>
                      <div
                        style={{
                          marginTop: '10px',
                          padding: '15px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '5px',
                          lineHeight: '1.6',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {selectedInquiry.content}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <button
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default InquiryList;
