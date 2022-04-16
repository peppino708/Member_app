# Name

Member App (バイトメンバーのプロフィールアプリ)<br>

# Features

▼ Demo はこちらです

https://murmuring-earth-47067.herokuapp.com/

Email: Demo@email.com

Password： Demo0000

### 現在の機能

- プロフィール閲覧機能（登録している Member のニックネーム・趣味・最近のできごと etc...）
- Tweet 機能
- Tweet に対する Comment 機能
- プロフィールの更新機能（名前、ニックネーム、趣味、最近のできごと、画像）
- ログイン機能
- ログアウト機能
- ユーザー登録機能

# Requirement

### 環境

- macOS Monterey 12.2.1
- rails(6.1.5)
- ruby(2.6.9)
- Node(16.13.0)
- npm(8.1.0)

### バックエンド

- rails(6.1.5)
- carrierwave
- devise
- devise_token_auth
- foreman
- pg (1.2.3)
- puma (5.0)
- rack-cors
- sqlite3 (1.4)

### フロントエンド

- react (17.0.2)
- react-scripts (5.0.0)
- react-dom (17.0.2)
- react-router-dom (5.2.0)
- typescript (4.5.4)
- @chakra-ui/icons (1.1.1)
- @chakra-ui/react (1.7.3)
- @emotion/react (11.7.1)
- @emotion/styled (11.6.0)
- @material-ui/core (4.12.3)
- @material-ui/icons (4.11.2)
- @material-ui/lab (4.0.0-alpha.60)
- @testing-library/jest-dom (5.16.1)
- @testing-library/react (12.1.2)
- @testing-library/user-event (13.5.0)
- @types/jest (27.0.3)
- @types/js-cookie (3.0.1)
- @types/node (16.11.14)
- @types/react (17.0.37)
- @types/react-dom (17.0.11)
- @types/react-icons (3.0.0)
- @types/react-router-dom (5.3.3)
- axios (0.24.0)
- axios-case-converter (0.9.0)
- framer-motion (4.1.17)
- js-cookie (3.0.1)
- web-vitals (2.1.2)
- @types/axios (0.14.0)

# Usage(Local 環境)

1. MemberApp をダウンロードする

```shell
$ git clone https://github.com/peppino708/Member_app.git
$ cd MemberApp
```

2. 必要なライブラリをインストールし、サーバを立てる

###### バックエンド

```shell
MemberApp $ bundle install
MemberApp $ rails db:create
MemberApp $ rails db:migrate
MemberApp $ rails s
```

###### フロントエンド

```shell
MemberApp $ cd frontend
frontend $ npm install
frontend $ npm start
```

###### バックエンド&フロントエンドのサーバーを同時に立てる

```shell
MemberApp $ foreman start -f Procfile.dev
```

3. URL にアクセスする

   http://localhost:3001

注）デフォルトでユーザーが登録されていないので、挙動の確認には、ご自身で何人かのユーザーをご登録していただく必要がございます。

1. ユーザーを登録する  
   http://localhost:3001/signup
2. ログインする  
   http://localhost:3001/signin
3. 別のユーザーを登録する  
   http://localhost:3001/signup 　<br>

# Note

今後やるべきこと

- スタイルの統一（style props) CSS) Material-UI の makeStyles など）
- テストを書く　<br>

# Author

- Naoya Shishikura
- 708.baseball.ster@gmail.com
