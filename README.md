# これはなんですか？

開発体験用のアプリケーションです。Express の API サーバー と React の SPA の サーバーの2つのサーバーで成り立っています。

# 準備
- Node.js v16以上（ 18系推奨 ）

# 利用方法

- `git clone` でソースを取得する
- `npm install` する
- `npm run init` する

ここまでがうまくいくと、パッケージインストールが終わり、DBに初期データが準備されます。その上で

```
npm run dev
```

をすると http://localhost:3000 で新たなブラウザ画面を開くはずです。
画面上に以下のような表示がなされれば準備が成功しています。

---

# Contacts
- taro | taro@example.com
- jiro | jiro@example.com

---

# 起動に失敗する際試してほしいこと

もしもうまく立ち上がらない（起動待ちのような状態で画面が出力されない）場合、以下をそれぞれ別のターミナルで動かすなどしてみてください。

```
npm run dev:backend
```

```
npm run dev:frontend
```

また、バックエンドのサーバーは http://localhost:8000 で動作しています。
