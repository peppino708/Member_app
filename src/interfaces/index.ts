// サインアップ
export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// サインイン
export interface SignInParams {
  email: string;
  password: string;
}

// ユーザー
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname: string;
  image: {
    url: string;
  };
  hobbies: string;
  recentTopic: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: number;
  content: string;
  userId: number;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
}
