export type User = {
  id: number;
  name: string;
  nick_name: string;
  hobbies: string;
  recent_image: string;
  profile_image: {
    url: string;
  };
};

// サインアップ
export type SignUpParams = {
  name: string;
  password: string;
  passwordConfirmation: string;
};

// サインイン
export type SignInParams = {
  name: string;
  password: string;
};
