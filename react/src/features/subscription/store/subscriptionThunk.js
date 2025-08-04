import { createAsyncThunk as thunk} from '@reduxjs/toolkit'
import { subscriptionService as subService} from '../services/subscriptionService'

// 구독 생성
export const createSubThunk = thunk(
    'subscription/create',
    async (plan, { rejectWithValue }) => {
        try {
            const data = await subService.createSubService(plan)
            return data
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: '구독 생성에 실패했습니다.' })
        }
    }
)

// 구독 상태 확인
export const checkSubStatThunk = thunk(
    'subscription/checkStatus',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const data = await subService.checkSubStatService()
            console.log(data)
            if (data.isActive) {
                dispatch(fetchSubDetailsThunk())
            }
            return data
        } catch (err) {
            return rejectWithValue(err.message || '구독 상태 확인 실패')
        }
    }
)

// 구독 상세 조회
export const fetchSubDetailsThunk = thunk(
    'subscription/fetchDetails',
    async (_, { rejectWithValue }) => {
        try {
            const data = await subService.fetchSubDetailsService()
            console.log('🔵 fetchSubDetailsThunk 응답:', data)
            return data
        } catch (err) {
            console.error('🔴 fetchSubDetailsThunk 에러:', err)
            return rejectWithValue(err.message || '구독 상세 조회 실패')
        }
    }
)

// 구독 해지 예약
export const cancelSubThunk = thunk(
    'subscription/cancel',
    async (_, { rejectWithValue }) => {
        try {
            const data = await subService.cancelSubService()
            return data
        } catch (err) {
            return rejectWithValue(err.message || '구독 해지 예약 실패')
        }
    }
)

export const revertCancelThunk = thunk(
    'subscription/revertCancel',
    async (_, { rejectWithValue }) => {
        try {
            const data = await subService.revertCancelService()
            return data
        } catch (err) {
            return rejectWithValue(err.message || '해지 취소 실패')
        }
    }
)

// 구독 즉시 해지
export const unSubNowThunk = thunk(
    'subscription/unsubscribeNow',
    async (_, { rejectWithValue }) => {
        try {
            const data = await subService.unSubNowService()
            return data
        } catch (err) {
            return rejectWithValue(err.message || '구독 즉시 해지 실패')
        }
    }
)