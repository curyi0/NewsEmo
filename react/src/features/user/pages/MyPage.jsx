import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfileThunk } from '../store/userThunk';
import { emailService } from '../../email/services/emailService';
import OAuth2LinkSection from '../../auth/components/OAuth2LinkSection';
import UserEditform from '../components/UserEditform';

const MyPage = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    dispatch(fetchUserProfileThunk())
      .unwrap()
      .catch((err) => {
        console.warn('사용자 정보 조회 실패:', err);
        navigate('/login');
      });
  }, [dispatch]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleResendVerification = async () => {
    if (resendLoading || resendCooldown > 0) return;
    setResendLoading(true);
    try {
      await emailService.resendVerification();
      alert('인증 메일이 재발송되었습니다.');
      setResendCooldown(60);
    } catch (error) {
      const errorMessage = error.response?.data || '재발송에 실패했습니다.';
      alert(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">로딩중...</div>;
  if (error) return <div className="text-red-500 text-center py-10">에러: {error}</div>;

  return (
    <main className="flex flex-col sm:flex-row gap-6 max-w-6xl mx-auto p-6">
      {/* 왼쪽 사이드바 */}
      <section className="w-full sm:w-64 flex-shrink-0">
        <div className="flex flex-col items-center space-y-3">
          <div className="relative w-28 h-28 rounded-full overflow-hidden">
            <img
              src="https://static.some.co.kr/sometrend/images/mypage/profile/w_03.png"
              alt="프로필"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="upload-avatar"
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white opacity-0 hover:opacity-100 cursor-pointer transition"
              onClick={handleProfileClick}
            >
              <span className="text-xl">📷</span>
              <div className="text-sm">프로필 변경</div>
              <input
                type="file"
                id="upload-avatar"
                accept=".gif, .jpg, .png"
                ref={fileInputRef}
                className="hidden"
              />
            </label>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">{user?.nickname || '닉네임 없음'}</div>
            <div className="text-sm text-gray-500 mt-1">{user?.roles?.join(', ') || '직무 없음'}</div>
          </div>
        </div>

        <nav className="mt-8 flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-sm">
          
          <div>
            <h4 className="text-sm font-bold mb-2 text-gray-700">구독 관리</h4>
          </div>
          <ul className="flex flex-col space-y-1">
            <li>
              <a href="/mypage/account/info" className="block px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium text-indigo-600">
                내 정보 관리
              </a>
            </li>
            <li>
              <a href="/mypage/inquiry/write" className="block px-3 py-2 rounded hover:bg-gray-100 text-sm">
                1:1 문의
              </a>
            </li>
          </ul>
        </nav>
      </section>

      {/* 오른쪽 본문 */}
      <section className="flex-1">
        <article>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">내 정보</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm text-gray-600 mb-1">이메일</h4>
              <p className="text-base">{user?.email || '없음'}</p>
            </div>

            <div>
              <h4 className="text-sm text-gray-600 mb-1">이메일 인증</h4>
              {user?.emailVerified ? (
                <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">인증됨</span>
              ) : (
                <div className="text-sm text-red-500">
                  인증되지 않음
                  <button
                    onClick={handleResendVerification}
                    disabled={resendLoading || resendCooldown > 0}
                    className="ml-2 px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs"
                  >
                    {resendCooldown > 0 ? `재발송 (${resendCooldown})` : '인증 메일 재발송'}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-600 mb-1">직무</h4>
                <p className="text-base">{user?.roles?.join(', ') || '직무 없음'}</p>
              </div>
            </div>

            {/* 구독 정보 */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-3">구독 정보</h3>
              <div className="flex items-center justify-between">
                <div className="text-gray-500">구독중인 썸트렌드 어스 서비스가 없습니다.</div>
                <button
                  className="px-3 py-2 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  onClick={() => window.location.href = '/service/pricing'}
                >
                  구독 하러가기
                </button>
              </div>
            </div>

            {/* 카드 정보 */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-3">내 카드 정보</h3>
              <div className="flex items-center justify-between">
                <div className="text-gray-500">저장된 카드 정보가 없습니다.</div>
                <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  카드 정보 입력하기
                </button>
              </div>
            </div>

            {/* 추가 컴포넌트 */}
            <OAuth2LinkSection />
            <UserEditform />
            {/* 회원 탈퇴 */}
            <div className="pt-10 text-right">
              <a href="#" className="text-red-500 hover:underline">회원탈퇴 →</a>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default MyPage;
