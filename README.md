# Bank AI Agent — MVP Pattern

这是一个示例项目：使用 MVP（Model-View-Presenter）架构实现的银行场景智能体（AI agent）应用，包含：

- 后端：Node.js + Express，实现 MVP 层次（Model、Presenter、View）
- AI agent：可使用 OpenAI（若配置 OPENAI_API_KEY），否则使用内置规则模拟
- 前端：静态 HTML/JS，演示与智能体的对话
- Dockerfile、测试、GitHub Actions（CI）和 Zeabur 部署说明

快速开始

1. 安装依赖：
   - cd server
   - npm install
2. 运行：
   - npm start
3. 前往： http://localhost:3000

环境变量（可选）
- OPENAI_API_KEY：若提供则 AI agent 会调用 OpenAI API 生成智能回复
- ZEA_TOKEN：若要 CI 自动部署到 Zeabur，可在 GitHub Secrets 中设置

部署到 Zeabur

- 引导：见 `docs/deploy_to_zeabur.md`（在仓库中包含的说明）

将代码提交到 GitHub（示例）

1. 在 GitHub 上创建新的仓库，例如 `your-username/bank-ai-mvp`。
2. 在本地初始化 git 并推送：
   - git init
   - git add .
   - git commit -m "Initial scaffold: MVP bank AI agent"
   - git branch -M main
   - git remote add origin https://github.com/<YOUR_USER>/<YOUR_REPO>.git
   - git push -u origin main

3. 在仓库的 Settings → Secrets and variables → Actions 中添加：
   - `ZEA_TOKEN`：Zeabur 的 token（用于自动部署）
   - `OPENAI_API_KEY`（如果你想在 CI 或运行时让服务调用 OpenAI）

自动部署说明

- 我们提供了 `.github/workflows/deploy.yml`：当你 push 到 `main` 时，会 build 镜像并调用 Zeabur CLI 自动部署（需要 `ZEA_TOKEN`）

截图/录屏与验证

- 部署完成后：获取应用 URL（Zeabur 会返回或在控制面板展示），打开后使用 `web/index.html` 与后端交互。
- 你可以用屏幕录制工具（如 OBS）或简单截图工具保存验证材料。

License: MIT
