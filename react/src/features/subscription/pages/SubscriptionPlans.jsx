import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PLAN_TYPES, PLAN_INFO } from '@features/subscription/services/subscriptionService'
import { clearError, clearSuccessMessage } from '@features/subscription/store/subscriptionSlice'
import { checkSubStatThunk, createSubThunk } from '@features/subscription/store/subscriptionThunk'

const SubscriptionPlans = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        isActive,
        createLoading,
        createError,
        successMessage
    } = useSelector(state => state.subscription)
    const [ selectedPlan, setSelectedPlan ] = useState(null)
    const [ showConfirm, setShowConfirm ] = useState(false)

    useEffect(() => {
        // 구독 상태 확인
        dispatch(checkSubStatThunk())
    }, [dispatch])

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage())
                navigate('/subscription/manage')
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [successMessage, dispatch, navigate])

    const handlePlanSelect = (planType) => {
        setSelectedPlan(planType)
        setShowConfirm(true)
    }

    const handleSubscribe = async () => {
        if (!selectedPlan) return

        await dispatch(createSubThunk(selectedPlan))
        setShowConfirm(false)
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW'
        }).format(price)
    }

    const PlanCard = ({ planType, planInfo }) => (
        <div>
            <div style={{ border: '1px solid black', padding: '10px', margin: '10px '}}>
                <h3>
                    {planInfo.name}
                </h3>
                <div>
                    <span>{formatPrice(planInfo.price)}</span>
                    {planType !== PLAN_TYPES.TRIAL && (
                        <span>/ {planInfo.duration}</span>
                    )}
                </div>
                <p>
                    {planInfo.description}
                </p>
                {/* 플랜 혜택 */}
                <div>
                    <ul>
                        <li>모든 기능 이용 가능</li>
                        <li>무제한 검색</li>
                        <li>고객 지원</li>
                        {planType === PLAN_TYPES.YEARLY && (
                            <li>2개월 무료 (연간 결제 혜택)</li>
                        )}
                    </ul>
                </div>
                <button
                    onClick={() => handlePlanSelect(planType)}
                    disabled={createLoading || isActive}
                >
                    {isActive ? '이미 구독 중' : createLoading ? '처리 중...' : '구독하기'}
                </button>
            </div>
        </div>
        
    )
    
    if (isActive) {
        return (
            <div>
                <h2>이미 구독 중입니다</h2>
                <p>현재 활성화된 구독이 있습니다.</p>
                <button
                    onClick={() => navigate('/subscription/manage')}>구독 관리하기
                </button>
            </div>
        )
    }

    return (
        <div>
            <div>
                <h1>구독 플랜 선택</h1>
                <p>NewsEmo의 모든 기능을 이용하세요</p>
            </div>
            {/* 성공/에러 메시지 */}
            {successMessage && (
                <div>{successMessage}</div>
            )}
            {createError && (
                <div>
                    <span>{createError}</span>
                    <button onClick={() => dispatch(clearError())}>
                        x
                    </button>
                </div>
            )}
            {/*플랜 카드들*/}
            <div>
                {/* <PlanCard
                    planType={PLAN_TYPES.TRIAL}
                    planInfo={PLAN_INFO[PLAN_TYPES.TRIAL]}
                /> */}
                <PlanCard
                    planType={PLAN_TYPES.MONTHLY}
                    planInfo={PLAN_INFO[PLAN_TYPES.MONTHLY]}
                />
                <PlanCard
                    planType={PLAN_TYPES.YEARLY}
                    planInfo={PLAN_INFO[PLAN_TYPES.YEARLY]}
                />
            </div>
            {/* 자주 묻는 질문 */}
            <div>
                <h3>자주 묻는 질문</h3>
                <div>
                    <h4>구독을 언제든지 해지할 수 있나요?</h4>
                    <p>
                        네, 언제든지 구독을 해지하실 수 있습니다. 해지 후에도 현재 구독 기간이 끝날 때까지는 모든 기능을 이용하실 수 있습니다.
                    </p>
                </div>
                <div>
                    <h4>무료 체험 후 자동 결제되나요?</h4>
                    <p>
                        아니요, 무료 체험 기간이 끝나면 자동으로 결제되지 않습니다. 계속 이용하시려면 별도로 구독을 신청해주셔야 합니다.
                    </p>
                </div>
                <div>
                    <h4>연간 구독의 혜택은 무엇인가요?</h4>
                    <p>
                        연간 구독 시 2개월 무료 혜택을 받으실 수 있어 월간 구독 대비 약 17% 할인된 가격으로 이용하실 수 있습니다.
                    </p>
                </div>
                <div>
                    <h4>환불 정책은 어떻게 되나요?</h4>
                    <p>
                        구독 후 7일 이내 취소 시 전액 환불이 가능합니다. 그 이후에는 사용한 기간을 제외한 잔여 기간에 대해 환불해드립니다.
                    </p>
                </div>
            </div>

            {/* 구독 확인 모달 */}
            {showConfirm && selectedPlan && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ background: 'white', padding: 20}}>
                        <h3>구독 확인</h3>
                        <p>
                            <strong>{PLAN_INFO[selectedPlan]?.name}</strong> 플랜을 구독하시겠습니까?
                        </p>
                        <p>가격: {formatPrice(PLAN_INFO[selectedPlan]?.price || 0)}</p>
                        <p>기간: {PLAN_INFO[selectedPlan]?.duration}</p>
                        <button onClick={() => setShowConfirm(false)}>
                            취소
                        </button>
                        <button
                            onClick={handleSubscribe}                    >
                            {createLoading ? '처리 중...' : '구독하기'}
                        </button>
                    </div>               
                </div>
            )}
        </div>
    )
}
export default SubscriptionPlans