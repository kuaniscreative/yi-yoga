# 帳號認證

本專案中之使用者帳號皆需由管理者**手動認證**。

### 流程

流程示意：

```js
// 使用者流程
signUp()
    .then(
        sentEmailToAdmin()
        showNotificationInUI()
    )

// 管理者流程
validate()
    .then(
        sendEmailToUser()
    )
```
