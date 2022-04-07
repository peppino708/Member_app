import { memo, VFC } from "react";
import { Link } from "react-router-dom";

export const Page404: VFC = memo(() => {
  return (
    <div>
      <p>ページが見つかりません</p>
      <Link to="/">TOPへ戻る</Link>
    </div>
  );
});
