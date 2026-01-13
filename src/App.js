import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import NewsList from './components/NewsList';
import NewsEdit from './components/NewsEdit';
import NewsEditConfirm from './components/NewsEditConfirm';
import NewsEditComplete from './components/NewsEditComplete';
import InquiryList from './components/InquiryList';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit';
import UserDetail from './components/UserDetail';
import UserEditConfirm from './components/UserEditConfirm';
import UserEditComplete from './components/UserEditComplete';
import UserContracts from './components/UserContracts';
import UserServiceStatus from './components/UserServiceStatus';
import UserPurchaseHistory from './components/UserPurchaseHistory';
import ApprovalList from './components/ApprovalList';
import PurchaseHistoryList from './components/PurchaseHistoryList';
import PurchaseHistoryDetail from './components/PurchaseHistoryDetail';
import './App.css';

function App() {
  // 管理者認証チェック用のコンポーネント
  const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem('adminAuthToken');

    if (!authToken) {
      return <Navigate to="/maintenance" replace />;
    }

    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ログイン */}
          <Route path="/maintenance" element={<AdminLogin />} />

          {/* お知らせ管理 */}
          <Route
            path="/admin/news-list"
            element={
              <ProtectedRoute>
                <NewsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news-edit/:id"
            element={
              <ProtectedRoute>
                <NewsEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news-confirm"
            element={
              <ProtectedRoute>
                <NewsEditConfirm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news-complete"
            element={
              <ProtectedRoute>
                <NewsEditComplete />
              </ProtectedRoute>
            }
          />

          {/* お問い合わせ管理 */}
          <Route
            path="/admin/inquiry-list"
            element={
              <ProtectedRoute>
                <InquiryList />
              </ProtectedRoute>
            }
          />

          {/* 承認管理 */}
          <Route
            path="/admin/approval-list"
            element={
              <ProtectedRoute>
                <ApprovalList />
              </ProtectedRoute>
            }
          />
          {/* 購入履歴確認 */}
          <Route
            path="/admin/purchase-history-list"
            element={
              <ProtectedRoute>
                <PurchaseHistoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/purchase-history/:userId"
            element={
              <ProtectedRoute>
                <PurchaseHistoryDetail />
              </ProtectedRoute>
            }
          />

          {/* ユーザー管理 */}
          <Route
            path="/admin/user-list"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-edit/:id"
            element={
              <ProtectedRoute>
                <UserEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-detail/:id"
            element={
              <ProtectedRoute>
                <UserDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-confirm"
            element={
              <ProtectedRoute>
                <UserEditConfirm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-complete"
            element={
              <ProtectedRoute>
                <UserEditComplete />
              </ProtectedRoute>
            }
          />

          {/* ユーザー契約・サービス管理 */}
          <Route
            path="/admin/user-contracts"
            element={
              <ProtectedRoute>
                <UserContracts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-service-status"
            element={
              <ProtectedRoute>
                <UserServiceStatus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:userId/purchase-history"
            element={
              <ProtectedRoute>
                <UserPurchaseHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-purchase-history"
            element={
              <ProtectedRoute>
                <UserPurchaseHistory />
              </ProtectedRoute>
            }
          />

          {/* デフォルトリダイレクト */}
          <Route path="/" element={<Navigate to="/maintenance" replace />} />
          <Route
            path="/admin"
            element={<Navigate to="/maintenance" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
