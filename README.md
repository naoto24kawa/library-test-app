## Library

## Getting Start

プロジェクトフォルダへ移動

```shell
git clone https://github.com/naoto24kawa/open-library-manage-system
cd open-library-manage-system
```

> ### Highly recommended
>
> 1. Open Setting file
>
>    for Mac
>
>    ```
>    vim ~/.zshrc
>    ```
>
>    for Windows (in WSL)
>
>    ```
>    vi ~/.profile
>    ```
>
> 2. Add Alias
>
>    ```shell
>    # Laravel Sail
>    alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
>    ```

### Server

```shell
cd open-library-manage-system/server
```

Composer Install

```shell
docker run --rm \
  -u "$(id -u):$(id -g)" \
  -v $(pwd):/var/www/html \
  -w /var/www/html \
  laravelsail/php82-composer:latest \
  composer install --ignore-platform-reqs
```

設定ファイルのコピー

```shell
cp .env.example .env
```

コンテナを起動

```shell
sail up -d
```

（初回のみ）マイグレーションの実行

```shell
sail artisan migrate:fresh --seed
```

### Client

```shell
cd open-library-manage-system/client
```

パッケージインストール

```shell
# Node 18.17以上で動作します
yarn
```

設定ファイルのコピー

```shell
cp .env.example .env
```

起動

```shell
yarn serve
```
