# mt-bench-docker-front

* docker を使用しています
* 操作画面の認証に Firebase を使用しています（ https://firebase.google.com/ で登録してください ）

## 環境設定

`.env.local.sample` と `web/.env.development.sample` を参考に環境変数の設定ファイルを作成してください


### 各種コマンド
起動
```
docker compose up
```

http://localhost:8000/ で操作画面が開きます  
http://localhost:5000/admin で管理画面が開きます


DBマイグレーション
```
docker compose api make migrate
```

管理画面用の管理者作成
```
docker compose api make superuser
```
