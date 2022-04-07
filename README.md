# Name

Member App (バイトメンバーのプロフィールアプリ)<br>

# Features

▼ Demo はこちらです

https://tinder-clone3084.herokuapp.com/#/login

Email: Tinder_clone@email.com

Password： Tinder_clone

▼ オリジナルの Tinder はこちらです

https://tinder.com/

### 現在の機能

- 人物カードを仕分けする機能（ボタンとスワイプの両方でできます）
- お互いに「いいね」を押した時マッチする機能
- プロフィールの更新機能（名前、メールアドレス、パスワード、職業、自己紹介、性別、性的趣向、画像）
- ログイン機能
- ログアウト機能
- ユーザー登録機能
- メッセージ送信機能
- 相手のメーセージに「いいね」する機能
- 誰が自分に「いいね」したかを表示する機能　<br>

# Requirement

### 環境

- macOS Big Sur 11.0
- python(3.6.5)
- pip(21.0.1)
- Node(14.15.1)
- npm(6.14.8)

### バックエンド

- Django (3.1.7)
- django-cors-headers (3.7.0)
- djangorestframework (3.12.4)
- djangorestframework-simplejwt (4.4.0)
- Pillow (8.1.2)
- PyJWT (1.7.1)

### フロントエンド

- react (17.0.2)
- react-scripts (4.0.2)
- react-dom (17.0.2)
- react-router-dom (5.2.0)
- react-router-hash-link (2.4.0)
- react-draggable (4.4.3)
- redux (4.0.5)
- react-redux (7.2.3)
- redux-devtools-extension (2.13.9)
- redux-thunk (2.3.0)
- @material-ui/core (4.11.3)
- @material-ui/icons (4.11.2)
- @material-ui/lab (4.0.0-alpha.57)
- axios (0.21.1)

# Usage(Local 環境)

1. Tinder_clone をダウンロードする

```shell
$ git clone https://github.com/sijysn/Tinder_clone.git
$ cd Tinder_clone
```

2. 仮想環境を構築する

```shell
Tinder_clone $ pip install virtualenv
Tinder_clone $ virtualenv myenv
Tinder_clone $ source myenv/bin/activate #mac
```

注）　 Windows の場合はこちらを参照

https://qiita.com/daikidomon/items/03c82a61e3b3bef0e050

3. 必要なライブラリをインストールし、サーバを立てる

###### バックエンド

```shell
Tinder_clone $ cd backend
backend $ pip install -r requirements.txt
backend $ python manage.py migrate
backend $ python manage.py runserver
```

###### フロントエンド

```shell
Tinder_clone $ cd frontend
frontend $ npm install
frontend $ npm start
```

4. URL にアクセスする

   http://localhost:3000/#/register

注）　デフォルトでユーザーが登録されていないので、挙動の確認には、ご自身で何人かのユーザーをご登録していただく必要がございます。

1. ユーザーを登録する  
   http://localhost:3000/#/register
2. ログアウトする  
   http://localhost:3000/#/settings
3. 別のユーザーを登録する  
   http://localhost:3000/#/register 　<br>

# Note

今後やるべきこと

- スタイルの統一（style props, CSS, Material-UI の makeStyles など）
- テストを書く　<br>

# Author

- Seiji Yoshino
- sij.ysn25@gmail.com
