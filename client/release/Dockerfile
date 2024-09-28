# ビルドステージ
FROM node:18-alpine AS build

WORKDIR /app

# パッケージ管理ファイルをコピー
COPY package.json yarn.lock ./

# ソースコードをコピー
COPY . .

# 環境変数を設定（必要に応じて）
COPY .env.production .env

# 開発依存関係を含むすべての依存関係をインストール
RUN yarn install --production --frozen-lockfile --network-timeout 600000

RUN yarn prepare

# アプリケーションをビルド
RUN yarn build

# 実行ステージ
FROM node:18-alpine

WORKDIR /app

# 本番環境用の依存関係のみをインストール
COPY --from=build /app/package.json /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile --network-timeout 600000

# ビルドステージから成果物をコピー
COPY --from=build /app/build ./build/

# ポートを公開
EXPOSE 3000

# アプリケーションを実行
CMD ["yarn", "start"]