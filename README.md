Khi app khởi động:
AppProviders mount
AuthBootstrap chạy
đăng ký registerAccessTokenGetter(() => useAuthStore.getState().accessToken)
đăng ký registerUnauthorizedHandler(() => useAuthStore.getState().signOut())
gọi useAuthStore.getState().hydrate()

Mục tiêu là:

lấy session từ SecureStore
đổ vào Zustand memory
để httpClient đọc token từ memory qua readAccessToken()
Trách nhiệm từng lớp
SecureStore: lưu session bền vững
Zustand: giữ auth state hiện tại trong runtime
auth-token.ts: bridge giữa httpClient và auth store
httpClient: chỉ attach token và phát hiện 401
route layouts: quyết định redirect
-- Auth store flow
Trạng thái ban đầu

Khi app mới mở:

status = "checking"
isHydrated = false
user = null
accessToken = null
hydrate()

Store đọc:

storageKeys.accessToken
storageKeys.user

Nếu cả 2 hợp lệ:

set accessToken
set user
status = "authenticated"

Nếu thiếu hoặc parse lỗi:

clear storage
status = "unauthenticated"

Cuối cùng:

isHydrated = true