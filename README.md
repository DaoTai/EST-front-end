# Mục đích của việc fetch dùng route handler trong NextJS:

# Tránh đc các thông tin nhạy cảm vì nó xử lý ở phía NextJS(Server)

# Vì kết hợp axios + session của NextAuth nên thay vì call api client (rất dài dòng đoại gửi kèm access token lấy từ session)

<!-- # Muốn biết get fetch api được cache hay ko thì re-render lại -->
