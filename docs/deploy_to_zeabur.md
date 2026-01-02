部署到 Zeabur 指南

1) 准备：注册 Zeabur（https://zeabur.com/），安装 Zeabur CLI：
   - curl -fsSL https://get.zeabur.com | bash

2) 本地测试 Docker：
   - docker build -t bank-ai-mvp .
   - docker run -p 3000:3000 -e PORT=3000 bank-ai-mvp

3) 使用 GitHub Actions 自动部署（推荐）：
   - 在 GitHub 仓库中添加 secret `ZEA_TOKEN`（Zeabur 的 bearer token）
   - 可添加一个 Action，使用 `zeabur/zeabur-action` 或使用 CLI 安装并执行 `zeabur apps deploy`。

4) 手动部署（CLI）：
   - zeabur login --token $ZEA_TOKEN
   - zeabur apps create --name bank-ai-mvp --docker
   - zeabur apps deploy --app bank-ai-mvp

5) 验证：部署完成后，获取应用 URL；在浏览器中打开 web/index.html，修改 API 地址为部署的后端地址或使用 CORS 代理。

注意：要在 CI 中自动部署请不要直接在公开仓库中提交 token；使用 GitHub Secrets 管理令牌。
