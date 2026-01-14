import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminCommon.css';

function ApprovalList() {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      userId: 2,
      userName: '佐藤花子',
      companyName: '株式会社XYZ',
      email: 'sato@example.com',
      serviceName: '業界分析レポート',
      applyDate: '2025-12-28',
      status: '審査中',
      requestContent:
        'プレミアムプランで業界分析レポートサービスの利用を希望します。',
    },
    {
      id: 2,
      userId: 4,
      userName: '田中美咲',
      companyName: '株式会社DEF商事',
      email: 'tanaka@def.com',
      serviceName: 'APIアクセス',
      applyDate: '2026-01-06',
      status: '審査中',
      requestContent: 'API連携による自動データ取得機能の利用を申請します。',
    },
    {
      id: 3,
      userId: 5,
      userName: '伊藤健太',
      companyName: 'XYZ株式会社',
      email: 'ito@xyz-corp.com',
      serviceName: 'データ分析ツール',
      applyDate: '2026-01-08',
      status: '審査中',
      requestContent: '高度なデータ分析ツールの利用を希望します。',
    },
  ]);
  const [selectedApproval, setSelectedApproval] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    navigate('/');
  };

  const handleViewDetail = (approval) => {
    setSelectedApproval(approval);
  };

  const handleCloseModal = () => {
    setSelectedApproval(null);
  };

  const handleApprove = (id) => {
    if (window.confirm('このサービス申込みを承認しますか？')) {
      setApprovals((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: '承認済み' } : item
        )
      );
      alert('承認しました');
      setSelectedApproval(null);
    }
  };

  const handleReject = (id) => {
    const reason = window.prompt('却下理由を入力してください:');
    if (reason !== null && reason.trim() !== '') {
      setApprovals((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: '却下', rejectReason: reason }
            : item
        )
      );
      alert('却下しました');
      setSelectedApproval(null);
    }
  };

  // 審査中のみフィルタリング
  const pendingApprovals = approvals.filter((item) => item.status === '審査中');

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
            <h1 className="page-title">サービス申込み承認管理</h1>

            <div className="content-card">
              <div
                style={{
                  marginBottom: '20px',
                  padding: '15px',
                  backgroundColor: '#fff3cd',
                  borderRadius: '5px',
                  border: '1px solid #ffc107',
                }}
              >
                <strong>承認待ち件数: {pendingApprovals.length}件</strong>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>申込ID</th>
                    <th>申込日</th>
                    <th>会社名</th>
                    <th>ユーザー名</th>
                    <th>サービス名</th>
                    <th>ステータス</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApprovals.length > 0 ? (
                    pendingApprovals.map((approval) => (
                      <tr key={approval.id}>
                        <td>{approval.id}</td>
                        <td>{approval.applyDate}</td>
                        <td>{approval.companyName}</td>
                        <td>{approval.userName}</td>
                        <td>{approval.serviceName}</td>
                        <td>
                          <span className="status-badge status-pending">
                            {approval.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '5px' }}>
                            <button
                              className="btn btn-primary btn-small"
                              onClick={() => handleViewDetail(approval)}
                            >
                              詳細確認
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
                        承認待ちの申込みはありません。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 詳細モーダル */}
            {selectedApproval && (
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
                    サービス申込み詳細
                  </h2>

                  <div style={{ marginBottom: '20px' }}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '20px',
                        marginBottom: '15px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <strong style={{ color: '#666', fontSize: '14px' }}>
                          申込ID:
                        </strong>
                        <div style={{ marginTop: '5px' }}>
                          {selectedApproval.id}
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ color: '#666', fontSize: '14px' }}>
                          申込日:
                        </strong>
                        <div style={{ marginTop: '5px' }}>
                          {selectedApproval.applyDate}
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
                          ユーザー名:
                        </strong>
                        <div style={{ marginTop: '5px' }}>
                          {selectedApproval.userName}
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ color: '#666', fontSize: '14px' }}>
                          会社名:
                        </strong>
                        <div style={{ marginTop: '5px' }}>
                          {selectedApproval.companyName}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ color: '#666', fontSize: '14px' }}>
                        メールアドレス:
                      </strong>
                      <div style={{ marginTop: '5px' }}>
                        {selectedApproval.email}
                      </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ color: '#666', fontSize: '14px' }}>
                        申込サービス:
                      </strong>
                      <div
                        style={{
                          marginTop: '5px',
                          fontSize: '16px',
                          fontWeight: '600',
                        }}
                      >
                        {selectedApproval.serviceName}
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <strong style={{ color: '#666', fontSize: '14px' }}>
                        申込内容:
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
                        {selectedApproval.requestContent}
                      </div>
                    </div>

                    <div
                      style={{
                        marginBottom: '15px',
                        padding: '10px',
                        backgroundColor: '#fff3cd',
                        borderRadius: '5px',
                      }}
                    >
                      <strong style={{ color: '#856404' }}>
                        ステータス: {selectedApproval.status}
                      </strong>
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
                      className="btn btn-primary"
                      onClick={() => handleApprove(selectedApproval.id)}
                    >
                      承認
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(selectedApproval.id)}
                    >
                      却下
                    </button>
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

export default ApprovalList;
