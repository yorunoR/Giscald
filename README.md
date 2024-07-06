# benches-docker-front
![Screenshot from 2024-07-02 03-56-15](https://github.com/yorunoR/benches-docker-front/assets/20706270/e7d8f098-c210-4a82-a200-eaa35ce8f0fc)


* docker を使用しています
* 操作画面の認証に Firebase を使用しています（ https://firebase.google.com/ で登録してください ）

## 事前準備
TGI や vllm で、OpenAI 互換の LLM サーバーを起動してください

※ 参考 https://github.com/yorunoR/infer-with

## 環境設定

`.env.local.sample` と `web/.env.development.sample` を参考に環境変数の設定ファイルを作成してください

.env.local
```
PYTHONUNBUFFERED=1
POSTGRES_HOST=db

# Firebase のプロジェクト ID
FIREBASE_PROJECT_ID=xxxx <= 認証に使います

# 使用する API に応じて設定してください
OPENAI_API_KEY=sk-xxxxx
GEMINI_API_KEY=
ANTHROPIC_API_KEY=
COHERE_API_KEY=
DEEPSEEK_API_KEY=

LANGFUSE_SECRET_KEY=sk-lf-xxxxx <= 最初に起動した時、http://localhost:3000/ でサインアップ・プロジェクト作成した後に作ったキーを設定してください
LANGFUSE_PUBLIC_KEY=pk-lf-xxxxx <= 同上
LANGFUSE_HOST=http://langfuse:3000
```

web/.env.development
```
VITE_APP_API_URL="http://localhost:5000"
VITE_APP_ENV="dev"

# Firebase の web アプリ コンフィグレーション
VITE_APP_PROJECT_ID=xxxxx
VITE_APP_APP_ID=xxxxx
VITE_APP_API_KEY=xxxxx
VITE_APP_AUTH_DOMAIN=xxxxx
VITE_APP_MESSAGING_SENDER_ID=xxxxx
VITE_APP_STORAGE_BUCKET=xxxxx
```

### 各種コマンド
起動
```
docker compose up

# langfuse の出力を無効にしたい時
docker compose up --no-attach langfuse
```

http://localhost:8000/signin で操作画面が開きます  
http://localhost:5000/admin で管理画面が開きます  
http://localhost:3000/ で langfuse が開きます


DBマイグレーション
```
docker compose exec api make migrate
```

評価ベンチ保存
```
docker compose exec api make seed
```

管理画面用の管理者作成
```
docker compose exec api make superuser
```

フロントエンド側で使う GraphQL の型定義ファイル生成 & ルールチェック
```
docker compose exec web pnpm code
```
