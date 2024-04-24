import { useCallback } from "react";
import { observer } from "mobx-react-lite";

import CreatePostForm from "@/components/forms/create-post/create-post-form";
import { ICreatePostData } from "@/components/forms/create-post/interface";

export const CreatePostContainer = observer(() => {
  const handleSignUp = useCallback(async (data: ICreatePostData) => {
    console.log(data);
  }, []);

  return <CreatePostForm onSubmit={handleSignUp} />;
});
